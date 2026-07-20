"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import { Job } from "@/types/job";

interface Review {
  _id: string;
  jobId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

async function fetchReviews(jobId: string): Promise<{ reviews: Review[] }> {
  const res = await fetch(`${SERVER_URL}/api/reviews/${jobId}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

async function addReview(jobId: string, rating: number, comment: string) {
  const res = await fetch(`${SERVER_URL}/api/reviews/${jobId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ rating, comment }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to add review");
  }
  return res.json();
}

export default function Reviews({ job }: { job: Job }) {
  const { data: session } = authClient.useSession();
  const { toast, showToast, hideToast } = useToast();
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", job._id],
    queryFn: () => fetchReviews(job._id),
  });

  const mutation = useMutation({
    mutationFn: () => addReview(job._id, rating, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", job._id] });
      showToast("Review added", "success");
      setRating(0);
      setComment("");
    },
    onError: (err: Error) => {
      showToast(err.message || "Failed to add review", "error");
    },
  });

  const reviews = data?.reviews || [];
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="mt-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <h2 className="font-display text-lg font-semibold mb-4">
        Reviews
        {avgRating && (
          <span className="ml-2 text-sm font-normal" style={{ color: "var(--cp-text-muted)" }}>
            ({avgRating} avg &middot; {reviews.length} review{reviews.length !== 1 ? "s" : ""})
          </span>
        )}
      </h2>

      {isLoading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 rounded-xl" style={{ background: "var(--cp-surface)" }} />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm py-6" style={{ color: "var(--cp-text-muted)" }}>
          No reviews yet. Be the first to share your experience.
        </p>
      ) : (
        <div className="flex flex-col gap-4 mb-8">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="p-4 rounded-xl"
              style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{r.userName}</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} style={{ color: star <= r.rating ? "var(--cp-accent)" : "var(--cp-border)" }}>
                      <IoStar size={14} />
                    </span>
                  ))}
                </div>
              </div>
              {r.comment && (
                <p className="text-sm" style={{ color: "var(--cp-text-muted)" }}>
                  {r.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {session && (
        <div
          className="p-5 rounded-xl"
          style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)" }}
        >
          <p className="font-mono-label text-[11px] uppercase mb-3" style={{ color: "var(--cp-text-faint)" }}>
            Add your review
          </p>
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{ color: star <= (hoverRating || rating) ? "var(--cp-accent)" : "var(--cp-border)" }}
              >
                {star <= (hoverRating || rating) ? <IoStar size={20} /> : <IoStarOutline size={20} />}
              </button>
            ))}
          </div>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this role (optional)"
            className="w-full rounded-lg py-2.5 px-4 text-sm outline-none resize-none mb-3"
            style={{ background: "var(--cp-bg)", border: "1px solid var(--cp-border)", color: "var(--cp-text)" }}
          />
          <button
            onClick={() => mutation.mutate()}
            disabled={rating === 0 || mutation.isPending}
            className="px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
          >
            {mutation.isPending ? "Submitting..." : "Submit review"}
          </button>
        </div>
      )}
    </div>
  );
}
