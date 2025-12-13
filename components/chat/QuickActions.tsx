"use client";

import { motion } from "motion/react";
import { QuickAction } from "@/types/chat";

interface QuickActionsProps {
  actions: QuickAction[];
  onSelect: (message: string) => void;
  disabled?: boolean;
}

export function QuickActions({ actions, onSelect, disabled = false }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action, index) => (
        <motion.button
          key={action.id}
          onClick={() => onSelect(action.message)}
          disabled={disabled}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-3 py-1.5 text-xs rounded-full border border-border bg-secondary/50 text-foreground hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {action.label}
        </motion.button>
      ))}
    </div>
  );
}

