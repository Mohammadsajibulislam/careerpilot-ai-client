"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IoSparklesOutline, IoCheckmarkCircle, IoAlertCircleOutline, IoRefreshOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import { generateMatch, fetchExistingMatch } from "@/lib/api/match";
import { MatchResult } from "@/types/match";

export default function MatchScoreCard({ jobId }: { jobId: string }) {
  const { data: session } = authClient.useSession();
  const [match, setMatch] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) {
      setChecking(false);
      return;
    }
    (async () => {
      const existing = await fetchExistingMatch(jobId).catch(() => null);
      setMatch(existing);
      setChecking(false);
    })();
  }, [jobId, session]);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await generateMatch(jobId);
      setMatch(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div
        className="p-6 rounded-2xl text-center"
        style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
      >
        <IoSparklesOutline size={22} style={{ color: "var(--cp-accent)" }} className="mx-auto mb-3" />
        <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
          Sign in to see your AI match score for this role.
        </p>
      </div>
    );
  }

  if (checking) {
    return <div className="h-32 rounded-2xl animate-pulse" style={{ background: "var(--cp-surface)" }} />;
  }

  return (
    <div
      className="p-6 rounded-2xl"
      style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
          AI match score
        </p>
        {match && (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-1 text-xs disabled:opacity-50"
            style={{ color: "var(--cp-text-faint)" }}
          >
            <IoRefreshOutline size={13} />
            Refresh
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 mt-3">
          <IoAlertCircleOutline size={16} className="mt-0.5 shrink-0" style={{ color: "#e5484d" }} />
          <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
            {error}{" "}
            {error.includes("profile") && (
              <Link href="/dashboard/profile" className="underline" style={{ color: "var(--cp-accent)" }}>
                Go to profile
              </Link>
            )}
          </p>
        </div>
      )}

      {!match && !error && (
        <div className="mt-4">
          <p className="text-sm mb-4" style={{ color: "var(--cp-text-muted)" }}>
            Get a personalized score based on your saved skills and experience.
          </p>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            <IoSparklesOutline size={16} />
            {loading ? "Analyzing..." : "Generate match score"}
          </button>
        </div>
      )}

      {match && (
        <div className="mt-4">
          <div className="flex items-end gap-2 mb-5">
            <span className="font-display text-4xl font-semibold" style={{ color: "var(--cp-accent)" }}>
              {match.score}
            </span>
            <span className="text-sm mb-1" style={{ color: "var(--cp-text-faint)" }}>
              / 100
            </span>
          </div>

          {match.reasons.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium mb-2" style={{ color: "var(--cp-text-muted)" }}>
                Why this fits
              </p>
              <ul className="flex flex-col gap-2">
                {match.reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2 text-sm" style={{ color: "var(--cp-text-muted)" }}>
                    <IoCheckmarkCircle size={15} className="mt-0.5 shrink-0" style={{ color: "var(--cp-teal)" }} />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {match.gaps.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: "var(--cp-text-muted)" }}>
                Possible gaps
              </p>
              <ul className="flex flex-col gap-2">
                {match.gaps.map((gap) => (
                  <li key={gap} className="flex items-start gap-2 text-sm" style={{ color: "var(--cp-text-muted)" }}>
                    <IoAlertCircleOutline size={15} className="mt-0.5 shrink-0" style={{ color: "var(--cp-accent)" }} />
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
