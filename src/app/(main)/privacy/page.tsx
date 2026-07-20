import { IoShieldCheckmarkOutline, IoEyeOutline, IoLockClosedOutline, IoTrashOutline } from "react-icons/io5";

const sections = [
  {
    icon: IoEyeOutline,
    title: "What we collect",
    items: [
      "Account information (name, email) when you sign up",
      "Job application data you enter (company names, role titles, statuses, notes)",
      "Resume text and skills you provide for AI matching",
    ],
  },
  {
    icon: IoLockClosedOutline,
    title: "How we use it",
    items: [
      "To power the job-matching and interview-prep AI features",
      "To display your application pipeline in the dashboard",
      "We never sell your data or share it with third parties",
    ],
  },
  {
    icon: IoTrashOutline,
    title: "Your control",
    items: [
      "You can delete your profile and all associated data at any time",
      "AI processing happens on each request — no permanent training datasets",
      "Session tokens are managed by Better Auth and expire automatically",
    ],
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Security",
    items: [
      "Connections are encrypted via HTTPS",
      "Passwords are never stored — authentication is handled by Better Auth",
      "Database access is restricted to the serverless runtime only",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="px-6 py-20 max-w-4xl mx-auto">
      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        Privacy
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mt-3 max-w-2xl">
        Your data stays yours.
      </h1>
      <p className="text-sm mt-4 max-w-lg" style={{ color: "var(--cp-text-muted)" }}>
        CareerPilot AI is a student project. This page explains what data is stored and how it is used.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="p-6 rounded-2xl"
              style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "var(--cp-accent-dim)" }}
              >
                <Icon size={18} style={{ color: "var(--cp-accent)" }} />
              </div>
              <h3 className="font-display text-base font-semibold mb-3">{s.title}</h3>
              <ul className="flex flex-col gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm flex items-start gap-2"
                    style={{ color: "var(--cp-text-muted)" }}
                  >
                    <span style={{ color: "var(--cp-accent)" }} className="mt-0.5 shrink-0">
                      &mdash;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div
        className="mt-12 p-6 rounded-2xl text-sm"
        style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text-muted)" }}
      >
        Questions about your data?{" "}
        <a
          href="/contact"
          className="underline"
          style={{ color: "var(--cp-accent)" }}
        >
          Get in touch
        </a>
        .
      </div>
    </div>
  );
}
