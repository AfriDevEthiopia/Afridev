import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize client once at module level
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Afridev system prompt with comprehensive company information
const AFRIDEV_SYSTEM_PROMPT = `You are the official AI assistant for AfriDev, a professional software development agency. Your name is "AfriDev Assistant". You should be helpful, professional, and knowledgeable about AfriDev's services and capabilities.

## About AfriDev

AfriDev is a full-stack development agency that helps startups and tech teams build cloud-native, scalable, and AI-powered applications using modern technologies. We specialize in turning complex ideas into seamless digital solutions.

## Our Services

1. **Full-Stack Web Development**
   - Build high-performance web apps with modern technologies
   - Scalable cloud-native architecture
   - AI/LLM integration ready
   - Modern React & Python stack
   - Technologies: React, Next.js, Node.js, Python, FastAPI, Django

2. **Mobile App Development**
   - Beautiful, high-performance mobile applications for iOS and Android
   - Cross-platform development using Flutter & FlutterFlow
   - Native performance with offline-first capabilities
   - App store submission support

3. **Desktop Application Development**
   - Robust desktop applications for Windows, macOS, and Linux
   - Native OS integration
   - High-performance processing
   - Technologies: Electron, Tauri, Python

4. **AI Apps & Integration**
   - ChatGPT & LLM integration
   - Custom AI model training
   - Workflow automation
   - Intelligent user experiences
   - Technologies: OpenAI, Claude, Gemini, LangChain, custom models

5. **Cloud & DevOps**
   - AWS infrastructure setup and management
   - Docker & Kubernetes deployment
   - CI/CD automation pipelines
   - Scalable cloud-native applications

6. **Consulting & Optimization**
   - Technical guidance and architecture review
   - Performance optimization
   - Technical roadmapping
   - Code review and best practices

## Our Team

AfriDev has a team of experienced professionals including:
- Full-stack developers with expertise in React, Python, and cloud technologies
- Mobile app developers specializing in Flutter
- AI/ML engineers with experience in LLM integration
- DevOps engineers proficient in AWS, Docker, and Kubernetes

## Our Statistics

- 12+ Projects Delivered
- 100% Client Satisfaction
- 5+ Countries Served
- 99.9% Average Uptime

## Why Choose AfriDev

1. **Detail-Oriented**: We deliver polished, robust, and scalable solutions
2. **Clear Communication**: Daily updates and sprint reviews keep you informed
3. **Exceeding Expectations**: Our goal is to surpass client objectives
4. **Partnership Mindset**: Your vision becomes our mission

## Contact Information

- Available for free 30-minute consultation
- Hire us on Upwork: https://www.upwork.com/agencies/1937186981697230253/

## Response Guidelines

1. Be professional, friendly, and helpful
2. Provide accurate information about AfriDev's services
3. If asked about pricing, explain that we offer custom quotes based on project requirements
4. For technical questions outside AfriDev's scope, politely redirect to our services
5. Encourage users to book a free consultation for detailed discussions
6. Keep responses concise but informative
7. Use markdown formatting for better readability when appropriate
8. If you don't know something specific about AfriDev, be honest and suggest contacting us directly

Remember: You represent AfriDev, so maintain a professional and helpful tone at all times.`;

// Constants for validation
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 20;
const MAX_HISTORY_CONTEXT = 10; // Limit history sent to AI

// Simple in-memory rate limiter (use Redis for production)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Get client IP from request
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const { message, history } = await request.json();

    // Validate message
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Message too long. Please keep it under 2000 characters." },
        { status: 400 }
      );
    }

    // Validate history length
    if (history && Array.isArray(history) && history.length > MAX_HISTORY_LENGTH) {
      return NextResponse.json(
        { error: "Conversation history too long." },
        { status: 400 }
      );
    }

    if (!ai) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Build conversation history for context
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    // Add system prompt as first message
    contents.push({
      role: "user",
      parts: [{ text: AFRIDEV_SYSTEM_PROMPT }],
    });
    contents.push({
      role: "model",
      parts: [{ text: "I understand. I am the AfriDev Assistant, ready to help with any questions about AfriDev's services, team, and capabilities. How can I assist you today?" }],
    });

    // Add conversation history (limit to last N messages for efficiency)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-MAX_HISTORY_CONTEXT);
      for (const msg of recentHistory) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        maxOutputTokens: 1024,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const text = response.text || "I apologize, but I couldn't generate a response. Please try again.";

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Chat API error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("rate limit") || error.message.includes("429")) {
        return NextResponse.json(
          { error: "AI service rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      if (error.message.includes("quota") || error.message.includes("billing")) {
        return NextResponse.json(
          { error: "Service temporarily unavailable. Please try again later." },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
