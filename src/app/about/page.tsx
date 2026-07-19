import { IoRocketOutline, IoCodeSlashOutline, IoSparklesOutline } from "react-icons/io5";

const values = [
  {
    icon: IoCodeSlashOutline,
    title: "Built by someone job hunting",
    description:
      "CareerPilot started as a way to stop losing track of applications across a dozen open tabs and a messy spreadsheet.",
  },
  {
    icon: IoSparklesOutline,
    title: "AI that explains itself",
    description:
      "Every match score comes with a reason. No black-box recommendations — just clear signal on why a role fits.",
  },
  {
    icon: IoRocketOutline,
    title: "One pipeline, not five tools",
    description:
      "Tracking, matching, and interview prep live in the same place, so context never gets lost between tabs.",
  },
];

export default function AboutPage() {
  return (
    <div className="px-6 py-20 max-w-4xl mx-auto">
      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        About
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mt-3 max-w-2xl">
        A copilot for the part of job hunting nobody enjoys.
      </h1>
      <p className="text-base mt-6 max-w-2xl leading-relaxed" style={{ color: "var(--cp-text-muted)" }}>
        CareerPilot AI is a full-stack project built to make the operational side of a job search — tracking, matching, and prepping — less manual and less scattered. It combines a Kanban-style pipeline with two AI systems: a resume-aware match engine and a role-specific interview prep assistant.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <div
              key={v.title}
              className="p-6 rounded-2xl"
              style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "var(--cp-accent-dim)" }}
              >
                <Icon size={18} style={{ color: "var(--cp-accent)" }} />
              </div>
              <h3 className="font-display text-base font-semibold mb-2">{v.title}</h3>
              <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
                {v.description}
              </p>
            </div>
          );
        })}
      </div>

      <div
        className="mt-16 p-8 rounded-2xl"
        style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
      >
        <p className="font-mono-label text-xs uppercase mb-3" style={{ color: "var(--cp-text-faint)" }}>
          Tech stack
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--cp-text-muted)" }}>
          Next.js and TypeScript on the frontend, Express and MongoDB on the backend, Better Auth for authentication, and Google Gemini powering both AI features.
        </p>
      </div>
    </div>
  );
}