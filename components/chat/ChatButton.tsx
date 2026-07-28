"use client";

import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnread?: boolean;
}

export function ChatButton({ isOpen, onClick, hasUnread = false }: ChatButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        onClick={onClick}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-accent text-accent-foreground border-2 border-background flex items-center justify-center"
            >
              <span className="text-[10px] font-bold leading-none">!</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
