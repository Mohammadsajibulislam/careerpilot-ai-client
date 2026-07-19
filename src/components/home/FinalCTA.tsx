"use client";

import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

export default function FinalCTA() {
  const { data: session } = authClient.useSession();

  if (session) return null; // logged-in user has already converted

  return (
    <section className="px-6 py-24">
      <div
        className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
        style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: "var(--cp-teal)" }}
        />
        <div className="relative">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Your next offer starts with one saved role.
          </h2>
          <p className="text-sm mt-4 max-w-md mx-auto" style={{ color: "var(--cp-text-muted)" }}>
            Free to start. No credit card, no spreadsheet.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium mt-8"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            Get started free
            <IoArrowForward size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}