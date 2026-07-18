export default function AuthDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px" style={{ background: "var(--cp-border)" }} />
      <span className="text-xs" style={{ color: "var(--cp-text-faint)" }}>
        or
      </span>
      <div className="flex-1 h-px" style={{ background: "var(--cp-border)" }} />
    </div>
  );
}