"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    // Intercept in-page hash links for smooth Lenis scrolling
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const target = href === "#top" ? 0 : document.querySelector(href);
      if (target !== null) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement | number, {
          offset: 0,
          duration: 1.2,
        });
      }
    };

    document.addEventListener("click", onAnchorClick, { capture: true });

    return () => {
      document.removeEventListener("click", onAnchorClick, { capture: true });
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
