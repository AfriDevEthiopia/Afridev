# AfriDev - Professional Agency Website

> A modern, animated, and multilingual website for **AfriDev** - Full Stack Developers | AI, LLM & Automation Experts

[![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Table of Contents

- [Features](#features)
- [Internationalization](#internationalization)
- [Project Architecture](#project-architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development Guide](#development-guide)
- [Styling & Theming](#styling--theming)
- [AI Chat Assistant](#ai-chat-assistant)
- [API Routes](#api-routes)
- [Build & Deployment](#build--deployment)
- [Testing & Quality](#testing--quality)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)
- [Team](#team)
- [Contact](#contact)

---

## Features

### Core Features
- **Next.js 16** with App Router and Turbopack for blazing-fast development
- **TypeScript** for type safety and enhanced developer experience
- **Tailwind CSS v4** with custom slate color system and dark mode support
- **Motion (Framer Motion)** for smooth scroll animations and micro-interactions
- **next-intl** for comprehensive internationalization
- **Fully Responsive** - Mobile-first design that works on all devices
- **SEO Optimized** - Meta tags, semantic HTML, and performance optimized
- **Clean Architecture** - Decoupled components, organized folder structure

### AI-Powered Features
- **AI Chat Assistant** - Integrated OpenAI-powered chat for visitor engagement
- **Quick Actions** - Pre-defined conversation starters for common queries
- **Conversation History** - Persistent chat history with localStorage
- **Theme-Aware UI** - Chat interface adapts to light/dark mode

### Design Features
- **Cursor Glow Effect** - Interactive cursor effects on desktop
- **Page Transitions** - Smooth animations between sections
- **Glass Morphism** - Modern glassmorphic UI elements
- **Animated Statistics** - Eye-catching number counters and progress indicators
- **Portfolio Showcase** - Dynamic project gallery with hover effects

---

## Internationalization

The website supports three languages with full translation coverage:

| Language | Code | Status |
|----------|------|--------|
| English | `en` | Complete |
| አማርኛ (Amharic) | `am` | Complete |
| Afaan Oromo | `om` | Complete |

### How i18n Works

1. **URL-based routing**: `/en/`, `/am/`, `/om/`
2. **Translation files**: Located in `messages/` directory
3. **Dynamic language switching**: Real-time language toggle without page reload
4. **Fallback support**: Defaults to English if translation missing

---

## Project Architecture

```
afridev/
│
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── layout.tsx            # Root layout with i18n & theme providers
│   │   └── page.tsx              # Home page (client component)
│   ├── api/                      # API routes
│   │   └── chat/
│   │       └── route.ts          # AI chat endpoint (OpenAI integration)
│   ├── globals.css               # Global styles & CSS variables
│   └── icon.svg                  # App favicon
│
├── components/                   # React components
│   ├── animations/               # Animation components
│   │   └── index.tsx             # CursorGlow, PageTransition, etc.
│   ├── chat/                     # AI Chat Assistant
│   │   ├── ChatButton.tsx        # Floating chat button
│   │   ├── ChatInput.tsx         # Message input with send button
│   │   ├── ChatMessage.tsx       # Individual message component
│   │   ├── ChatWindow.tsx        # Main chat window
│   │   ├── QuickActions.tsx      # Pre-defined quick action buttons
│   │   └── index.tsx             # ChatAssistant wrapper
│   ├── layout/                   # Layout components
│   │   ├── header.tsx            # Navigation header
│   │   └── footer.tsx            # Site footer
│   ├── sections/                 # Page sections
│   │   ├── hero.tsx              # Hero section with CTA
│   │   ├── services.tsx          # Services showcase
│   │   ├── portfolio.tsx         # Project portfolio
│   │   ├── team.tsx              # Team members
│   │   └── contact.tsx           # Contact form
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx            # Custom button component
│   │   └── language-switcher.tsx # Language toggle dropdown
│   ├── theme-provider.tsx        # Next-themes provider wrapper
│   └── theme-toggle.tsx          # Dark/light mode toggle
│
├── hooks/                        # Custom React hooks
│   └── useChat.ts                # Chat logic & state management
│
├── i18n/                         # Internationalization config
│   ├── request.ts                # i18n request handler
│   └── routing.ts                # Locale routing configuration
│
├── lib/                          # Utility libraries
│   ├── constants.ts              # App-wide constants & data
│   └── utils.ts                  # Helper functions (cn, etc.)
│
├── messages/                     # Translation files (JSON)
│   ├── en.json                   # English translations
│   ├── am.json                   # Amharic translations
│   └── om.json                   # Oromo translations
│
├── public/                       # Static assets
│   └── images/
│       ├── icons/                # Brand icons (SVG)
│       ├── logos/                # Brand logos (PNG)
│       ├── projects/             # Portfolio project images
│       └── teams/                # Team member photos
│
├── types/                        # TypeScript type definitions
│   ├── chat.ts                   # Chat-related types
│   └── index.ts                  # General type definitions
│
├── proxy.ts                      # Next.js middleware for i18n routing
├── next.config.ts                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & scripts
└── README.md                     # This file
```

### Key Directories Explained

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `app/[locale]/` | Internationalized pages | `page.tsx`, `layout.tsx` |
| `components/sections/` | Main page sections | `hero.tsx`, `services.tsx`, etc. |
| `components/chat/` | AI chat feature | `ChatWindow.tsx`, `useChat.ts` |
| `messages/` | Translation files | `en.json`, `am.json`, `om.json` |
| `lib/` | Utilities & constants | `utils.ts`, `constants.ts` |
| `types/` | TypeScript definitions | `chat.ts`, `index.ts` |

---

## Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.0.8 | React framework with App Router |
| [React](https://reactjs.org/) | 19.2.1 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Node.js](https://nodejs.org/) | 18+ | Runtime environment |

### Styling & UI

| Technology | Version | Purpose |
|------------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS framework |
| [PostCSS](https://postcss.org/) | Latest | CSS processing |
| [Motion](https://motion.dev/) | 12.23.26 | Animation library (Framer Motion successor) |
| [Lucide React](https://lucide.dev/) | 0.559.0 | Icon library |

### Internationalization & State

| Technology | Version | Purpose |
|------------|---------|---------|
| [next-intl](https://next-intl-docs.vercel.app/) | 4.5.8 | i18n for Next.js App Router |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.6 | Theme management (dark/light mode) |
| [react-hook-form](https://react-hook-form.com/) | 7.68.0 | Form validation & management |

### AI & APIs

| Technology | Version | Purpose |
|------------|---------|---------|
| [@google/genai](https://www.npmjs.com/package/@google/genai) | 1.33.0 | Google Generative AI SDK |
| OpenAI API | GPT-4o-mini | AI chat assistant backend |

### Utilities

| Technology | Version | Purpose |
|------------|---------|---------|
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Conditional className utility |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.4.0 | Merge Tailwind classes without conflicts |

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Code Editor** (VS Code recommended)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/afridev.git
cd afridev
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# OpenAI API Key (required for AI chat assistant)
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Google Generative AI API Key
GOOGLE_GENAI_API_KEY=your_google_api_key_here
```

> **Getting API Keys:**
> - OpenAI: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
> - Google AI: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

The default language is English. Access other languages:
- English: `http://localhost:3000/en`
- Amharic: `http://localhost:3000/am`
- Oromo: `http://localhost:3000/om`

---

## Development Guide

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm start` | Start production server (after build) |
| `npm run lint` | Run ESLint to check code quality |

### Adding New Features

#### Adding a New Section

1. **Create component file**

```bash
# Create new section component
touch components/sections/testimonials.tsx
```

2. **Implement the component**

```typescript
// components/sections/testimonials.tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export function Testimonials() {
  const t = useTranslations("testimonials");
  
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <h2>{t("title")}</h2>
        {/* Your content here */}
      </div>
    </section>
  );
}
```

3. **Add translations**

```json
// messages/en.json
{
  "testimonials": {
    "title": "What Our Clients Say",
    "subtitle": "Real feedback from real clients"
  }
}
```

4. **Import and use in page**

```typescript
// app/[locale]/page.tsx
import { Testimonials } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <PageTransition>
      <Header />
      <main>
        <Hero />
        <Services />
        <Testimonials /> {/* Add your new section */}
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </PageTransition>
  );
}
```

#### Adding New Translations

1. **Edit translation files** in `messages/` directory:

```json
// messages/en.json
{
  "newSection": {
    "title": "New Section Title",
    "description": "Section description"
  }
}
```

2. **Use in components** with `useTranslations` hook:

```typescript
const t = useTranslations("newSection");
return <h2>{t("title")}</h2>;
```

#### Adding New API Routes

1. **Create route file**

```bash
mkdir -p app/api/contact
touch app/api/contact/route.ts
```

2. **Implement API handler**

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Handle request logic
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Component Development Guidelines

#### Best Practices

1. **Use TypeScript** for all components
2. **Follow naming conventions**:
   - Components: `PascalCase` (e.g., `ChatWindow.tsx`)
   - Utilities: `camelCase` (e.g., `useChat.ts`)
   - Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_MESSAGE_LENGTH`)
3. **Use client components** only when necessary (use `"use client"` directive)
4. **Implement proper error handling**
5. **Add loading states** for async operations
6. **Make components responsive** (mobile-first approach)
7. **Use semantic HTML** for accessibility

#### Code Structure Example

```typescript
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";

// 1. Define types
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// 2. Component definition
export function MyComponent({ title, onAction }: MyComponentProps) {
  // 3. Hooks
  const t = useTranslations("myComponent");
  const [isLoading, setIsLoading] = useState(false);

  // 4. Event handlers
  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onAction();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4"
    >
      <h2>{title}</h2>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? t("loading") : t("action")}
      </button>
    </motion.div>
  );
}
```

---

## Styling & Theming

### Color System

The website uses a professional **Slate** color palette with CSS variables:

```css
/* Light Mode */
:root {
  --background: #ffffff;           /* Pure white background */
  --foreground: #0f172a;           /* Deep slate text */
  --card: #f8fafc;                 /* Light card background */
  --card-foreground: #0f172a;      /* Card text */
  --primary: #475569;              /* Primary slate */
  --primary-foreground: #f8fafc;   /* Text on primary */
  --secondary: #f1f5f9;            /* Secondary background */
  --secondary-foreground: #1e293b; /* Secondary text */
  --muted: #f1f5f9;                /* Muted background */
  --muted-foreground: #64748b;     /* Muted text */
  --accent: #3b82f6;               /* Blue accent */
  --accent-foreground: #ffffff;    /* Text on accent */
  --border: #e2e8f0;               /* Border color */
  --input: #e2e8f0;                /* Input border */
  --ring: #3b82f6;                 /* Focus ring */
}

/* Dark Mode */
.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
  --card: #1e293b;
  --card-foreground: #f8fafc;
  /* ... other dark mode colors */
}
```

### Custom Utility Classes

```css
/* Glass Morphism */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #001a66 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Custom Scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
```

### Dark Mode Implementation

The site uses `next-themes` for theme management:

```typescript
// components/theme-toggle.tsx
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle Theme
    </button>
  );
}
```

### Responsive Breakpoints

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops, small desktops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

**Usage Example:**

```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

---

## AI Chat Assistant

### Overview

The AI Chat Assistant is powered by OpenAI's GPT-4o-mini model and provides intelligent responses about AfriDev's services, team, and capabilities.

### Architecture

```
┌─────────────────┐
│  ChatButton.tsx │  ← Floating button (bottom-right)
└────────┬────────┘
         │ Opens
         ▼
┌─────────────────┐
│ ChatWindow.tsx  │  ← Main chat interface
│  ├─ Header      │
│  ├─ Messages    │  ← ChatMessage.tsx (individual messages)
│  ├─ Input       │  ← ChatInput.tsx
│  └─ Actions     │  ← QuickActions.tsx
└────────┬────────┘
         │ Uses
         ▼
┌─────────────────┐
│   useChat.ts    │  ← Custom hook (state management)
└────────┬────────┘
         │ Calls
         ▼
┌─────────────────┐
│ /api/chat/route │  ← API endpoint
│  ├─ Validation  │
│  ├─ Rate Limit  │
│  └─ OpenAI API  │
└─────────────────┘
```

### Configuration

#### API Route (`app/api/chat/route.ts`)

**Key Features:**
- Rate limiting (10 requests/minute per IP)
- Message validation (max 2000 characters)
- Conversation history (last 10 messages)
- Error handling with specific error messages
- 30-second timeout protection

**Environment Variables:**

```env
OPENAI_API_KEY=sk-proj-...your-key-here
```

#### Chat Hook (`hooks/useChat.ts`)

**Features:**
- Persistent chat history (localStorage)
- Automatic message management
- Error handling
- Loading states

**Usage:**

```typescript
const {
  messages,
  isLoading,
  error,
  sendMessage,
  clearHistory,
} = useChat();
```

### Customizing Chat Behavior

#### Modify System Prompt

Edit `app/api/chat/route.ts`:

```typescript
const AFRIDEV_SYSTEM_PROMPT = `You are the official AI assistant for AfriDev...
// Add your custom instructions here
`;
```

#### Add Quick Actions

Edit `types/chat.ts`:

```typescript
export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  {
    id: "services",
    label: "What services do you offer?",
    icon: "💼",
  },
  // Add more quick actions
];
```

#### Customize Rate Limits

Edit `app/api/chat/route.ts`:

```typescript
const RATE_LIMIT = 10;          // Requests per window
const RATE_WINDOW = 60000;      // Window duration (ms)
const MAX_MESSAGE_LENGTH = 2000; // Max characters
```

---

## API Routes

### Available Endpoints

#### `POST /api/chat`

**Description:** AI chat endpoint for the chat assistant

**Request Body:**

```json
{
  "message": "What services do you offer?",
  "history": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help you?"
    }
  ]
}
```

**Response (Success):**

```json
{
  "response": "AfriDev offers full-stack development, mobile apps..."
}
```

**Response (Error):**

```json
{
  "error": "Rate limit exceeded. Please try again later."
}
```

**Status Codes:**

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Bad request (invalid input) |
| `429` | Rate limit exceeded |
| `500` | Server error |
| `503` | Network error (OpenAI unavailable) |
| `504` | Request timeout |

### Security Features

1. **Rate Limiting**: 10 requests per minute per IP
2. **Input Validation**: Message length and format checks
3. **History Limits**: Max 20 messages, only last 10 sent to AI
4. **Timeout Protection**: 30-second request timeout
5. **Error Sanitization**: No sensitive data in error messages

---

## Build & Deployment

### Building for Production

1. **Create optimized build**

```bash
npm run build
```

This generates:
- Optimized JavaScript bundles
- Static HTML pages
- Compressed assets
- Source maps (for debugging)

2. **Test production build locally**

```bash
npm start
```

Visit `http://localhost:3000` to test the production build.

### Deployment Options

#### Option 1: Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Add environment variables:
   - `OPENAI_API_KEY`
4. Deploy!

**Vercel automatically handles:**
- Automatic deployments on push
- Preview deployments for PRs
- Edge functions for API routes
- Image optimization
- Analytics

#### Option 2: Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

**Build and run:**

```bash
docker build -t afridev .
docker run -p 3000:3000 -e OPENAI_API_KEY=your_key afridev
```

#### Option 3: Traditional Hosting (VPS)

```bash
# On your server
git clone https://github.com/your-username/afridev.git
cd afridev
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "afridev" -- start
pm2 save
pm2 startup
```

### Environment Variables for Production

```env
# Required
OPENAI_API_KEY=sk-proj-...

# Optional
GOOGLE_GENAI_API_KEY=...
NODE_ENV=production
```

### Performance Optimization

**Implemented optimizations:**

1. **Server Components** - Default for all components
2. **Image Optimization** - Next.js Image component
3. **Font Optimization** - System fonts with fallbacks
4. **Code Splitting** - Automatic route-based splitting
5. **Lazy Loading** - Dynamic imports for heavy components
6. **Minification** - CSS and JS minification
7. **Compression** - Gzip/Brotli compression

**Lighthouse Scores (Target):**

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## Testing & Quality

### Code Quality Tools

#### ESLint Configuration

```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

**ESLint Rules:** Configured in `eslint.config.mjs`

#### TypeScript Type Checking

```bash
# Check for type errors
npx tsc --noEmit
```

### Debugging

#### Development Tools

1. **React Developer Tools**
   - Install: [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

2. **Next.js Debug Mode**

```bash
NODE_OPTIONS='--inspect' npm run dev
```

Open `chrome://inspect` in Chrome to debug.

#### Common Issues & Solutions

See [Troubleshooting](#troubleshooting) section below.

---

## Troubleshooting

### Common Issues

#### 1. AI Chat Not Working

**Symptoms:**
- Chat button doesn't respond
- "Network error" messages
- Timeout errors

**Solutions:**

**Check API Key**
```bash
# Verify .env.local exists and has valid key
cat .env.local
```

**Test OpenAI API directly**
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Check rate limits**
- Wait 1 minute and try again
- Check OpenAI dashboard for quota

**Verify network connection**
```bash
ping api.openai.com
```

#### 2. Translations Not Loading

**Symptoms:**
- Missing text
- English text in other languages
- `[object Object]` displayed

**Solutions:**

**Verify translation files exist**
```bash
ls -la messages/
# Should show: en.json, am.json, om.json
```

**Check JSON syntax**
```bash
# Validate JSON
cat messages/en.json | jq .
```

**Clear Next.js cache**
```bash
rm -rf .next
npm run dev
```

#### 3. Build Errors

**Symptoms:**
- `npm run build` fails
- TypeScript errors
- Module not found errors

**Solutions:**

**Clean install dependencies**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Check Node.js version**
```bash
node --version  # Should be 18.x or higher
```

**Fix TypeScript errors**
```bash
npx tsc --noEmit
```

#### 4. Styling Issues

**Symptoms:**
- Styles not applying
- Dark mode not working
- Tailwind classes not working

**Solutions:**

**Rebuild Tailwind**
```bash
rm -rf .next
npm run dev
```

**Check theme provider**
- Ensure `ThemeProvider` wraps your app in `layout.tsx`

**Verify Tailwind config**
```bash
cat tailwind.config.js
```

#### 5. Performance Issues

**Symptoms:**
- Slow page loads
- Laggy animations
- High memory usage

**Solutions:**

**Optimize images**
- Use Next.js `<Image>` component
- Compress images before upload
- Use WebP format

**Reduce bundle size**
```bash
# Analyze bundle
npm run build
# Check .next/analyze/ folder
```

**Use production build**
```bash
npm run build && npm start
# Don't use dev mode in production
```

### Getting Help

If you're still stuck:

1. **Check the logs**
   - Browser console (F12)
   - Terminal output
   - Network tab (F12 → Network)

2. **Search existing issues**
   - GitHub Issues
   - Next.js discussions
   - Stack Overflow

3. **Create a detailed bug report**
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/error messages
   - Environment details (OS, Node version, browser)

---

## Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Motion Documentation](https://motion.dev/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [OpenAI API Documentation](https://platform.openai.com/docs)

### Learning Resources

- [Next.js Learn Course](https://nextjs.org/learn)
- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)

### Useful Tools

- [Vercel](https://vercel.com/) - Deployment platform
- [Figma](https://www.figma.com/) - Design tool
- [Postman](https://www.postman.com/) - API testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing

### Design Resources

- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- [Lucide Icons](https://lucide.dev/) - Icon library (used in this project)
- [Coolors](https://coolors.co/) - Color palette generator
- [Google Fonts](https://fonts.google.com/) - Free fonts

---

## Team

Meet the talented developers behind AfriDev:

| Name | Role | Status | Links |
|------|------|--------|-------|
| **Tamirat K.** | Senior Full-Stack Developer | Top Rated (100% Job Success) | [LinkedIn](#) • [GitHub](#) |
| **Tolosa M.** | Full-Stack Developer & AI Specialist | Rising Talent (100% Job Success) | [LinkedIn](#) • [GitHub](#) |
| **Abdi E.** | Mobile & Backend Developer | Top Rated (100% Job Success) | [LinkedIn](#) • [GitHub](#) |

### Our Achievements

- **88+ Projects Completed**
- **100% Client Satisfaction**
- **15+ Countries Served**
- **99.9% Average Uptime**

---

## Contact

### Business Inquiries

- **Email**: [contact@afridev.com](mailto:contact@afridev.com)
- **Website**: [afridev.com](https://afridev.com)
- **Upwork**: [Hire us on Upwork](https://www.upwork.com/agencies/1937186981697230253/)
- **Video**: [Watch our intro](https://youtu.be/DOEM7pu9shU)

### Social Media

- LinkedIn: [AfriDev Agency](#)
- Twitter: [@afridev](#)
- Facebook: [AfriDev](#)
- Instagram: [@afridev](#)

### Collaboration

We're always open to:
- New project opportunities
- Partnership discussions
- Innovative ideas
- Mentorship opportunities

**Free 30-minute consultation available!** [Book now →](mailto:contact@afridev.com)

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 AfriDev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgments

Special thanks to:

- **Next.js Team** - For the amazing framework
- **Vercel** - For hosting and deployment platform
- **OpenAI** - For AI capabilities
- **Motion Team** - For beautiful animations
- **next-intl Contributors** - For internationalization support
- **Tailwind Labs** - For the utility-first CSS framework
- **Our Clients** - For trusting us with their projects

---

## What's Next?

### Upcoming Features

- [ ] Blog section with MDX support
- [ ] Admin dashboard for content management
- [ ] Analytics integration (Google Analytics, Plausible)
- [ ] Newsletter subscription
- [ ] Live chat support (WebSocket)
- [ ] Video testimonials section
- [ ] More language support (French, Spanish, Arabic)
- [ ] Authentication system
- [ ] Progressive Web App (PWA) support
- [ ] A/B testing framework

### Known Issues

- [ ] Chat history not syncing across devices (localStorage limitation)
- [ ] Dark mode flash on initial load (theme hydration)
- [ ] Mobile keyboard pushes chat window up (iOS Safari)

### Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Contribution Guidelines:**
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

<div align="center">

### Star us on GitHub!

If you find this project useful, please consider giving it a star

**Built with care by the AfriDev Team**

[Home](https://afridev.com) • [Contact](mailto:contact@afridev.com) • [Hire Us](https://www.upwork.com/agencies/1937186981697230253/)

---

*Last Updated: January 2026*

</div>
