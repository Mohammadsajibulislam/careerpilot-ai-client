"use client";

import { motion } from "framer-motion";
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
    x: "0%",
  },
  {
    id: "server",
    label: "Express API",
    sub: "REST + Auth",
    icon: IoServerOutline,
    color: "var(--cp-teal)",
    x: "33%",
  },
  {
    id: "ai",
    label: "AI Engine",
    sub: "Gemini via OpenRouter",
    icon: IoCloudOutline,
    color: "var(--cp-accent)",
    x: "66%",
  },
  {
    id: "db",
    label: "MongoDB",
    sub: "App + Auth data",
    icon: IoShieldCheckmarkOutline,
    color: "var(--cp-teal)",
    x: "100%",
  },
];

export default function ArchitectureDiagram() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="font-mono-label text-xs uppercase"
            style={{ color: "var(--cp-accent)" }}
          >
            Under the hood
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Full-stack, end to end.
          </h2>
        </div>

        <div
          className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "var(--cp-surface)",
            border: "1px solid var(--cp-border)",
          }}
        >
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px" style={{ background: "var(--cp-border)" }} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {nodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="text-center relative"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                    style={{
                      background: "var(--cp-bg)",
                      border: `2px solid ${node.color}`,
                    }}
                  >
                    <Icon size={24} style={{ color: node.color }} />
                  </div>
                  <h3 className="font-display text-sm font-semibold mb-1">
                    {node.label}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--cp-text-faint)" }}>
                    {node.sub}
                  </p>
                  {i < nodes.length - 1 && (
                    <div
                      className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px"
                      style={{ background: "var(--cp-border)" }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Rate Limiting", desc: "API protection" },
              { label: "Helmet Headers", desc: "Security headers" },
              { label: "File Upload", desc: "Resume parsing" },
              { label: "Lazy Connect", desc: "Serverless-ready DB" },
            ].map((feat) => (
              <div
                key={feat.label}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
