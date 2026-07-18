"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div className="p-10">
      <h1>CareerPilot AI</h1>
      <p>Session: {session ? session.user.email : "Not logged in"}</p>
    </div>
  );
}