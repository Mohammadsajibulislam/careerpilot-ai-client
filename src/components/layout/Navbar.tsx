"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IoMenuOutline,
  IoCloseOutline,
  IoRocketOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/ui/ThemeToggle";

const loggedOutLinks = [
  { href: "/jobs", label: "Browse jobs" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const loggedInLinks = [
  { href: "/jobs", label: "Browse jobs" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/jobs/manage", label: "My pipeline" },
  { href: "/jobs/add", label: "Save a job" },
  { href: "/cover-letter", label: "Cover letter" },
  { href: "/dashboard/profile", label: "My profile" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = session ? loggedInLinks : loggedOutLinks;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <header
      className="sticky top-0 z-40 w-full border-b backdrop-blur-md"
      style={{
        background: "rgba(10, 14, 26, 0.85)",
        borderColor: "var(--cp-border-soft)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <IoRocketOutline size={20} style={{ color: "var(--cp-accent)" }} />
          <span className="font-display text-lg font-semibold">CareerPilot</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors"
              style={{
                color:
                  pathname === link.href
                    ? "var(--cp-text)"
                    : "var(--cp-text-muted)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {session ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg transition-colors"
              style={{ color: "var(--cp-text-muted)" }}
            >
              <IoLogOutOutline size={16} />
              Sign out
            </button>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm px-4 py-2"
                style={{ color: "var(--cp-text-muted)" }}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="text-sm px-4 py-2 rounded-lg font-medium"
                style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--cp-text)" }}
        >
          {mobileOpen ? <IoCloseOutline size={26} /> : <IoMenuOutline size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ borderColor: "var(--cp-border-soft)" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm"
              style={{ color: "var(--cp-text-muted)" }}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="pt-4 border-t flex flex-col gap-3"
            style={{ borderColor: "var(--cp-border-soft)" }}
          >
            {session ? (
              <button
                onClick={handleLogout}
                className="text-sm text-left"
                style={{ color: "var(--cp-text-muted)" }}
              >
                Sign out
              </button>
            ) : (
              <>
                <Link href="/signin" onClick={() => setMobileOpen(false)} className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm px-4 py-2 rounded-lg font-medium text-center"
                  style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
