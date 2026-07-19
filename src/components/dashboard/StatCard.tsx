import { IconType } from "react-icons";

interface StatCardProps {
  icon: IconType;
  label: string;
  value: string | number;
  accentColor?: string;
}

export default function StatCard({ icon: Icon, label, value, accentColor = "var(--cp-accent)" }: StatCardProps) {
  return (
    <div
      className="p-5 rounded-2xl"
      style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
        style={{ background: `${accentColor}1A` }}
      >
        <Icon size={18} style={{ color: accentColor }} />
      </div>
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="text-xs mt-1" style={{ color: "var(--cp-text-muted)" }}>
        {label}
      </p>
    </div>
  );
}
