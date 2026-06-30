/**
 * Editorial guides (topic-cluster content) at /guides and /guides/[slug].
 * Each guide links to related tours, county pages and pillars to strengthen
 * the internal topic cluster and feed conversions.
 */

export type GuideSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

/** Short, direct answer shown in a highlighted box near the top — optimised for
 * featured snippets and AI answer engines (AEO/GEO). */
export type GuideTakeaway = {
  /** The question/term being answered, e.g. "Cliffs of Moher or Ring of Kerry?" */
  question: string;
  /** A concise, self-contained answer (1–3 sentences). */
  answer: string;
};

/** Simple comparison table — great for "X vs Y" intent and AI extraction. */
export type GuideComparison = {
  caption?: string;
  columns: string[];
  rows: string[][];
};

export type HowToStep = { name: string; text: string };

export type Guide = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  datePublished: string;
  readingMinutes: number;
  intro: string[];
  /** Optional answer box rendered after the intro (AEO/featured-snippet bait). */
  keyTakeaway?: GuideTakeaway;
  sections: GuideSection[];
  /** Optional comparison table rendered after the sections. */
  comparison?: GuideComparison;
  /** Optional ordered steps — emits HowTo structured data when present. */
  howToSteps?: HowToStep[];
  faqs: { question: string; answer: string }[];
  relatedTourSlugs: string[];
  relatedCountySlugs: string[];
  relatedPillarSlugs: string[];
};

