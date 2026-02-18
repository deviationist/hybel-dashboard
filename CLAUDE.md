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
- `LocaleProvider` — locale string context (defaults to `DEFAULT_LOCALE` from `lib/config.ts`)
- `ThemeProvider` — next-themes wrapper for dark/light mode

**Dashboard structure:** `components/dashboard/dashboard.tsx` is the main container using a 12-column CSS grid. Dashboard widgets are placed directly in the grid (no wrapper divs). Each widget delegates data fetching and logic to custom hooks under `hooks/`, keeping components purely presentational.

**API routes:** Mock data endpoints under `app/api/dashboard/`. These return typed responses using Next.js route handlers (`NextResponse.json`).

**UI components:** shadcn/ui components live in `components/ui/`. Uses Tailwind CSS v4, `clsx`, `tailwind-merge`, and `class-variance-authority` for styling.

**Path aliases:** `@/*` maps to the project root (configured in `tsconfig.json`).

## Key Conventions

- Currency values use the `CurrencyAmount` type (`types/curreny.ts`) with `amount` + `currency` fields, formatted via `lib/currency.ts` using `Intl.NumberFormat`. Use `<Currency>` component for display (locale-aware via `useLocale()`)
- Date formatting uses `date-fns` with `parseISO` and helpers in `lib/date.ts`. Use `<FormattedDate>` component for display (locale-aware via `useLocale()`)
- Locale is accessed via `useLocale()` hook from `hooks/use-locale.ts` (defaults to `DEFAULT_LOCALE` from `lib/config.ts`, falls back to browser locale)
- Default locale is defined once in `lib/config.ts` — import `DEFAULT_LOCALE` rather than hardcoding `"nb-NO"`
- Component logic (data fetching, state, filters) lives in custom hooks under `hooks/` — keep components presentational
