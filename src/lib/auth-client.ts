import { createAuthClient } from "better-auth/react";

// Auth is owned by the Express API. Pointing the client at it (instead of the
// Next.js origin) keeps the session cookie on the API's host, which is the same
// host every protected `/api/*` request is sent to.
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
