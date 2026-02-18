# Hybel Dashboard

This repo contains a self-contained dashboard widget that displays rental unit portfolio insight to landlords.

## The use of AI-tools

_Claude Code_

_Figma AI_
I'm no designer, so I used Figma AI to get me going on a basic dashboard layout. I started out by surveying the available data, create an intention about which views I'd like to display to the landlord. I then used these views in my prompts to Figma.

## Consideration & Assumptions

My initial thoughts would be to use GraphQL and Apollo Client to allow for growing data needs to the dashboard, since sending multiple HTTP requests to custom API endpoints would create overhead, while using Apollo's BatchHttpLink would allow us to execute multiple queries in one request.

I'm choosing Next.js due to the need for simple API endpoints. I'll also completely disabled SSR to allow for a client only React component dynamic, and not to focus on the dynamic between server- and client side dynamic at this point.

I'll use shadcn/ui and Tailwind CSS since I'm very familiar with it, and since it create a good foundation to future work as well as giving a basic level of WCAG-compliance.

I'm using Figma AI to get some initial inspiration on how to present the data. While waiting for Figma to generate the sketches I converted the Hybel-logo from PNG to vector, as a nice design-touch to get the basic branding in place.

I'll use CSS grids for flexible arrangement of the different widget elements, and I'll try to avoid wrapper divs so that each visible element is directly placed within the grid, not inside a "sub-container".

I also considered to use the opportunity to explore the use of [Convex.dev](https://convex.dev/) to easily allow for realtime data via websockets. Otherwise I would use [TanStack Query](https://tanstack.com/query/latest).

For table display I would use [TanStack Table](https://tanstack.com/table/latest) since it is a headless solution and we retain control over the presentation layer, but given the time constraint I'll do a more simple implementation using shadcn/ui.

### Dark mode

Dark mode is fully functional. All components use semantic Tailwind tokens (`text-foreground`, `text-muted-foreground`, `bg-muted`, `border-border`) that adapt automatically, with explicit `dark:` variants for the colored icon backgrounds in portfolio metrics where semantic tokens don't apply.

### Internationalization (i18n)

I skipped spending too much time on this, but in a real world scenario I'd consider:

- using a package like [`react-intl`](https://www.npmjs.com/package/react-intl) for string translation
- used UTC for storing dates in the backend, and used [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) to localize dates in the frontend according to the browser locale. If we need to deviate from the browser locale (for example to let the user set their own time zone), then I would use (`date-fns`)[https://www.npmjs.com/package/date-fns].
- For currency display I'd use [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). If we need to deviate from the browser locale (for example to let the user set their own currency) I'd created my own component, or looked into third party packages.

## What was built

### Unit List (`components/dashboard/unit-list.tsx`)

A property-level breakdown showing each unit's address, tenant, rent, payment status, and lease expiry. Each row is expandable to reveal contract details and contextual actions (e.g. "Send payment reminder" for overdue units). Status badges use color coding — green for paid, amber for pending, red for overdue, gray for vacant/maintenance.

### Filtering & Sorting

Landlords can filter units by status (occupied/vacant/maintenance), payment status (paid/pending/overdue), and expiring leases (within 90 days). Sorting is available by address, rent, and lease expiry in both directions. Filtering is handled server-side by the API endpoint, and the filter state is persisted to the URL via [`nuqs`](https://nuqs.47ng.com/) so that filtered views are shareable and survive page refreshes.

The decision to filter server-side (rather than client-side) was deliberate — as the portfolio grows, the API should be the one narrowing the result set. The mock API validates query params and returns only matching units, which mirrors how a production endpoint would behave.

### Pending Actions (`components/dashboard/pending-actions.tsx`)

Surfaces actionable issues (overdue payments, expiring contracts, vacant units) in a dedicated panel. Each action is clickable and scrolls to the relevant unit in the list, auto-expanding it with a brief highlight. This cross-widget interaction uses a simple `highlightedUnitId` state lifted to the dashboard level.

### Structured Address type

Addresses are modeled as structured objects (`line1`, `line2`, `zip`, `city`, `country`) rather than plain strings. Formatting helpers (`formatAddress`, `formatAddressShort`) handle display, which makes it straightforward to adapt to different display contexts or locales.

### Accessibility (WCAG)

- All interactive elements (unit rows, pending action items, clickable metric cards) are keyboard-navigable with `tabIndex`, `role="button"`, and Enter/Space key handlers
- Expandable rows communicate state via `aria-expanded`
- Filter toggles use `aria-pressed` to convey active state
- Sort buttons include `aria-label` with current direction
- The collection status bar chart has `role="img"` with a descriptive `aria-label`
- The filtered unit count uses `aria-live="polite"` so screen readers announce changes

## What I would do with more time

- **Empty state for new landlords** — a welcoming illustration and onboarding CTA when the portfolio has zero properties
- **Pagination or virtualization** — for landlords with large portfolios, the unit list should paginate (server-side) or use virtual scrolling to stay performant
- **Error boundaries** — proper error UI with retry actions instead of the current "No data" fallback
- **TanStack Table** — as the filtering and sorting needs grow (e.g. multi-column sort, column visibility toggles), migrating to a headless table library would be more maintainable than hand-rolling
- **End-to-end tests** — Playwright tests covering the filter-to-URL flow, the pending action scroll interaction, and keyboard navigation
- **Responsive refinements** — the filter bar wraps on mobile but could be improved with a collapsible filter drawer
- **Animated transitions** — the pending actions panel could animate open/close, but the CSS grid-rows trick conflicted with the dashboard's gap spacing, so it was traded for correctness

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
