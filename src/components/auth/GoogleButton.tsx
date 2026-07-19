"use client";

import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton() {
  const handleGoogleLogin = async () => {
    const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";

    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${clientUrl}/`,
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 w-full rounded-lg py-2.5 text-sm font-medium transition-colors"
      style={{
        background: "var(--cp-surface)",
        border: "1px solid var(--cp-border)",
        color: "var(--cp-text)",
      }}
    >
      <FcGoogle size={18} />
      Continue with Google
    </button>
  );
}