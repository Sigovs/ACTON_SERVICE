/**
 * GENERATED — do not edit by hand.
 *
 * Parsed verbatim from content/design strat up/docs/content/04-electrical-systems.md by scripts/extract-service-content.mjs, which
 * fails if the token sequence diverges from the source. Re-run that script
 * after any change to the source.
 */
export type Block =
  | { type: "paragraph"; text: string }
  | { type: "section"; heading: string; paragraphs: string[]; items: string[] };

export type Faq = { question: string; answer: string };

export const PAGE_TITLE = "Electrical Systems Diagnostics & Service in Acton, MA";

export const BLOCKS: Block[] = [
  {
    "type": "paragraph",
    "text": "Modern vehicles rely on complex electrical systems to run everything from the engine to the dashboard, and even a small fault can lead to bigger problems if it’s ignored. At Acton Autowerks, our technicians diagnose and repair vehicle electrical and electronic issues, including dashboards and faulty gauges, for drivers across Acton and MetroWest."
  },
  {
    "type": "section",
    "heading": "Our Electrical Services",
    "paragraphs": [],
    "items": [
      "Battery replacement",
      "Audio and interior electronic repair",
      "Dashboard and gauge repair",
      "Software updates"
    ]
  },
  {
    "type": "paragraph",
    "text": "Electrical faults can be tricky to track down because a single symptom, such as a dead battery, a flickering gauge, or an unresponsive screen, can have several possible causes. We take the time to diagnose the root of the problem rather than just treating the symptom, so you’re not back in the shop for the same issue a month later."
  },
  {
    "type": "section",
    "heading": "Electronics on European Vehicles",
    "paragraphs": [
      "Today’s European cars are especially electronics-heavy, with advanced control modules, sensors, and software throughout the vehicle. As European car specialists, we’re comfortable working through these systems and keeping their software current, whether you drive a BMW, Porsche, Audi, or another make."
    ],
    "items": []
  },
  {
    "type": "section",
    "heading": "Why Acton Drivers Trust Us",
    "paragraphs": [
      "With over 20 years of combined experience and a reputation built on honesty, we explain what we find and what it will take to fix it, with no guesswork billing and no upselling. If your electrical issue overlaps with other work, we’ll help you prioritize it sensibly alongside your regular maintenance and service."
    ],
    "items": []
  }
];

export const FAQS: Faq[] = [
  {
    "question": "Why does my dashboard warning light keep coming on?",
    "answer": "Warning lights can point to anything from a sensor fault to a genuine mechanical issue. We’ll run diagnostics to find the real cause and explain it clearly before any repair."
  },
  {
    "question": "Can you replace my car battery?",
    "answer": "Yes. We test and replace batteries and can check the charging system at the same time to make sure a weak alternator isn’t the underlying problem."
  },
  {
    "question": "Do you fix audio and interior electronics?",
    "answer": "We do, from audio systems to interior electronic components. Bring it in and we’ll diagnose the issue."
  },
  {
    "question": "Can you perform software updates on my vehicle?",
    "answer": "Yes, we handle software updates as part of our electrical and electronics services, including on European models."
  }
];

export const CTA_HEADING = "Schedule an Appointment Today";

export const CTA_LINES: string[] = [
  "Call Us: 978-429-8913"
];
