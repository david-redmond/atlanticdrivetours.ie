/**
 * Commercial pillar / service landing pages. Each renders via components/PillarPage.tsx
 * at its own clean URL. Pillars link out to related tours and county pages to build
 * an internal topic cluster.
 */

export type PillarSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type Pillar = {
  slug: string;
  eyebrow: string;
  title: string;
  metaDescription: string;
  heroTagline: string;
  image: string;
  imageAlt: string;
  intro: string[];
  sections: PillarSection[];
  relatedTourSlugs: string[];
  relatedCountySlugs: string[];
  /** Related guide slugs for cross-cluster internal linking. */
  relatedGuideSlugs?: string[];
  /** Enquiry serviceType to prefill on the reservation form (must match the validators enum). */
  serviceParam?: string;
  faqs: { question: string; answer: string }[];
};

export const pillars: Record<string, Pillar> = {
  "wild-atlantic-way": {
    slug: "wild-atlantic-way",
    serviceParam: "Multi-day Tour",
    relatedGuideSlugs: [
      "best-time-to-visit-ireland",
      "ring-of-kerry-vs-dingle",
      "how-to-visit-cliffs-of-moher",
      "cliffs-of-moher-vs-ring-of-kerry",
    ],
    eyebrow: "Signature route",
    title: "Wild Atlantic Way Private Tours",
    metaDescription:
      "Explore the Wild Atlantic Way with a private driver-guide — Cliffs of Moher, Ring of Kerry, Dingle and Connemara. Tailored multi-day and day tours across the west of Ireland.",
    heroTagline:
      "2,500 km of Atlantic coast, at your own pace, with your own driver-guide",
    image: "/images/cliffs-of-moher.jpg",
    imageAlt: "Cliffs of Moher on the Wild Atlantic Way",
    intro: [
      "The Wild Atlantic Way is the world's longest defined coastal touring route — over 2,500 kilometres of cliffs, peninsulas, beaches and villages along Ireland's western seaboard.",
      "With Atlantic Drive Tours you experience the best of it privately: no coaches, no fixed schedule, and a local driver-guide who knows the road, the stories and the light. We focus on the south-western stretch — Clare, Limerick, Kerry, Cork and Galway — as day tours or a tailored multi-day journey.",
    ],
    sections: [
      {
        heading: "What makes a private Wild Atlantic Way tour different",
        body: [
          "Coach tours rush the highlights and skip the quiet places. A private tour is built entirely around you — your interests, your pace, and your group only.",
        ],
        bullets: [
          "Door-to-door pickup from your hotel, B&B or cruise ship",
          "Flexible routing — linger where you love, move on where you don't",
          "Local driver-guide with stories, photo stops and insider spots",
          "Comfortable luxury vehicle with Wi‑Fi and bottled water",
        ],
      },
      {
        heading: "The best stretches of the route",
        body: [
          "Each county along the south-west offers something distinct. Most guests combine two or three over a few days, or pick one as a full-day tour.",
        ],
        bullets: [
          "County Clare — the Cliffs of Moher and the Burren",
          "County Kerry — the Ring of Kerry and the Dingle Peninsula",
          "County Galway — Connemara, Kylemore Abbey and the coast road",
          "County Cork — Kinsale, the harbour and the southern coast",
        ],
      },
      {
        heading: "Day tour or multi-day journey?",
        body: [
          "If you have one day, we focus on a single iconic stretch — the Cliffs of Moher, the Ring of Kerry, or Dingle. With three to five days we craft a flowing route along the coast with hotels of your choosing, so you wake up somewhere new and beautiful each morning.",
          "Tell us how long you have and what matters most, and we'll design the journey around it.",
        ],
      },
    ],
    relatedTourSlugs: [
      "cliffs-of-moher-bunratty",
      "ring-of-kerry-private-tour",
      "dingle-peninsula-private-tour",
    ],
    relatedCountySlugs: ["clare", "kerry", "galway", "cork"],
    faqs: [
      { question: "How many days do you need for the Wild Atlantic Way?", answer: "A single day covers one iconic stretch beautifully. To enjoy the south-west — Clare, Kerry and Cork — three to five days is ideal, which we plan as a private multi-day journey." },
      { question: "Can you start from Shannon, Cork or Dublin airports?", answer: "We start from Shannon, Cork and Kerry airports and from your accommodation in the west and south. We don't cover Dublin, as it's outside our service area." },
      { question: "Is the Wild Atlantic Way suitable for all ages?", answer: "Yes. Most highlights are roadside or short walks, and we tailor the pace and stops to your group, including families and older travellers." },
    ],
  },
  "cobh-cruise-excursions": {
    slug: "cobh-cruise-excursions",
    serviceParam: "Cruise Transfer",
    relatedGuideSlugs: ["cobh-cruise-port-shore-day-guide"],
    eyebrow: "Cruise shore excursions",
    title: "Cobh & Cork Cruise Shore Excursions",
    metaDescription:
      "Private shore excursions from the Cobh and Cork cruise terminal — Blarney Castle, Kinsale, Cork city and Kerry. Guaranteed timing back to your ship.",
    heroTagline:
      "Private shore tours timed to your ship — never miss the all-aboard",
    image: "/images/cobh.jpeg",
    imageAlt: "Cruise port town of Cobh, County Cork",
    intro: [
      "When your ship calls at Cobh (Cork), a private shore excursion turns a single day into the highlight of your cruise. Skip the crowded ship tours and see County Cork — or beyond — on your own terms.",
      "We meet you right at the Cobh or Ringaskiddy terminal, plan the day around your exact shore window, and guarantee a relaxed return with time to spare before departure.",
    ],
    sections: [
      {
        heading: "Why book a private excursion over a ship tour",
        body: [
          "Ship excursions move large groups on a rigid schedule. A private tour is just your party, fully tailored, and almost always better value for what you see.",
        ],
        bullets: [
          "Meet directly at the Cobh / Ringaskiddy terminal",
          "Your party only — no waiting on a coach full of strangers",
          "Itinerary built around your interests and time ashore",
          "Guaranteed return well before all-aboard",
        ],
      },
      {
        heading: "Popular shore-day itineraries from Cobh",
        body: [
          "Most guests choose a relaxed loop of County Cork's highlights, but with a full day ashore there's flexibility to go further.",
        ],
        bullets: [
          "Blarney Castle, Kinsale and Cobh — the classic Cork day",
          "Cork city and the English Market with Blarney",
          "Kinsale in depth — food, harbour and history",
          "Longer days toward Kerry, time and tides permitting",
        ],
      },
      {
        heading: "Timing you can trust",
        body: [
          "Missing your ship is every cruiser's fear — and our first priority. We track your schedule, keep a comfortable buffer, and stay reachable throughout the day so you can relax and enjoy Ireland.",
        ],
      },
    ],
    relatedTourSlugs: ["cork-blarney-kinsale-cobh-private-tour"],
    relatedCountySlugs: ["cork", "kerry"],
    faqs: [
      { question: "Where exactly do you meet cruise guests?", answer: "We meet you at the Cobh cruise terminal or the Ringaskiddy deepwater berth, whichever your ship uses, with a clear name sign." },
      { question: "What if our ship is delayed arriving?", answer: "No problem — we monitor your ship and adjust the day accordingly. You only pay for the day as planned." },
      { question: "Will we definitely make it back in time?", answer: "Yes. We build the route around your all-aboard time with a comfortable buffer, and keep in contact throughout the day." },
      { question: "How big are the groups?", answer: "Private to your party only, up to 7–8 guests per vehicle, with larger groups arranged on request." },
    ],
  },
  "golf-transfers-ireland": {
    slug: "golf-transfers-ireland",
    serviceParam: "Golf Transfers",
    relatedGuideSlugs: ["ireland-golf-trip-planner"],
    eyebrow: "Golf travel",
    title: "Golf Transfers & Tours in Ireland",
    metaDescription:
      "Premium private golf transfers across the south-west of Ireland — Ballybunion, Lahinch, Tralee, Old Head, Adare Manor and more. Tee-time scheduling and luggage space for clubs.",
    heroTagline:
      "Tee-time scheduling, room for the clubs, and a driver who knows the courses",
    image: "/images/transfers/Journal5_GolfTravel_82f90905-3f34-4cdd-82db-03a195eb23ba_1024x1024.webp",
    imageAlt: "Golf group minibus transfer in Ireland",
    intro: [
      "Ireland's south-west is home to some of the world's great links courses, and getting between them should be effortless. Golf transfers are a core specialty for us — for fourballs, societies and corporate golf days alike.",
      "We schedule around your tee times, carry the clubs and luggage with ease, and our drivers know the courses, the clubhouses and the quickest routes between them.",
    ],
    sections: [
      {
        heading: "Courses we serve",
        body: [
          "From championship links to hidden gems, we cover the south-west's finest. Multi-course and multi-day itineraries are our bread and butter.",
        ],
        bullets: [
          "Ballybunion, Lahinch and Tralee links",
          "Old Head of Kinsale and Waterville",
          "Adare Manor — host of the 2027 Ryder Cup",
          "Dromoland, Doonbeg (Trump International) and more",
        ],
      },
      {
        heading: "Built for golfers",
        body: [
          "Everything about the service is designed around a golf trip's rhythm.",
        ],
        bullets: [
          "Tee-time friendly scheduling and early starts",
          "Ample space for clubs and luggage",
          "Multi-course and multi-day itineraries",
          "Corporate golf days and society outings welcome",
        ],
      },
      {
        heading: "Pair golf with sightseeing",
        body: [
          "Travelling with non-golfers, or want a rest day? We can run a Cliffs of Moher, Ring of Kerry or Dingle tour for the group while you play, or build sightseeing into your itinerary between rounds.",
        ],
      },
    ],
    relatedTourSlugs: ["ring-of-kerry-private-tour", "cliffs-of-moher-bunratty"],
    relatedCountySlugs: ["kerry", "clare", "limerick"],
    faqs: [
      { question: "Can you carry full sets of clubs and luggage?", answer: "Yes. Our vehicles have ample space for golf bags and suitcases. Tell us your group size and number of bags when you enquire and we'll assign the right vehicle." },
      { question: "Do you schedule around tee times?", answer: "Always. We plan pickups and routes around your tee times and clubhouse arrival, including early starts." },
      { question: "Can you handle a multi-course, multi-day golf trip?", answer: "Absolutely — multi-course and multi-day itineraries are a specialty, including transfers, hotels coordination and rest-day sightseeing." },
      { question: "Do you cover Adare Manor?", answer: "Yes, including Adare Manor, host of the 2027 Ryder Cup. We expect strong demand and recommend booking transfers early." },
    ],
  },
  "adare-manor-ryder-cup-2027": {
    slug: "adare-manor-ryder-cup-2027",
    serviceParam: "Golf Transfers",
    relatedGuideSlugs: ["ireland-golf-trip-planner"],
    eyebrow: "2027 Ryder Cup",
    title: "Adare Manor & the 2027 Ryder Cup — Private Transport",
    metaDescription:
      "Private transport and golf transfers for the 2027 Ryder Cup at Adare Manor, County Limerick. Airport transfers, daily course shuttles and tailored itineraries — book early.",
    heroTagline:
      "Seamless private transport for the 2027 Ryder Cup at Adare Manor",
    image: "/images/transfers/Journal5_GolfTravel_82f90905-3f34-4cdd-82db-03a195eb23ba_1024x1024.webp",
    imageAlt: "Private golf transport for the 2027 Ryder Cup at Adare Manor, County Limerick",
    intro: [
      "In September 2027, the Ryder Cup comes to Adare Manor in County Limerick — one of the biggest sporting events ever held in Ireland. Demand for premium private transport will be exceptional, and the best way to guarantee a stress-free week is to plan early.",
      "Atlantic Drive Tours offers private airport transfers, daily course transport and tailored sightseeing for groups attending the 2027 Ryder Cup, all from a base that knows the region inside out.",
    ],
    sections: [
      {
        heading: "How we'll get you to Adare Manor",
        body: [
          "Whether you fly into Shannon, Cork or Kerry, we coordinate every leg of your visit so you arrive relaxed and on time.",
        ],
        bullets: [
          "Meet-and-greet airport transfers from Shannon, Cork and Kerry",
          "Daily private transport to and from Adare Manor",
          "Hotel-to-course shuttles for groups and corporate parties",
          "Evening transfers to dinners and events",
        ],
      },
      {
        heading: "Make a week of it",
        body: [
          "Adare is the gateway to the Wild Atlantic Way. Build rest days around the golf with private tours to the Cliffs of Moher, the Ring of Kerry or Dingle — perfect for travelling companions and non-golfers.",
        ],
      },
      {
        heading: "Why book early",
        body: [
          "Vehicles and drivers across the region will be in extremely high demand for Ryder Cup week. Registering your interest now secures your transport and lets us plan the ideal itinerary before availability tightens.",
        ],
      },
    ],
    relatedTourSlugs: ["cliffs-of-moher-bunratty", "ring-of-kerry-private-tour"],
    relatedCountySlugs: ["limerick", "kerry", "clare"],
    faqs: [
      { question: "When is the 2027 Ryder Cup at Adare Manor?", answer: "The Ryder Cup is scheduled for September 2027 at Adare Manor in County Limerick, Ireland." },
      { question: "Can you provide transport for the whole week?", answer: "Yes — airport transfers, daily course transport, evening event transfers and rest-day sightseeing, tailored to your group." },
      { question: "Which airports do you serve for Adare Manor?", answer: "Shannon is closest, with Cork and Kerry also convenient. We provide meet-and-greet transfers from all three." },
      { question: "How early should we book?", answer: "As early as possible. Demand for premium transport during Ryder Cup week will be exceptional, so we recommend registering your interest well in advance." },
    ],
  },
};

export function getPillar(slug: string): Pillar | undefined {
  return pillars[slug];
}

export function getPillarSlugs(): string[] {
  return Object.keys(pillars);
}
