---
name: frontend-skill
description: Use when redesigning, restyling, or building UI for the Tupah web app — pages, components, layout, colors, dark mode, or responsive behavior. Encodes the project's design conventions and the verify loop.
---

# Tupah Frontend Redesign

## Design conventions

- **Tailwind v4 first.** Style with utility classes. Global tokens live in `web/src/app/globals.css` (shadcn-style oklch variables: `--background`, `--foreground`, `--primary`, etc.). Add new design tokens there, not inline.
- **Dark mode is class-based**: `@custom-variant dark (&:where(.dark, .dark *))`, toggled by `useTheme` (`web/src/hooks/useTheme.tsx`) adding `.dark` to `<html>`. Every visual change must style **both** modes with `dark:` variants — never ship a light-only style.
- **Brand accents**: `#1272CC` (light mode) and `#9379cc` (dark mode). Use them for focus rings, links, and interactive highlights, matching existing usage.
- **Color transitions are global**: `body, div, section…` already have `transition-colors duration-300`; don't re-add per element.
- **Component stack**: prefer plain Tailwind markup; shadcn/ui pieces live in `web/src/components/ui/`; MUI (`@mui/material` v9, slot/slotProps API) is used for inputs, tooltips, autocomplete — reuse whichever the file already uses rather than mixing in a new library.
- **Icons**: `lucide-react`. **Animation**: `motion/react` (not `framer-motion`). **Images**: `next/image` with `fill`/sizes, not `<img>`.

## Rules

- Responsive: mobile-first, verify at `sm`, `md (768)`, and the custom carousel breakpoint (1440px in `ImageCarousel`).
- Hydration-safe UI: use `useHasMounted` (`web/src/hooks/useHasMounted.ts`) to gate client-only rendering; lazy `useState` initializers for `localStorage` reads — no setState-on-mount effects (lint enforces `react-hooks/set-state-in-effect`).
- Reuse existing components in `web/src/components/` before creating new ones; match each file's existing formatting.
- Don't restyle by swapping libraries; redesign within the current stack.

## Verify loop

Run from `web/`:

1. `yarn lint` — zero errors (warnings pre-exist for `<img>` usage).
2. `yarn build` — must pass TypeScript + static generation.
3. Live check: `make dev` from repo root (app on `localhost:4200`), hit the changed pages, check both themes, then `make down`. If `.next/` permission errors appear, it contains root-owned files from Docker — clear with `docker run --rm -v $PWD/web:/a node:20 rm -rf /a/.next`.
