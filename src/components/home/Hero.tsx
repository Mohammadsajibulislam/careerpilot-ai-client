"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IoArrowForward, IoSparklesOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.12 },
  },
};

const pillMotion = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 1.2 + delay, duration: 0.5 },
  }),
};

const floatingPills = [
  { text: "AI Matching", x: "-20%", y: "15%", delay: 0.2 },
  { text: "Smart Pipeline", x: "20%", y: "10%", delay: 0.6 },
  { text: "Interview Prep", x: "-15%", y: "60%", delay: 0.4 },
  { text: "Cover Letters", x: "18%", y: "55%", delay: 0.8 },
];

export default function Hero() {
  const { data: session } = authClient.useSession();

  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--cp-accent)" }}
      />

      <motion.div
        className="relative max-w-4xl mx-auto text-center"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-label uppercase mb-6"
          style={{
            background: "var(--cp-surface)",
            border: "1px solid var(--cp-border)",
            color: "var(--cp-accent)",
          }}
        >
          <IoSparklesOutline size={14} />
          AI-powered job search
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="font-display text-4xl md:text-6xl font-semibold leading-[1.1] max-w-3xl mx-auto"
        >
          Your job search,{" "}
          <span style={{ color: "var(--cp-accent)" }}>flown by a copilot</span>
          , not a spreadsheet.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-base md:text-lg mt-6 max-w-xl mx-auto"
          style={{ color: "var(--cp-text-muted)" }}
        >
          Save roles, get AI-matched recommendations, and walk into every interview prepared — all from one pipeline that remembers where you left off.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
        >
          {session ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium"
              style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
            >
              Continue to dashboard
              <IoArrowForward size={16} />
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium"
                style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
              >
                Get started free
                <IoArrowForward size={16} />
              </Link>
              <Link
                href="/jobs"
                className="px-6 py-3 rounded-lg text-sm font-medium"
                style={{
                  background: "var(--cp-surface)",
                  border: "1px solid var(--cp-border)",
                  color: "var(--cp-text)",
                }}
              >
                Browse jobs
              </Link>
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
              {pill.text}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
