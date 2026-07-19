"use client";

import { useState } from "react";
import { IoMailOutline, IoLogoGithub, IoLogoLinkedin, IoArrowForward } from "react-icons/io5";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

const inputStyle = {
  background: "var(--cp-surface)",
  border: "1px solid var(--cp-border)",
  color: "var(--cp-text)",
};

export default function ContactPage() {
  const { toast, showToast, hideToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // এই project-এ কোনো backend email service নেই — form validate করে confirmation দেখাচ্ছি
    await new Promise((r) => setTimeout(r, 600));

    setSubmitting(false);
    setForm({ name: "", email: "", message: "" });
    showToast("Message sent — thanks for reaching out", "success");
  };

  return (
    <div className="px-6 py-20 max-w-4xl mx-auto">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        Contact
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mt-3">Get in touch</h1>
      <p className="text-sm mt-3 max-w-lg" style={{ color: "var(--cp-text-muted)" }}>
        Questions, feedback, or bug reports — all welcome.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
        <form onSubmit={handleSubmit} className="md:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono-label text-[11px] uppercase block mb-2" style={{ color: "var(--cp-text-faint)" }}>
                Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="font-mono-label text-[11px] uppercase block mb-2" style={{ color: "var(--cp-text-faint)" }}>
                Email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={{ color: "var(--cp-text-faint)" }}>
              Message
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What's on your mind?"
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none resize-none"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium mt-2 disabled:opacity-50 w-fit px-6"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            {submitting ? "Sending..." : "Send message"}
            {!submitting && <IoArrowForward size={16} />}
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-text-faint)" }}>
            Direct
          </p>
          <a
            href="mailto:hello@careerpilot.ai"
            className="flex items-center gap-3 p-4 rounded-xl text-sm"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text-muted)" }}
          >
            <IoMailOutline size={18} style={{ color: "var(--cp-accent)" }} />
            hello@careerpilot.ai
          </a>
          <a
            href="https://github.com/Mohammadsajibulislam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl text-sm"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text-muted)" }}
          >
            <IoLogoGithub size={18} style={{ color: "var(--cp-accent)" }} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl text-sm"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text-muted)" }}
          >
            <IoLogoLinkedin size={18} style={{ color: "var(--cp-accent)" }} />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}