"use client";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg transition-colors"
      style={{ color: "var(--cp-text-muted)" }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <IoSunnyOutline size={16} /> : <IoMoonOutline size={16} />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
