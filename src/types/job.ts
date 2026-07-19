export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: "Remote" | "Hybrid" | "On-site";
  category: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  shortDescription: string;
  requirements: string[];
  imageUrl: string;
  applyUrl: string;
  postedBy: string;
  status: "saved" | "applied" | "interview" | "offer" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  totalPages: number;
  currentPage: number;
}