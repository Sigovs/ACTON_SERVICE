/**
 * Navigation data for the Acton shell.
 *
 * Every new service content page belongs UNDER "Service & Maintenance" — never
 * as a new top-level item. To publish the next approved page, add one entry to
 * `children` on the Service & Maintenance node. Nothing else needs touching:
 * the desktop flyout, the mobile accordion and the footer all render from this
 * tree, and each page marks its own active trail with `activeFor`.
 *
 * Only routes that exist may appear here. No placeholders for unbuilt pages.
 */

const LIVE = "https://www.actonautowerks.com";

/** Identifies which page is being rendered, so the active state is per-page. */
export type PageKey =
  | "tire-wheel"
  | "maintenance"
  | "european"
  | "electrical"
  | "auto-body"
  | "transmission";

export type NavNode = {
  label: string;
  /** Absolute for live-site pages, or a route we actually ship. */
  href?: string;
  /** True for routes inside this build — never gated by the preview flag. */
  internal?: boolean;
  /** The page this entry represents, if any. */
  key?: PageKey;
  /** Marks an ancestor of whichever page is current. */
  ancestor?: boolean;
  children?: NavNode[];
};

/**
 * Routes are written relative to the site root and resolved per page at render
 * time, so the same tree works at the dev root, under the GitHub Pages project
 * base (/ACTON_SERVICE/) and from a nested route — without assuming
 * root-domain routing.
 */
export const ROUTES: Record<PageKey, string> = {
  "tire-wheel": "",
  maintenance: "maintenance-service-intervals/",
  european: "european-car-repair/",
  electrical: "electrical-systems/",
  "auto-body": "auto-body/",
  transmission: "transmission/",
};

/**
 * Prefix that walks from the page being rendered back to the site root.
 * The Tire & Wheel page is at the root, the maintenance page is one level down.
 */
export function rootPrefix(current: PageKey): string {
  return current === "tire-wheel" ? "./" : "../";
}

/** Resolves a page key to a link that works from the current page. */
export function routeFrom(current: PageKey, target: PageKey): string {
  return rootPrefix(current) + ROUTES[target];
}

export const MENU: NavNode[] = [
  { label: "Home", href: `${LIVE}/` },
  { label: "About Us", href: `${LIVE}/about-us/` },
  {
    label: "Services",
    ancestor: true,
    children: [
      {
        label: "Service & Maintenance",
        href: `${LIVE}/service-maintenance/`,
        ancestor: true,
        children: [
          { label: "Tire & Wheel Service", internal: true, key: "tire-wheel" },
          {
            label: "Maintenance & Service Intervals",
            internal: true,
            key: "maintenance",
          },
          {
            label: "European Car Repair Specialists",
            internal: true,
            key: "european",
          },
          {
            label: "Electrical Systems Diagnostics & Service",
            internal: true,
            key: "electrical",
          },
          { label: "Auto Body Services", internal: true, key: "auto-body" },
          { label: "Transmission Service", internal: true, key: "transmission" },
        ],
      },
      { label: "Performance", href: `${LIVE}/performance/` },
      { label: "Paint Protection Film", href: `${LIVE}/paint-protection-film/` },
      { label: "Ceramic Coating", href: `${LIVE}/ceramic-coating/` },
      { label: "Auto Detailing", href: `${LIVE}/auto-detailing/` },
    ],
  },
  { label: "Our Work", href: `${LIVE}/our-work/` },
];

export const FOOTER_SERVICES: NavNode[] = [
  {
    label: "Service & Maintenance",
    href: `${LIVE}/service-maintenance/`,
    ancestor: true,
  },
  { label: "Tire & Wheel Service", internal: true, key: "tire-wheel" },
  { label: "Maintenance & Service Intervals", internal: true, key: "maintenance" },
  { label: "European Car Repair Specialists", internal: true, key: "european" },
  {
    label: "Electrical Systems Diagnostics & Service",
    internal: true,
    key: "electrical",
  },
  { label: "Auto Body Services", internal: true, key: "auto-body" },
  { label: "Transmission Service", internal: true, key: "transmission" },
  { label: "Performance", href: `${LIVE}/performance/` },
  { label: "Paint Protection Film", href: `${LIVE}/paint-protection-film/` },
  { label: "Ceramic Coating", href: `${LIVE}/ceramic-coating/` },
  { label: "Auto Detailing", href: `${LIVE}/auto-detailing/` },
];

export const FOOTER_QUICK_LINKS: NavNode[] = [
  { label: "Home", href: `${LIVE}/` },
  { label: "About Us", href: `${LIVE}/about-us/` },
  { label: "Our Work", href: `${LIVE}/our-work/` },
];
