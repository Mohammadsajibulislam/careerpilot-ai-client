"use client";

import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

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
  onResetFilters: () => void;
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
  onResetFilters,
}: JobFiltersProps) {
  const selectStyle = {
    background: "var(--cp-surface)",
    border: "1px solid var(--cp-border)",
    color: "var(--cp-text)",
  };

  const hasActiveFilters =
    search.trim().length > 0 || category !== "all" || jobType !== "all" || sort !== "newest";

  return (
    <div
      className="rounded-2xl p-4 md:p-5"
      style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-mono-label uppercase" style={{ color: "var(--cp-text-faint)" }}>
            Filter roles
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
              style={{ background: "var(--cp-accent-dim)", color: "var(--cp-accent)" }}
            >
              <IoCloseOutline size={14} />
              Clear
            </button>
          )}
        </div>

        <div className="relative">
          <label htmlFor="job-search" className="sr-only">
            Search jobs
          </label>
          <IoSearchOutline
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "var(--cp-text-faint)" }}
          />
          <input
            id="job-search"
            type="text"
            placeholder="Search by title or company..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-colors"
            style={selectStyle}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category-filter" className="text-[11px] font-mono-label uppercase" style={{ color: "var(--cp-text-faint)" }}>
              Category
            </label>
            <select
              id="category-filter"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="rounded-lg py-2.5 px-3 text-sm outline-none w-full transition-colors"
              style={selectStyle}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All categories" : c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="job-type-filter" className="text-[11px] font-mono-label uppercase" style={{ color: "var(--cp-text-faint)" }}>
              Type
            </label>
            <select
              id="job-type-filter"
              value={jobType}
              onChange={(e) => onJobTypeChange(e.target.value)}
              className="rounded-lg py-2.5 px-3 text-sm outline-none w-full transition-colors"
              style={selectStyle}
            >
              {jobTypes.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "All types" : t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 xl:col-span-2">
            <label htmlFor="sort-filter" className="text-[11px] font-mono-label uppercase" style={{ color: "var(--cp-text-faint)" }}>
              Sort by
            </label>
            <select
              id="sort-filter"
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="rounded-lg py-2.5 px-3 text-sm outline-none w-full transition-colors"
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
      </div>
    </div>
  );
}