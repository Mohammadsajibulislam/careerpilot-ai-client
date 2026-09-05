"use client";

import { motion } from "framer-motion";
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
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {theme === "dark" ? <IoSunnyOutline size={16} /> : <IoMoonOutline size={16} />}
      </motion.div>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
