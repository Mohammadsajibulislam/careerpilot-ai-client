"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoSend, IoArrowBack, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { fetchJobById } from "@/lib/api/jobs";
import { fetchChatHistory, sendChatMessage } from "@/lib/api/interviewChat";
import { ChatMessage } from "@/types/chat";
import { Job } from "@/types/job";
import ChatBubble from "@/components/interview/ChatBubble";
import TypingIndicator from "@/components/interview/TypingIndicator";
import SuggestedPrompts from "@/components/interview/SuggestedPrompts";

export default function InterviewPrepPage() {
  const { id } = useParams<{ id: string }>();
  const { session, isPending } = useRequireAuth();

  const [job, setJob] = useState<Job | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [sending, setSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        const [jobData, history] = await Promise.all([
          fetchJobById(id),
          fetchChatHistory(id),
        ]);
        setJob(jobData);
        setMessages(history);
      } finally {
        setLoadingHistory(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, session]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || sending) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: messageText }]);
    setSending(true);

    try {
      const reply = await sendChatMessage(id, messageText);
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Something went wrong on my end — please try again." },
      ]);
    } finally {
      setSending(false);
    }
  };

  if (isPending || !session || loadingHistory) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto flex flex-col" style={{ minHeight: "calc(100dvh - 4rem)" }}>
      <Link
        href={`/jobs/${id}`}
        className="inline-flex items-center gap-2 text-sm mb-6"
        style={{ color: "var(--cp-text-muted)" }}
      >
        <IoArrowBack size={16} />
        Back to job
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "var(--cp-teal-dim)" }}
        >
          <IoChatbubbleEllipsesOutline size={18} style={{ color: "var(--cp-teal)" }} />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold">Interview prep</h1>
          <p className="text-xs" style={{ color: "var(--cp-text-faint)" }}>
            {job ? `${job.title} at ${job.company}` : "Loading role..."}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pb-6">
        {messages.length === 0 && (
          <div
            className="p-6 rounded-2xl text-center"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
          >
            <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
              Start the conversation — ask for a question, or share how you'd answer one.
            </p>
            <SuggestedPrompts onSelect={handleSend} />
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} />
        ))}

        {sending && (
          <div className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "var(--cp-accent-dim)" }}
            >
              <IoChatbubbleEllipsesOutline size={14} style={{ color: "var(--cp-accent)" }} />
            </div>
            <div
              className="rounded-2xl rounded-tl-sm"
              style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
            >
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {messages.length > 0 && !sending && (
        <SuggestedPrompts onSelect={handleSend} />
      )}

      <div className="sticky bottom-0 flex items-center gap-2 mt-4 pt-4" style={{ background: "var(--cp-bg)" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          disabled={sending}
          className="flex-1 rounded-full py-3 px-5 text-sm outline-none disabled:opacity-50"
          style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text)" }}
        />
        <button
          onClick={() => handleSend()}
          disabled={sending || !input.trim()}
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 disabled:opacity-40"
          style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
        >
          <IoSend size={16} />
        </button>
      </div>
    </div>
  );
}
