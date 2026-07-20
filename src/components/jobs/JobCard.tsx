import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline, IoCashOutline, IoArrowForward } from "react-icons/io5";
import { Job } from "@/types/job";

export default function JobCard({ job }: { job: Job }) {
  const salaryLabel =
    job.salaryMin && job.salaryMax
      ? `$${(job.salaryMin / 1000).toFixed(0)}k – $${(job.salaryMax / 1000).toFixed(0)}k`
      : "Not disclosed";

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden h-full"
      style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
    >
      <div className="relative w-full h-40 shrink-0" style={{ background: "var(--cp-bg)" }}>
        {job.imageUrl && /^(https?:)?\/\//.test(job.imageUrl) ? (
          <img
            src={job.imageUrl}
            alt={job.company}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image src={job.imageUrl || "/job-placeholder.png"} alt={job.company} fill className="object-cover" />
        )}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-mono-label uppercase"
          style={{ background: "var(--cp-bg)", color: "var(--cp-accent)", border: "1px solid var(--cp-border)" }}
        >
          {job.jobType}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs" style={{ color: "var(--cp-text-faint)" }}>
          {job.company}
        </p>
        <h3 className="font-display text-base font-semibold mt-1 line-clamp-1">{job.title}</h3>
        <p className="text-sm mt-2 line-clamp-2 flex-1" style={{ color: "var(--cp-text-muted)" }}>
          {job.shortDescription}
        </p>

        <div className="flex items-center gap-4 mt-4 text-xs" style={{ color: "var(--cp-text-faint)" }}>
          <span className="flex items-center gap-1">
            <IoLocationOutline size={14} />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <IoCashOutline size={14} />
            {salaryLabel}
          </span>
        </div>

        <Link
          href={`/jobs/${job._id}`}
          className="flex items-center justify-center gap-1.5 w-full rounded-lg py-2.5 text-sm font-medium mt-5"
          style={{ background: "var(--cp-accent-dim)", color: "var(--cp-accent)" }}
        >
          View details
          <IoArrowForward size={14} />
        </Link>
      </div>
    </div>
  );
}