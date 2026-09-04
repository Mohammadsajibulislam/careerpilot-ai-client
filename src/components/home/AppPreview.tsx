"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoGridOutline,
  IoSparklesOutline,
  IoChatbubbleEllipsesOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";

const tabs = [
  {
    id: "pipeline",
    label: "Pipeline View",
    icon: IoGridOutline,
    title: "Kanban Pipeline",
    description:
      "Track every application from Saved to Offer on a single visual board.",
    color: "var(--cp-accent)",
  },
  {
    id: "matching",
    label: "AI Matching",
    icon: IoSparklesOutline,
    title: "Smart Match Engine",
    description:
      "Each role is scored against your resume with a plain-language explanation.",
    color: "var(--cp-accent)",
  },
  {
    id: "interview",
    label: "Interview Prep",
    icon: IoChatbubbleEllipsesOutline,
    title: "Interview Assistant",
    description:
      "A role-specific chatbot that generates questions and keeps conversation context.",
    color: "var(--cp-teal)",
  },
  {
    id: "cover",
    label: "Cover Letter",
    icon: IoDocumentTextOutline,
    title: "Cover Letter Generator",
    description:
      "Generate tailored cover letters with configurable tone in seconds.",
    color: "var(--cp-teal)",
  },
];

export default function AppPreview() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="font-mono-label text-xs uppercase"
            style={{ color: "var(--cp-accent)" }}
          >
            See it in action
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            A product, not just a concept.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive ? "var(--cp-accent-dim)" : "var(--cp-surface)",
                  border: `1px solid ${isActive ? "var(--cp-accent)" : "var(--cp-border)"}`,
                  color: isActive ? "var(--cp-accent)" : "var(--cp-text-muted)",
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "var(--cp-surface)",
            border: "1px solid var(--cp-border)",
          }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${active.color}33, transparent 60%)`,
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 md:p-12"
            >
              <div className="max-w-3xl mx-auto">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${active.color}26` }}
                >
                  <active.icon size={22} style={{ color: active.color }} />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">
                  {active.title}
                </h3>
                <p
                  className="text-base mb-8 max-w-lg"
                  style={{ color: "var(--cp-text-muted)" }}
                >
                  {active.description}
                </p>

                <div
                  className="rounded-xl p-6 md:p-8 space-y-4"
                  style={{
                    background: "var(--cp-bg)",
                    border: "1px solid var(--cp-border-soft)",
                  }}
                >
                  {activeTab === "pipeline" && <PipelineMockup />}
                  {activeTab === "matching" && <MatchingMockup />}
                  {activeTab === "interview" && <InterviewMockup />}
                  {activeTab === "cover" && <CoverMockup />}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PipelineMockup() {
  const columns = [
    {
      title: "Saved",
      color: "var(--cp-text-faint)",
      jobs: ["Frontend Dev @ Vercel", "React Eng @ Stripe"],
    },
    {
      title: "Applied",
      color: "var(--cp-accent)",
      jobs: ["Full Stack @ Linear"],
    },
    {
      title: "Interview",
      color: "var(--cp-teal)",
      jobs: ["Senior React @ Notion"],
    },
    {
      title: "Offer",
      color: "#4ade80",
      jobs: [],
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {columns.map((col) => (
        <div key={col.title}>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: col.color }}
            />
            <span
              className="font-mono-label text-xs uppercase"
              style={{ color: "var(--cp-text-muted)" }}
            >
              {col.title}
            </span>
          </div>
          <div className="space-y-2">
            {col.jobs.map((job) => (
              <div
                key={job}
                className="p-2.5 rounded-lg text-xs"
                style={{
                  background: "var(--cp-surface)",
                  border: "1px solid var(--cp-border)",
                  color: "var(--cp-text)",
                }}
              >
                {job}
              </div>
            ))}
            {col.jobs.length === 0 && (
              <div
                className="p-2.5 rounded-lg text-xs text-center"
                style={{
                  border: "1px dashed var(--cp-border)",
                  color: "var(--cp-text-faint)",
                }}
              >
                Empty
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function MatchingMockup() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Senior React Developer</p>
          <p className="text-xs" style={{ color: "var(--cp-text-faint)" }}>
            Linear • Remote
          </p>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: "var(--cp-accent-dim)", color: "var(--cp-accent)" }}
        >
          92% Match
        </div>
      </div>
      <div
        className="p-3 rounded-lg text-xs"
        style={{
          background: "var(--cp-surface)",
          border: "1px solid var(--cp-border)",
          color: "var(--cp-text-muted)",
        }}
      >
        <span className="font-medium" style={{ color: "var(--cp-accent)" }}>
          Why this matches:
        </span>{" "}
        Strong alignment in React, TypeScript, and Next.js. Role requires 3+ years
        of frontend experience which matches your profile.
      </div>
      <div className="flex gap-2">
        {["React", "TypeScript", "Next.js", "GraphQL"].map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 rounded text-[10px]"
            style={{
              background: "var(--cp-accent-dim)",
              color: "var(--cp-accent)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function InterviewMockup() {
  const messages = [
    { role: "assistant", text: "Tell me about your experience with React hooks." },
    {
      role: "user",
      text: "I've used useState, useEffect, and custom hooks extensively in my last project.",
    },
    {
      role: "assistant",
      text: "Great! Can you describe a situation where you created a custom hook to solve a specific problem?",
    },
  ];

  return (
    <div className="space-y-3">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className="max-w-[80%] p-3 rounded-xl text-xs"
            style={{
              background:
                msg.role === "user" ? "var(--cp-accent-dim)" : "var(--cp-surface)",
              border: "1px solid var(--cp-border)",
              color: "var(--cp-text)",
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-1.5 pt-1">
        <div
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ background: "var(--cp-text-faint)", animationDelay: "0ms" }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ background: "var(--cp-text-faint)", animationDelay: "150ms" }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ background: "var(--cp-text-faint)", animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}

function CoverMockup() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            className="block text-[10px] uppercase mb-1 font-mono-label"
            style={{ color: "var(--cp-text-faint)" }}
          >
            Tone
          </label>
          <div
            className="px-3 py-1.5 rounded-lg text-xs"
            style={{
              background: "var(--cp-surface)",
              border: "1px solid var(--cp-border)",
              color: "var(--cp-text)",
            }}
          >
            Professional
          </div>
        </div>
        <div>
          <label
            className="block text-[10px] uppercase mb-1 font-mono-label"
            style={{ color: "var(--cp-text-faint)" }}
          >
            Role
          </label>
          <div
            className="px-3 py-1.5 rounded-lg text-xs"
            style={{
              background: "var(--cp-surface)",
              border: "1px solid var(--cp-border)",
              color: "var(--cp-text)",
            }}
          >
            Frontend Developer
          </div>
        </div>
      </div>
      <div
        className="p-4 rounded-lg text-xs leading-relaxed"
        style={{
          background: "var(--cp-surface)",
          border: "1px solid var(--cp-border)",
          color: "var(--cp-text-muted)",
        }}
      >
        Dear Hiring Manager, I am writing to express my strong interest in the
        Frontend Developer position. With over 3 years of experience building
        scalable React applications, I am excited about the opportunity to
        contribute to your team...
      </div>
      <div className="flex gap-2">
        <span
          className="px-3 py-1 rounded-lg text-[10px]"
          style={{ background: "var(--cp-accent-dim)", color: "var(--cp-accent)" }}
        >
          Copy
        </span>
        <span
          className="px-3 py-1 rounded-lg text-[10px]"
          style={{
            background: "var(--cp-surface)",
            border: "1px solid var(--cp-border)",
            color: "var(--cp-text-muted)",
          }}
        >
          Regenerate
        </span>
      </div>
    </div>
  );
}
