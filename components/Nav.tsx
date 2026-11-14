"use client";

import { useEffect, useState } from "react";
import { useEggs } from "./Eggs";

const LINKS = ["Work", "Services", "Studio", "Journal", "Contact"];

export default function Nav() {
  const { find, sound, setSound, click } = useEggs();
  const [open, setOpen] = useState(false);
  const [xray, setXray] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("xray", xray);
  }, [xray]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="nav">
        <div className="pill">
          <a href="#top" className="logo" onClick={click}>
            metic<span className="dot">.</span>
          </a>
          <button
            className={`sound ${sound ? "on" : ""}`}
            aria-label={sound ? "Turn sound off" : "Turn sound on"}
            onClick={() => {
              setSound(!sound);
              find("sound", "Turned the sound on");
            }}
          >
            <span /><span /><span /><span />
          </button>
        </div>

        <div className="pill" style={{ paddingLeft: "1rem" }}>
          <button
            className="xray-btn"
            onClick={() => {
              click();
              setXray((v) => !v);
              find("xray", "Looked through X-ray");
            }}
            aria-pressed={xray}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span>{xray ? "X-ray on" : "X-ray"}</span>
          </button>
          <button
            className={`menu-btn ${open ? "open" : ""}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => {
              click();
              setOpen((v) => !v);
              find("menu", "Opened the menu");
            }}
          >
            <span className="lines"><i /><i /></span>
          </button>
        </div>
      </header>

      <div className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <ul className="drawer-links">
          {LINKS.map((l, i) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${0.15 + i * 0.06}s` : "0s" }}
              >
                {l} <small>0{i + 1}</small>
              </a>
            </li>
          ))}
        </ul>
        <div className="drawer-meta">
          <div>
            <span className="label">Write</span>office@metic.studio
          </div>
          <div>
            <span className="label">Call</span>+43 677 62054960
          </div>
          <div>
            <span className="label">Visit</span>Linden 118, 4372 St. Georgen am Walde
          </div>
          <a className="btn btn-primary" href="#contact" onClick={() => setOpen(false)}>
            Start a project <span className="btn-icon">↗</span>
          </a>
        </div>
      </div>
    </>
  );
}
