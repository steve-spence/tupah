# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tupah is an anonymous blogging platform built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Supabase (PostgreSQL + auth + storage). The main app lives in `web/`. There's also a `webassembly/` directory containing a C++ chess engine experiment.

## Commands

All commands run from within the `web/` directory:

```bash
yarn dev        # Start dev server with Turbopack on :3000
yarn build      # Production build
yarn lint       # ESLint
yarn migrate    # Run Drizzle migrations against DB
yarn generate   # Generate Drizzle migration files from schema changes
```

Docker (run from repo root):
```bash
make dev    # Start dev-next + db containers (app on :4200, db on :5433)
make up     # Start production containers
make down   # Stop containers
make clean  # Stop and remove volumes
```

## Architecture

### Directory Layout (`web/src/`)

- `app/` — Next.js App Router pages and API routes
- `components/` — Reusable UI components (shadcn/ui in `components/ui/`, plus custom ones)
- `contexts/` — React contexts (`AuthContext.tsx` wraps Supabase auth)
- `services/` — Client-side service functions that call the internal API (`post.ts`, `postComment.ts`, `mediaUpload.ts`)
- `utils/` — Shared utilities: `api.ts` (fetch wrapper), `types.ts` (shared TS types), `supabase/client.ts` & `supabase/server.ts`
- `db/` — Drizzle ORM schema (`schema.ts`) and migrations
- `hooks/` — Custom React hooks
- `environments/` — Environment config object

### Key Patterns

**API calls from client components**: Always use `apiFetch` or the `api` helper from `@/utils/api.ts` instead of raw `fetch`. This automatically adds the `x-requested-with: tupah-frontend` header required by the middleware.

**Middleware** (`src/middleware.ts`): Protects all `/api/*` routes by checking origin or the custom header. External requests without a matching origin/referer are blocked unless they send `x-requested-with: tupah-frontend`.

**Auth**: `AuthProvider` (from `@/contexts/AuthContext`) is in the root layout and provides `useAuth()` throughout the app. For server-side auth in API routes, use `createClient()` from `@/utils/supabase/server` and call `supabase.auth.getUser()`.

**Database**: Drizzle ORM with Supabase PostgreSQL. Schema defined in `web/src/db/schema.ts`. Tables: `profiles`, `posts` (with draft/published/archived status), `comments` (with nested reply support via `parent_id`), `images`, `likes`. After modifying schema, run `yarn generate` then `yarn migrate`.

**Images**: User-uploaded images are stored in Supabase storage bucket `post-images` and referenced in the `images` table with a short 12-char ID. The `/api/media/[id]` route proxies image retrieval.

### App Routes

- `/` — Landing page with rotating SVG backgrounds and featured posts carousel
- `/blog` — Browse all posts; `/blog/[username]` for a user's posts
- `/browse` — Post discovery/search
- `/create` — Markdown post editor (authenticated)
- `/dashboard` — User's own posts management (authenticated)
- `/edit/[slug]` — Edit existing post (authenticated)
- `/profile` — User profile
- `/auth`, `/login`, `/signup` — Supabase auth flows

### Environment

`.env.local` lives in `web/`. Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase project
- `DATABASE_URL` — Direct Postgres connection for Drizzle migrations
- `SUPABASE_SERVICE_ROLE_KEY` — Server-side privileged Supabase access
- `NEXT_PUBLIC_BASE_URL` — Base URL (`http://localhost:4200` for Docker dev)

The app redirects `tupah.me` → `www.tupah.me` (configured in `next.config.ts`). Remote images from `*.supabase.co` are allowed via Next.js image config.