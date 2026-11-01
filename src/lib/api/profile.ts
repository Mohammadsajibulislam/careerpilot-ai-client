import { UserProfile } from "@/types/profile";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function fetchProfile(): Promise<UserProfile> {
  const res = await fetch(`${SERVER_URL}/api/profile`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch profile");

  const data = await res.json();
  // Guard against legacy/partial documents that are missing fields.
  return {
    userId: data.userId ?? "",
    resumeText: typeof data.resumeText === "string" ? data.resumeText : "",
    skills: Array.isArray(data.skills) ? data.skills : [],
    resumeFileName: data.resumeFileName ?? "",
    updatedAt: data.updatedAt,
  };
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
