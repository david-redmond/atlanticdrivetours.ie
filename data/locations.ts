/**
 * County-level location landing pages for /ireland/[county].
 * Each county maps to related tours (by slug in data/tours.json) and has
 * its own intro, highlights and FAQs for local SEO.
 */

export type LocationFaq = { question: string; answer: string };

export type LocationHighlight = { name: string; description: string };

export type County = {
  slug: string;
  name: string;
  /** Page title / H1. */
  title: string;
  metaDescription: string;
  heroTagline: string;
  image: string;
  imageAlt: string;
  intro: string[];
  highlights: LocationHighlight[];
  /** Slugs into data/tours.json. */
  relatedTourSlugs: string[];
  /** Related commercial pillar slugs (e.g. "cobh-cruise-excursions") for internal linking. */
  relatedPillarSlugs?: string[];
  /** Related guide slugs (data/guides.ts) for internal linking. */
  relatedGuideSlugs?: string[];
  faqs: LocationFaq[];
};

export const counties: County[] = [
  {
    slug: "cork",
    name: "Cork",
    title: "Private Tours & Driver in County Cork",
    metaDescription:
      "Private day tours and a personal driver-guide in County Cork — Blarney Castle, Kinsale, Cobh and the Titanic trail. Ideal for cruise guests and Cork stays.",
    heroTagline: "Blarney, Kinsale & the Titanic trail at Cobh",
    image: "/images/cobh.jpeg",
    imageAlt: "Colourful waterfront houses in Cobh, County Cork",
    intro: [
      "County Cork is Ireland's largest county and one of its most rewarding — from the gourmet harbour town of Kinsale to Blarney Castle's famous stone and the Titanic heritage of Cobh.",
      "With a private driver-guide you see it all at your own pace, with door-to-door comfort and timing built around you. For cruise guests arriving at Cobh or Ringaskiddy, we plan the day around your ship and guarantee a relaxed return.",
    ],
    highlights: [
      { name: "Blarney Castle & Gardens", description: "Kiss the Blarney Stone and explore the gardens and grounds." },
      { name: "Kinsale", description: "Ireland's gourmet capital — colourful streets, harbour views and great food." },
      { name: "Cobh", description: "The Titanic's last port of call, with a striking cathedral and deepwater harbour." },
      { name: "Cork city & the English Market", description: "A lively city with one of Europe's finest covered food markets." },
    ],
    relatedTourSlugs: ["cork-blarney-kinsale-cobh-private-tour"],
    relatedPillarSlugs: ["cobh-cruise-excursions"],
    relatedGuideSlugs: ["cobh-cruise-port-shore-day-guide"],
    faqs: [
      { question: "Do you collect from the cruise terminal at Cobh?", answer: "Yes. We meet you at the Cobh or Ringaskiddy terminal, plan the day around your shore window, and guarantee you're back in good time for departure." },
      { question: "Can you combine Cork with Kerry or Clare?", answer: "Yes, over more than one day. A single day is best spent within Cork; ask us about multi-day private itineraries across the south and west." },
      { question: "How many people can you take?", answer: "Up to 7–8 guests in one vehicle, with larger groups arranged on request." },
    ],
  },
  {
    slug: "kerry",
    name: "Kerry",
    title: "Private Tours & Driver in County Kerry",
    metaDescription:
      "Private day tours and a personal driver-guide in County Kerry — Ring of Kerry, Dingle Peninsula, Killarney National Park and the Skellig coast.",
    heroTagline: "Ring of Kerry, Dingle & Killarney National Park",
    image: "/images/ring-of-kerry.jpg",
    imageAlt: "Ring of Kerry coastal and mountain scenery, County Kerry",
    intro: [
      "County Kerry is the jewel of the Wild Atlantic Way — home to the Ring of Kerry, the Dingle Peninsula, Killarney National Park and the otherworldly Skellig coast.",
      "A private driver-guide is the best way to experience Kerry: no coach crowds, no rushing, and local knowledge of where the light falls and where the quiet roads lead.",
    ],
    highlights: [
      { name: "Ring of Kerry", description: "The classic Iveragh Peninsula loop — cliffs, passes and harbour villages." },
      { name: "Dingle Peninsula & Slea Head", description: "Beehive huts, Atlantic beaches and Ireland's most photogenic coastal drive." },
      { name: "Killarney National Park", description: "Ladies View, Torc Waterfall, lakes and mountains." },
      { name: "Skellig coast", description: "Views to the Skellig islands, of monastic and silver-screen fame." },
    ],
    relatedTourSlugs: ["ring-of-kerry-private-tour", "dingle-peninsula-private-tour"],
    relatedPillarSlugs: ["wild-atlantic-way"],
    relatedGuideSlugs: ["ring-of-kerry-vs-dingle"],
    faqs: [
      { question: "Ring of Kerry or Dingle — which is better?", answer: "Both are superb. The Ring of Kerry is grander and longer; Dingle is more intimate with arguably the best coastal drive. With two days you can do both." },
      { question: "Where do you pick up in Kerry?", answer: "We usually pick up in Killarney, with Kerry Airport, Tralee and other points arranged on request." },
      { question: "Is it suitable for older travellers and families?", answer: "Yes. Walking is optional at most stops and child seats are available — we tailor the day to your group." },
    ],
  },
  {
    slug: "clare",
    name: "Clare",
    title: "Private Tours & Driver in County Clare",
    metaDescription:
      "Private day tours and a personal driver-guide in County Clare — the Cliffs of Moher, the Burren, Doolin and Bunratty Castle on the Wild Atlantic Way.",
    heroTagline: "Cliffs of Moher, the Burren & Bunratty",
    image: "/images/cliffs-of-moher.jpg",
    imageAlt: "The Cliffs of Moher on the Wild Atlantic Way, County Clare",
    intro: [
      "County Clare delivers some of Ireland's most iconic scenery — the towering Cliffs of Moher, the lunar limestone landscape of the Burren, the trad-music village of Doolin and medieval Bunratty Castle.",
      "Just a short drive from Shannon Airport, Clare is perfect for a private day tour with your own driver-guide, whether you're arriving, departing, or basing yourself in the west.",
    ],
    highlights: [
      { name: "Cliffs of Moher", description: "Ireland's most famous sea cliffs, rising 214 metres above the Atlantic." },
      { name: "The Burren", description: "A vast, otherworldly limestone landscape with rare flora and ancient tombs." },
      { name: "Doolin", description: "A village famed for traditional Irish music and as a ferry point to the Aran Islands." },
      { name: "Bunratty Castle & Folk Park", description: "A beautifully restored medieval castle with a living-history folk park." },
    ],
    relatedTourSlugs: ["cliffs-of-moher-bunratty"],
    relatedPillarSlugs: ["wild-atlantic-way"],
    relatedGuideSlugs: [
      "how-to-visit-cliffs-of-moher",
      "cliffs-of-moher-vs-ring-of-kerry",
      "shannon-airport-transfers",
    ],
    faqs: [
      { question: "How far is Clare from Shannon Airport?", answer: "Very close — the Cliffs of Moher are roughly an hour from Shannon, making Clare ideal for an arrival- or departure-day tour." },
      { question: "Can you combine the Cliffs with Bunratty?", answer: "Yes — our signature Clare day pairs the Cliffs of Moher with Bunratty Castle and the Durty Nelly's area." },
      { question: "Is there much walking at the Cliffs?", answer: "There's a paved path with optional longer walks; you can enjoy the main viewpoints with very little walking." },
    ],
  },
  {
    slug: "limerick",
    name: "Limerick",
    title: "Private Tours & Driver in County Limerick",
    metaDescription:
      "Private day tours and a personal driver-guide in County Limerick — Adare village, King John's Castle and a gateway to the Cliffs of Moher and the Wild Atlantic Way.",
    heroTagline: "Adare, King John's Castle & the Wild Atlantic gateway",
    image: "/images/tours/cliffs-of-moher-bunratty/bunratty-castle.jpg",
    imageAlt: "Bunratty Castle near the Limerick and Clare border",
    intro: [
      "County Limerick blends history and charm — from the medieval King John's Castle on the River Shannon to Adare, often called Ireland's prettiest village, and the luxury of Adare Manor.",
      "Limerick is also a natural base for the Wild Atlantic Way: with a private driver-guide you can reach the Cliffs of Moher, the Burren and Kerry with ease, and we cover golf and executive transfers throughout the region.",
    ],
    highlights: [
      { name: "Adare village", description: "Thatched cottages and one of Ireland's most picturesque main streets." },
      { name: "Adare Manor", description: "A five-star estate and host venue for the 2027 Ryder Cup." },
      { name: "King John's Castle", description: "A 13th-century castle on the banks of the River Shannon in Limerick city." },
      { name: "Gateway to the west", description: "An easy base for the Cliffs of Moher, the Burren and County Kerry." },
    ],
    relatedTourSlugs: ["cliffs-of-moher-bunratty"],
    relatedPillarSlugs: ["golf-transfers-ireland", "adare-manor-ryder-cup-2027"],
    relatedGuideSlugs: ["shannon-airport-transfers", "ireland-golf-trip-planner"],
    faqs: [
      { question: "Can you do golf transfers in Limerick?", answer: "Yes — golf transfers are a core specialty, including Adare Manor and clubs across the region, timed around your tee times." },
      { question: "Is Adare worth visiting?", answer: "Absolutely — Adare is one of Ireland's prettiest villages and pairs well with a day toward the Cliffs of Moher or Kerry." },
      { question: "Can you collect from Shannon Airport?", answer: "Yes. Shannon is close to Limerick and we offer meet-and-greet airport transfers and tours from there." },
    ],
  },
  {
    slug: "galway",
    name: "Galway",
    title: "Private Tours & Driver in County Galway",
    metaDescription:
      "Private day tours and a personal driver-guide in County Galway — Galway city, Connemara, Kylemore Abbey and the wild west coast of Ireland.",
    heroTagline: "Galway city, Connemara & Kylemore Abbey",
    image: "/gallery/02.jpg",
    imageAlt: "Wild Atlantic Way coastal scenery in the west of Ireland",
    intro: [
      "County Galway is the cultural heart of the west — a vibrant, music-filled city beside the wild beauty of Connemara, with its mountains, lakes, bogland and the romantic Kylemore Abbey.",
      "A private driver-guide lets you balance city and wilderness on your own terms, from Galway's medieval streets to the coast road through Connemara.",
    ],
    highlights: [
      { name: "Galway city", description: "A lively, walkable city of music, food and medieval lanes." },
      { name: "Connemara", description: "Dramatic mountains, lakes and bog — the wild soul of the west." },
      { name: "Kylemore Abbey", description: "A romantic lakeside abbey and Victorian walled garden." },
      { name: "Wild Atlantic Way coast", description: "Sweeping ocean drives north and south from Galway." },
    ],
    relatedTourSlugs: [
      "connemara-kylemore-private-tour",
      "cliffs-of-moher-bunratty",
    ],
    relatedPillarSlugs: ["wild-atlantic-way"],
    faqs: [
      { question: "Can you tour Connemara from Galway?", answer: "Yes — a Connemara and Kylemore Abbey day is a wonderful private tour from Galway city. Ask us when you enquire." },
      { question: "Can you combine Galway with the Cliffs of Moher?", answer: "Yes. The Cliffs of Moher are within reach to the south; we can plan a coastal day that links Galway and Clare." },
      { question: "Do you pick up in Galway city?", answer: "Yes — door-to-door pickup from Galway hotels and accommodation, with other points by arrangement." },
    ],
  },
];

export function getCountySlugs(): string[] {
  return counties.map((c) => c.slug);
}

export function getCounty(slug: string): County | undefined {
  return counties.find((c) => c.slug === slug);
}
