const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

interface CoverLetterInput {
  company: string;
  role: string;
  skills?: string;
  tone?: string;
}

export async function generateCoverLetter(data: CoverLetterInput): Promise<{ letter: string }> {
  const res = await fetch(`${SERVER_URL}/api/cover-letter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to generate cover letter");
  }

  return res.json();
}
