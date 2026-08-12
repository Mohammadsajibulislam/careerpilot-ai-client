import Link from "next/link";
import type { CSSProperties } from "react";
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
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/help", label: "Help & support" },
    { href: "/cover-letter", label: "Cover letter generator" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

const mutedStyle: CSSProperties = { color: "var(--cp-text-muted)" };
const faintStyle: CSSProperties = { color: "var(--cp-text-faint)" };

export default function Footer() {
  return (
    <footer
      className="border-t mt-24"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-6 lg:gap-6">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <IoRocketOutline size={20} style={{ color: "var(--cp-accent)" }} />
              <span className="font-display text-lg font-semibold">CareerPilot</span>
            </div>
            <p className="text-sm max-w-xs" style={mutedStyle}>
              Track applications, get matched to roles, and prep for interviews with an AI copilot built for your job search.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="font-mono-label text-xs uppercase mb-4" style={faintStyle}>
                {section}
              </p>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-80"
                    style={mutedStyle}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <p className="font-mono-label text-xs uppercase mb-4" style={faintStyle}>
              Connect
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://github.com/Mohammadsajibulislam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={mutedStyle}
              >
                <IoLogoGithub size={16} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={mutedStyle}
              >
                <IoLogoLinkedin size={16} />
                LinkedIn
              </a>
              <a
                href="mailto:hello@careerpilot.ai"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={mutedStyle}
              >
                <IoMailOutline size={16} />
                hello@careerpilot.ai
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t text-xs text-center flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          style={{ borderColor: "var(--cp-border-soft)", color: "var(--cp-text-faint)" }}
        >
          <span>&copy; {new Date().getFullYear()} CareerPilot AI. Built as a student project.</span>
          <span className="flex items-center justify-center gap-1">
            Made with <span style={{ color: "var(--cp-accent)" }}>&#9829;</span> for job seekers
          </span>
        </div>
      </div>
    </footer>
  );
}
