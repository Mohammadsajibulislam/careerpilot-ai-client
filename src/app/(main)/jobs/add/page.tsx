"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { addJob } from "@/lib/api/jobs";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import type { NewJobInput } from "@/lib/api/jobs";

const inputStyle = {
  background: "var(--cp-surface)",
  border: "1px solid var(--cp-border)",
  color: "var(--cp-text)",
};

const labelStyle: React.CSSProperties = {
  color: "var(--cp-text-faint)",
};

const categories = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Data",
  "Product",
  "Support",
  "Other",
];

const jobTypes = ["Remote", "Hybrid", "On-site"] as const;

export default function AddJobPage() {
  const { session, isPending } = useRequireAuth();
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Remote" as "Remote" | "Hybrid" | "On-site",
    category: "",
    salaryMin: "",
    salaryMax: "",
    shortDescription: "",
    description: "",
    requirements: "",
    imageUrl: "",
    applyUrl: "",
  });

  const mutation = useMutation({
    mutationFn: (data: NewJobInput) => addJob(data),
    onSuccess: () => {
      showToast("Job saved to your pipeline", "success");
      router.push("/jobs/manage");
    },
    onError: (err: Error) => {
      showToast(err.message || "Failed to save job", "error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: NewJobInput = {
      title: form.title,
      company: form.company,
      location: form.location,
      jobType: form.jobType,
      category: form.category,
      salaryMin: Number(form.salaryMin) || 0,
      salaryMax: Number(form.salaryMax) || 0,
      shortDescription: form.shortDescription,
      description: form.description,
      requirements: form.requirements.split("\n").filter(Boolean),
      imageUrl: form.imageUrl,
      applyUrl: form.applyUrl,
    };

    mutation.mutate(data);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (isPending || !session) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="px-6 py-16 max-w-3xl mx-auto min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <Link
        href="/jobs/manage"
        className="inline-flex items-center gap-2 text-sm mb-8"
        style={{ color: "var(--cp-text-muted)" }}
      >
        <IoArrowBack size={16} />
        Back to pipeline
      </Link>

      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        Add a role
      </p>
      <h1 className="font-display text-3xl font-semibold mt-3">Save a job</h1>
      <p className="text-sm mt-2 mb-10" style={{ color: "var(--cp-text-muted)" }}>
        Add a role manually to your pipeline.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Title *
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Company *
            </label>
            <input
              required
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder="e.g. Acme Inc."
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Location *
            </label>
            <input
              required
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="e.g. Remote / NYC"
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Category *
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Job type *
            </label>
            <select
              required
              value={form.jobType}
              onChange={(e) => update("jobType", e.target.value)}
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            >
              {jobTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Min salary (USD)
            </label>
            <input
              type="number"
              value={form.salaryMin}
              onChange={(e) => update("salaryMin", e.target.value)}
              placeholder="e.g. 80000"
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Max salary (USD)
            </label>
            <input
              type="number"
              value={form.salaryMax}
              onChange={(e) => update("salaryMax", e.target.value)}
              placeholder="e.g. 120000"
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
            Short description *
          </label>
          <input
            required
            value={form.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
            placeholder="Brief one-liner about the role"
            className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
            Full description *
          </label>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Describe the role, responsibilities, and what makes it great..."
            className="w-full rounded-lg py-2.5 px-4 text-sm outline-none resize-none"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
            Requirements (one per line)
          </label>
          <textarea
            rows={4}
            value={form.requirements}
            onChange={(e) => update("requirements", e.target.value)}
            placeholder="React&#10;TypeScript&#10;5+ years experience"
            className="w-full rounded-lg py-2.5 px-4 text-sm outline-none resize-none"
            style={inputStyle}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Company logo URL
            </label>
            <input
              value={form.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-mono-label text-[11px] uppercase block mb-2" style={labelStyle}>
              Apply URL
            </label>
            <input
              value={form.applyUrl}
              onChange={(e) => update("applyUrl", e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg py-2.5 px-4 text-sm outline-none"
              style={inputStyle}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium mt-4 disabled:opacity-50 w-fit px-8"
          style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
        >
          {mutation.isPending ? "Saving..." : "Save to pipeline"}
        </button>
      </form>
    </div>
  );
}
