"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Matches `scroll-margin-top` on a chapter, so the active mark flips at the
 *  same line the browser parks a heading on. */
const HEADER_LINE = 160;

/**
 * Sticky brand index for the chapter stream.
 *
 * Anchors are real `href="#id"` links, so chapters stay reachable with
 * scripting off and the browser's own hash navigation works. Everything below
 * is enhancement on top of that.
 */
export default function BrandNav({
  brands,
}: {
  brands: { id: string; name: string }[];
}) {
  const [active, setActive] = useState(brands[0]?.id ?? "");
  const railRef = useRef<HTMLUListElement>(null);

  /* Which chapter owns the reading position: the last one whose top has passed
     the header line. A "topmost intersecting" test picks the wrong chapter
     straight after a jump, because the previous chapter is often still
     crossing the band. */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = brands[0]?.id ?? "";
      for (const brand of brands) {
        const el = document.getElementById(brand.id);
        if (el && el.getBoundingClientRect().top <= HEADER_LINE) current = brand.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [brands]);

  /* On the horizontal rail, keep the active chip in view. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    const chip = rail.querySelector<HTMLElement>(`[data-brand="${active}"]`);
    if (!chip) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    chip.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  /* Handle the jump ourselves. The app router otherwise treats a same-page
     hash as a route change and repeatedly requests an RSC payload that a
     static export does not have — one click produced ~200 failed requests. */
  const onJump = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      /* Send focus with the reader, without fighting the scroll. */
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    },
    [],
  );

  return (
    <nav className="aaw-brandnav" aria-label="European brands">
      <ul ref={railRef}>
        {brands.map((brand) => (
          <li key={brand.id}>
            <a
              href={`#${brand.id}`}
              data-brand={brand.id}
              aria-current={active === brand.id ? "true" : undefined}
              onClick={(event) => onJump(event, brand.id)}
            >
              {brand.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
