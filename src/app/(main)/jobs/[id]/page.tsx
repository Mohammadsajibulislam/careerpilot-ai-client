"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  IoLocationOutline,
  IoCashOutline,
  IoBusinessOutline,
  IoArrowBack,
  IoBookmarkOutline,
  IoOpenOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { fetchJobById, fetchJobs, addJob } from "@/lib/api/jobs";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import JobCard from "@/components/jobs/JobCard";
import MatchScoreCard from "@/components/jobs/MatchScoreCard";
import Reviews from "@/components/jobs/Reviews";
import { Job } from "@/types/job";

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { toast, showToast, hideToast } = useToast();

  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      try {
        const data = await fetchJobById(id);
        if (ignore) return;
        setJob(data);

        const related = await fetchJobs({ category: data.category, limit: 3 });
        if (!ignore) {
          setRelatedJobs(related.jobs.filter((j) => j._id !== data._id).slice(0, 3));
        }
      } catch {
        if (!ignore) setNotFound(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleSaveToPipeline = async () => {
    if (!session) {
      router.push("/signin");
      return;
    }
    if (!job) return;

    setSaving(true);
    try {
      await addJob({
        title: job.title,
        company: job.company,
        location: job.location,
        jobType: job.jobType,
        category: job.category,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        shortDescription: job.shortDescription,
        description: job.description,
        requirements: job.requirements,
        imageUrl: job.imageUrl,
        applyUrl: job.applyUrl,
      });
      showToast("Saved to your pipeline", "success");
    } catch {
      showToast("Failed to save job", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="px-6 py-24 max-w-4xl mx-auto animate-pulse">
        <div className="h-6 w-24 rounded mb-8" style={{ background: "var(--cp-border)" }} />
        <div className="h-8 w-2/3 rounded mb-4" style={{ background: "var(--cp-border)" }} />
        <div className="h-4 w-1/3 rounded mb-10" style={{ background: "var(--cp-border)" }} />
        <div className="h-40 w-full rounded-2xl" style={{ background: "var(--cp-border)" }} />
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="px-6 py-24 max-w-2xl mx-auto text-center">
        <h1 className="font-display text-2xl font-semibold">Job not found</h1>
        <p className="text-sm mt-3" style={{ color: "var(--cp-text-muted)" }}>
          This role may have been removed or the link is incorrect.
        </p>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 mt-6 text-sm font-medium"
          style={{ color: "var(--cp-accent)" }}
        >
          <IoArrowBack size={16} />
          Back to all jobs
        </Link>
      </div>
    );
  }

  const salaryLabel =
    job.salaryMin && job.salaryMax
      ? `$${(job.salaryMin / 1000).toFixed(0)}k – $${(job.salaryMax / 1000).toFixed(0)}k / year`
      : "Not disclosed";

  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-sm mb-8"
        style={{ color: "var(--cp-text-muted)" }}
      >
        <IoArrowBack size={16} />
        Back to all jobs
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
        <div
          className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0"
          style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
        >
          <Image src={job.imageUrl || "/job-placeholder.png"} alt={job.company} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <span
            className="inline-block px-2.5 py-1 rounded-md text-[11px] font-mono-label uppercase mb-3"
            style={{ background: "var(--cp-accent-dim)", color: "var(--cp-accent)" }}
          >
            {job.jobType}
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold">{job.title}</h1>
          <p className="text-sm mt-2" style={{ color: "var(--cp-text-muted)" }}>
            {job.company}
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button
            onClick={handleSaveToPipeline}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium disabled:opacity-50"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            <IoBookmarkOutline size={16} />
            {saving ? "Saving..." : "Save to pipeline"}
          </button>
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text)" }}
          >
            <IoOpenOutline size={16} />
            Apply on company site
          </a>
        </div>
      </div>

      {/* Key info */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl mb-10"
        style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
      >
        <div className="flex items-center gap-3">
          <IoLocationOutline size={18} style={{ color: "var(--cp-accent)" }} />
          <div>
            <p className="font-mono-label text-[10px] uppercase" style={{ color: "var(--cp-text-faint)" }}>
              Location
            </p>
            <p className="text-sm mt-0.5">{job.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <IoCashOutline size={18} style={{ color: "var(--cp-accent)" }} />
          <div>
            <p className="font-mono-label text-[10px] uppercase" style={{ color: "var(--cp-text-faint)" }}>
              Salary
            </p>
            <p className="text-sm mt-0.5">{salaryLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <IoBusinessOutline size={18} style={{ color: "var(--cp-accent)" }} />
          <div>
            <p className="font-mono-label text-[10px] uppercase" style={{ color: "var(--cp-text-faint)" }}>
              Category
            </p>
            <p className="text-sm mt-0.5">{job.category}</p>
          </div>
        </div>
      </div>

      {/* Overview / Description */}
      <div className="mb-10">
        <h2 className="font-display text-lg font-semibold mb-4">Overview</h2>
        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--cp-text-muted)" }}>
          {job.description}
        </p>
      </div>

      {/* Requirements */}
      {job.requirements?.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-lg font-semibold mb-4">Requirements</h2>
          <ul className="flex flex-col gap-2.5">
            {job.requirements.map((req) => (
              <li key={req} className="flex items-start gap-2 text-sm" style={{ color: "var(--cp-text-muted)" }}>
                <IoCheckmarkCircle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--cp-accent)" }} />
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI Match Score */}
      <div className="mb-10">
        <h2 className="font-display text-lg font-semibold mb-4">Your fit</h2>
        <MatchScoreCard jobId={job._id} />
      </div>

      {/* Reviews & Ratings */}
      <Reviews job={job} />

      {/* Related jobs */}
      {relatedJobs.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-lg font-semibold mb-5">Related roles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedJobs.map((j) => (
              <JobCard key={j._id} job={j} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
