"use client";

import { useEffect, useState } from "react";

export default function Ruler() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setP(max > 0 ? scrollY / max : 0);
    };

    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);

    const unsubLenis = window.__lenis?.on("scroll", (e: { progress: number }) => {
      setP(e.progress);
    });

    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (typeof unsubLenis === "function") unsubLenis();
    };
  }, []);

  return (
    <div className="ruler" aria-hidden>
      <div className="ruler-dot" style={{ top: `calc(8% + ${p * 84}%)` }}>
        <span>{String(Math.round(p * 100)).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
