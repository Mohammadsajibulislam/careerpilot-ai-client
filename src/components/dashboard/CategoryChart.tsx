"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { DashboardStats } from "@/types/stats";

const COLORS = ["#F0A93A", "#35C7B0", "#6D8DF2", "#E5484D", "#A78BFA", "#F472B6"];

export default function CategoryChart({ categoryCounts }: { categoryCounts: DashboardStats["categoryCounts"] }) {
  const data = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div
        className="p-6 rounded-2xl flex items-center justify-center h-[300px]"
        style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
      >
        <p className="text-sm" style={{ color: "var(--cp-text-faint)" }}>
          No data yet
        </p>
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-2xl"
      style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
    >
      <p className="font-mono-label text-xs uppercase mb-6" style={{ color: "var(--cp-text-faint)" }}>
        Roles by category
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "var(--cp-bg)", border: "1px solid var(--cp-border)", borderRadius: 8, fontSize: 13 }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "var(--cp-text-muted)" }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
