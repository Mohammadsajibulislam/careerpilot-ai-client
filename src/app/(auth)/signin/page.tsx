"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMailOutline, IoLockClosedOutline, IoArrowForward } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import AuthShell from "@/components/auth/AuthShell";
import AuthField from "@/components/auth/AuthField";
import DemoLoginButton from "@/components/auth/DemoLoginButton";
import GoogleButton from "@/components/auth/GoogleButton";
import AuthDivider from "@/components/auth/AuthDivider";

export default function SigninPage() {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      showToast(error.message || "Sign in failed", "error");
      return;
    }

    showToast("Welcome back", "success");
    router.push("/");
  };

  return (
    <AuthShell>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        Welcome back
      </p>
      <h1 className="font-display text-2xl font-semibold mt-2">Sign in</h1>
      <p className="text-sm mt-1.5" style={{ color: "var(--cp-text-muted)" }}>
        Pick up your job search where you left off.
      </p>

      <div className="flex flex-col gap-3 mt-8">
        <DemoLoginButton
          setLoading={setLoading}
          onSuccess={() => {
            showToast("Signed in with demo account", "success");
            router.push("/");
          }}
          onError={(msg) => showToast(msg, "error")}
        />
        <GoogleButton />
      </div>

      <AuthDivider />

      <form onSubmit={handleSignin} className="flex flex-col gap-4">
        <AuthField label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} icon={IoMailOutline} />
        <AuthField label="Password" type="password" placeholder="Your password" value={password} onChange={setPassword} icon={IoLockClosedOutline} />

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium mt-2 transition-opacity disabled:opacity-50"
          style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
        >
          {loading ? "Signing in..." : "Sign in"}
          {!loading && <IoArrowForward size={16} />}
        </button>
      </form>

      <p className="text-sm mt-8 text-center" style={{ color: "var(--cp-text-muted)" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium" style={{ color: "var(--cp-teal)" }}>
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}