"use client";

import { motion } from "framer-motion";
import { IoLogoGithub, IoArrowForward } from "react-icons/io5";

export default function GitHubCTA() {
  return (
    <section
      className="px-6 py-20 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background: "var(--cp-surface)",
            border: "1px solid var(--cp-border)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 20% 50%, var(--cp-accent), transparent 50%), radial-gradient(circle at 80% 50%, var(--cp-teal), transparent 50%)",
            }}
          />

          <div className="relative">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background: "var(--cp-bg)",
                border: "1px solid var(--cp-border)",
              }}
            >
              <IoLogoGithub size={24} style={{ color: "var(--cp-text)" }} />
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
              Open source & public
            </h2>
            <p
              className="text-sm mb-8 max-w-md mx-auto"
              style={{ color: "var(--cp-text-muted)" }}
            >
              Built in public. Every commit, every decision — visible on GitHub.
              Explore the code, suggest improvements, or fork it for your own use.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://github.com/Mohammadsajibulislam/careerpilot-ai-client"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
              >
                <IoLogoGithub size={16} />
                View on GitHub
                <IoArrowForward size={14} />
              </a>
              <a
                href="/about"
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                style={{
                  background: "var(--cp-bg)",
                  border: "1px solid var(--cp-border)",
                  color: "var(--cp-text)",
                }}
              >
                Read the story
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
