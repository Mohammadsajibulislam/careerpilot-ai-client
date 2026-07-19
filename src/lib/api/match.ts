import { MatchResult } from "@/types/match";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function generateMatch(jobId: string): Promise<MatchResult> {
  const res = await fetch(`${SERVER_URL}/api/match/${jobId}`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to generate match");
  }
  return res.json();
}

export async function fetchExistingMatch(jobId: string): Promise<MatchResult | null> {
  const res = await fetch(`${SERVER_URL}/api/match/${jobId}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch match");
  return res.json();
}
