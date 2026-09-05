"use client";

import { motion } from "framer-motion";
import {
  IoSparklesOutline,
  IoChatbubbleEllipsesOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function AISpotlight() {
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
            style={{ color: "var(--cp-teal)" }}
          >
            The copilot, in detail
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Two AI systems, one job search.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-2xl relative overflow-hidden"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: "var(--cp-accent)" }}
            />
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: "var(--cp-accent-dim)" }}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <IoSparklesOutline size={20} style={{ color: "var(--cp-accent)" }} />
            </motion.div>
            <h3 className="font-display text-xl font-semibold mb-2">
              Smart match engine
            </h3>
            <p className="text-sm mb-5" style={{ color: "var(--cp-text-muted)" }}>
              Every saved role gets a match score against your resume, with a
              plain-language reason behind it.
            </p>
            <motion.ul
              className="flex flex-col gap-2.5"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Scores each role against your actual skills",
                "Explains the match — not just a number",
                "Refines as you mark roles interested or not",
              ].map((point) => (
                <motion.li
                  key={point}
                  variants={listItemVariants}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "var(--cp-text-muted)" }}
                >
                  <IoCheckmarkCircle
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--cp-accent)" }}
                  />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-2xl relative overflow-hidden"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: "var(--cp-teal)" }}
            />
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: "var(--cp-teal-dim)" }}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <IoChatbubbleEllipsesOutline
                size={20}
                style={{ color: "var(--cp-teal)" }}
              />
            </motion.div>
            <h3 className="font-display text-xl font-semibold mb-2">
              Interview prep assistant
            </h3>
            <p className="text-sm mb-5" style={{ color: "var(--cp-text-muted)" }}>
              A chat assistant that knows which role you&apos;re prepping for and
              remembers the conversation.
            </p>
            <motion.ul
              className="flex flex-col gap-2.5"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Generates questions specific to each saved role",
                "Keeps context across a multi-turn conversation",
                "Suggests follow-up prompts to go deeper",
              ].map((point) => (
                <motion.li
                  key={point}
                  variants={listItemVariants}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "var(--cp-text-muted)" }}
                >
                  <IoCheckmarkCircle
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--cp-teal)" }}
                  />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
