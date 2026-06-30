# Atlantic Drive Tours — Images & Video to Gather

_Generated: 1 Jul 2026 · A practical shot list to replace reused/stock imagery with real branded assets and add video._

This is prioritised. Tier 1 has the biggest impact on trust + conversions; work top-down. Filenames in `code font` match the paths the site already expects, so you (or we) can drop replacements straight in.

---

## Quick wins / placeholders to fix first

| Issue | Current file | Needs |
|-------|--------------|-------|
| Shannon airport guide shows a **Heathrow** photo | `/images/transfers/meet-and-greet-heathrow-terminal-2.jpg` | A real Shannon Airport arrivals / meet & greet shot |
| Golf + Adare pages reuse one **stock** golf image | `/images/transfers/Journal5_GolfTravel_...webp` | Distinct real golf photos (course + bags in vehicle) and an Adare Manor / Adare village shot |
| Several tours reuse generic gallery photos | `/gallery/02.jpg`, `04.jpg`, `05.jpg`, `06.jpg` | Tour-specific real photos (see Tier 3) |
| No branded social-share image | falls back to `/hero.jpg` | A proper 1200x630 OG image (Tier 1) |
| Galway county + Connemara tour have **no Kylemore Abbey** image | `/gallery/02.jpg` | A real Kylemore Abbey + Connemara shot |

---

## Tier 1 — Brand & people (highest trust / conversion value)

1. **Open Graph / social share image** — 1200x630, branded (hero landscape + logo + short tagline). Save as `/public/og/default.jpg`. Used on every page's link preview (Google, Facebook, WhatsApp).
2. **Driver-guide portrait** — friendly, professional headshot or beside the vehicle. This is the #1 E-E-A-T trust signal for "private driver-guide" and goes on the About page. Landscape + a vertical crop.
3. **Driver + guests candid** — a warm, natural shot of the driver helping/greeting guests (door open, luggage, scenic backdrop).

## Tier 2 — Vehicle & service (proof you deliver the promise)

4. **Vehicle exterior** — clean, premium, parked against a scenic Irish backdrop (coast or mountains). 2-3 angles.
5. **Vehicle interior** — seats / legroom, showing comfort and space.
6. **Luggage / boot space** — bags loaded (reassures airport + multi-day guests).
7. **Airport meet & greet at Shannon** — replaces the Heathrow placeholder. Name-board pickup if possible.
8. **Golf bags loaded in the vehicle** — replaces the stock golf image for the golf transfers page.
9. **Cruise pickup at Cobh** — vehicle/driver at the Cobh waterfront or cruise terminal.

## Tier 3 — Tour-specific photos (replace reused/gallery stock)

Aim for 4-6 real photos per tour. Current heroes/galleries in brackets.

- **Cliffs of Moher + Bunratty** (has a dedicated folder already — confirm these are real): Cliffs of Moher, O'Brien's Tower, Bunratty Castle, Burren landscape, Doolin.
- **Ring of Kerry** (reuses `/images/ring-of-kerry.jpg` + gallery): Kerry Cliffs, Killarney National Park, Ladies View, Sneem village, a mountain pass.
- **Dingle Peninsula** (reuses `/gallery/05-07.jpg`): Slea Head Drive, beehive huts, an Atlantic beach, Dingle town/harbour.
- **Cork / Blarney / Kinsale / Cobh** (reuses `cobh.jpeg` + a mislabeled Doolin photo): Blarney Castle, Kinsale colourful harbour, Cobh cathedral + waterfront.
- **Connemara & Kylemore Abbey** (no Kylemore image yet): Kylemore Abbey (priority), Connemara National Park, Sky Road, a lake/bog landscape.

## Tier 4 — County hub heroes (one strong image each)

Distinct landscape hero per county: **Cork, Kerry, Clare, Limerick, Galway**. Galway especially needs a real Galway/Connemara shot (currently a generic gallery image).

## Tier 5 — Specialist / pillar page heroes

- **Wild Atlantic Way** — a dramatic coastal/cliff hero.
- **Cobh cruise excursions** — a cruise ship at Cobh or the waterfront row of houses.
- **Golf transfers** — a recognisable course (Lahinch, Ballybunion or Old Head).
- **Adare Manor & 2027 Ryder Cup** — Adare Manor or the thatched-cottage village (replaces reused golf stock).

## Tier 6 — Gallery refresh

7+ high-quality, real branded landscape/experience shots to replace `/gallery/01-07.jpg` (these currently double as tour images, so refreshing them lifts multiple pages at once).

---

## Video to gather

Keep clips short, muted-friendly (they autoplay without sound), and shoot horizontal **and** vertical where noted.

1. **Hero background loop** — 10-20s, no audio needed, of a scenic coastal drive or the vehicle on a dramatic road. Horizontal 16:9, 1080p+. (Would sit behind the homepage hero.)
2. **Brand / intro film** — 60-90s for the homepage or About: driver introduction, vehicle, a few signature landscapes, one line on the "private, unrushed, your party only" promise.
3. **Signature tour teasers** — 15-30s per marquee tour (Cliffs, Ring of Kerry, Dingle) for tour pages, social and OTAs.
4. **Guest testimonial clips** — 1-2 short clips of real guests (huge trust + great for social/Google).
5. **Vertical social cuts (9:16)** — short reels for Instagram / WhatsApp status / TikTok, repurposed from the above.

### Practical specs
- **Photos:** highest resolution your camera/phone allows; deliver originals. Landscape for heroes/cards; also grab a few vertical for social. Avoid heavy filters.
- **Format:** JPG/PNG for photos (we can convert to web formats); MP4 (H.264) for video.
- **Rights:** only use photos/footage you own or have a licence for; guest faces need consent (especially for testimonials).
- **Naming:** descriptive, lowercase, hyphenated (e.g. `ring-of-kerry-kerry-cliffs.jpg`, `driver-guide-portrait.jpg`).

---

## Where these plug in (for reference)
- Homepage hero / OG fallback: `/hero.jpg`, `/public/og/default.jpg`
- Tours: `data/tours.json` (each tour's `images[]`)
- Counties: `data/locations.ts` (`image`)
- Pillars: `data/pillars.ts` (`image`)
- Guides: `data/guides.ts` (`image`)
- Gallery: `public/gallery/01-07.jpg`
- About / driver bio: `app/about/page.tsx`
