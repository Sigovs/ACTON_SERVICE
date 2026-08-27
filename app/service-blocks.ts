/**
 * Order guards for the generated service-page content modules.
 *
 * Pages 04-06 lay their sections out deliberately rather than through a
 * generic loop, which means the page file hard-codes an order. These helpers
 * assert that the order it hard-codes is still the order the approved source
 * actually has, so a change to the markdown fails the build instead of
 * silently rendering the wrong section in the wrong place.
 *
 * The extraction script already proves that no copy is lost or reordered
 * inside the data. This proves the page renders that data in the same order.
 */

export type ServiceBlock =
  | { type: "paragraph"; text: string }
  | { type: "section"; heading: string; paragraphs: string[]; items: string[] };

/** The block at `index` must be a section carrying exactly this heading. */
export function section(
  blocks: ServiceBlock[],
  index: number,
  heading: string,
): { heading: string; paragraphs: string[]; items: string[] } {
  const block = blocks[index];
  if (!block || block.type !== "section" || block.heading !== heading) {
    throw new Error(
      `Approved content moved: expected a "${heading}" section at block ${index}, ` +
        `found ${block ? `${block.type} ${JSON.stringify("heading" in block ? block.heading : block.text.slice(0, 40))}` : "nothing"}. ` +
        `Re-run scripts/extract-service-content.mjs and re-check the page order.`,
    );
  }
  return block;
}

/** The block at `index` must be a loose paragraph. */
export function paragraph(blocks: ServiceBlock[], index: number): string {
  const block = blocks[index];
  if (!block || block.type !== "paragraph") {
    throw new Error(
      `Approved content moved: expected a paragraph at block ${index}, ` +
        `found ${block ? block.type : "nothing"}. ` +
        `Re-run scripts/extract-service-content.mjs and re-check the page order.`,
    );
  }
  return block.text;
}

/** Guards against a page quietly rendering fewer blocks than the source has. */
export function expectBlockCount(blocks: ServiceBlock[], count: number): void {
  if (blocks.length !== count) {
    throw new Error(
      `Approved content changed: ${blocks.length} blocks in the source, page renders ${count}.`,
    );
  }
}
