"use client";

import { useEffect } from "react";
import { IoCheckmarkCircle, IoCloseCircle, IoClose } from "react-icons/io5";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const accentColor = type === "success" ? "var(--cp-teal)" : "#e5484d";

  return (
    <div
      className="fixed z-50 flex items-center gap-3 px-4 py-3 rounded-lg text-sm shadow-xl"
      style={{
        top: "80px",
        right: "16px",
        background: "var(--cp-surface)",
        border: `1px solid ${accentColor}`,
        color: "var(--cp-text)",
      }}
    >
      {type === "success" ? (
        <IoCheckmarkCircle size={18} style={{ color: accentColor }} />
      ) : (
        <IoCloseCircle size={18} style={{ color: accentColor }} />
      )}
      <span>{message}</span>
      <button onClick={onClose} style={{ color: "var(--cp-text-faint)" }}>
        <IoClose size={15} />
      </button>
    </div>
  );
}