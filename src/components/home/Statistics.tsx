"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 4, suffix: "", label: "Pipeline stages tracked" },
  { value: 2, suffix: "", label: "AI systems built in" },
  { value: 100, suffix: "%", label: "Data private to you" },
  { value: 0, suffix: "", label: "Spreadsheets required" },
];

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, count } = useCountUp(value, 2000, suffix);

  return (
    <div ref={ref} className="text-center md:text-left">
      <p
        className="font-display text-4xl font-semibold gradient-text-accent"
      >
        {count}
      </p>
      <p className="text-sm mt-2" style={{ color: "var(--cp-text-muted)" }}>
        {label}
      </p>
    </div>
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
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </motion.div>
    </section>
  );
}
