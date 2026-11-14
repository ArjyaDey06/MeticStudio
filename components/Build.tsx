"use client";

import { useEffect, useRef, useState } from "react";
import { useEggs } from "./Eggs";

const STEPS = [
  { t: "A line.", d: "Every project starts with guides. Where things belong is measured, not guessed." },
  { t: "A grid.", d: "Columns, gaps, a surface. The scaffolding everything lines up with later." },
  { t: "A layout.", d: "Lines become surfaces: navigation, headline, image, button. Order first, ornament later." },
  { t: "Typography.", d: "Hierarchy and scale. The words get a voice before they get a colour." },
  { t: "Color.", d: "A quiet, monochrome base. One red, used only where it matters." },
  { t: "Components.", d: "Radius, rings, shadows. Every surface gets its final shape." },
  { t: "Interaction.", d: "Hover, press, feedback. It should feel right before you know why." },
  { t: "Your turn.", d: "Everything you have just seen is in this one button. Press it, and I'll build yours." },
];

export default function Build() {
  const { find, click } = useEggs();
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight;
      setProgress(Math.min(1, Math.max(0, -r.top / total)));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const step = Math.min(STEPS.length, Math.floor(progress * STEPS.length) + 1);
  const s = STEPS[step - 1];

  useEffect(() => {
    if (step === STEPS.length) find("build", "Watched the build");
  }, [step, find]);

  const skip = () => {
    const el = ref.current;
    if (el) scrollTo({ top: el.offsetTop + el.offsetHeight - innerHeight * 0.5, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="build" aria-label="The build">
      <div className="build-sticky dot-grid">
        <div className="build-stage">
          <div className="frame" data-step={step}>
            <div className="f-cols">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</div>
            <div className="f-guide-h" />
            <div className="f-guide-v" />
            <div className="f-nav">
              <b>metic.</b>
              <span>Work · Services · Contact</span>
            </div>
            <div className="f-head">
              <div>Take a closer look<span>.</span></div>
            </div>
            <div className="f-sub">Design and code from one person.</div>
            <div className="f-img" />
            <div className="f-btn">Start a project</div>
            <svg className="f-cursor" viewBox="0 0 24 24" fill="#121214" stroke="#fff" strokeWidth="1.5">
              <path d="M4 3l16 7-7 2-2 7z" />
            </svg>
            <div className="final-btn">
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={() => {
                  click();
                  find("button", "Built the button");
                }}
              >
                Start a project <span className="btn-icon">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="build-copy">
            <div key={step} className="anim">
              <div className="step-count">
                <b>{String(step).padStart(2, "0")}</b>
                <i />
                <span>{String(STEPS.length).padStart(2, "0")}</span>
              </div>
              <h2 data-spec="H2 · 600 · -0.035em">{s.t}</h2>
              <p>{s.d}</p>
            </div>
            <button className="skip" onClick={skip}>
              Skip the build ↓
            </button>
          </div>
          <div className="progress">
            <i style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
