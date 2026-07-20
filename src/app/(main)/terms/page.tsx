export default function TermsPage() {
  return (
    <div className="px-6 py-20 max-w-3xl mx-auto">
      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        Legal
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mt-3">Terms of service</h1>
      <p className="text-sm mt-2 mb-10" style={{ color: "var(--cp-text-muted)" }}>
        Last updated: July 2026
      </p>

      <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: "var(--cp-text-muted)" }}>
        <section>
          <h2 className="font-display text-base font-semibold mb-2" style={{ color: "var(--cp-text)" }}>
            1. Acceptance
          </h2>
          <p>
            By using CareerPilot AI, you agree to these terms. If you do not agree, do not use the service.
            CareerPilot AI is a student project and is provided as-is without any guarantees.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold mb-2" style={{ color: "var(--cp-text)" }}>
            2. Accounts
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your login credentials.
            You must be at least 13 years old to use this service. You may delete your account at any time.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold mb-2" style={{ color: "var(--cp-text)" }}>
            3. Data
          </h2>
          <p>
            We store the data you provide (job applications, resume text, skills) to power the dashboard
            and AI features. We do not sell or share your data with third parties. AI processing is
            performed per-request and is not used for model training.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold mb-2" style={{ color: "var(--cp-text)" }}>
            4. AI accuracy
          </h2>
          <p>
            AI-generated match scores, interview questions, and cover letters are informational only.
            They may contain errors or inaccuracies. Always verify critical information independently.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold mb-2" style={{ color: "var(--cp-text)" }}>
            5. Limitation of liability
          </h2>
          <p>
            CareerPilot AI is provided for educational purposes. The creators are not responsible for
            any decisions made based on the information provided by this service.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold mb-2" style={{ color: "var(--cp-text)" }}>
            6. Changes
          </h2>
          <p>
            These terms may be updated at any time. Continued use after changes constitutes acceptance
            of the new terms.
          </p>
        </section>
      </div>
    </div>
  );
}
