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

export interface NewJobInput {
  title: string;
  company: string;
  location: string;
  jobType: "Remote" | "Hybrid" | "On-site";
  category: string;
  salaryMin: number;
  salaryMax: number;
  shortDescription: string;
  description: string;
  requirements: string[];
  imageUrl: string;
  applyUrl: string;
}

export async function addJob(data: NewJobInput): Promise<{ message: string; jobId: string }> {
  const res = await fetch(`${SERVER_URL}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to save job");
  }
  return res.json();
}

export async function fetchMyJobs(): Promise<{ jobs: Job[] }> {
  const res = await fetch(`${SERVER_URL}/api/jobs/my/all`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch your jobs");
  }
  return res.json();
}

export async function updateJobStatus(id: string, status: Job["status"]): Promise<void> {
  const res = await fetch(`${SERVER_URL}/api/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update status");
  }
}

export async function deleteJob(id: string): Promise<void> {
  const res = await fetch(`${SERVER_URL}/api/jobs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete job");
  }
}