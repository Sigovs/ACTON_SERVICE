"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  BurgerIcon,
  CloseIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  SubArrowIcon,
} from "./icons";

const CDN = "https://www.actonautowerks.com/wp-content/uploads";

const PHONE_DISPLAY = "(978) 429-8913";
const PHONE_HREF = "tel:+19784298913";
const EMAIL = "service@actonautowerks.com";
const ADDRESS = "429 Great Rd, Acton, MA 01720, United States";
const MAPS = "https://maps.app.goo.gl/Rsuie6ei9bPKs1Gm8";

/* The live Acton menu, verbatim. "Services" has no destination of its own —
   it only opens its submenu, exactly as it does on the site. */
type NavItem = {
  label: string;
  href?: string;
  ancestor?: boolean;
  children?: { label: string; href: string; active?: boolean }[];
};

const menu: NavItem[] = [
  { label: "Home", href: "https://www.actonautowerks.com/" },
  { label: "About Us", href: "https://www.actonautowerks.com/about-us/" },
  {
    label: "Services",
    ancestor: true,
    children: [
      {
        label: "Service & Maintenance",
        href: "https://www.actonautowerks.com/service-maintenance/",
        active: true,
      },
      { label: "Performance", href: "https://www.actonautowerks.com/performance/" },
      {
        label: "Paint Protection Film",
        href: "https://www.actonautowerks.com/paint-protection-film/",
      },
      { label: "Ceramic Coating", href: "https://www.actonautowerks.com/ceramic-coating/" },
      { label: "Auto Detailing", href: "https://www.actonautowerks.com/auto-detailing/" },
    ],
  },
  { label: "Our Work", href: "https://www.actonautowerks.com/our-work/" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  /* Escape closes the panel and hands focus back to the toggle. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* Returning to desktop width leaves no visible toggle, so drop the state. */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1025px)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="aaw-headerblock">
      <div className="aaw-utility">
        <div className="aaw-shell aaw-utility-inner">
          <ul className="aaw-utility-list">
            <li>
              <a href={PHONE_HREF}>
                <PhoneIcon />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`}>
                <MailIcon />
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={MAPS} target="_blank" rel="noreferrer">
                <PinIcon />
                {ADDRESS}
              </a>
            </li>
          </ul>
          <div className="aaw-utility-social">
            <a
              href="https://www.facebook.com/ActonAutoWerks/"
              target="_blank"
              rel="noreferrer"
              aria-label="Acton Autowerks on Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/acton_autowerks/?hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="Acton Autowerks on Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      <header className="aaw-header">
        <div className="aaw-shell aaw-header-inner">
          <a
            className="aaw-brand"
            href="https://www.actonautowerks.com/"
            aria-label="Acton Autowerks home"
          >
            <img
              src={`${CDN}/2025/07/site-logo.png`}
              alt="Acton Autowerks"
              width={112}
              height={39}
            />
          </a>

          <nav className="aaw-nav" aria-label="Primary">
            <ul>
              {menu.map((item) =>
                item.children ? (
                  <li className="aaw-nav-has-sub" key={item.label}>
                    <span data-section={item.ancestor ? "current" : undefined}>
                      {item.label}
                      <SubArrowIcon />
                    </span>
                    <ul className="aaw-subnav">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            aria-current={child.active ? "page" : undefined}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <button
            className="aaw-menu-toggle"
            type="button"
            ref={toggleRef}
            aria-label="Menu Toggle"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <BurgerIcon />}
          </button>

          <a className="aaw-btn aaw-btn--compact aaw-header-cta" href="#quote">
            Get A Quote
          </a>
        </div>
      </header>

      <nav
        className="aaw-mobilenav"
        id={panelId}
        aria-label="Menu"
        aria-hidden={!open}
        data-open={open}
      >
        <ul>
          {menu.map((item) => {
            if (!item.children) {
              return (
                <li key={item.label}>
                  <a href={item.href} tabIndex={open ? undefined : -1}>
                    {item.label}
                  </a>
                </li>
              );
            }

            const expanded = openSub === item.label;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className="aaw-mobilenav-parent"
                  data-section={item.ancestor ? "current" : undefined}
                  aria-expanded={expanded}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpenSub(expanded ? null : item.label)}
                >
                  {item.label}
                  <i className="aaw-sub-arrow" data-expanded={expanded}>
                    <SubArrowIcon />
                  </i>
                </button>
                <ul className="aaw-mobilenav-sub" data-open={expanded}>
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <a
                        href={child.href}
                        aria-current={child.active ? "page" : undefined}
                        tabIndex={open && expanded ? undefined : -1}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
