"use client";

import { IconType } from "react-icons";

interface AuthFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: IconType;
}

export default function AuthField({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
}: AuthFieldProps) {
  return (
    <div>
      <label className="font-mono-label text-[11px] uppercase block mb-2" style={{ color: "var(--cp-text-faint)" }}>
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2"
          style={{ color: "var(--cp-text-faint)" }}
        />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="w-full rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none transition-colors"
          style={{
            background: "var(--cp-surface)",
            border: "1px solid var(--cp-border)",
            color: "var(--cp-text)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--cp-accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--cp-border)")}
        />
      </div>
    </div>
  );
}