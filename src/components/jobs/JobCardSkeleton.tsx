export default function JobCardSkeleton() {
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden animate-pulse"
      style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
    >
      <div className="w-full h-40" style={{ background: "var(--cp-border)" }} />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 w-1/3 rounded" style={{ background: "var(--cp-border)" }} />
        <div className="h-4 w-2/3 rounded" style={{ background: "var(--cp-border)" }} />
        <div className="h-3 w-full rounded" style={{ background: "var(--cp-border)" }} />
        <div className="h-3 w-4/5 rounded" style={{ background: "var(--cp-border)" }} />
        <div className="h-9 w-full rounded-lg mt-2" style={{ background: "var(--cp-border)" }} />
      </div>
    </div>
  );
}