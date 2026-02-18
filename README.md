# Hybel Dashboard
This repo contains a self-contained dashboard widget that displays rental unit portfolio insight to landlords.

## The use of AI-tools
*Claude Code*

*Figma AI*
I'm no designer, so I used Figma AI to get me going on a basic dashboard layout. I started out by surveying the available data, create an intention about which views I'd like to display to the landlord. I then used these views in my prompts to Figma.

## Consideration & Assumptions
My initial thoughts would be to use GraphQL and Apollo Client to allow for growing data needs to the dashboard, since sending multiple HTTP requests to custom API endpoints would create overhead, while using Apollo's BatchHttpLink would allow us to execute multiple queries in one request.

I'm choosing Next.js due to the need for simple API endpoints. I'll also completely disabled SSR to allow for a client only React component dynamic, and not to focus on the dynamic between server- and client side dynamic at this point.

I'll use shadcn/ui and Tailwind CSS since I'm very familiar with it, and since it create a good foundation to future work as well as giving a basic level of WCAG-compliance.

I'm using Figma AI to get some initial inspiration on how to present the data. While waiting for Figma to generate the sketches I converted the Hybel-logo from PNG to vector, as a nice design-touch to get the basic branding in place.

I'll use CSS grids for flexible arrangement of the different widget elements, and I'll try to avoid wrapper divs so that each visible element is directly placed within the grid, not inside a "sub-container".

I also considered to use the opportunity to explore the use of [Convex.dev](https://convex.dev/) to easily allow for realtime data via websockets. Otherwise I would use [TanStack Query](https://tanstack.com/query/latest).

For table display I would use [TanStack Table](https://tanstack.com/table/latest) since it is a headless solution and we retain control over the presentation layer, but given the time constraint I'll do a more simple implementation using shadcn/ui.

I did not spend time on making dark mode work, but the toggle is present in the header. This is primarily about style configuration, and dark-mode support in the components, something that shadcn/ui facilitates for.

### Internationalization (i18n)
I skipped spending too much time on this, but in a real world scenario I'd consider:
- using a package like [`react-intl`](https://www.npmjs.com/package/react-intl) for string translation
- used UTC for storing dates in the backend, and used [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) to localize dates in the frontend according to the browser locale. If we need to deviate from the browser locale (for example to let the user set their own time zone), then I would use (`date-fns`)[https://www.npmjs.com/package/date-fns]. 
- For currency display I'd use [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). If we need to deviate from the browser locale (for example to let the user set their own currency) I'd created my own component, or looked into third party packages.


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