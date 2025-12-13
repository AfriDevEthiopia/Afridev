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

      {/* Outer pulsing rings - only when closed */}
      <AnimatePresence>
        {!isOpen && (
          <>
            {/* First ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(0, 26, 102, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)",
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.8, 2.2],
                opacity: [0.6, 0.3, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            {/* Second ring - delayed */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(0, 71, 171, 0.4) 100%)",
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.6, 2],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8,
              }}
            />
            {/* Third ring - more delayed */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(96, 165, 250, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)",
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.4, 1.8],
                opacity: [0.4, 0.15, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.6,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Orbiting particles - only when closed */}
      <AnimatePresence>
        {!isOpen && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 
                    ? "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)" 
                    : "linear-gradient(135deg, #001a66 0%, #0047ab 100%)",
                  boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                  top: "50%",
                  left: "50%",
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  x: [
                    Math.cos((i * Math.PI) / 2) * 35,
                    Math.cos((i * Math.PI) / 2 + Math.PI) * 35,
                    Math.cos((i * Math.PI) / 2) * 35,
                  ],
                  y: [
                    Math.sin((i * Math.PI) / 2) * 35,
                    Math.sin((i * Math.PI) / 2 + Math.PI) * 35,
                    Math.sin((i * Math.PI) / 2) * 35,
                  ],
                  opacity: [0.8, 0.4, 0.8],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={onClick}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center overflow-hidden group"
        style={{
          background: "linear-gradient(135deg, #001a66 0%, #0047ab 50%, #3b82f6 100%)",
        }}
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          rotate: 0,
          boxShadow: isOpen 
            ? "0 10px 40px rgba(0, 26, 102, 0.3)"
            : [
                "0 10px 40px rgba(0, 26, 102, 0.3)",
                "0 15px 50px rgba(59, 130, 246, 0.4)",
                "0 10px 40px rgba(0, 26, 102, 0.3)",
              ],
        }}
        whileHover={{ 
          scale: 1.15,
          boxShadow: "0 20px 60px rgba(59, 130, 246, 0.5)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 17,
          boxShadow: {
            duration: 2,
            repeat: isOpen ? 0 : Infinity,
            ease: "easeInOut",
          }
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Rotating gradient border - only when closed */}
        {!isOpen && (
          <motion.div
            className="absolute -inset-[2px] rounded-full"
            style={{
              background: "conic-gradient(from 0deg, #001a66, #3b82f6, #60a5fa, #3b82f6, #001a66)",
              padding: "2px",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#001a66] via-[#0047ab] to-[#3b82f6]" />
          </motion.div>
        )}

        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-transparent" />
        
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />

        {/* Icon container with animations */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="relative z-10"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ 
                rotate: 0, 
                opacity: 1, 
                scale: 1,
              }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="relative z-10"
            >
              <motion.div
                animate={{
                  y: [0, -2, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sparkle effects - only when closed */}
        <AnimatePresence>
          {!isOpen && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${20 + i * 25}%`,
                    left: `${15 + i * 30}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Unread indicator */}
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              exit={{ scale: 0 }}
              transition={{
                scale: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center z-20"
            >
              <span className="text-[10px] font-bold text-white">!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
