import Link from "next/link";
import { IoMailOutline, IoBookOutline, IoShieldCheckmarkOutline, IoSearchOutline } from "react-icons/io5";

const topics = [
  {
    icon: IoBookOutline,
    title: "Getting started",
    items: [
      "Create an account and set up your profile",
      "Add your resume text and skills for AI matching",
      "Browse jobs and save them to your pipeline",
    ],
  },
  {
    icon: IoSearchOutline,
    title: "Using AI features",
    items: [
      "View match scores on any job details page",
      "Generate AI interview prep questions for saved roles",
      "Use the cover letter generator from your dashboard",
    ],
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Account & privacy",
    items: [
      "Manage your profile and update your skills",
      "Delete your data at any time",
      "Session tokens expire automatically",
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="px-6 py-20 max-w-4xl mx-auto">
      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        Help
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mt-3">Support & FAQ</h1>
      <p className="text-sm mt-3 mb-12 max-w-lg" style={{ color: "var(--cp-text-muted)" }}>
        Quick answers to common questions. Need more help? Reach out directly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {topics.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.title}
              className="p-6 rounded-2xl"
              style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "var(--cp-accent-dim)" }}
              >
                <Icon size={18} style={{ color: "var(--cp-accent)" }} />
              </div>
              <h3 className="font-display text-base font-semibold mb-3">{t.title}</h3>
              <ul className="flex flex-col gap-2">
                {t.items.map((item) => (
                  <li key={item} className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
                    &mdash; {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div
        className="p-6 rounded-2xl text-center"
        style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
      >
        <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
          Still have questions?{" "}
          <Link href="/contact" className="font-medium underline" style={{ color: "var(--cp-accent)" }}>
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
