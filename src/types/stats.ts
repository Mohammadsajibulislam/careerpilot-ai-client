export interface DashboardStats {
  totalJobs: number;
  statusCounts: {
    saved: number;
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
  };
  categoryCounts: Record<string, number>;
  monthlyTrend: { month: string; count: number }[];
  responseRate: number;
  matchCount: number;
  chatCount: number;
}
