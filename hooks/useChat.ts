"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  ChatMessage,
  ChatRequest,
  ChatResponse,
  CHAT_CONSTANTS,
} from "@/types/chat";

// Generate unique ID
const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CHAT_CONSTANTS.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map((msg: ChatMessage) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        // Only store last N messages to prevent storage bloat
        const toStore = messages.slice(-CHAT_CONSTANTS.MAX_HISTORY_LENGTH);
        localStorage.setItem(CHAT_CONSTANTS.STORAGE_KEY, JSON.stringify(toStore));
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [messages]);

  // Send message to API
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Validate message length
    if (content.length > CHAT_CONSTANTS.MAX_MESSAGE_LENGTH) {
      setError(`Message too long. Maximum ${CHAT_CONSTANTS.MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    setError(null);
    setIsLoading(true);

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Prepare request
    const history = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const request: ChatRequest = {
      message: content.trim(),
      history: history.slice(-CHAT_CONSTANTS.MAX_HISTORY_LENGTH),
    };

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data: ChatResponse = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        // Request was cancelled, don't show error
        return;
      }

      // Handle network errors more specifically
      let errorMessage = "Failed to send message";
      if (err instanceof Error) {
        errorMessage = err.message;
        
        // Check for network-related errors
        if (err.message.includes("Failed to fetch") || err.message.includes("network") || err.message.includes("internet")) {
          errorMessage = "Network error: Please check your internet connection and try again.";
        } else if (err.message.includes("timeout")) {
          errorMessage = "Request timed out. Please check your internet connection and try again.";
        }
      }
      
      setError(errorMessage);

      // Add error message to chat with more helpful message
      const errorChatMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: errorMessage.includes("network") || errorMessage.includes("internet") || errorMessage.includes("timeout")
          ? errorMessage
          : "I apologize, but I'm having trouble responding right now. Please try again later or contact AfriDev directly.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages, isLoading]);

  // Cancel ongoing request
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  // Clear chat history
  const clearHistory = useCallback(() => {
    setMessages([]);
    setError(null);
    try {
      localStorage.removeItem(CHAT_CONSTANTS.STORAGE_KEY);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Toggle chat open/close
  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Open chat
  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Close chat
  const closeChat = useCallback(() => {
    setIsOpen(false);
    cancelRequest();
  }, [cancelRequest]);

  return {
    messages,
    isLoading,
    error,
    isOpen,
    sendMessage,
    cancelRequest,
    clearHistory,
    toggleChat,
    openChat,
    closeChat,
  };
}

