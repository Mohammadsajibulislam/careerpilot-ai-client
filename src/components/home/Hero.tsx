"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { IoArrowForward, IoSparklesOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

const stagger = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const wordReveal = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const pillMotion = {
  initial: { opacity: 0, scale: 0.6, y: 20 },
  animate: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 1.0 + delay, duration: 0.6, type: "spring" as const, stiffness: 200, damping: 15 },
  }),
};

const floatingPills = [
  { text: "AI Matching", x: "-20%", y: "15%", delay: 0.2 },
  { text: "Smart Pipeline", x: "20%", y: "10%", delay: 0.6 },
  { text: "Interview Prep", x: "-15%", y: "60%", delay: 0.4 },
  { text: "Cover Letters", x: "18%", y: "55%", delay: 0.8 },
];

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
}));

function MagneticButton({ children, className, style, href }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        className={className}
        style={style}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function Hero() {
  const { data: session } = authClient.useSession();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heading = "Your job search, flown by a copilot, not a spreadsheet.";
  const words = heading.split(" ");

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--cp-accent)", y: bgY }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ y: bgY }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.id % 3 === 0 ? "var(--cp-teal)" : "var(--cp-accent)",
              opacity: 0.15,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.08, 0.3, 0.08],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="relative max-w-4xl mx-auto text-center"
        variants={stagger}
        initial="initial"
        animate="animate"
        style={{ y: textY, opacity }}
      >
        <motion.div
          variants={wordReveal}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-label uppercase mb-6"
          style={{
            background: "var(--cp-surface)",
            border: "1px solid var(--cp-border)",
            color: "var(--cp-accent)",
          }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <IoSparklesOutline size={14} />
          </motion.span>
          AI-powered job search
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-6xl font-semibold leading-[1.1] max-w-3xl mx-auto"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              variants={wordReveal}
            >
              {word === "copilot," || word === "copilot" ? (
                <span className="gradient-text-accent">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={wordReveal}
          className="text-base md:text-lg mt-6 max-w-xl mx-auto"
          style={{ color: "var(--cp-text-muted)" }}
        >
          Save roles, get AI-matched recommendations, and walk into every
          interview prepared — all from one pipeline that remembers where you
          left off.
        </motion.p>

        <motion.div
          variants={wordReveal}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
        >
          {session ? (
            <MagneticButton
              href="/dashboard"
              className="group flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium btn-press glow-pulse"
              style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
            >
              Continue to dashboard
              <IoArrowForward
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </MagneticButton>
          ) : (
            <>
              <MagneticButton
                href="/signup"
                className="group flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium btn-press glow-pulse"
                style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
              >
                Get started free
                <IoArrowForward
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </MagneticButton>
              <MagneticButton
                href="/jobs"
                className="px-6 py-3 rounded-lg text-sm font-medium btn-press hover:border-[var(--cp-accent)]"
                style={{
                  background: "var(--cp-surface)",
                  border: "1px solid var(--cp-border)",
                  color: "var(--cp-text)",
                }}
              >
                Browse jobs
              </MagneticButton>
            </>
          )}
        </motion.div>
      </motion.div>

      {!session && (
        <div className="hidden md:block relative max-w-4xl mx-auto h-0">
          {floatingPills.map((pill) => (
            <motion.div
              key={pill.text}
              className="absolute text-xs px-3 py-1.5 rounded-full pointer-events-none"
              style={{
                left: `calc(50% + ${pill.x})`,
                top: pill.y,
                background: "var(--cp-surface)",
                border: "1px solid var(--cp-border)",
                color: "var(--cp-text-muted)",
              }}
              custom={pill.delay}
              variants={pillMotion}
              initial="initial"
              animate="animate"
            >
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: pill.delay * 2 }}
              >
                {pill.text}
              </motion.span>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
