"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const testimonials = [
  {
    quote:
      "I stopped losing track of which recruiter I'd already followed up with. The pipeline view alone was worth switching for.",
    name: "Farhana Akter",
    role: "Frontend Developer, job searching",
  },
  {
    quote:
      "The match explanations actually taught me what to emphasize on my resume for different roles.",
    name: "Rahat Hossain",
    role: "Backend Developer, job searching",
  },
  {
    quote:
      "Practicing with the interview assistant before a call made the real thing feel like round two, not round one.",
    name: "Nusrat Jahan",
    role: "Full Stack Developer, job searching",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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

function TiltTestimonialCard({ t }: { t: typeof testimonials[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const glareOpacity = useTransform(x, [-0.5, 0, 0.5], [0, 0.06, 0]);

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

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden cursor-default"
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
          background: "linear-gradient(135deg, rgba(255,255,255,0.08), transparent)",
          opacity: glareOpacity,
        }}
      />
      <div className="relative">
        <div className="mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 400 }}
              className="inline-block text-sm"
              style={{ color: "var(--cp-accent)" }}
            >
              ★
            </motion.span>
          ))}
        </div>
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--cp-text)" }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
        <div>
          <p className="text-sm font-medium">{t.name}</p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--cp-text-faint)" }}
          >
            {t.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
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
            From the pipeline
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Built for people mid-search.
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((t) => (
            <TiltTestimonialCard key={t.name} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
