"use client";

import { useState, useEffect } from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { fetchJobs } from "@/lib/api/jobs";
import { Job } from "@/types/job";
import JobCard from "@/components/jobs/JobCard";
import JobCardSkeleton from "@/components/jobs/JobCardSkeleton";
import JobFilters from "@/components/jobs/JobFilters";
import Pagination from "@/components/jobs/Pagination";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ⭐ Render-time state adjustment — React-এর official recommended pattern
  // effect-এ setState করার বদলে, filter change ধরা পড়লে render চলাকালীনই page reset করা হচ্ছে
  const [prevFilters, setPrevFilters] = useState({ search, category, jobType, sort });
  if (
    search !== prevFilters.search ||
    category !== prevFilters.category ||
    jobType !== prevFilters.jobType ||
    sort !== prevFilters.sort
  ) {
    setPrevFilters({ search, category, jobType, sort });
    if (page !== 1) setPage(1);
  }

  // একটামাত্র effect — debounce সহ, সব setState call করা হচ্ছে setTimeout callback-এর ভিতরে
  // (effect body-তে সরাসরি না, তাই React-এর warning আসবে না)
  useEffect(() => {
    let ignore = false;

    const timer = setTimeout(() => {
      (async () => {
        setLoading(true);
        setError("");
        try {
          const data = await fetchJobs({ search, category, jobType, sort, page, limit: 8 });
          if (!ignore) {
            setJobs(data.jobs);
            setTotalPages(data.totalPages);
          }
        } catch {
          if (!ignore) setError("Couldn't load jobs right now. Please try again.");
        } finally {
          if (!ignore) setLoading(false);
        }
      })();
    }, 400);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [search, category, jobType, sort, page]);

  return (
    <div className="px-6 py-16 max-w-6xl mx-auto min-h-screen">
      <div className="mb-10">
        <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
          Open roles
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold mt-3">
          Browse jobs
        </h1>
        <p className="text-sm mt-2" style={{ color: "var(--cp-text-muted)" }}>
          Public to everyone. Sign in to save roles to your pipeline.
        </p>
      </div>

      <JobFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        jobType={jobType}
        onJobTypeChange={setJobType}
        sort={sort}
        onSortChange={setSort}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => <JobCardSkeleton key={i} />)}

        {!loading && error && (
          <div className="col-span-full text-center py-16" style={{ color: "var(--cp-text-muted)" }}>
            {error}
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="col-span-full flex flex-col items-center py-20 text-center">
            <IoBriefcaseOutline size={32} style={{ color: "var(--cp-text-faint)" }} />
            <p className="text-sm mt-4" style={{ color: "var(--cp-text-muted)" }}>
              No roles match your filters yet. Try widening your search.
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          jobs.map((job) => <JobCard key={job._id} job={job} />)}
      </div>

      {!loading && !error && jobs.length > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}