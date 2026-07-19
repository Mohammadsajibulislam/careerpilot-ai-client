const testimonials = [
  {
    quote:
      "I stopped losing track of which recruiter I'd already followed up with. The pipeline view alone was worth switching for.",
    name: "Farhana Akter",
    role: "Frontend Developer, job searching",
  },
  {
    quote:
      "The match explanations actually taught me what to emphasize on my resume for different roles.",
    name: "Rahat Hossain",
    role: "Backend Developer, job searching",
  },
  {
    quote:
      "Practicing with the interview assistant before a call made the real thing feel like round two, not round one.",
    name: "Nusrat Jahan",
    role: "Full Stack Developer, job searching",
  },
];

export default function Testimonials() {
  return (
    <section
      className="px-6 py-20 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-14">
          <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
            From the pipeline
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Built for people mid-search.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-2xl flex flex-col justify-between"
              style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
            >
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--cp-text)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--cp-text-faint)" }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}