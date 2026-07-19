"use client";

import Link from "next/link";
import { IoArrowForward, IoSparklesOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

export default function Hero() {
  const { data: session } = authClient.useSession();

  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      {/* ambient background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--cp-accent)" }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-label uppercase mb-6"
          style={{
            background: "var(--cp-surface)",
            border: "1px solid var(--cp-border)",
            color: "var(--cp-accent)",
          }}
        >
          <IoSparklesOutline size={14} />
          AI-powered job search
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.1] max-w-3xl mx-auto">
          Your job search,{" "}
          <span style={{ color: "var(--cp-accent)" }}>flown by a copilot</span>
          , not a spreadsheet.
        </h1>

        <p
          className="text-base md:text-lg mt-6 max-w-xl mx-auto"
          style={{ color: "var(--cp-text-muted)" }}
        >
          Save roles, get AI-matched recommendations, and walk into every interview prepared — all from one pipeline that remembers where you left off.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          {session ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium"
              style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
            >
              Continue to dashboard
              <IoArrowForward size={16} />
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium"
                style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
              >
                Get started free
                <IoArrowForward size={16} />
              </Link>
              <Link
                href="/jobs"
                className="px-6 py-3 rounded-lg text-sm font-medium"
                style={{
                  background: "var(--cp-surface)",
                  border: "1px solid var(--cp-border)",
                  color: "var(--cp-text)",
                }}
              >
                Browse jobs
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}