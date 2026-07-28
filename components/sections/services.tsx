"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Rocket,
  Smartphone,
  Monitor,
  Bot,
  Cloud,
  Target,
  Check,
  type LucideIcon,
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animations";

const SERVICES: {
  id: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
}[] = [
  {
    id: "fullstack",
    Icon: Rocket,
    title: "Full-Stack Web Development",
    description:
      "Build high-performance web apps with modern technologies. We help startups and tech teams create cloud-native, scalable applications.",
    benefits: [
      "Scalable cloud-native architecture",
      "AI/LLM integration ready",
      "Modern React & Python stack",
    ],
  },
  {
    id: "mobile",
    Icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Create beautiful, high-performance mobile applications for iOS and Android using Flutter & FlutterFlow.",
    benefits: [
      "Cross-platform (iOS & Android)",
      "Native performance",
      "Offline-first capabilities",
    ],
  },
  {
    id: "desktop",
    Icon: Monitor,
    title: "Desktop Application Development",
    description:
      "Build robust desktop applications that run seamlessly across Windows, macOS, and Linux platforms.",
    benefits: [
      "Cross-platform compatibility",
      "Native OS integration",
      "High-performance processing",
    ],
  },
  {
    id: "ai",
    Icon: Bot,
    title: "AI Apps & Integration",
    description:
      "Integrate ChatGPT, custom LLMs, and AI automation into your products for intelligent user experiences.",
    benefits: [
      "ChatGPT & LLM integration",
      "Custom AI model training",
      "Workflow automation",
    ],
  },
  {
    id: "cloud",
    Icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "AWS infrastructure, Docker, Kubernetes, and CI/CD pipelines for scalable cloud-native applications.",
    benefits: [
      "AWS & cloud infrastructure",
      "Docker & Kubernetes",
      "CI/CD automation",
    ],
  },
  {
    id: "consulting",
    Icon: Target,
    title: "Consulting & Optimization",
    description:
      "Technical guidance, performance optimization, and architecture design for modern applications.",
    benefits: [
      "Architecture review",
      "Performance optimization",
      "Technical roadmapping",
    ],
  },
];

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 relative noise-bg">
      <div className="relative container mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isHeaderInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm text-primary mb-3 sm:mb-4"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground"
          >
            Comprehensive solutions for modern digital challenges
          </motion.p>
        </div>

        {/* Services Grid */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {SERVICES.map((service) => (
            <StaggerItem key={service.id} variant="fadeUp">
              <motion.div
                className="group glass rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 h-full flex flex-col"
                whileHover={{
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center mb-4 sm:mb-5">
                  <service.Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                </div>

                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5">
                  {service.description}
                </p>

                <ul className="mt-auto space-y-2.5 sm:space-y-3">
                  {service.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-foreground/90"
                    >
                      <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent-foreground" strokeWidth={3} />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
