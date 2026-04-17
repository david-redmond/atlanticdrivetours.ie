# Atlantic Drive Tours — website

Marketing site for **Atlantic Drive Tours**: private day tours, transfers, gallery, and booking enquiries. Built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## Features

- Tour listing and **dynamic tour pages** from [`data/tours.json`](data/tours.json) (`/tours/[slug]`)
- Contact and reservation forms with **[Resend](https://resend.com)** email APIs
- Optional **GA4** after cookie consent (`GA_MEASUREMENT_ID` at runtime, or `NEXT_PUBLIC_GA_ID` for build/dev)
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
- `GA_MEASUREMENT_ID` — optional GA4 ID (recommended for Docker Compose: set under `environment`, no rebuild)
- `NEXT_PUBLIC_GA_ID` — optional; same ID for local `next dev` or if you inject GA at **image build** time

Restart the dev server after changing `.env.local`.

For **Docker**, the image is **multi-stage** and listens on **port 3000** inside the container (`node server.js`). Map the host port explicitly, e.g. `ports: ["3300:3000"]`. Set **`GA_MEASUREMENT_ID`** (not `NEXT_PUBLIC_GA_ID`) in Compose so GA works **without** rebuilding the image. Optional build-time GA: `docker build --build-arg NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX -t your-image .`

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
