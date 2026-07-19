import {
  IoGridOutline,
  IoTrendingUpOutline,
  IoFilterOutline,
  IoNotificationsOutline,
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

const features = [
  {
    icon: IoGridOutline,
    title: "Kanban pipeline",
    description: "Every application moves through Saved, Applied, Interview, and Offer — visually, in one board.",
  },
  {
    icon: IoTrendingUpOutline,
    title: "Application analytics",
    description: "See response rates and time-to-interview across every role you've tracked.",
  },
  {
    icon: IoFilterOutline,
    title: "Smart filtering",
    description: "Sort saved roles by match score, salary, location, or how recently you applied.",
  },
  {
    icon: IoNotificationsOutline,
    title: "Stage reminders",
    description: "Know when a role has gone quiet, so nothing slips through the cracks.",
  },
  {
    icon: IoDocumentTextOutline,
    title: "Resume-aware matching",
    description: "Upload your resume once — every recommendation is scored against it.",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Private by default",
    description: "Your resume, notes, and pipeline are visible only to you.",
  },
];

export default function Features() {
  return (
    <section
      className="px-6 py-20 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-14">
          <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
            Built for the search
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Everything a spreadsheet couldn&apos;t do.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl"
                style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "var(--cp-accent-dim)" }}
                >
                  <Icon size={18} style={{ color: "var(--cp-accent)" }} />
                </div>
                <h3 className="font-display text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}