import { IoBookmarkOutline, IoSparklesOutline, IoPaperPlaneOutline, IoChatbubblesOutline } from "react-icons/io5";

const steps = [
  {
    number: "01",
    icon: IoBookmarkOutline,
    title: "Save a role",
    description: "Paste a job link or fill in the details. It lands in your pipeline instantly.",
  },
  {
    number: "02",
    icon: IoSparklesOutline,
    title: "Get matched",
    description: "The AI scores it against your skills and explains exactly why it fits — or doesn't.",
  },
  {
    number: "03",
    icon: IoPaperPlaneOutline,
    title: "Apply with confidence",
    description: "Track status across every stage, from saved to offer, in one board.",
  },
  {
    number: "04",
    icon: IoChatbubblesOutline,
    title: "Prep with your copilot",
    description: "Chat through role-specific interview questions before you walk in.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <div className="max-w-xl mb-14">
        <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
          The flight plan
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
          Four steps, start to offer.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-6 left-[calc(100%_-_0.5rem)] w-8 h-px"
                  style={{ background: "var(--cp-border)" }}
                />
              )}
              <span
                className="font-mono-label text-xs block mb-4"
                style={{ color: "var(--cp-text-faint)" }}
              >
                {step.number}
              </span>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
              >
                <Icon size={20} style={{ color: "var(--cp-accent)" }} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}