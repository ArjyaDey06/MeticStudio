"use client";

import { useState } from "react";
import { useEggs } from "./Eggs";

const SERVICES = [
  { t: "Websites", d: "Fast, distinctive, built from scratch.", price: "on request", v: "pixels", fx: "62%", fy: "40%" },
  { t: "Custom software & apps", d: "Tools that fit the way you actually work.", price: "on request", v: "circuit", fx: "48%", fy: "52%" },
  { t: "Brand & logo", d: "A mark that stays.", price: "from €500", v: "paper", fx: "35%", fy: "45%" },
  { t: "AI assistants", d: "Answers in your voice, around the clock.", price: "on request", v: "grille", fx: "55%", fy: "50%" },
  { t: "Online shops", d: "From the first product to the hundredth order.", price: "on request", v: "box", fx: "70%", fy: "30%" },
  { t: "Photography & content", d: "Images that look like you, not like stock.", price: "on request", v: "lens", fx: "60%", fy: "45%" },
  { t: "Hosting, domains & email", d: "It just runs. And if not, you call me.", price: "from €50 / month", v: "fibre", fx: "44%", fy: "58%" },
];

export default function Services() {
  const { click, find } = useEggs();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="services">
      {SERVICES.map((s, i) => (
        <div key={s.t} className={`service ${open === i ? "open" : ""}`}>
          <button
            className="service-row"
            aria-expanded={open === i}
            onClick={() => {
              click();
              setOpen(open === i ? null : i);
              if (i === SERVICES.length - 1) find("services", "Opened every door");
            }}
          >
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.t}</h3>
            <span className="plus">+</span>
          </button>
          <div className="service-body">
            <div>
              <div className="service-content">
                <div>
                  <p>{s.d}</p>
                  <span className="price">{s.price}</span>
                  <a href="#contact" className="link-arrow">Take a closer look ↗</a>
                </div>
                <div
                  className={`macro ${s.v}`}
                  style={{ ["--fx" as string]: s.fx, ["--fy" as string]: s.fy }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
