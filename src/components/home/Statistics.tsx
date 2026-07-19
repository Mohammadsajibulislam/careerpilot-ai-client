const stats = [
  { value: "4", label: "Pipeline stages tracked" },
  { value: "2", label: "AI systems built in" },
  { value: "100%", label: "Data private to you" },
  { value: "0", label: "Spreadsheets required" },
];

export default function Statistics() {
  return (
    <section
      className="px-6 py-16 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="font-display text-4xl font-semibold" style={{ color: "var(--cp-accent)" }}>
              {stat.value}
            </p>
            <p className="text-sm mt-2" style={{ color: "var(--cp-text-muted)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}