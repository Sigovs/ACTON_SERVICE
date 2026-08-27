"use client";

import { useEffect } from "react";

/**
 * Scroll-triggered reveals for content images.
 *
 * Native IntersectionObserver only — the project has no animation library and
 * this does not warrant adding one. Each element fires once and is then
 * unobserved. The initial hidden state lives behind `:root[data-motion="on"]`
 * (set pre-paint in layout.tsx), so if this never runs the images are simply
 * visible rather than stuck at opacity 0.
 */
export default function Reveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (targets.length === 0) return;

    const show = () =>
      targets.forEach((el) => el.setAttribute("data-revealed", "true"));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18 },
    );

    targets.forEach((el) => observer.observe(el));

    /* Someone switching on reduced motion mid-session should see everything. */
    const onPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        observer.disconnect();
        show();
      }
    };
    reduced.addEventListener("change", onPreferenceChange);

    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return null;
}
