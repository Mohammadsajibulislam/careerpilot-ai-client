const prompts = [
  "Ask me a behavioral question",
  "How should I answer 'tell me about yourself'?",
  "What questions should I ask the interviewer?",
  "Give me feedback on my last answer",
];

export default function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {prompts.map((p) => (
        <button
          key={p}
          onClick={() => onSelect(p)}
          className="text-xs px-3 py-2 rounded-full transition-colors"
          style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text-muted)" }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
