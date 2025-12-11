# AfriDev Website - Deployment Guide

## 📋 Table of Contents
- [Quick Start](#quick-start)
- [Development](#development)
- [Production Build](#production-build)
- [Deployment Options](#deployment-options)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 💻 Development

### Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### File Structure
```
zds/
├── app/[locale]/          # Internationalized routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, Services, Portfolio, etc.
│   └── ui/                # Reusable UI components
├── i18n/                  # Internationalization config
├── lib/                   # Utilities and constants
├── messages/              # Translation files (en, am, om)
└── proxy.ts               # i18n proxy (formerly middleware.ts)
```

## 🏗️ Production Build

### Build the Application
```bash
npm run build
```

This will:
- Compile TypeScript
- Generate optimized bundles
- Create static pages for all locales
- Output to `.next` directory

### Test Production Build Locally
```bash
npm run build
npm start
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- Global CDN
- Preview deployments

**Steps:**
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Option 2: Netlify

**netlify.toml**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**Steps:**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Deploy

### Option 3: Docker

**Dockerfile**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

**Build and Run:**
```bash
docker build -t afridev-website .
docker run -p 3000:3000 afridev-website
```

### Option 4: VPS (DigitalOcean, AWS EC2, etc.)

**Using PM2:**
```bash
# Install PM2 globally
npm install -g pm2

# Build the app
npm run build

# Start with PM2
pm2 start npm --name "afridev-website" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔐 Environment Variables

Create `.env.local` for local development:

```env
# Optional: Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX

# Optional: Contact Form API
CONTACT_FORM_API_URL=https://api.example.com/contact

# Optional: Custom Domain
NEXT_PUBLIC_SITE_URL=https://afridev.com
```

**For Production:**
Set these in your hosting platform's environment variables section.

## 🔧 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

### DNS Records Example
```
Type    Name    Value               TTL
A       @       <your-server-ip>    3600
CNAME   www     @                   3600
```

## 📊 Performance Optimization

### Recommendations Applied
- ✅ Image optimization with Next.js Image
- ✅ Code splitting and lazy loading
- ✅ Server Components by default
- ✅ Hardware-accelerated animations
- ✅ Font optimization
- ✅ Static generation for all pages

### Further Optimizations
```bash
# Analyze bundle size
npm run build
# Check .next/analyze/ for bundle breakdown

# Enable experimental features in next.config.ts
experimental: {
  optimizeCss: true,
  optimizePackageImports: ['motion', 'clsx'],
}
```

## 🐛 Troubleshooting

### Build Fails

**Issue:** TypeScript errors
```bash
# Check for type errors
npx tsc --noEmit

# Fix automatically where possible
npm run lint --fix
```

**Issue:** Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Runtime Issues

**Issue:** Animations not working
- Check if Motion is properly installed
- Verify browser supports CSS transforms
- Check browser console for errors

**Issue:** Translations not loading
- Verify JSON files in `messages/` folder
- Check locale routing in proxy
- Ensure `next-intl` is configured correctly

### Performance Issues

```bash
# Analyze bundle
npm run build

# Check for large dependencies
npx @next/bundle-analyzer
```

## 📈 Monitoring

### Recommended Tools
- **Vercel Analytics** - Built-in performance monitoring
- **Google Analytics** - User behavior tracking
- **Sentry** - Error tracking
- **Lighthouse** - Performance audits

### Performance Metrics to Monitor
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1

## 🔄 Updates and Maintenance

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest
```

### Security Updates
```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix
```

## 📞 Support

For deployment issues or questions:
- **Email:** contact@afridev.com
- **Documentation:** [Next.js Deployment](https://nextjs.org/docs/deployment)
- **Repository:** Check the GitHub issues

---

**Last Updated:** December 10, 2025

