# CareerPilot AI — Client

Frontend application for CareerPilot AI built with Next.js and TypeScript.

## Overview

This repo is the client-side app for CareerPilot AI. It includes:
- Job listing UI
- Manual job save form
- Authentication support via Better Auth
- Dashboard and pipeline management
- Image preview for saved job listings

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- TanStack React Query
- react-icons

## Environment

Copy the `.env` file from `.env.example` if available, then configure:

```dotenv
NEXT_PUBLIC_SERVER_URL=https://careerpilot-ai-server.vercel.app
NEXT_PUBLIC_CLIENT_URL=https://careerpilot-ai-client.vercel.app
BETTER_AUTH_URL=https://careerpilot-ai-client.vercel.app
CLIENT_URL=https://careerpilot-ai-client.vercel.app
```

For local development, use:

```dotenv
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
CLIENT_URL=http://localhost:3000
```

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

```bash
npm run build
npm run start
```

## Notes

- Job card images use a fallback for external URLs. If you want Next Image optimization, add the source domain to `next.config.ts` under `images.remotePatterns`.
- The job form saves `imageUrl` values to the server and the image is displayed on the job card.
- Environment variables are loaded from `.env` at the repo root.

## Key files

- `src/components/jobs/JobCard.tsx` — job card UI and image rendering
- `src/app/(main)/jobs/add/page.tsx` — add job form
- `src/lib/api/jobs.ts` — API requests for job operations

## Deployment

This client can be deployed on Vercel or any static server that supports Next.js.

## License

Use the repo license or add one if needed.
