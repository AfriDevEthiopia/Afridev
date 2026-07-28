"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, Minimize2, Headset } from "lucide-react";
import { ChatMessage } from "@/types/chat";
import { DEFAULT_QUICK_ACTIONS } from "@/types/chat";
import { ChatMessageComponent } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";

interface ChatWindowProps {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (message: string) => void;
  onClose: () => void;
  onClearHistory: () => void;
}

export function ChatWindow({
  isOpen,
  messages,
  isLoading,
  error,
  onSendMessage,
  onClose,
  onClearHistory,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);
  const wasOpenRef = useRef(isOpen);

  // Scroll to bottom instantly when chat opens (to show latest messages)
  useLayoutEffect(() => {
    if (isOpen && !wasOpenRef.current && messagesContainerRef.current) {
      // Chat just opened - scroll to bottom instantly (no animation)
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  // Scroll to bottom smoothly only when new messages are added
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current && messagesEndRef.current) {
      // New message added - scroll smoothly to bottom
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[400px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "var(--background)",
            maxHeight: "calc(100vh - 180px)", // Leave space for header (80px) + button (100px)
          }}
        >
          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary shrink-0">
                <Headset className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">
                  AfriDev Assistant
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  {isLoading ? "Typing..." : "Online • Ready to help"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Clear history button */}
              {messages.length > 0 && (
                <motion.button
                  onClick={onClearHistory}
                  className="p-2 rounded-lg hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Clear chat history"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              )}

              {/* Minimize button */}
              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Minimize2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Messages area - oldest at top, newest at bottom, scroll up to see history */}
          <div
            ref={messagesContainerRef}
            className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 min-h-[150px] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
          >
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-8"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-primary">
                  <Headset className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Hi! I&apos;m your AfriDev Assistant
                </h4>
                <p className="text-xs text-muted-foreground mb-4 max-w-[250px]">
                  I can answer questions about our services, team, and how we can help with your project.
                </p>

                {/* Quick actions */}
                <QuickActions
                  actions={DEFAULT_QUICK_ACTIONS}
                  onSelect={onSendMessage}
                  disabled={isLoading}
                />
              </motion.div>
            ) : (
              <>
                {/* Messages displayed in order - oldest first, newest last */}
                {messages.map((message, index) => (
                  <ChatMessageComponent
                    key={message.id}
                    message={message}
                    index={index}
                  />
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Headset className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="glass px-4 py-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{
                              y: [0, -5, 0],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Scroll anchor at the bottom */}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Error display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative z-10 px-4 py-2 bg-danger/10 border-t border-danger/20"
              >
                <p className="text-xs text-danger">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input area */}
          <div className="relative z-10 p-4 border-t border-border bg-background/50">
            <ChatInput
              onSend={onSendMessage}
              isLoading={isLoading}
              placeholder="Ask me anything about AfriDev..."
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
