"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
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

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--cp-accent), var(--cp-teal))",
      }}
    />
  );
}

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = session ? loggedInLinks : loggedOutLinks;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <>
      <ScrollProgress />
      <motion.header
        className="sticky top-0 z-40 w-full border-b backdrop-blur-md"
        style={{
          background: scrolled
            ? "rgba(10, 14, 26, 0.92)"
            : "rgba(10, 14, 26, 0.85)",
          borderColor: "var(--cp-border-soft)",
        }}
        animate={{
          boxShadow: scrolled
            ? "0 4px 30px rgba(0,0,0,0.3)"
            : "0 0 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 0.4 }}
            >
              <IoRocketOutline size={20} style={{ color: "var(--cp-accent)" }} />
            </motion.div>
            <span className="font-display text-lg font-semibold">CareerPilot</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm relative py-1 transition-colors"
                style={{
                  color:
                    pathname === link.href
                      ? "var(--cp-text)"
                      : "var(--cp-text-muted)",
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5"
                    style={{
                      background: "linear-gradient(90deg, var(--cp-accent), var(--cp-teal))",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop auth actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {session ? (
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg transition-colors"
                style={{ color: "var(--cp-text-muted)" }}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
              >
                <IoLogOutOutline size={16} />
                Sign out
              </motion.button>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm px-4 py-2"
                  style={{ color: "var(--cp-text-muted)" }}
                >
                  Sign in
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/signup"
                    className="text-sm px-4 py-2 rounded-lg font-medium"
                    style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
                  >
                    Get started
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "var(--cp-text)" }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? <IoCloseOutline size={26} /> : <IoMenuOutline size={26} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile drawer */}
        <motion.div
          initial={false}
          animate={{
            height: mobileOpen ? "auto" : 0,
            opacity: mobileOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden border-t"
          style={{ borderColor: "var(--cp-border-soft)" }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm"
                  style={{ color: "var(--cp-text-muted)" }}
                >
                  {link.label}
                </Link>
              </motion.div>
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
        </motion.div>
      </motion.header>
    </>
  );
}
