export default function MainLoading() {
  return (
    <div className="px-6 py-24 max-w-6xl mx-auto min-h-screen">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-20 rounded" style={{ background: "var(--cp-border)" }} />
        <div className="h-8 w-64 rounded" style={{ background: "var(--cp-border)" }} />
        <div className="h-4 w-96 rounded" style={{ background: "var(--cp-border)" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-xl"
              style={{ background: "var(--cp-surface)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
