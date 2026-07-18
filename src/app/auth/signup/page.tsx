"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMailOutline, IoLockClosedOutline, IoPersonOutline, IoArrowForward } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import AuthShell from "@/components/auth/AuthShell";
import AuthField from "@/components/auth/AuthField";

export default function SignupPage() {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      showToast(error.message || "Signup failed", "error");
      return;
    }

    showToast("Account created successfully", "success");
    router.push("/");
  };

  return (
    <AuthShell>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        Get started
      </p>
      <h1 className="font-display text-2xl font-semibold mt-2">Create your account</h1>
      <p className="text-sm mt-1.5" style={{ color: "var(--cp-text-muted)" }}>
        Start tracking applications in minutes.
      </p>

      <form onSubmit={handleSignup} className="flex flex-col gap-4 mt-8">
        <AuthField label="Full name" type="text" placeholder="Jane Doe" value={name} onChange={setName} icon={IoPersonOutline} />
        <AuthField label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} icon={IoMailOutline} />
        <AuthField label="Password" type="password" placeholder="At least 6 characters" value={password} onChange={setPassword} icon={IoLockClosedOutline} />

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium mt-2 transition-opacity disabled:opacity-50"
          style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
        >
          {loading ? "Creating account..." : "Sign up"}
          {!loading && <IoArrowForward size={16} />}
        </button>
      </form>

      <p className="text-sm mt-8 text-center" style={{ color: "var(--cp-text-muted)" }}>
        Already have an account?{" "}
        <Link href="/auth/signin" className="font-medium" style={{ color: "var(--cp-teal)" }}>
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}