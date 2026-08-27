/**
 * GENERATED — do not edit by hand.
 *
 * Parsed verbatim from content/design strat up/docs/content/05-auto-body.md by scripts/extract-service-content.mjs, which
 * fails if the token sequence diverges from the source. Re-run that script
 * after any change to the source.
 */
export type Block =
  | { type: "paragraph"; text: string }
  | { type: "section"; heading: string; paragraphs: string[]; items: string[] };

export type Faq = { question: string; answer: string };

export const PAGE_TITLE = "Auto Body Services in Acton, MA";

export const BLOCKS: Block[] = [
  {
    "type": "paragraph",
    "text": "While we don’t have an onsite auto body facility, we do offer auto body services through trusted partners. We work with three separate auto body shops, each specializing in different types of work, so your vehicle is matched with the right team, and you can still drop off and pick up right here at Acton Autowerks."
  },
  {
    "type": "section",
    "heading": "Collision",
    "paragraphs": [
      "Having an accident is never a welcome experience, and we’re here to help make the aftermath easier. From written estimates to pickup and drop-off after a collision, we can handle it for you. You drop off and pick up at Acton Autowerks and we coordinate the rest, making it a genuine one-stop shop."
    ],
    "items": []
  },
  {
    "type": "section",
    "heading": "Restoration",
    "paragraphs": [
      "As car guys born and bred in New England, we know the dark side of owning vintage and classic European cars in the Northeast. We partner with two separate restoration shops: one on the New Hampshire Seacoast and one in the MetroWest area. From frame-off, rotisserie restorations to addressing missing jack points on a BMW, our guys can make it like new. If you have the time, we can help."
    ],
    "items": []
  },
  {
    "type": "section",
    "heading": "Related Body and Protection Services",
    "paragraphs": [],
    "items": [
      "Paintless dent removal",
      "Winterization",
      "Rust prevention",
      "Undercoating",
      "Lubrication"
    ]
  },
  {
    "type": "section",
    "heading": "Why Acton Drivers Trust Us",
    "paragraphs": [
      "With over 20 years of combined experience and a 4.9-star reputation built on honesty and communication, we’ll always tell you straight what your car needs and coordinate the right people to do it well. We specialize in European and luxury vehicles, and we treat every car that comes through our doors like our own."
    ],
    "items": []
  }
];

export const FAQS: Faq[] = [
  {
    "question": "Do you do auto body work onsite?",
    "answer": "We don’t have an onsite auto body facility, but we coordinate the work through three trusted partner shops and handle drop-off and pickup for you here at Acton Autowerks."
  },
  {
    "question": "Can you help after a collision?",
    "answer": "Yes. We assist with written estimates, drop-off and pickup, and coordinating the repair so you have one point of contact through the process."
  },
  {
    "question": "Do you handle classic and vintage European car restoration?",
    "answer": "We do, through two partner restoration shops, from full frame-off restorations to smaller structural details. Reach out and we’ll talk through what your project needs."
  },
  {
    "question": "What is paintless dent removal?",
    "answer": "It’s a method of removing minor dents and dings without repainting, which helps preserve your vehicle’s original finish. Ask us whether your dent is a good candidate."
  }
];

export const CTA_HEADING = "Schedule an Appointment Today";

export const CTA_LINES: string[] = [
  "Call Us: 978-429-8913"
];
