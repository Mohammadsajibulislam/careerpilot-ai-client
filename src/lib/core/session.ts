import { headers } from "next/headers";
import type { Session } from "@/types/auth";

export async function getUserSession(): Promise<Session | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/get-session`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data as Session | null;
  } catch (error) {
    console.error("Session fetch error:", error);
    return null;
  }
}

export async function requireRole(
  allowedRole: "user" | "admin"
): Promise<Session["user"]> {
  const session = await getUserSession();

  if (!session) {
    // redirect handled in the page/layout that calls this
    throw new Error("UNAUTHENTICATED");
  }

  if (session.user.role !== allowedRole && session.user.role !== "admin") {
    throw new Error("FORBIDDEN");
  }

  return session.user;
}