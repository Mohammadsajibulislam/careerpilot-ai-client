"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { DashboardStats } from "@/types/stats";

export default function TrendChart({ data }: { data: DashboardStats["monthlyTrend"] }) {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
    >
      <p className="font-mono-label text-xs uppercase mb-6" style={{ color: "var(--cp-text-faint)" }}>
        Roles saved over time
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--cp-border)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--cp-text-muted)", fontSize: 12 }} axisLine={{ stroke: "var(--cp-border)" }} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: "var(--cp-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "var(--cp-bg)", border: "1px solid var(--cp-border)", borderRadius: 8, fontSize: 13 }}
            labelStyle={{ color: "var(--cp-text)" }}
          />
          <Line type="monotone" dataKey="count" stroke="var(--cp-teal)" strokeWidth={2} dot={{ fill: "var(--cp-teal)", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
