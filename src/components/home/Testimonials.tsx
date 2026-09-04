"use client";

import { motion } from "framer-motion";

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Testimonials() {
  return (
    <section
      className="px-6 py-20 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl flex flex-col justify-between transition-shadow duration-200 hover:shadow-lg hover:shadow-[var(--cp-accent)]/5"
              style={{
                background: "var(--cp-surface)",
                border: "1px solid var(--cp-border)",
              }}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
