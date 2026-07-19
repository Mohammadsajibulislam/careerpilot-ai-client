"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  IoBriefcaseOutline,
  IoTrendingUpOutline,
  IoSparklesOutline,
  IoChatbubbleEllipsesOutline,
  IoAddCircleOutline,
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
      .finally(() => setLoading(false));
  }, [session]);

  if (isPending || !session) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="px-6 py-16 max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
            Overview
          </p>
          <h1 className="font-display text-3xl font-semibold mt-3">Dashboard</h1>
        </div>
        <Link
          href="/jobs/add"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium"
          style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
        >
          <IoAddCircleOutline size={16} />
          Save a job
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl animate-pulse" style={{ background: "var(--cp-surface)" }} />
          ))}
        </div>
      ) : stats && stats.totalJobs === 0 ? (
        <div className="flex flex-col items-center py-24 text-center">
          <IoBriefcaseOutline size={32} style={{ color: "var(--cp-text-faint)" }} />
          <p className="text-sm mt-4 mb-6" style={{ color: "var(--cp-text-muted)" }}>
            No data yet — save your first role to see stats here.
          </p>
          <Link
            href="/jobs"
            className="px-5 py-2.5 rounded-lg text-sm font-medium"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            Browse jobs
          </Link>
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
