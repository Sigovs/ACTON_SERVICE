"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
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
import { MENU, type NavNode } from "./site-nav";
import { navLink } from "./site-links";

const CDN = "https://www.actonautowerks.com/wp-content/uploads";

const PHONE_DISPLAY = "(978) 429-8913";
const PHONE_HREF = "tel:+19784298913";
const EMAIL = "service@actonautowerks.com";
const ADDRESS = "429 Great Rd, Acton, MA 01720, United States";
const MAPS = "https://maps.app.goo.gl/Rsuie6ei9bPKs1Gm8";

/** Flattens a node and its children into the single desktop flyout panel, so
 *  nesting never becomes a second popup that could shift the header row. */
function FlyoutItems({ nodes, depth = 0 }: { nodes: NavNode[]; depth?: number }) {
  return (
    <>
      {nodes.map((node) => (
        <li key={node.label}>
          <a
            {...navLink(node)}
            data-depth={depth}
            aria-current={node.current ? "page" : undefined}
          >
            {node.label}
          </a>
          {node.children ? (
            <ul>
              <FlyoutItems nodes={node.children} depth={depth + 1} />
            </ul>
          ) : null}
        </li>
      ))}
    </>
  );
}

/** Mobile accordion, nested to any depth the data describes. */
function MobileItems({
  nodes,
  depth,
  panelOpen,
  expanded,
  toggle,
}: {
  nodes: NavNode[];
  depth: number;
  panelOpen: boolean;
  expanded: Record<string, boolean>;
  toggle: (key: string) => void;
}) {
  return (
    <>
      {nodes.map((node) => {
        const reachable = panelOpen && (depth === 0 || expanded[`d${depth - 1}`] !== false);

        if (!node.children) {
          return (
            <li key={node.label}>
              <a
                {...navLink(node)}
                data-depth={depth}
                aria-current={node.current ? "page" : undefined}
                tabIndex={reachable ? undefined : -1}
              >
                {node.label}
              </a>
            </li>
          );
        }

        const key = node.label;
        const isOpen = Boolean(expanded[key]);
        return (
          <li key={node.label}>
            <div className="aaw-mobilenav-row" data-depth={depth}>
              {node.href ? (
                <a
                  {...navLink(node)}
                  data-section={node.ancestor ? "current" : undefined}
                  aria-current={node.current ? "page" : undefined}
                  tabIndex={reachable ? undefined : -1}
                >
                  {node.label}
                </a>
              ) : (
                <span data-section={node.ancestor ? "current" : undefined}>
                  {node.label}
                </span>
              )}
              <button
                type="button"
                className="aaw-mobilenav-expand"
                aria-expanded={isOpen}
                aria-label={`${isOpen ? "Collapse" : "Expand"} ${node.label}`}
                tabIndex={reachable ? undefined : -1}
                onClick={() => toggle(key)}
              >
                <i className="aaw-sub-arrow" data-expanded={isOpen}>
                  <SubArrowIcon />
                </i>
              </button>
            </div>
            <ul className="aaw-mobilenav-sub" data-open={isOpen}>
              <MobileItems
                nodes={node.children}
                depth={depth + 1}
                panelOpen={panelOpen && isOpen}
                expanded={expanded}
                toggle={toggle}
              />
            </ul>
          </li>
        );
      })}
    </>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [flyout, setFlyout] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelId = useId();

  const toggleBranch = useCallback((key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /* Escape closes whichever surface is open and returns focus sensibly. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (flyout) {
        setFlyout(null);
        return;
      }
      if (open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [flyout, open]);

  /* A pointer press outside the desktop nav closes the flyout. */
  useEffect(() => {
    if (!flyout) return;
    const onDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setFlyout(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [flyout]);

  /* Returning to desktop width leaves no visible toggle, so drop that state. */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1025px)");
    const onChange = () => {
      if (query.matches) setOpen(false);
      else setFlyout(null);
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

          <nav className="aaw-nav" aria-label="Primary" ref={navRef}>
            <ul>
              {MENU.map((item) =>
                item.children ? (
                  <li
                    className="aaw-nav-has-sub"
                    key={item.label}
                    data-open={flyout === item.label}
                    onMouseEnter={() => setFlyout(item.label)}
                    onMouseLeave={() => setFlyout(null)}
                    onFocus={() => setFlyout(item.label)}
                  >
                    <button
                      type="button"
                      className="aaw-nav-trigger"
                      data-section={item.ancestor ? "current" : undefined}
                      aria-expanded={flyout === item.label}
                      onClick={() =>
                        setFlyout(flyout === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <SubArrowIcon />
                    </button>
                    <ul className="aaw-subnav">
                      <FlyoutItems nodes={item.children} />
                    </ul>
                  </li>
                ) : (
                  <li key={item.label}>
                    <a {...navLink(item)}>{item.label}</a>
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
          <MobileItems
            nodes={MENU}
            depth={0}
            panelOpen={open}
            expanded={expanded}
            toggle={toggleBranch}
          />
        </ul>
      </nav>
    </div>
  );
}
