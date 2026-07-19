import { UserProfile } from "@/types/profile";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function fetchProfile(): Promise<UserProfile> {
  const res = await fetch(`${SERVER_URL}/api/profile`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function updateProfile(data: { resumeText: string; skills: string[] }): Promise<void> {
  const res = await fetch(`${SERVER_URL}/api/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
}