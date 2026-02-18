# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rental unit portfolio dashboard for landlords on Hybel.no. Built as a client-only SPA using Next.js with SSR explicitly disabled.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — run ESLint
- No test framework is configured.

## Architecture

**Client-only rendering:** SSR is disabled via `next/dynamic` in `components/client-app.tsx`, which wraps all children. The root layout (`app/layout.tsx`) renders `<ClientApp>` which provides all context providers.

**Provider stack** (in `client-app.tsx`):

- `QueryClientProvider` (TanStack Query) — data fetching/caching
- `LocaleProvider` — locale string context (hardcoded to `nb-NO` currently)
- `ThemeProvider` — next-themes wrapper for dark/light mode

**Dashboard structure:** `components/dashboard/dashboard.tsx` is the main container using a 12-column CSS grid. Dashboard widgets are placed directly in the grid (no wrapper divs). Each widget manages its own data fetching via TanStack Query.

**API routes:** Mock data endpoints under `app/api/dashboard/`. These return typed responses using Next.js route handlers (`NextResponse.json`).

**UI components:** shadcn/ui components live in `components/ui/`. Uses Tailwind CSS v4, `clsx`, `tailwind-merge`, and `class-variance-authority` for styling.

**Path aliases:** `@/*` maps to the project root (configured in `tsconfig.json`).

## Key Conventions

- Currency values use the `CurrencyAmount` type (`types/curreny.ts`) with `amount` + `currency` fields, formatted via `lib/currency.ts` using `Intl.NumberFormat`
- Date formatting uses `date-fns` with helpers in `lib/date.ts`
- Locale is accessed via `useLocale()` hook from `hooks/use-locale.ts`
