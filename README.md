# Hybel Dashboard

This repo contains a self-contained dashboard widget that displays rental unit portfolio insight to landlords.

## The use of AI-tools

### Claude Code
I started out without Claude Code, for two reasons - I wanted to be fully in control when I laid out the foundation (even tho planning with Claude works well), and I wanted to make sure I was not "detached" from the code which is prone to happen when only prompting. Since I will present this code and the reasoning behind it I wanted to reduce the use of Claude until the foundation was fully laid out. I introduced Claude using Claude Code where I developed the filtering feature, the unit list, generated more test data etc. I also used Claude to document the project.

### Figma AI
I'm no designer, so I used Figma AI to get me going on a basic dashboard layout. I started out by surveying the available data, create an intention about which views I'd like to display to the landlord. I then used these views in my prompts to Figma.

## Consideration & Assumptions

My initial thoughts would be to use GraphQL and Apollo Client to allow for future data needs to the dashboard, since sending multiple HTTP requests to custom API endpoints would create overhead, while using Apollo's BatchHttpLink would allow us to execute multiple queries in one request.

I'm choosing Next.js due to the need for simple API endpoints. I'll also completely disabled SSR to allow for a client only React component dynamic, and not to focus on the dynamic between server- and client side dynamic at this point.

I'll use shadcn/ui and Tailwind CSS since I'm very familiar with it, and since it create a good foundation to future work as well as giving a basic level of WCAG-compliance.

I'm using Figma AI to get some initial inspiration on how to present the data. While waiting for Figma to generate the sketches I converted the Hybel-logo from PNG to vector, as a nice design-touch to get the basic branding in place.

I'll use CSS grids for flexible arrangement of the different widget elements, and I'll try to avoid wrapper divs inside the various components, so that each visible element is directly placed in the grid, not inside a wrapper container.

