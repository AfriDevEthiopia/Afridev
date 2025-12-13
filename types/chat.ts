// Chat message types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Chat state
export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

// API request/response types
export interface ChatRequest {
  message: string;
  history?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface ChatResponse {
  response: string;
  error?: string;
}

// Quick action suggestions
export interface QuickAction {
  id: string;
  label: string;
  message: string;
}

// Chat constants
export const CHAT_CONSTANTS = {
  MAX_MESSAGE_LENGTH: 2000,
  MAX_HISTORY_LENGTH: 20,
  TYPING_DELAY: 50,
  STORAGE_KEY: "afridev-chat-history",
} as const;

// Default quick actions
export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  {
    id: "services",
    label: "What services do you offer?",
    message: "What services does AfriDev offer?",
  },
  {
    id: "pricing",
    label: "How much does it cost?",
    message: "How much do your services cost?",
  },
  {
    id: "contact",
    label: "How can I contact you?",
    message: "How can I get in touch with AfriDev?",
  },
  {
    id: "consultation",
    label: "Book a consultation",
    message: "I'd like to book a free consultation. How can I do that?",
  },
];

