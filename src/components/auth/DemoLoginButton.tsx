"use client";

import { IoFlashOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

interface DemoLoginButtonProps {
  onSuccess: () => void;
  onError: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

export default function DemoLoginButton({
  onSuccess,
  onError,
  setLoading,
}: DemoLoginButtonProps) {
  const handleDemoLogin = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: "demo@careerpilot.ai",
      password: "demo123456",
    });
    setLoading(false);

    if (error) {
      onError("Demo login failed — please try again");
      return;
    }

    onSuccess();
  };

  return (
    <button
      type="button"
      onClick={handleDemoLogin}
      className="flex items-center justify-center gap-2 w-full rounded-lg py-2.5 text-sm font-medium transition-colors"
      style={{
        background: "var(--cp-teal-dim)",
        border: "1px solid var(--cp-teal)",
        color: "var(--cp-teal)",
      }}
    >
      <IoFlashOutline size={16} />
      Try the demo account
    </button>
  );
}