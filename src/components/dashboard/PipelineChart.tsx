"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { DashboardStats } from "@/types/stats";

export default function PipelineChart({ statusCounts }: { statusCounts: DashboardStats["statusCounts"] }) {
  const data = [
    { stage: "Saved", count: statusCounts.saved },
    { stage: "Applied", count: statusCounts.applied },
    { stage: "Interview", count: statusCounts.interview },
    { stage: "Offer", count: statusCounts.offer },
    { stage: "Rejected", count: statusCounts.rejected },
  ];

  return (
    <div
      className="p-6 rounded-2xl"
      style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
    >
      <p className="font-mono-label text-xs uppercase mb-6" style={{ color: "var(--cp-text-faint)" }}>
        Pipeline by stage
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--cp-border)" vertical={false} />
          <XAxis dataKey="stage" tick={{ fill: "var(--cp-text-muted)", fontSize: 12 }} axisLine={{ stroke: "var(--cp-border)" }} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: "var(--cp-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "var(--cp-bg)", border: "1px solid var(--cp-border)", borderRadius: 8, fontSize: 13 }}
            labelStyle={{ color: "var(--cp-text)" }}
            cursor={{ fill: "var(--cp-border-soft)" }}
          />
          <Bar dataKey="count" fill="var(--cp-accent)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
