import { routeFrom, type PageKey } from "./site-nav";

/**
 * Client preview scope.
 *
 * Only the Tire & Wheel Service page exists in this build. Every other Acton
 * page (Home, About Us, Our Work, the sibling services, Privacy Policy) lives
 * on the live site, so linking to it would walk the client straight out of the
 * preview and into work we have not done.
 *
 * While this is `false` those navigation items render as inert text that keeps
 * its exact styling but does not navigate. Flip it to `true` once the rest of
 * the set is built and the pages are real.
 *
 * Real, working destinations are deliberately unaffected: the phone number,
 * the email address, the Google Maps entry, and the social profiles all stay
 * live because they exist and are not pages we are claiming to have built.
 */
export const LINK_TO_LIVE_SITE = false;

type InertProps = { href?: string; "data-inert"?: "true" };

/** Spread onto an `<a>`: yields a real href, or an inert, unclickable anchor. */
export function siteLink(href: string): InertProps {
  return LINK_TO_LIVE_SITE ? { href } : { "data-inert": "true" };
}

/**
 * Spread onto an `<a>` for a navigation node. Routes inside this build are
 * always real links, resolved relative to the page being rendered; live-site
 * pages stay gated by `LINK_TO_LIVE_SITE`.
 */
export function navLink(
  node: { href?: string; internal?: boolean; key?: PageKey },
  current?: PageKey,
): InertProps {
  if (node.internal && node.key && current) {
    return { href: routeFrom(current, node.key) };
  }
  if (!node.href) return { "data-inert": "true" };
  return node.internal ? { href: node.href } : siteLink(node.href);
}
