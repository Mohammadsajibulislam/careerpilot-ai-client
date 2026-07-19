import { ChatMessage } from "@/types/chat";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function fetchChatHistory(jobId: string): Promise<ChatMessage[]> {
  const res = await fetch(`${SERVER_URL}/api/interview-chat/${jobId}`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load conversation");
  const data = await res.json();
  return data.messages;
}

export async function sendChatMessage(jobId: string, message: string): Promise<string> {
  const res = await fetch(`${SERVER_URL}/api/interview-chat/${jobId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  const data = await res.json();
  return data.reply;
}
