"use client";

import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const faqs = [
  {
    question: "Is CareerPilot free to use?",
    answer:
      "Yes. Signing up, saving roles, and using the AI match engine are all free while the project is in active development.",
  },
  {
    question: "How does the match score work?",
    answer:
      "When you save a role, the AI compares its requirements against your resume and skills, then returns a score along with a plain-language explanation of why it fits.",
  },
  {
    question: "Can I try it without creating an account?",
    answer:
      "Yes — the job listings page is publicly browsable. You'll need an account to save roles, track your pipeline, or use the interview prep assistant.",
  },
  {
    question: "Is my resume and application data private?",
    answer:
      "Your pipeline, resume, and notes are visible only to your account. Nothing is shared publicly or with other users.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="px-6 py-20 border-t"
      style={{ borderColor: "var(--cp-border-soft)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
            Questions
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Frequently asked.
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="rounded-xl overflow-hidden"
                style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium">{faq.question}</span>
                  <IoChevronDown
                    size={16}
                    className="transition-transform shrink-0 ml-4"
                    style={{
                      color: "var(--cp-text-faint)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4">
                    <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}