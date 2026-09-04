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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
        style={{
          background: "var(--cp-surface)",
          border: "1px solid var(--cp-border)",
        }}
      >
        <div className="gradient-border-animated absolute inset-0 rounded-3xl pointer-events-none" />

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: "var(--cp-teal)" }}
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
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium mt-8 transition-all duration-200 hover:shadow-lg hover:shadow-[var(--cp-accent)]/20"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            Get started free
            <IoArrowForward
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
