"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "motion/react";
import { Send, Loader2 } from "lucide-react";
import { CHAT_CONSTANTS } from "@/types/chat";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading, placeholder = "Type your message..." }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const charCount = input.length;
  const isOverLimit = charCount > CHAT_CONSTANTS.MAX_MESSAGE_LENGTH;

  return (
    <div className="relative">
      {/* Character count warning */}
      {charCount > CHAT_CONSTANTS.MAX_MESSAGE_LENGTH * 0.8 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute -top-6 right-0 text-xs ${
            isOverLimit ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {charCount}/{CHAT_CONSTANTS.MAX_MESSAGE_LENGTH}
        </motion.div>
      )}

      <div className="flex items-end gap-2 p-2 bg-secondary/50 rounded-2xl border border-border focus-within:border-primary transition-colors">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none px-2 py-1.5 max-h-[120px] scrollbar-thin"
          style={{ minHeight: "36px" }}
        />

        <motion.button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading || isOverLimit}
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: input.trim() && !isOverLimit
              ? "linear-gradient(135deg, #001a66 0%, #3b82f6 100%)"
              : "transparent",
          }}
          whileHover={input.trim() && !isOverLimit ? { scale: 1.05 } : {}}
          whileTap={input.trim() && !isOverLimit ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
          ) : (
            <Send
              className={`w-4 h-4 ${
                input.trim() && !isOverLimit ? "text-white" : "text-muted-foreground"
              }`}
            />
          )}
        </motion.button>
      </div>

      {/* Hint text */}
      <div className="text-[10px] text-muted-foreground mt-1 px-2">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}

