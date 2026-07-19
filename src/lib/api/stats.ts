import { DashboardStats } from "@/types/stats";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function fetchStats(): Promise<DashboardStats> {
  const res = await fetch(`${SERVER_URL}/api/stats`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
