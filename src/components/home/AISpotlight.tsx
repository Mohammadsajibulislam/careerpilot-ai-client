import { IoSparklesOutline, IoChatbubbleEllipsesOutline, IoCheckmarkCircle } from "react-icons/io5";

export default function AISpotlight() {
  return (
    <section
      className="px-6 py-20 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-14">
          <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-teal)" }}>
            The copilot, in detail
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Two AI systems, one job search.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Match Engine card */}
          <div
            className="p-8 rounded-2xl"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: "var(--cp-accent-dim)" }}
            >
              <IoSparklesOutline size={20} style={{ color: "var(--cp-accent)" }} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Smart match engine</h3>
            <p className="text-sm mb-5" style={{ color: "var(--cp-text-muted)" }}>
              Every saved role gets a match score against your resume, with a plain-language reason behind it.
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                "Scores each role against your actual skills",
                "Explains the match — not just a number",
                "Refines as you mark roles interested or not",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm" style={{ color: "var(--cp-text-muted)" }}>
                  <IoCheckmarkCircle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--cp-accent)" }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Interview Prep card */}
          <div
            className="p-8 rounded-2xl"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: "var(--cp-teal-dim)" }}
            >
              <IoChatbubbleEllipsesOutline size={20} style={{ color: "var(--cp-teal)" }} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Interview prep assistant</h3>
            <p className="text-sm mb-5" style={{ color: "var(--cp-text-muted)" }}>
              A chat assistant that knows which role you&apos;re prepping for and remembers the conversation.
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                "Generates questions specific to each saved role",
                "Keeps context across a multi-turn conversation",
                "Suggests follow-up prompts to go deeper",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm" style={{ color: "var(--cp-text-muted)" }}>
                  <IoCheckmarkCircle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--cp-teal)" }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}