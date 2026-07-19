"use client";

import Link from "next/link";
import { IoEyeOutline, IoTrashOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Job } from "@/types/job";

const statusOptions: Job["status"][] = ["saved", "applied", "interview", "offer", "rejected"];

interface ManageJobCardProps {
  job: Job;
  onStatusChange: (id: string, status: Job["status"]) => void;
  onDelete: (id: string) => void;
}

export default function ManageJobCard({ job, onStatusChange, onDelete }: ManageJobCardProps) {
  return (
    <div
      className="p-4 rounded-xl flex flex-col gap-3"
      style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
    >
      <div>
        <h3 className="text-sm font-medium line-clamp-1">{job.title}</h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--cp-text-faint)" }}>
          {job.company}
        </p>
      </div>

      <select
        value={job.status}
        onChange={(e) => onStatusChange(job._id, e.target.value as Job["status"])}
        className="text-xs rounded-lg py-2 px-3 outline-none"
        style={{ background: "var(--cp-bg)", border: "1px solid var(--cp-border)", color: "var(--cp-text)" }}
      >
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <Link
          href={`/jobs/${job._id}`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium"
          style={{ background: "var(--cp-accent-dim)", color: "var(--cp-accent)" }}
        >
          <IoEyeOutline size={14} />
          View
        </Link>
        <Link
          href={`/jobs/${job._id}/interview-prep`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium"
          style={{ background: "var(--cp-teal-dim)", color: "var(--cp-teal)" }}
        >
          <IoChatbubbleEllipsesOutline size={14} />
          Prep
        </Link>
        <button
          onClick={() => onDelete(job._id)}
          className="flex items-center justify-center rounded-lg py-2 px-3"
          style={{ background: "rgba(229, 72, 77, 0.1)", color: "#e5484d" }}
        >
          <IoTrashOutline size={14} />
        </button>
      </div>
    </div>
  );
}