import { IoSparklesOutline, IoPersonOutline } from "react-icons/io5";
import { ChatMessage } from "@/types/chat";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: isUser ? "var(--cp-teal-dim)" : "var(--cp-accent-dim)",
        }}
      >
        {isUser ? (
          <IoPersonOutline size={14} style={{ color: "var(--cp-teal)" }} />
        ) : (
          <IoSparklesOutline size={14} style={{ color: "var(--cp-accent)" }} />
        )}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? "rounded-tr-sm" : "rounded-tl-sm"}`}
        style={{
          background: isUser ? "var(--cp-accent-dim)" : "var(--cp-surface)",
          border: "1px solid var(--cp-border)",
          color: "var(--cp-text)",
        }}
      >
        {message.text}
      </div>
    </div>
  );
}
