"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { IoAddCircleOutline, IoBriefcaseOutline } from "react-icons/io5";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { fetchMyJobs, updateJobStatus, deleteJob } from "@/lib/api/jobs";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import ManageJobCard from "@/components/jobs/ManageJobCard";
import { Job } from "@/types/job";

const columns: { status: Job["status"]; label: string }[] = [
  { status: "saved", label: "Saved" },
  { status: "applied", label: "Applied" },
  { status: "interview", label: "Interview" },
  { status: "offer", label: "Offer" },
];

export default function ManageJobsPage() {
  const { session, isPending } = useRequireAuth();
  const { toast, showToast, hideToast } = useToast();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = useCallback(async () => {
    try {
      const data = await fetchMyJobs();
      setJobs(data.jobs);
    } catch {
      showToast("Couldn't load your pipeline", "error");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session) {
      (async () => {
        await loadJobs();
      })();
    }
  }, [session, loadJobs]);

  const handleStatusChange = async (id: string, status: Job["status"]) => {
    setJobs((prev) => prev.map((j) => (j._id === id ? { ...j, status } : j)));
    try {
      await updateJobStatus(id, status);
    } catch {
      showToast("Failed to update status", "error");
      loadJobs(); // revert on failure
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this job from your pipeline?")) return;

    const prevJobs = jobs;
    setJobs((prev) => prev.filter((j) => j._id !== id));
    try {
      await deleteJob(id);
      showToast("Job removed", "success");
    } catch {
      showToast("Failed to delete job", "error");
      setJobs(prevJobs);
    }
  };

  if (isPending || !session) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="px-6 py-16 max-w-6xl mx-auto min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
            Your pipeline
          </p>
          <h1 className="font-display text-3xl font-semibold mt-3">My applications</h1>
        </div>
        <Link
          href="/jobs/add"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium"
          style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
        >
          <IoAddCircleOutline size={16} />
          Save a job
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {columns.map((col) => (
            <div key={col.status} className="h-48 rounded-xl animate-pulse" style={{ background: "var(--cp-surface)" }} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-center">
          <IoBriefcaseOutline size={32} style={{ color: "var(--cp-text-faint)" }} />
          <p className="text-sm mt-4 mb-6" style={{ color: "var(--cp-text-muted)" }}>
            Your pipeline is empty. Save your first role to start tracking it.
          </p>
          <Link
            href="/jobs"
            className="px-5 py-2.5 rounded-lg text-sm font-medium"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            Browse jobs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {columns.map((col) => {
            const colJobs = jobs.filter((j) => j.status === col.status);
            return (
              <div key={col.status}>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-text-faint)" }}>
                    {col.label}
                  </p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "var(--cp-surface)", color: "var(--cp-text-muted)" }}
                  >
                    {colJobs.length}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {colJobs.length === 0 ? (
                    <div
                      className="rounded-xl py-8 text-center text-xs"
                      style={{ border: "1px dashed var(--cp-border)", color: "var(--cp-text-faint)" }}
                    >
                      Nothing here
                    </div>
                  ) : (
                    colJobs.map((job) => (
                      <ManageJobCard
                        key={job._id}
                        job={job}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}