I also considered to use the opportunity to explore the use of [Convex.dev](https://convex.dev/) to easily allow for realtime data via websockets. For this case I chose to use [TanStack Query](https://tanstack.com/query/latest).

For table display I would use [TanStack Table](https://tanstack.com/table/latest) since it is a headless solution and we retain control over the presentation layer, but given the time constraint I'll do a more simple implementation using shadcn/ui.

The mock API routes include artificial delays (250–400ms) to simulate real-world network latency. This makes it possible to see and verify the loading states — skeleton placeholders for initial loads, and a subtle opacity fade with a spinner for background refetches (e.g. when filters change).

### Dark mode

Dark mode is fully functional, powered by [`next-themes`](https://github.com/pacocoursey/next-themes) which handles theme persistence and system preference detection. All components use semantic Tailwind tokens (`text-foreground`, `text-muted-foreground`, `bg-muted`, `border-border`) that adapt automatically, with explicit `dark:` variants for the colored icon backgrounds in portfolio metrics where semantic tokens don't apply.

### Internationalization (i18n)

Dates and currencies are localized using `useLocale()` which falls back to the browser locale. Dates are parsed with `parseISO` from [`date-fns`](https://www.npmjs.com/package/date-fns) and displayed via a `<FormattedDate>` component, while currencies use `Intl.NumberFormat` via a `<Currency>` component. Currently the locale is hardcoded to `nb-NO`, but both components are designed to accept any locale — with a proper user object, the user could set their preferred locale in their profile, and it would flow through the existing `LocaleProvider` to all date and currency formatting automatically.

What's missing and what I'd do with more time:

- Using a package like [`react-intl`](https://www.npmjs.com/package/react-intl) for string translation
- Proper timezone handling — dates would be stored as UTC in the database and converted to the user's timezone on display. The locale context would be extended with a timezone field (from user preferences or browser), and `date-fns-tz` would handle the conversion so that lease expiry dates, for example, are shown correctly regardless of where the landlord is located.

## What was built

### Portfolio Metrics (`components/dashboard/portfolio-metrics/`)

Four metric cards showing total portfolio size, occupancy rate, monthly revenue, and pending actions — each with a descriptive subtitle for extra context. The pending actions card is clickable and scrolls to the pending actions panel.

### Collection Status (`components/dashboard/collection-status.tsx`)

A stacked bar chart showing the collection progress for the current month, broken down into paid, pending, and overdue amounts with color-coded segments and a legend.

### Unit List (`components/dashboard/unit-list/unit-list.tsx`)

A property-level breakdown showing each unit's address, tenant, rent, payment status, and lease expiry. Each row is expandable to reveal contract details and contextual actions (e.g. "Send payment reminder" for overdue units). Status badges use color coding — green for paid, amber for pending, red for overdue, gray for vacant/maintenance.

### Filtering & Sorting

Landlords can filter units by status (occupied/vacant/maintenance), payment status (paid/pending/overdue), and expiring leases (within 90 days). Sorting is available by address, rent, and lease expiry in both directions. Filtering is handled server-side by the API endpoint, and the filter state is persisted to the URL via [`nuqs`](https://nuqs.47ng.com/) so that filtered views are shareable and survive page refreshes.

The decision to filter server-side (rather than client-side) was deliberate — as the portfolio grows, the API should be the one narrowing the result set. The mock API validates query params and returns only matching units, which mirrors how a production endpoint would behave.

### Pending Actions (`components/dashboard/pending-actions.tsx`)

Surfaces actionable issues (overdue payments, expiring contracts, vacant units) in a dedicated panel. Each action is clickable and scrolls to the relevant unit in the list, auto-expanding it with a brief highlight. The **Upcoming Expirations** widget uses the same click-to-scroll interaction. Both use a simple `highlightedUnitId` state lifted to the dashboard level.

### Structured Address type

Addresses are modeled as structured objects (`line1`, `line2`, `zip`, `city`, `country`) rather than plain strings. Formatting helpers (`formatAddress`, `formatAddressShort`) handle display, which makes it straightforward to adapt to different display contexts or locales.

### Accessibility (WCAG)

- All interactive elements (unit rows, pending action items, upcoming expiration rows, clickable metric cards) are keyboard-navigable with `tabIndex`, `role="button"`, and Enter/Space key handlers
- Expandable rows communicate state via `aria-expanded`
- Filter toggles use `aria-pressed` to convey active state
- Sort buttons include `aria-label` with current direction
- The collection status bar chart has `role="img"` with a descriptive `aria-label`
- The filtered unit count uses `aria-live="polite"` so screen readers announce changes

### Code organization

Separation of concerns and single source of truth are principles I value highly and have tried to follow throughout:

- **One component per file** — each component lives in its own file, making it easy to find, test, and reason about in isolation. Subcomponents (e.g. `FilterToggle`, `SortButton`, `StatusDot`) are extracted into separate files rather than inlined alongside their parent.
- **Shared display components** — `<Currency>` and `<FormattedDate>` encapsulate locale-aware formatting so that date and currency display logic isn't scattered across the codebase. Both resolve the locale through `useLocale()`, ensuring consistent formatting everywhere.
- **Centralized constants** — the default locale is defined once in `lib/config.ts` and imported wherever needed, rather than being hardcoded as string literals across files. Currency is always carried by the data itself (`CurrencyAmount` type), so there's no need for a default constant.
- **Formatting helpers** — address formatting (`formatAddress`, `formatAddressShort`), currency formatting (`formatCurrency`), and date formatting (`formatDate`) each live in dedicated utility files under `lib/`, keeping presentation logic out of components and API routes.
- **Types as contracts** — shared types in `types/` define the shape of API responses, ensuring the API routes and consuming components agree on the data structure.
- **Logic in hooks, not components** — component logic (data fetching, state management, filter actions, highlight coordination) is extracted into custom hooks (`useUnits`, `useExpandedUnit`, `useFilterBarActions`, `useUnitHighlight`, `useCollectionStatus`, etc.). This keeps components purely presentational and makes the logic independently testable — hooks can be unit tested with `renderHook` without needing to render and assert against JSX output, which is both simpler and more resilient to UI changes.

## What I would do with more time

- **Empty state for new landlords** — a welcoming illustration and onboarding CTA when the portfolio has zero properties
- **Pagination, search, or virtualization** — for landlords with large portfolios, the unit list should paginate (server-side), support search, or use virtual scrolling to stay performant
- **Error boundaries** — proper error UI with retry actions instead of the current "No data" fallback
- **TanStack Table** — as the filtering and sorting needs grow (e.g. multi-column sort, column visibility toggles), migrating to a headless table library would be more maintainable than hand-rolling
- **Unit tests** — Vitest with React Testing Library for testing hooks and components in isolation. The custom hooks (`useUnits`, `useFilterBarActions`, `useCollectionStatus`, etc.) can be tested with `renderHook` without rendering any UI, and presentational components can be tested with lightweight render assertions
- **End-to-end tests** — Playwright tests covering the filter-to-URL flow, the pending action scroll interaction, and keyboard navigation
- **Responsive refinements** — the filter bar wraps on mobile but could be improved with a collapsible filter drawer
- **Unit detail view** — the ability to navigate to a dedicated unit page (via URL, e.g. `/units/:id`) or open a modal dialog showing in-depth information such as payment history, tenant history, contract changes, maintenance logs, and tenant communication
- **Date-based filtering** — allow landlords to filter collection status and payment data by month or date range, rather than always showing the current month

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