import Link from "next/link";

export default function MainNotFound() {
  return (
    <div className="px-6 py-24 max-w-2xl mx-auto text-center">
      <h1 className="font-display text-5xl font-semibold" style={{ color: "var(--cp-accent)" }}>
        404
      </h1>
      <p className="font-display text-xl font-semibold mt-4">Not found</p>
      <p className="text-sm mt-3" style={{ color: "var(--cp-text-muted)" }}>
        This page doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-lg text-sm font-medium"
        style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
      >
        Go home
      </Link>
    </div>
  );
}
