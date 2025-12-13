"use client";

import { useChat } from "@/hooks/useChat";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";

export function ChatAssistant() {
  const {
    messages,
    isLoading,
    error,
    isOpen,
    sendMessage,
    toggleChat,
    closeChat,
    clearHistory,
  } = useChat();

  return (
    <>
      {/* Floating chat button */}
      <ChatButton
        isOpen={isOpen}
        onClick={toggleChat}
        hasUnread={false}
      />

      {/* Chat window */}
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSendMessage={sendMessage}
        onClose={closeChat}
        onClearHistory={clearHistory}
      />
    </>
  );
}

// Re-export components for granular usage
export { ChatButton } from "./ChatButton";
export { ChatWindow } from "./ChatWindow";
export { ChatInput } from "./ChatInput";
export { ChatMessageComponent as ChatMessage } from "./ChatMessage";
export { QuickActions } from "./QuickActions";

