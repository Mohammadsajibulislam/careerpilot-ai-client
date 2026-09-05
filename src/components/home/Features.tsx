"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  IoGridOutline,
  IoTrendingUpOutline,
  IoFilterOutline,
  IoNotificationsOutline,
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

const features = [
  {
    icon: IoGridOutline,
    title: "Kanban pipeline",
    description:
      "Every application moves through Saved, Applied, Interview, and Offer — visually, in one board.",
  },
  {
    icon: IoTrendingUpOutline,
    title: "Application analytics",
    description:
      "See response rates and time-to-interview across every role you've tracked.",
  },
  {
    icon: IoFilterOutline,
    title: "Smart filtering",
    description:
      "Sort saved roles by match score, salary, location, or how recently you applied.",
  },
  {
    icon: IoNotificationsOutline,
    title: "Stage reminders",
    description:
      "Know when a role has gone quiet, so nothing slips through the cracks.",
  },
  {
    icon: IoDocumentTextOutline,
    title: "Resume-aware matching",
    description:
      "Upload your resume once — every recommendation is scored against it.",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Private by default",
    description:
      "Your resume, notes, and pipeline are visible only to you.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function TiltCard({ feature }: { feature: typeof features[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glareOpacity = useTransform(x, [-0.5, 0, 0.5], [0, 0.08, 0]);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="p-6 rounded-2xl relative overflow-hidden cursor-default"
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "var(--cp-surface)",
          border: "1px solid var(--cp-border)",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)",
          opacity: glareOpacity,
        }}
      />
      <div className="relative">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
          style={{ background: "var(--cp-accent-dim)" }}
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
            transition={{ duration: 0.4 }}
          >
            <Icon size={18} style={{ color: "var(--cp-accent)" }} />
          </motion.div>
        </div>
        <h3 className="font-display text-base font-semibold mb-2">
          {feature.title}
        </h3>
        <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section
      className="px-6 py-20 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-14"
        >
          <p
            className="font-mono-label text-xs uppercase"
            style={{ color: "var(--cp-accent)" }}
          >
            Built for the search
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Everything a spreadsheet couldn&apos;t do.
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <TiltCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
