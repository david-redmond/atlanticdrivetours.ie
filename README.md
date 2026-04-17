# Atlantic Drive Tours — website

Marketing site for **Atlantic Drive Tours**: private day tours, transfers, gallery, and booking enquiries. Built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## Features

- Tour listing and **dynamic tour pages** from [`data/tours.json`](data/tours.json) (`/tours/[slug]`)
- Contact and reservation forms with **[Resend](https://resend.com)** email APIs
- Optional **GA4** after cookie consent (`NEXT_PUBLIC_GA_ID`)
- SEO: per-page metadata, [`app/sitemap.ts`](app/sitemap.ts), [`app/robots.ts`](app/robots.ts)
- Legacy URLs `/day-tours` redirect to `/tours` ([`next.config.ts`](next.config.ts))

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy [`.env.example`](.env.example) to `.env.local` and set:

- `RESEND_API_KEY`, `EMAIL_TO`, `EMAIL_FROM` — for live email (see Resend docs for verified sender domain)
- `NEXT_PUBLIC_GA_ID` — optional GA4 measurement ID

Restart the dev server after changing `.env.local`.

For **Docker** images, pass `NEXT_PUBLIC_GA_ID` at **build** time (it is inlined when `next build` runs), for example: `docker build --build-arg NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX -t your-image .`

## Content

- **Tours:** edit [`data/tours.json`](data/tours.json); detail pages are generated automatically from each `slug`.
- **Theme:** CSS variables in [`app/globals.css`](app/globals.css).
- **Constants / nav / socials:** [`lib/constants.ts`](lib/constants.ts).

## Scripts

| Command   | Description        |
| --------- | ------------------ |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Production server |
| `npm run lint` | ESLint             |

## License

Use per your project policy.
