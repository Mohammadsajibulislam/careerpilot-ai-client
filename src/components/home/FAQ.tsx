"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";

const faqs = [
  {
    question: "Is CareerPilot free to use?",
    answer:
      "Yes. Signing up, saving roles, and using the AI match engine are all free while the project is in active development.",
  },
  {
    question: "How does the match score work?",
    answer:
      "When you save a role, the AI compares its requirements against your resume and skills, then returns a score along with a plain-language explanation of why it fits.",
  },
  {
    question: "Can I try it without creating an account?",
    answer:
      "Yes — the job listings page is publicly browsable. You'll need an account to save roles, track your pipeline, or use the interview prep assistant.",
  },
  {
    question: "Is my resume and application data private?",
    answer:
      "Your pipeline, resume, and notes are visible only to your account. Nothing is shared publicly or with other users.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="px-6 py-20 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
            Questions
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Frequently asked.
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                variants={{
                  hidden: { opacity: 0, y: 16, filter: "blur(2px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
                }}
                className="rounded-xl overflow-hidden"
                style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="shrink-0 ml-4"
                  >
                    <IoChevronDown size={16} style={{ color: "var(--cp-text-faint)" }} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-4">
                        <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
