import Link from "next/link";
import {
  IoRocketOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMailOutline,
} from "react-icons/io5";

const footerLinks = {
  Product: [
    { href: "/jobs", label: "Browse jobs" },
    { href: "/jobs/add", label: "Save a job" },
    { href: "/dashboard", label: "Dashboard" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="border-t mt-24"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <IoRocketOutline size={20} style={{ color: "var(--cp-accent)" }} />
              <span className="font-display text-lg font-semibold">CareerPilot</span>
            </div>
            <p className="text-sm max-w-xs" style={{ color: "var(--cp-text-muted)" }}>
              Track applications, get matched to roles, and prep for interviews with an AI copilot built for your job search.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="font-mono-label text-xs uppercase mb-4" style={{ color: "var(--cp-text-faint)" }}>
                {section}
              </p>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--cp-text-muted)" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="font-mono-label text-xs uppercase mb-4" style={{ color: "var(--cp-text-faint)" }}>
              Connect
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://github.com/Mohammadsajibulislam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--cp-text-muted)" }}
              >
                <IoLogoGithub size={16} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--cp-text-muted)" }}
              >
                <IoLogoLinkedin size={16} />
                LinkedIn
              </a>
              <a
                href="mailto:hello@careerpilot.ai"
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--cp-text-muted)" }}
              >
                <IoMailOutline size={16} />
                hello@careerpilot.ai
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t text-xs text-center"
          style={{ borderColor: "var(--cp-border-soft)", color: "var(--cp-text-faint)" }}
        >
          © {new Date().getFullYear()} CareerPilot AI. Built as a student project.
        </div>
      </div>
    </footer>
  );
}