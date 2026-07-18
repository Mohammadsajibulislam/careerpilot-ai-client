import { IoBookmarkOutline, IoPaperPlaneOutline, IoChatbubblesOutline, IoTrophyOutline } from "react-icons/io5";

const stages = [
  { icon: IoBookmarkOutline, label: "SAVED", detail: "Roles worth pursuing" },
  { icon: IoPaperPlaneOutline, label: "APPLIED", detail: "In the employer's queue" },
  { icon: IoChatbubblesOutline, label: "INTERVIEW", detail: "AI prep, tailored per role" },
  { icon: IoTrophyOutline, label: "OFFER", detail: "The outcome you're after" },
];

export default function PipelineTrajectory() {
  return (
    <div className="relative flex flex-col justify-center h-full px-12 py-16">
      {/* vertical trajectory line */}
      <div
        className="absolute left-[3.25rem] top-24 bottom-24 w-px"
        style={{
          background:
            "linear-gradient(to bottom, var(--cp-accent), var(--cp-teal))",
        }}
      />

      <div className="mb-12">
        <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
          Flight plan
        </p>
        <h2 className="font-display text-3xl font-semibold mt-2 leading-tight">
          Every application,
          <br />
          tracked to its outcome.
        </h2>
        <p className="text-sm mt-3 max-w-xs" style={{ color: "var(--cp-text-muted)" }}>
          CareerPilot follows each role from the moment you save it to the offer letter — no spreadsheet required.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isLast = i === stages.length - 1;
          return (
            <div key={stage.label} className="relative flex items-center gap-4">
              <div
                className="z-10 flex items-center justify-center w-11 h-11 rounded-full border shrink-0"
                style={{
                  background: "var(--cp-surface)",
                  borderColor: isLast ? "var(--cp-teal)" : "var(--cp-border)",
                }}
              >
                <Icon
                  size={18}
                  style={{ color: isLast ? "var(--cp-teal)" : "var(--cp-accent)" }}
                />
              </div>
              <div>
                <p className="font-mono-label text-[11px]" style={{ color: "var(--cp-text-faint)" }}>
                  {stage.label}
                </p>
                <p className="text-sm mt-0.5" style={{ color: "var(--cp-text-muted)" }}>
                  {stage.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}