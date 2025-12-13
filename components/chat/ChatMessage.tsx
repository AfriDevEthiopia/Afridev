"use client";

import { motion } from "motion/react";
import { User, Bot } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  index: number;
}

export function ChatMessageComponent({ message, index }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 20 }}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-gradient-to-br from-primary to-accent"
            : "bg-gradient-to-br from-[#001a66] to-[#3b82f6]"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </motion.div>

      {/* Message bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-gradient-to-br from-primary to-accent text-white rounded-br-sm"
            : "glass-card text-foreground rounded-bl-sm"
        }`}
      >
        {/* Message content with markdown-like formatting */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {formatMessage(message.content)}
        </div>

        {/* Timestamp */}
        <div
          className={`text-[10px] mt-1.5 ${
            isUser ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </motion.div>
  );
}

// Format message with basic markdown support
function formatMessage(content: string) {
  // Simple formatting - can be enhanced with a proper markdown parser
  return content
    .split("\n")
    .map((line, i) => {
      // Bold text
      line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Italic text
      line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");
      // Inline code
      line = line.replace(/`(.*?)`/g, '<code class="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-xs">$1</code>');
      
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: line }} />
          {i < content.split("\n").length - 1 && <br />}
        </span>
      );
    });
}

// Format timestamp
function formatTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