export const guides: Guide[] = [
  {
    slug: "best-time-to-visit-ireland",
    title: "The Best Time to Visit Ireland (Month-by-Month Guide)",
    metaDescription:
      "When is the best time to visit Ireland? A month-by-month guide to weather, crowds, daylight and events on the Wild Atlantic Way — and how to plan your private tour.",
    excerpt:
      "Weather, crowds, daylight and festivals — a practical month-by-month guide to choosing when to visit Ireland's west coast.",
    category: "Planning",
    image: "/images/ring-of-kerry.jpg",
    imageAlt: "Ring of Kerry scenery in the changing Irish light",
    datePublished: "2026-06-01",
    readingMinutes: 6,
    intro: [
      "There's no single 'best' time to visit Ireland — it depends on what you want. Long days and lively villages? Come in summer. Quieter roads, golden light and lower prices? Spring and autumn are hard to beat.",
      "Here's an honest month-by-month look at weather, crowds and daylight on the Wild Atlantic Way, so you can plan a private tour at the right time for you.",
    ],
    sections: [
      {
        heading: "Spring (March–May): our quiet favourite",
        body: [
          "Spring is a sweet spot. The countryside greens up, gardens bloom, lambs dot the fields, and the tour buses haven't arrived in force. Days lengthen quickly and the light is beautiful for photography.",
        ],
        bullets: [
          "Fewer crowds at the Cliffs of Moher and Ring of Kerry",
          "Pleasant temperatures (8–15°C) but pack layers",
          "St Patrick's weekend in March is festive but busy",
        ],
      },
      {
        heading: "Summer (June–August): long days, big atmosphere",
        body: [
          "Summer brings the longest days — up to 17 hours of daylight in June — warm-ish weather, and the fullest calendar of festivals and trad music. It's also the busiest and priciest season, so book tours and transfers early.",
        ],
        bullets: [
          "Best weather odds and the longest daylight",
          "Busiest at honeypot sights — a private tour helps you beat the coaches",
          "Cruise season is in full swing at Cobh",
        ],
      },
      {
        heading: "Autumn (September–October): light and value",
        body: [
          "Many regulars say autumn is the best time of all. The summer crowds thin, prices ease, the light turns golden, and the weather often stays mild well into October.",
        ],
      },
      {
        heading: "Winter (November–February): moody and uncrowded",
        body: [
          "Winter is atmospheric — dramatic skies, cosy pubs with open fires, and the Cliffs almost to yourself. Days are short (as little as 7–8 hours of light) and some attractions reduce hours, so itineraries need careful planning, which is where a private driver-guide earns their keep.",
        ],
      },
    ],
    faqs: [
      { question: "What is the warmest month in Ireland?", answer: "July and August are typically the warmest, averaging around 15–20°C, though Ireland's Atlantic climate means you should always pack layers and a rain jacket." },
      { question: "When is Ireland least crowded?", answer: "Late autumn through early spring (November–March) is quietest, with spring and autumn offering the best balance of good conditions and fewer crowds." },
      { question: "Does it rain all the time in Ireland?", answer: "Rain is common year-round but usually comes in short bursts. That changeable weather is exactly what keeps Ireland so green — and a private tour lets you adapt the day around it." },
    ],
    relatedTourSlugs: ["ring-of-kerry-private-tour", "cliffs-of-moher-bunratty"],
    relatedCountySlugs: ["kerry", "clare"],
    relatedPillarSlugs: ["wild-atlantic-way"],
  },
  {
    slug: "how-to-visit-cliffs-of-moher",
    title: "How to Visit the Cliffs of Moher: A Complete Guide",
    metaDescription:
      "Everything you need to know to visit the Cliffs of Moher — when to go, how to avoid the crowds, what to wear, and the best way to combine it with the Burren and Bunratty.",
    excerpt:
      "When to go, how to beat the crowds, and the best way to pair the Cliffs of Moher with the Burren and Bunratty Castle.",
    category: "Destinations",
    image: "/images/cliffs-of-moher.jpg",
    imageAlt: "The Cliffs of Moher rising above the Atlantic in County Clare",
    datePublished: "2026-06-01",
    readingMinutes: 7,
    intro: [
      "The Cliffs of Moher are Ireland's most visited natural attraction — and for good reason. Rising 214 metres above the Atlantic and stretching 14 kilometres along the County Clare coast, they're breathtaking in any weather.",
      "Here's how to make the most of a visit, including the timing tricks that keep you a step ahead of the coach crowds.",
    ],
    keyTakeaway: {
      question: "What's the best way to visit the Cliffs of Moher?",
      answer:
        "Visit in the early morning or late afternoon to avoid the midday coach crowds, dress for exposed, changeable weather, and allow 1.5–2 hours at the cliffs. The easiest way is a private day tour that times your visit and pairs the cliffs with the Burren and Bunratty Castle.",
    },
    howToSteps: [
      {
        name: "Pick the right time of day",
        text: "Aim for early morning or late afternoon to sidestep the late-morning to mid-afternoon coach crowds for quieter views and better light.",
      },
      {
        name: "Dress for the cliff-edge weather",
        text: "Bring a windproof, waterproof jacket, layers and grippy walking shoes — the clifftop is exposed and changeable even on bright days.",
      },
      {
        name: "Allow enough time at the cliffs",
        text: "Plan 1.5–2 hours to enjoy the viewing platforms, visitor centre and a short clifftop walk.",
      },
      {
        name: "Combine it with the Burren and Bunratty",
        text: "Pair the Cliffs of Moher with the Burren's lunar landscape and medieval Bunratty Castle for a complete County Clare day, with lunch along the way.",
      },
    ],
    sections: [
      {
        heading: "When to go to beat the crowds",
        body: [
          "The Cliffs get busiest from late morning to mid-afternoon, when day-trip coaches arrive. Early morning and late afternoon are quieter, calmer and far better for photos.",
          "As a private tour, we time your visit to sidestep the busiest window — one of the biggest advantages over a fixed-schedule coach tour.",
        ],
      },
      {
        heading: "What to wear and bring",
        body: [
          "The cliff-edge weather is exposed and changeable. Dress for wind and the chance of rain even on a bright day.",
        ],
        bullets: [
          "Windproof, waterproof jacket and layers",
          "Comfortable, grippy walking shoes",
          "Camera and a secure strap (it's breezy)",
        ],
      },
      {
        heading: "Combine it with the Burren and Bunratty",
        body: [
          "The Cliffs pair perfectly with County Clare's other highlights. Our signature day links the Cliffs of Moher with the lunar landscape of the Burren and medieval Bunratty Castle, with lunch along the way.",
        ],
      },
      {
        heading: "Visiting from Shannon or a cruise ship",
        body: [
          "The Cliffs are about an hour from Shannon Airport, making them ideal for an arrival or departure day. Cruise guests calling at Cobh can reach them too, though it's a longer day — we'll advise honestly based on your shore window.",
        ],
      },
    ],
    faqs: [
      { question: "How long do you need at the Cliffs of Moher?", answer: "Allow 1.5–2 hours to enjoy the viewing platforms, the visitor centre and a short clifftop walk. As part of a private day tour we tailor the time to you." },
      { question: "What's the best time of day to visit?", answer: "Early morning or late afternoon are quietest and best for light. We plan your visit to avoid the busy midday coach window." },
      { question: "Can you visit the Cliffs of Moher from Shannon Airport?", answer: "Yes — they're roughly an hour away, which makes them perfect for an arrival- or departure-day private tour." },
    ],
    relatedTourSlugs: ["cliffs-of-moher-bunratty"],
    relatedCountySlugs: ["clare", "limerick"],
    relatedPillarSlugs: ["wild-atlantic-way"],
  },
  {
    slug: "ring-of-kerry-vs-dingle",
    title: "Ring of Kerry vs Dingle Peninsula: Which Should You Choose?",
    metaDescription:
      "Ring of Kerry or Dingle Peninsula? An honest comparison of scenery, driving, crowds and time needed — and how to decide (or do both) on a private Kerry tour.",
    excerpt:
      "Two of Ireland's greatest drives, compared honestly — scenery, crowds, time needed, and how to choose the right one for your trip.",
    category: "Destinations",
    image: "/gallery/05.jpg",
    imageAlt: "Coastal scenery on the Dingle Peninsula in County Kerry",
    datePublished: "2026-06-01",
    readingMinutes: 6,
    intro: [
      "It's the classic Kerry dilemma: the famous Ring of Kerry, or the smaller, wilder Dingle Peninsula? Both are spectacular, and there's no wrong answer — but they offer different experiences.",
      "Here's an honest comparison to help you choose, from someone who drives both regularly.",
    ],
    keyTakeaway: {
      question: "Ring of Kerry or Dingle Peninsula?",
      answer:
        "Pick the Ring of Kerry for a grand, varied full-day loop and the headline name. Pick the Dingle Peninsula for a more intimate day with arguably Ireland's finest coastal drive (Slea Head) and rich Gaeltacht culture. With two days, do both — they complement each other perfectly.",
    },
    comparison: {
      caption: "Ring of Kerry vs Dingle Peninsula at a glance",
      columns: ["", "Ring of Kerry", "Dingle Peninsula"],
      rows: [
        ["Scale", "Larger, grander full loop", "Smaller, more intimate"],
        ["Scenery", "Varied: park, cliffs, villages", "Slea Head — Ireland's best coast drive"],
        ["Time on road", "More driving", "More relaxed, less driving"],
        ["Crowds", "Busier, better-known", "Quieter, wilder feel"],
        ["Culture", "Classic Kerry villages", "Living Irish-language Gaeltacht"],
        ["Ideal for", "First-timers wanting the icon", "Repeat visitors and photographers"],
      ],
    },
    sections: [
      {
        heading: "The Ring of Kerry: grand and iconic",
        body: [
          "The Ring of Kerry loops the Iveragh Peninsula — a longer, grander circuit taking in Killarney National Park, the Kerry Cliffs, mountain passes and harbour villages. It's the better-known of the two and deservedly so.",
        ],
        bullets: [
          "Bigger, more varied scenery across a full loop",
          "More to see: national park, cliffs, villages",
          "Busier — timing matters to stay ahead of coaches",
        ],
      },
      {
        heading: "The Dingle Peninsula: intimate and wild",
        body: [
          "Dingle is smaller, more intimate and, many would argue, has the single best coastal drive in Ireland along Slea Head. Add ancient beehive huts, a charming harbour town and a living Irish-language culture.",
        ],
        bullets: [
          "Arguably Ireland's finest coastal drive (Slea Head)",
          "More relaxed and less time on the road",
          "Rich Gaeltacht (Irish-speaking) culture",
        ],
      },
      {
        heading: "So which should you pick?",
        body: [
          "Short on time and want the headline experience? Choose the Ring of Kerry. Prefer something more intimate with the best coastal views? Choose Dingle. Have two days? Do both — they complement each other perfectly, and a private tour makes combining them effortless.",
        ],
      },
    ],
    faqs: [
      { question: "Can you do both the Ring of Kerry and Dingle in one day?", answer: "It's possible but rushed. We recommend a day for each to enjoy them properly. With two days we plan a relaxed private itinerary covering both." },
      { question: "Which is better for photography?", answer: "Both are stunning. Dingle's Slea Head Drive is often considered the most photogenic coastal stretch in Ireland, while the Ring of Kerry offers more variety." },
      { question: "Are the roads difficult to drive?", answer: "They include narrow, winding sections — another reason many visitors prefer a local driver-guide so they can relax and enjoy the views." },
    ],
    relatedTourSlugs: ["ring-of-kerry-private-tour", "dingle-peninsula-private-tour"],
    relatedCountySlugs: ["kerry"],
    relatedPillarSlugs: ["wild-atlantic-way"],
  },
  {
    slug: "cobh-cruise-port-shore-day-guide",
    title: "Cobh Cruise Port: How to Plan the Perfect Shore Day",
    metaDescription:
      "A practical guide to making the most of a cruise call at Cobh (Cork), Ireland — what to see, how far you can go, and how to guarantee you're back before the ship sails.",
    excerpt:
      "Calling at Cobh on a cruise? Here's how to plan a shore day you'll remember — and get back to the ship with time to spare.",
    category: "Cruise",
    image: "/images/cobh.jpeg",
    imageAlt: "The cruise port of Cobh in County Cork, Ireland",
    datePublished: "2026-06-01",
    readingMinutes: 5,
    intro: [
      "Cobh (pronounced 'Cove') is one of Ireland's most charming ports of call and the gateway to County Cork. With a single day ashore, a little planning turns it into a trip highlight.",
      "Here's how to make the most of your shore day — and the golden rule for never missing the all-aboard.",
    ],
    sections: [
      {
        heading: "How far can you realistically go?",
        body: [
          "Most ships are in port for 8–10 hours. That's comfortably enough for the County Cork classics — Blarney, Kinsale and Cobh itself — with time to spare. Going as far as Kerry is possible on a long call but leaves less margin.",
        ],
        bullets: [
          "Blarney Castle — about 30–40 minutes from port",
          "Kinsale — around 45 minutes, ideal for lunch",
          "Cork city and the English Market — close by",
        ],
      },
      {
        heading: "Private tour vs ship excursion",
        body: [
          "Ship excursions are convenient but move large groups on a fixed schedule. A private shore tour is just your party, fully tailored, and we meet you right at the terminal — often better value for what you actually see.",
        ],
      },
      {
        heading: "The golden rule: build in a buffer",
        body: [
          "Never cut it fine. We plan every shore day around your exact all-aboard time with a comfortable buffer, monitor your schedule, and stay reachable — so you can relax and enjoy Ireland, not watch the clock.",
        ],
      },
    ],
    faqs: [
      { question: "How long are ships usually docked at Cobh?", answer: "Typically 8–10 hours, which is plenty of time for a relaxed private tour of County Cork's highlights." },
      { question: "Do you pick up right at the cruise terminal?", answer: "Yes — we meet you at the Cobh terminal or the Ringaskiddy berth with a name sign, and return you in good time for departure." },
      { question: "What if we can't dock and have to tender?", answer: "We monitor your ship and adjust the day to your actual time ashore, so a late or tendered arrival doesn't spoil the plan." },
    ],
    relatedTourSlugs: ["cork-blarney-kinsale-cobh-private-tour"],
    relatedCountySlugs: ["cork"],
    relatedPillarSlugs: ["cobh-cruise-excursions"],
  },
  {
    slug: "shannon-airport-transfers",
    title: "Shannon Airport Transfers: To the Cliffs of Moher, Limerick & Kerry",
    metaDescription:
      "A practical guide to private transfers from Shannon Airport (SNN) — to the Cliffs of Moher, Limerick, Clare and Kerry. Arrival-day tours, timing and what to expect.",
    excerpt:
      "Flying into Shannon? Here's how to turn your arrival or departure day into a private tour, and what to know about transfers across the south-west.",
    category: "Transfers",
    image: "/images/transfers/meet-and-greet-heathrow-terminal-2.jpg",
    imageAlt: "Private meet-and-greet airport transfer in Ireland",
    datePublished: "2026-06-15",
    readingMinutes: 5,
    intro: [
      "Shannon Airport (SNN) is the gateway to the west of Ireland — within easy reach of the Cliffs of Moher, the Burren, Limerick, Adare and County Kerry. With a private transfer, your arrival or departure day can become part of the holiday rather than dead time.",
      "Here's how guests typically use Shannon, and how we plan transfers and arrival-day tours around your flight.",
    ],
    sections: [
      {
        heading: "What's within reach of Shannon",
        body: [
          "Shannon's location makes it ideal for an arrival- or departure-day tour. The Cliffs of Moher are roughly an hour away, and Bunratty Castle is minutes from the airport.",
        ],
        bullets: [
          "Cliffs of Moher — about an hour from Shannon",
          "Bunratty Castle & Folk Park — minutes away, perfect on arrival day",
          "Limerick city and Adare village — close and easy",
          "County Kerry (Killarney) — a scenic transfer to the south-west",
        ],
      },
      {
        heading: "Arrival-day tour vs straight transfer",
        body: [
          "If you land in the morning, you can break up the journey to your hotel with a relaxed stop — Bunratty on the way to Limerick, or the Cliffs en route to the coast. If you'd rather rest, we'll get you door-to-door in comfort.",
        ],
      },
      {
        heading: "Timing and meet & greet",
        body: [
          "We track your flight and adjust for delays, meet you in arrivals with a name sign, and help with luggage. For departures we build in a sensible buffer so you reach the airport relaxed and on time.",
        ],
      },
    ],
    faqs: [
      { question: "Can you meet us inside the terminal?", answer: "Yes. We offer meet-and-greet in the arrivals hall with a name sign, or kerbside pickup if you prefer. We monitor your flight and adjust for delays." },
      { question: "Can we visit the Cliffs of Moher on the way from Shannon?", answer: "Absolutely — a Cliffs of Moher arrival-day tour is popular. We'll plan it around your flight time and onward accommodation." },
      { question: "Do you cover transfers to Kerry and Killarney?", answer: "Yes. We provide private transfers from Shannon to Killarney and across Kerry, with scenic stops by arrangement." },
      { question: "Is there space for luggage and golf clubs?", answer: "Yes — our vehicles have ample space. Let us know your group size and number of bags when you enquire." },
    ],
    relatedTourSlugs: ["cliffs-of-moher-bunratty"],
    relatedCountySlugs: ["clare", "limerick", "kerry"],
    relatedPillarSlugs: ["golf-transfers-ireland"],
  },
  {
    slug: "ireland-golf-trip-planner",
    title: "Planning a Golf Trip to the South-West of Ireland",
    metaDescription:
      "How to plan a golf trip to the south-west of Ireland — the great links courses, how to get between them, tee-time logistics, and adding rest-day sightseeing.",
    excerpt:
      "From Ballybunion to Adare Manor, here's how to plan a smooth golf trip across the south-west of Ireland — including transfers and rest days.",
    category: "Golf",
    image: "/images/transfers/Journal5_GolfTravel_82f90905-3f34-4cdd-82db-03a195eb23ba_1024x1024.webp",
    imageAlt: "Golf travel transfer for a links golf trip in Ireland",
    datePublished: "2026-06-15",
    readingMinutes: 6,
    intro: [
      "The south-west of Ireland is one of the world's great golfing regions, packing championship links into a compact, drivable area. The difference between a good golf trip and a great one is often the logistics — and that's where a private driver earns their keep.",
      "Here's how to think about courses, routing and rest days when planning your trip.",
    ],
    sections: [
      {
        heading: "The courses",
        body: [
          "A classic south-west itinerary strings together several links over a few days, with a luxury inland stop at Adare Manor.",
        ],
        bullets: [
          "Ballybunion, Lahinch and Tralee — iconic links",
          "Old Head of Kinsale and Waterville — dramatic coastal golf",
          "Adare Manor — host of the 2027 Ryder Cup",
          "Doonbeg (Trump International) and Dromoland",
        ],
      },
      {
        heading: "Routing and tee times",
        body: [
          "Courses can be an hour or more apart, and early tee times mean early starts. A private driver who knows the routes keeps you relaxed between rounds, carries the clubs and luggage, and adapts when play runs long.",
        ],
      },
      {
        heading: "Build in a rest day",
        body: [
          "Most groups add a sightseeing day mid-trip — the Cliffs of Moher, Ring of Kerry or Dingle — and it's a great way to bring non-golfing partners along. We can run a tour for the group while you play, too.",
        ],
      },
    ],
    faqs: [
      { question: "How many courses can we play in a week?", answer: "A relaxed week comfortably fits four to six rounds with travel and a rest day. We'll help you sequence courses to minimise driving." },
      { question: "Do you carry clubs and luggage?", answer: "Yes — our vehicles have ample space for full sets and suitcases. Tell us your group size and number of bags when you enquire." },
      { question: "Can you get us to Adare Manor?", answer: "Yes, including for the 2027 Ryder Cup. We recommend booking transfers early as demand will be exceptional." },
      { question: "Can non-golfers do something while we play?", answer: "Definitely. We can run a private sightseeing tour for partners and family while you're on the course." },
    ],
    relatedTourSlugs: ["ring-of-kerry-private-tour", "cliffs-of-moher-bunratty"],
    relatedCountySlugs: ["kerry", "clare", "limerick"],
    relatedPillarSlugs: ["golf-transfers-ireland", "adare-manor-ryder-cup-2027"],
  },
  {
    slug: "cliffs-of-moher-vs-ring-of-kerry",
    title: "Cliffs of Moher vs Ring of Kerry: Which Day Tour to Choose",
    metaDescription:
      "Cliffs of Moher or Ring of Kerry? A practical comparison of Ireland's two most famous day tours — scenery, driving, crowds and which suits your trip.",
    excerpt:
      "Two of Ireland's most iconic days out, compared — so you can pick the right private tour for your time, base and travel style.",
    category: "Planning",
    image: "/images/Cliffs-of-Moher-1.jpg",
    imageAlt: "The Cliffs of Moher, County Clare, Ireland",
    datePublished: "2026-06-15",
    readingMinutes: 6,
    intro: [
      "If you only have time for one big day out, the choice often comes down to the Cliffs of Moher (with County Clare) or the Ring of Kerry. Both are spectacular, but they suit different trips.",
      "Here's an honest comparison to help you decide — or to plan both over two days.",
    ],
    keyTakeaway: {
      question: "Cliffs of Moher or Ring of Kerry — which should you choose?",
      answer:
        "Choose the Cliffs of Moher with County Clare if you're near Shannon or Galway and want Ireland's most famous sea cliffs with less driving. Choose the Ring of Kerry if you're based in the south-west and want a full day of sweeping, ever-changing scenery. With two days you can comfortably do both.",
    },
    comparison: {
      caption: "Cliffs of Moher vs Ring of Kerry at a glance",
      columns: ["", "Cliffs of Moher & Clare", "Ring of Kerry"],
      rows: [
        ["Best base", "Shannon, Limerick, Galway", "Killarney, Kenmare, Kerry"],
        ["Day style", "One headline sight + castle & coast", "A full scenic loop with many stops"],
        ["Driving", "Less total driving", "Longer day in the vehicle"],
        ["Crowds", "Busy midday — we time around it", "Busy — direction & timing matter"],
        ["Pairs well with", "Burren, Bunratty, Doolin", "Dingle Peninsula (2nd day)"],
        ["Ideal for", "First-time visitors, arrival days", "Epic scenery, south-west bases"],
      ],
    },
    sections: [
      {
        heading: "Cliffs of Moher & County Clare",
        body: [
          "The Cliffs of Moher are Ireland's most famous sea cliffs, and a Clare day pairs them beautifully with Bunratty Castle, the Burren and trad-music Doolin. It's close to Shannon Airport, making it ideal for arrival or departure days.",
        ],
        bullets: [
          "Best for: first-time visitors and those near Shannon/Galway",
          "A single headline sight plus castle and coast",
          "Less total driving than the Ring of Kerry",
        ],
      },
      {
        heading: "The Ring of Kerry",
        body: [
          "The Ring of Kerry is a full loop of the Iveragh Peninsula — a longer day of continuously changing scenery, mountain passes, harbour villages and coastal views. It's grander in scale and best from a Kerry/Killarney base.",
        ],
        bullets: [
          "Best for: those based in Kerry or wanting epic scenery",
          "A day of driving with many stops, not one big sight",
          "Pairs naturally with the Dingle Peninsula over two days",
        ],
      },
      {
        heading: "How to choose",
        body: [
          "Short on time or near Shannon? Choose the Cliffs and Clare. Based in Kerry, or after the most dramatic scenery? Choose the Ring. With two days, do both — or swap the Ring for the more intimate Dingle Peninsula.",
        ],
      },
    ],
    faqs: [
      { question: "Which is better for a first visit to Ireland?", answer: "If you're near Shannon or Galway and want the most famous view, the Cliffs of Moher with County Clare is hard to beat. The Ring of Kerry is ideal if you're based in the south-west and want sweeping scenery." },
      { question: "Can we do both?", answer: "Yes, over two days. They're in different counties, so we'd plan a logical route — often Clare one day and Kerry (or Dingle) another." },
      { question: "Which involves more driving?", answer: "The Ring of Kerry is a longer loop with more time in the vehicle; the Cliffs of Moher day is more compact with a headline stop plus castle and coast." },
    ],
    relatedTourSlugs: ["cliffs-of-moher-bunratty", "ring-of-kerry-private-tour"],
    relatedCountySlugs: ["clare", "kerry"],
    relatedPillarSlugs: ["wild-atlantic-way"],
  },
];

export function getGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
