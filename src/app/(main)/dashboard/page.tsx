"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  IoBriefcaseOutline,
  IoTrendingUpOutline,
  IoSparklesOutline,
  IoChatbubbleEllipsesOutline,
  IoAddCircleOutline,
  IoArrowForward,
} from "react-icons/io5";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { fetchStats } from "@/lib/api/stats";
import { DashboardStats } from "@/types/stats";
import StatCard from "@/components/dashboard/StatCard";
import PipelineChart from "@/components/dashboard/PipelineChart";
import TrendChart from "@/components/dashboard/TrendChart";
import CategoryChart from "@/components/dashboard/CategoryChart";

export default function DashboardPage() {
  const { session, isPending } = useRequireAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    fetchStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [session]);

  if (isPending || !session) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="px-6 py-16 max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8 md:mb-10 flex-wrap gap-4">
        <div>
          <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
            Overview
          </p>
          <h1 className="font-display text-3xl font-semibold mt-3">Dashboard</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/jobs"
            className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
            style={{ borderColor: "var(--cp-border)", background: "var(--cp-surface)", color: "var(--cp-text)" }}
          >
            Browse jobs
            <IoArrowForward size={15} />
          </Link>
          <Link
            href="/jobs/add"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-transform"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            <IoAddCircleOutline size={16} />
            Save a job
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" aria-live="polite" aria-busy="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl animate-pulse" style={{ background: "var(--cp-surface)" }} />
          ))}
        </div>
      ) : stats && stats.totalJobs === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}>
            <IoBriefcaseOutline size={28} style={{ color: "var(--cp-text-faint)" }} />
          </div>
          <h2 className="font-display text-2xl font-semibold">Your pipeline is waiting</h2>
          <p className="text-sm mt-3 max-w-md" style={{ color: "var(--cp-text-muted)" }}>
            Save your first role to start tracking responses, scores, and interview momentum.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/jobs/add"
              className="px-5 py-2.5 rounded-lg text-sm font-medium"
              style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
            >
              Save a job
            </Link>
            <Link
              href="/jobs"
              className="px-5 py-2.5 rounded-lg text-sm font-medium"
              style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text)" }}
            >
              Browse jobs
            </Link>
          </div>
        </div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard icon={IoBriefcaseOutline} label="Total roles tracked" value={stats.totalJobs} />
            <StatCard icon={IoTrendingUpOutline} label="Response rate" value={`${stats.responseRate}%`} accentColor="var(--cp-teal)" />
            <StatCard icon={IoSparklesOutline} label="Match scores generated" value={stats.matchCount} />
            <StatCard icon={IoChatbubbleEllipsesOutline} label="Interview prep sessions" value={stats.chatCount} accentColor="var(--cp-teal)" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PipelineChart statusCounts={stats.statusCounts} />
            <CategoryChart categoryCounts={stats.categoryCounts} />
          </div>

          <TrendChart data={stats.monthlyTrend} />
        </>
      ) : null}
    </div>
  );
}
