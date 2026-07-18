import PipelineTrajectory from "./PipelineTrajectory";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen w-full flex"
      style={{ background: "var(--cp-bg)" }}
    >
      {/* Left: visual panel, hidden on mobile */}
      <div
        className="hidden lg:flex lg:w-[45%] border-r"
        style={{ borderColor: "var(--cp-border-soft)" }}
      >
        <PipelineTrajectory />
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}