import { Job, JobsResponse } from "@/types/job";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

interface FetchJobsParams {
  search?: string;
  category?: string;
  jobType?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function fetchJobs(params: FetchJobsParams): Promise<JobsResponse> {
  const query = new URLSearchParams();

  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  if (params.jobType) query.set("jobType", params.jobType);
  if (params.sort) query.set("sort", params.sort);
  query.set("page", String(params.page || 1));
  query.set("limit", String(params.limit || 8));

  const res = await fetch(`${SERVER_URL}/api/jobs?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}

export async function fetchJobById(id: string): Promise<Job> {
  const res = await fetch(`${SERVER_URL}/api/jobs/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch job");
  }

  return res.json();
}