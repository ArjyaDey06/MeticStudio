"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      // ease-out so the counter slows down near 100
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;

  return (
    <div className={`preloader ${done ? "done" : ""}`} onTransitionEnd={() => done && setGone(true)}>
      <div />
      <div className="preloader-center">
        <div>
          <div className="preloader-word">Look closer.</div>
          <div className="preloader-sub">
            metic<span className="dot">.</span>
          </div>
        </div>
      </div>
      <div className="preloader-foot">
        <span>
          <span className="pulse" />
          48.360° N, 14.897° E
        </span>
        <span className="preloader-count">{count} %</span>
      </div>
    </div>
  );
}
