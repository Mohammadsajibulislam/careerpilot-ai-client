import { IoCalendarOutline, IoArrowForward } from "react-icons/io5";
import Link from "next/link";

const posts = [
  {
    slug: "ai-job-search-tips",
    title: "5 ways AI can streamline your job search",
    excerpt: "From automated matching to interview prep, here is how AI tools are changing the way candidates find and land their next role.",
    date: "2026-06-15",
    author: "CareerPilot Team",
  },
  {
    slug: "resume-matching-guide",
    title: "How resume-based matching works",
    excerpt: "A behind-the-scenes look at how your resume text and skills are compared against job requirements to produce a fit score.",
    date: "2026-05-28",
    author: "CareerPilot Team",
  },
  {
    slug: "interview-prep-strategies",
    title: "Ace your next technical interview",
    excerpt: "Use role-specific AI prompts to practice answering behavioral and technical questions tailored to the job description.",
    date: "2026-05-10",
    author: "CareerPilot Team",
  },
  {
    slug: "pipeline-tracking-best-practices",
    title: "Why tracking your pipeline matters",
    excerpt: "Treat your job search like a sales pipeline. Move candidates from saved to offer with intention and visibility.",
    date: "2026-04-22",
    author: "CareerPilot Team",
  },
];

export default function BlogPage() {
  return (
    <div className="px-6 py-20 max-w-4xl mx-auto">
      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        Blog
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mt-3 max-w-2xl">
        Articles and guides for your job search.
      </h1>
      <p className="text-sm mt-3" style={{ color: "var(--cp-text-muted)" }}>
        Tips, explainers, and best practices from the CareerPilot team.
      </p>

      <div className="flex flex-col gap-6 mt-12">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="p-6 rounded-2xl transition-opacity hover:opacity-80"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
          >
            <div className="flex items-center gap-2 text-xs mb-2" style={{ color: "var(--cp-text-faint)" }}>
              <IoCalendarOutline size={14} />
              {post.date}
              <span>&middot;</span>
              {post.author}
            </div>
            <h2 className="font-display text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
              {post.excerpt}
            </p>
            <div
              className="inline-flex items-center gap-1 text-xs font-medium mt-3"
              style={{ color: "var(--cp-accent)" }}
            >
              Read more <IoArrowForward size={12} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
