"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  IoPhonePortraitOutline,
  IoServerOutline,
  IoCloudOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

const nodes = [
  {
    id: "client",
    label: "Next.js Client",
    sub: "React + TypeScript",
    icon: IoPhonePortraitOutline,
    color: "var(--cp-accent)",
  },
  {
    id: "server",
    label: "Express API",
    sub: "REST + Auth",
    icon: IoServerOutline,
    color: "var(--cp-teal)",
  },
  {
    id: "ai",
    label: "AI Engine",
    sub: "Gemini via OpenRouter",
    icon: IoCloudOutline,
    color: "var(--cp-accent)",
  },
  {
    id: "db",
    label: "MongoDB",
    sub: "App + Auth data",
    icon: IoShieldCheckmarkOutline,
    color: "var(--cp-teal)",
  },
];

function AnimatedLine({ delay }: { delay: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <svg
      ref={ref}
      className="hidden md:block absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 pointer-events-none"
      viewBox="0 0 1000 20"
      preserveAspectRatio="none"
    >
      <motion.line
        x1="120"
        y1="10"
        x2="880"
        y2="10"
        stroke="var(--cp-border)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      />
    </svg>
  );
}

const featureVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ArchitectureDiagram() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="font-mono-label text-xs uppercase"
            style={{ color: "var(--cp-accent)" }}
          >
            Under the hood
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Full-stack, end to end.
          </h2>
        </motion.div>

        <div
          className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "var(--cp-surface)",
            border: "1px solid var(--cp-border)",
          }}
        >
          <AnimatedLine delay={0.2} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {nodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                  className="text-center relative"
                >
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                    style={{
                      background: "var(--cp-bg)",
                      border: `2px solid ${node.color}`,
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: `0 0 24px ${node.color}40`,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon size={24} style={{ color: node.color }} />
                  </motion.div>
                  <h3 className="font-display text-sm font-semibold mb-1">
                    {node.label}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--cp-text-faint)" }}>
                    {node.sub}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: "Rate Limiting", desc: "API protection" },
              { label: "Helmet Headers", desc: "Security headers" },
              { label: "File Upload", desc: "Resume parsing" },
              { label: "Lazy Connect", desc: "Serverless-ready DB" },
            ].map((feat) => (
              <motion.div
                key={feat.label}
                variants={featureVariants}
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-3 rounded-lg text-center"
                style={{
                  background: "var(--cp-bg)",
                  border: "1px solid var(--cp-border-soft)",
                }}
              >
                <p className="text-xs font-medium">{feat.label}</p>
                <p className="text-[10px]" style={{ color: "var(--cp-text-faint)" }}>
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
