"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

export default function FinalCTA() {
  const { data: session } = authClient.useSession();

  if (session) return null;

  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
        style={{
          background: "var(--cp-surface)",
          border: "1px solid var(--cp-border)",
        }}
      >
        <div className="gradient-border-animated absolute inset-0 rounded-3xl pointer-events-none" />

        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: "var(--cp-teal)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[300px] h-[150px] rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "var(--cp-accent)" }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Your next offer starts with one saved role.
          </h2>
          <p
            className="text-sm mt-4 max-w-md mx-auto"
            style={{ color: "var(--cp-text-muted)" }}
          >
            Free to start. No credit card, no spreadsheet.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-medium mt-8 glow-pulse btn-press"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            Get started free
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <IoArrowForward size={16} />
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
