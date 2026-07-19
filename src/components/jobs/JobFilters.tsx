"use client";

import { IoSearchOutline } from "react-icons/io5";

const categories = ["all", "Frontend", "Backend", "Full Stack", "DevOps", "Mobile", "Data"];
const jobTypes = ["all", "Remote", "Hybrid", "On-site"];
const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "salaryHigh", label: "Salary: high to low" },
  { value: "salaryLow", label: "Salary: low to high" },
];

interface JobFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  jobType: string;
  onJobTypeChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

export default function JobFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  jobType,
  onJobTypeChange,
  sort,
  onSortChange,
}: JobFiltersProps) {
  const selectStyle = {
    background: "var(--cp-surface)",
    border: "1px solid var(--cp-border)",
    color: "var(--cp-text)",
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search bar */}
      <div className="relative">
        <IoSearchOutline
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "var(--cp-text-faint)" }}
        />
        <input
          type="text"
          placeholder="Search by title or company..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl py-3 pl-11 pr-4 text-sm outline-none"
          style={selectStyle}
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg py-2 px-3 text-sm outline-none w-full sm:w-auto"
          style={selectStyle}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All categories" : c}
            </option>
          ))}
        </select>

        <select
          value={jobType}
          onChange={(e) => onJobTypeChange(e.target.value)}
          className="rounded-lg py-2 px-3 text-sm outline-none w-full sm:w-auto"
          style={selectStyle}
        >
          {jobTypes.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All types" : t}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg py-2 px-3 text-sm outline-none w-full sm:w-auto sm:ml-auto"
          style={selectStyle}
        >
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}