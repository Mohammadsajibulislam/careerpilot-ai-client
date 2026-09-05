"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 4, suffix: "", label: "Pipeline stages tracked" },
  { value: 2, suffix: "", label: "AI systems built in" },
  { value: 100, suffix: "%", label: "Data private to you" },
  { value: 0, suffix: "", label: "Spreadsheets required" },
];

function StatItem({ value, suffix, label, index }: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const { ref, count } = useCountUp(value, 2000, suffix);

  return (
    <motion.div
      ref={ref}
      className="text-center md:text-left"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <motion.p
        className="font-display text-4xl font-semibold gradient-text-accent counter-glow"
        whileInView={{
          textShadow: [
            "0 0 0px var(--cp-accent-dim)",
            "0 0 20px var(--cp-accent-dim)",
            "0 0 0px var(--cp-accent-dim)",
          ],
        }}
        viewport={{ once: true }}
        transition={{ duration: 2, repeat: 1 }}
      >
        {count}
      </motion.p>
      <p className="text-sm mt-2" style={{ color: "var(--cp-text-muted)" }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function Statistics() {
  return (
    <section
      className="px-6 py-16 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat, i) => (
          <StatItem key={stat.label} {...stat} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
