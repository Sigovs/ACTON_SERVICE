/**
 * GENERATED — do not edit by hand.
 *
 * Parsed verbatim from content/design strat up/docs/content/06-transmission.md by scripts/extract-service-content.mjs, which
 * fails if the token sequence diverges from the source. Re-run that script
 * after any change to the source.
 */
export type Block =
  | { type: "paragraph"; text: string }
  | { type: "section"; heading: string; paragraphs: string[]; items: string[] };

export type Faq = { question: string; answer: string };

export const PAGE_TITLE = "Transmission Service in Acton, MA";

export const BLOCKS: Block[] = [
  {
    "type": "paragraph",
    "text": "Your transmission is one of the hardest-working systems in your vehicle, and catching problems early can save you from a much larger repair. At Acton Autowerks, we offer a full range of transmission services for cars and trucks and can help with just about any issue you come across, across Acton and MetroWest."
  },
  {
    "type": "section",
    "heading": "Our Transmission Services",
    "paragraphs": [],
    "items": [
      "Transmission inspection",
      "Transmission diagnostics",
      "Clutch replacements and upgrades",
      "Transmission repair and replacement",
      "Transmission fluid service",
      "Transmission filter replacement"
    ]
  },
  {
    "type": "section",
    "heading": "Signs You May Need Transmission Service",
    "paragraphs": [
      "If your vehicle is making strange noises, has difficulty changing gears, sticks in a certain gear, or is leaking fluid underneath, we recommend having your transmission diagnosed sooner rather than later. A quick diagnostic can tell us whether you’re looking at a simple fluid service or something that needs deeper attention, and we’ll tell you honestly which it is."
    ],
    "items": []
  },
  {
    "type": "section",
    "heading": "Why Acton Drivers Trust Us",
    "paragraphs": [
      "With over 20 years of combined experience, our team has built a 4.9-star reputation on transparent, no-upsell service. We’re known as European car specialists in BMW, Land Rover, Audi, Porsche, Mercedes-Benz and more, but we service transmissions on most makes and models, from clutch upgrades to full replacements. Whatever your car needs, we’ll explain your options clearly before any work begins."
    ],
    "items": []
  }
];

export const FAQS: Faq[] = [
  {
    "question": "How do I know if my transmission needs service?",
    "answer": "Common signs include slipping or hard shifts, unusual noises, sticking in gear, or fluid leaking under the car. If you notice any of these, it’s worth having it diagnosed."
  },
  {
    "question": "How often should transmission fluid be changed?",
    "answer": "It varies by vehicle and driving conditions. We can check your fluid’s condition and follow your manufacturer’s recommended interval so you’re neither servicing too early nor too late."
  },
  {
    "question": "Do you replace and upgrade clutches?",
    "answer": "Yes. We handle clutch replacements and upgrades and can talk through which clutch suits your driving style and vehicle."
  },
  {
    "question": "Can you service European car transmissions?",
    "answer": "Absolutely. European vehicles are our specialty, and we regularly service and repair their transmissions alongside all other makes."
  }
];

export const CTA_HEADING = "Schedule an Appointment Today";

export const CTA_LINES: string[] = [
  "Call Us: 978-429-8913"
];
