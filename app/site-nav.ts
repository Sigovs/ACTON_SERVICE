/**
 * Navigation data for the Acton shell.
 *
 * Every new service content page belongs UNDER "Service & Maintenance" — never
 * as a new top-level item. To publish the next approved page, add one entry to
 * `children` on the Service & Maintenance node. Nothing else needs touching:
 * the desktop flyout and the mobile accordion both render from this tree.
 *
 * Only routes that exist may appear here. No placeholders for unbuilt pages.
 */

const LIVE = "https://www.actonautowerks.com";

export type NavNode = {
  label: string;
  /** Absolute for live-site pages, or a relative route we actually ship. */
  href?: string;
  /** True for routes inside this build — never gated by the preview flag. */
  internal?: boolean;
  /** Marks the page currently being viewed. */
  current?: boolean;
  /** Marks an ancestor of the current page. */
  ancestor?: boolean;
  children?: NavNode[];
};

/**
 * The Tire & Wheel page is the document being served, so it links to itself
 * relatively. "./" resolves correctly at the dev root and under the GitHub
 * Pages project base (/ACTON_SERVICE/) without assuming root-domain routing.
 */
export const TIRE_AND_WHEEL_ROUTE = "./";

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
          {
            label: "Tire & Wheel Service",
            href: TIRE_AND_WHEEL_ROUTE,
            internal: true,
            current: true,
          },
          /* Next approved pages join here as each one is built:
             Maintenance & Service Intervals, European Car Repair Specialists,
             Electrical Systems, Auto Body Services, Transmission Service. */
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
  {
    label: "Tire & Wheel Service",
    href: TIRE_AND_WHEEL_ROUTE,
    internal: true,
    current: true,
  },
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
