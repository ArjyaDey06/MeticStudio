"use client";

import { useEffect, useRef, useState } from "react";
import { useEggs } from "./Eggs";

export default function Hero() {
  const { find, click } = useEggs();
  const lens = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Spring-follow loop for the loupe
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (lens.current) {
        lens.current.style.translate = `${pos.current.x}px ${pos.current.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
    const r = e.currentTarget.getBoundingClientRect();
    setCoords({ x: Math.round(e.clientX - r.left), y: Math.round(e.clientY - r.top) });
  };

  return (
    <section
      id="top"
      className="hero"
      onPointerMove={onMove}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        pos.current = target.current = { x: e.clientX, y: e.clientY };
        setVisible(true);
      }}
      onPointerLeave={() => setVisible(false)}
      onPointerDown={() => {
        setHeld(true);
        holdTimer.current = setTimeout(() => find("lens", "Held the lens"), 900);
      }}
      onPointerUp={() => {
        setHeld(false);
        if (holdTimer.current) clearTimeout(holdTimer.current);
      }}
    >
      <div className="dot-grid" />
      <div className="hero-meta label">
        <span>Design &amp; software studio</span>
        <span>48.360° N, 14.897° E</span>
      </div>

      <div className="container hero-inner">
        <h1 data-spec="H1 · Bricolage Grotesque 600 · -0.045em">
          <span className="line"><span>Take a</span></span>
          <span className="line"><span>closer look<span className="dot">.</span></span></span>
        </h1>
        <div className="hero-foot">
          <p data-spec="">
            Design and software studio from Upper Austria. One person, both sides: design and code.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary" onClick={click}>
              Start a project <span className="btn-icon">↗</span>
            </a>
            <a href="#work" className="btn btn-ghost" onClick={click}>
              See the work
            </a>
          </div>
        </div>
      </div>

      <div ref={lens} className={`loupe ${visible ? "visible" : ""} ${held ? "held" : ""}`} aria-hidden>
        <span className="loupe-readout">
          x: {coords.x} y: {coords.y}
        </span>
      </div>
    </section>
  );
}
