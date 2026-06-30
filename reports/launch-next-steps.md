# Atlantic Drive Tours — Launch & Next Steps

_Generated: 30 Jun 2026 · Site version: `0.3.0` · Domain: `https://www.atlanticdrivetours.ie`_

The full plan (technical SEO, new content, CRO, accessibility, GA4 events) is implemented and the
production build is clean (39 pages). Browser QA found and fixed four real bugs (invisible
scroll-reveal content, doubled page titles, off-brand `/about` hero, mislabeled Dingle gallery image).

This document is the runbook to take the site live and start recovering rankings + leads.

---

## 0. Pre-deploy checklist (do these first)

| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Set **`NEXT_PUBLIC_GA_ID`** in the production environment (build-time) so GA loads on static pages | Owner/Dev | ☐ |
| 2 | Confirm **`RESEND_API_KEY`** + from/to addresses are set in production | Owner/Dev | ☐ |
| 3 | Confirm DNS / hosting points at the new build and `https://www.atlanticdrivetours.ie` resolves (the 5xx errors that took the site down are gone) | Owner/Dev | ☐ |
| 4 | Deploy `0.3.0` to production | Dev | ☐ |
| 5 | Smoke-test live: home, `/tours`, a tour detail, `/ireland/cork`, `/guides`, submit one test enquiry (owner email + guest auto-reply both arrive) | Owner/Dev | ☐ |

> Note: `force-dynamic` was removed so pages are now statically generated (good for Core Web Vitals
> and crawl recovery). The trade-off is that GA must be configured at **build time** via
> `NEXT_PUBLIC_GA_ID` — a runtime-only value will not be injected into static HTML.

---

## 1. Google Search Console — resubmission (the #1 recovery action)

The site was offline since 1 June and GSC showed minimal indexation + 5xx errors. After deploy:

### 1a. Sitemap
- Submit / resubmit the sitemap in GSC: **`https://www.atlanticdrivetours.ie/sitemap.xml`**
- It now lists all routes below with `lastModified` timestamps.
- Confirm `robots.txt` is reachable: `https://www.atlanticdrivetours.ie/robots.txt`

### 1b. Validate the fix for the old errors
- In **GSC → Pages**, open the **5xx / server error** and **crawled – not indexed** issues and click
  **Validate Fix** so Google re-crawls the previously broken URLs.

### 1c. Priority URLs for "Request Indexing" (URL Inspection tool)
Request indexing in this order (highest commercial/recovery value first). GSC limits manual
requests per day, so work top-down over a few days.

**Tier 1 — money + recovery (request first)**
```
https://www.atlanticdrivetours.ie/
https://www.atlanticdrivetours.ie/tours
https://www.atlanticdrivetours.ie/transfers
https://www.atlanticdrivetours.ie/experiences
https://www.atlanticdrivetours.ie/about
https://www.atlanticdrivetours.ie/reviews
https://www.atlanticdrivetours.ie/contact
```

**Tier 2 — high-intent tour & service pages**
```
https://www.atlanticdrivetours.ie/tours/cliffs-of-moher-bunratty
https://www.atlanticdrivetours.ie/tours/ring-of-kerry-private-tour
https://www.atlanticdrivetours.ie/tours/dingle-peninsula-private-tour
https://www.atlanticdrivetours.ie/tours/cork-blarney-kinsale-cobh-private-tour
https://www.atlanticdrivetours.ie/wild-atlantic-way
https://www.atlanticdrivetours.ie/cobh-cruise-excursions
https://www.atlanticdrivetours.ie/golf-transfers-ireland
https://www.atlanticdrivetours.ie/adare-manor-ryder-cup-2027
```

**Tier 3 — local landing pages (county cluster)**
```
https://www.atlanticdrivetours.ie/ireland
https://www.atlanticdrivetours.ie/ireland/cork
https://www.atlanticdrivetours.ie/ireland/kerry
https://www.atlanticdrivetours.ie/ireland/clare
https://www.atlanticdrivetours.ie/ireland/limerick
https://www.atlanticdrivetours.ie/ireland/galway
```

**Tier 4 — content hub (guides / topic clusters)**
```
https://www.atlanticdrivetours.ie/guides
https://www.atlanticdrivetours.ie/guides/best-time-to-visit-ireland
https://www.atlanticdrivetours.ie/guides/how-to-visit-cliffs-of-moher
https://www.atlanticdrivetours.ie/guides/ring-of-kerry-vs-dingle
https://www.atlanticdrivetours.ie/guides/cobh-cruise-port-shore-day-guide
```

---

## 2. Owner action checklist (can't be done in code — these drive trust + leads)

| Priority | Item | Why it matters | Where |
|----------|------|----------------|-------|
| 🔴 P0 | **Driver-guide bio**: real name, photo, years of experience, SPSV licence #, advanced-driving / first-aid certs | #1 E-E-A-T trust signal; "private driver-guide" is the core value prop | `app/about/page.tsx` ("Meet your driver-guide" section) |
| 🔴 P0 | **Google Business Profile**: claim/verify, set service area to Cork/Kerry/Clare/Limerick/Galway, add photos, post regularly | Top local lead source; powers Maps + "near me" queries | external |
| 🔴 P0 | **Review generation**: ask recent guests for Google reviews (send the GBP review link after each trip) | Social proof + local ranking. Needed before any `AggregateRating` schema is added | external |
| 🟠 P1 | **Real branded photography/video** to replace reused stock; a proper **1200×630 OG image** at `/public/og/default.jpg` | Conversion + better link previews on social/WhatsApp | `public/og/default.jpg`, `lib/seo.ts` |
| 🟠 P1 | **List on 1–2 OTAs** (TripAdvisor Experiences, GetYourGuide or Viator) | Additional discovery + booking channel + review velocity | external |
| 🟡 P2 | **WhatsApp Business** set up with a saved quick-reply / catalogue for fast speed-to-lead | Faster response = higher conversion | external |

---

## 3. Measurement — confirm leads are tracked

Once `NEXT_PUBLIC_GA_ID` is live, verify these GA4 events fire (Realtime / DebugView):

- `enquiry_started` — first interaction with the enquiry form
- `generate_lead` — successful enquiry submission (mark as a **conversion** in GA4)
- `whatsapp_click`, `phone_click`, `cta_click` — contact intent
- `tour_view` — tour detail page views

Set `generate_lead` (and optionally `whatsapp_click` / `phone_click`) as **Key Events / Conversions**
in GA4 Admin so you can measure cost-per-lead and channel performance.

---

## 4. Suggested 30-day cadence

- **Week 1:** Deploy, GSC sitemap + Validate Fix + Tier 1–2 indexing, GBP claimed, driver bio added.
- **Week 2:** Tier 3–4 indexing, first review requests sent, OG image + a few real photos in.
- **Week 3:** First OTA listing live, WhatsApp Business quick-replies set, GA4 conversions confirmed.
- **Week 4:** Review GSC coverage (pages indexed), GA4 leads, and decide on a small paid-search pilot
  for high-intent terms (e.g. "private cliffs of moher tour", "cobh cruise excursion").
