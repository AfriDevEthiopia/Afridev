# AfriDev - Agency Website

A modern, animated, and multilingual website for AfriDev - Full Stack Developers | AI, LLM & Automation Experts.

## 🚀 Features

- **Next.js 15** with App Router and Turbopack for blazing-fast development
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS v4** with custom slate color system
- **Motion (Framer Motion)** for smooth scroll animations and micro-interactions
- **next-intl** for internationalization (English, Amharic, Afaan Oromo)
- **Fully Responsive** - Mobile-first design that works on all devices
- **SEO Optimized** - Meta tags, semantic HTML, and performance optimized
- **Clean Architecture** - Decoupled components, organized folder structure

## 🌍 Supported Languages

- 🇬🇧 English (en)
- 🇪🇹 አማርኛ / Amharic (am)
- 🇪🇹 Afaan Oromo (om)

## 📁 Project Structure

```
zds/
├── app/
│   └── [locale]/           # Internationalized routes
│       ├── layout.tsx      # Root layout with i18n
│       └── page.tsx        # Home page
├── components/
│   ├── layout/             # Layout components (Header, Footer)
│   ├── sections/           # Page sections (Hero, Services, etc.)
│   └── ui/                 # Reusable UI components
├── i18n/
│   ├── request.ts          # i18n request configuration
│   └── routing.ts          # Routing configuration
├── lib/
│   ├── constants.ts        # App constants and data
│   └── utils.ts            # Utility functions
├── messages/               # Translation files
│   ├── en.json
│   ├── am.json
│   └── om.json
├── types/
│   └── index.ts            # TypeScript type definitions
└── middleware.ts           # Next.js middleware for i18n
```

## 🛠️ Tech Stack

### Core
- **Next.js 16.0.3** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Animation
- **Motion** - Animation library (successor to Framer Motion)

### Internationalization
- **next-intl** - i18n for Next.js App Router

### Utilities
- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind classes without conflicts
- **react-hook-form** - Form validation

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Color System

The website uses a professional **Slate** color palette:

- **Background**: Clean whites with subtle grays
- **Foreground**: Deep slate tones (#0f172a)
- **Accent**: Modern blue (#3b82f6)
- **Primary**: Slate gray (#475569)
- **Muted**: Light grays for secondary content

Colors automatically adapt to dark mode.

## 📱 Responsive Design

All sections are fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance Features

- Server Components by default
- Optimized images with Next.js Image
- Font optimization with system fonts
- Smooth scroll behavior
- Hardware-accelerated animations
- Code splitting and lazy loading

## 🔧 Configuration

### Add New Translations

1. Edit translation files in `messages/` directory
2. Add new keys following the existing structure
3. Use `useTranslations` hook in components

### Modify Colors

Edit `app/globals.css` to customize the color system:

```css
:root {
  --background: #ffffff;
  --foreground: #0f172a;
  /* ... more variables */
}
```

### Add New Sections

1. Create a new component in `components/sections/`
2. Import and add to `app/[locale]/page.tsx`
3. Add translations to `messages/*.json`

## 📄 License

MIT

## 👥 Team

- **Tamirat K.** - Top Rated (100% Job Success)
- **Tolosa M.** - Rising Talent (100% Job Success)
- **Abdi E.** - Top Rated (100% Job Success)

## 📞 Contact

- **Email**: contact@afridev.com
- **Website**: [afridev.com](https://afridev.com)
- **Video**: [Watch our intro](https://youtu.be/DOEM7pu9shU)

---

Built with ❤️ by AfriDev Team
