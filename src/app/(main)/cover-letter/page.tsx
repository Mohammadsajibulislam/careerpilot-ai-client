"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IoDocumentTextOutline, IoCopyOutline, IoArrowForward } from "react-icons/io5";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import { generateCoverLetter } from "@/lib/api/coverLetter";

const inputStyle = {
  background: "var(--cp-surface)",
  border: "1px solid var(--cp-border)",
  color: "var(--cp-text)",
};

const labelStyle: React.CSSProperties = {
  color: "var(--cp-text-faint)",
};

export default function CoverLetterPage() {
  const { session, isPending } = useRequireAuth();
  const { toast, showToast, hideToast } = useToast();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [tone, setTone] = useState("professional");

  const mutation = useMutation({
    mutationFn: () => generateCoverLetter({ company, role, skills, tone }),
    onSuccess: () => {
      showToast("Cover letter generated", "success");
    },
    onError: (err: Error) => {
      showToast(err.message || "Failed to generate", "error");
    },
  });

  const handleCopy = async () => {
    if (mutation.data?.letter) {
      await navigator.clipboard.writeText(mutation.data.letter);
      showToast("Copied to clipboard", "success");
    }
  };

  const handleRegenerate = () => {
    mutation.mutate();
  };

  if (isPending || !session) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="px-6 py-16 max-w-4xl mx-auto min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        AI Writer
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mt-3">Cover letter generator</h1>
      <p className="text-sm mt-2 mb-10 max-w-lg" style={{ color: "var(--cp-text-muted)" }}>
        Generate a tailored cover letter for any role using AI.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Company *
            </label>
            <input
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google"
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Role *
            </label>
            <input
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Software Engineer"
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Key skills (optional)
            </label>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, TypeScript, MongoDB"
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            >
              <option value="professional">Professional</option>
              <option value="enthusiastic">Enthusiastic</option>
              <option value="concise">Concise</option>
            </select>
          </div>
          <button
            onClick={() => mutation.mutate()}
            disabled={!company || !role || mutation.isPending}
            className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium disabled:opacity-50 w-fit px-6"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            {mutation.isPending ? "Generating..." : "Generate"}
            {!mutation.isPending && <IoArrowForward size={16} />}
          </button>
        </div>

        <div
          className="p-6 rounded-2xl min-h-[300px] flex flex-col"
          style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
        >
          {mutation.isPending ? (
            <div className="animate-pulse space-y-4 flex-1">
              <div className="h-4 w-3/4 rounded" style={{ background: "var(--cp-border)" }} />
              <div className="h-4 w-full rounded" style={{ background: "var(--cp-border)" }} />
              <div className="h-4 w-5/6 rounded" style={{ background: "var(--cp-border)" }} />
              <div className="h-4 w-2/3 rounded" style={{ background: "var(--cp-border)" }} />
              <div className="h-4 w-full rounded" style={{ background: "var(--cp-border)" }} />
              <div className="h-4 w-4/5 rounded" style={{ background: "var(--cp-border)" }} />
            </div>
          ) : mutation.data?.letter ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <IoDocumentTextOutline size={16} style={{ color: "var(--cp-accent)" }} />
                  <span className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-text-faint)" }}>
                    Generated letter
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg"
                  style={{ background: "var(--cp-bg)", color: "var(--cp-text-muted)" }}
                >
                  <IoCopyOutline size={14} />
                  Copy
                </button>
              </div>
              <div className="text-sm whitespace-pre-line leading-relaxed flex-1 overflow-y-auto" style={{ color: "var(--cp-text-muted)" }}>
                {mutation.data.letter}
              </div>
              <button
                onClick={handleRegenerate}
                className="mt-4 text-xs px-4 py-2 rounded-lg self-start"
                style={{ background: "var(--cp-bg)", color: "var(--cp-accent)" }}
              >
                Regenerate
              </button>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-center" style={{ color: "var(--cp-text-faint)" }}>
                Fill in the details and click Generate to see your cover letter here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
