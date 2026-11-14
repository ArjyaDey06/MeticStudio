import { EggProvider } from "@/components/Eggs";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ruler from "@/components/Ruler";
import Build from "@/components/Build";
import Services from "@/components/Services";
import RevealObserver from "@/components/RevealObserver";

const PILLARS = [
  { t: "No site builder.", d: "No templates, no plugin bloat. Every element is made new and fits your brand exactly." },
  { t: "Built for the day after tomorrow.", d: "No trend that will be embarrassing in two years. What stands today carries the next chapter too." },
  { t: "One number, one face.", d: "You talk to the person who designs and develops. From the first conversation until well after launch." },
];

const WORK = [
  { name: "AndiG", line: "From the first salary to retirement, on one path.", tags: ["Naming", "Logo & brand world", "Web design"], mock: "Your money, one path." },
  { name: "GORW Table Tennis", line: "A club website that keeps itself up to date.", tags: ["Concept", "UI/UX design", "Full-stack development"], mock: "Next match: Saturday." },
  { name: "Dimbach Veterinary Practice", line: "Veterinary care with heart, on a phone too.", tags: ["Concept", "Web design", "Development"], mock: "Care with heart." },
];

const JOURNAL = [
  { n: "03", amount: "$20,000,000,000", date: "15 October 2026", t: "The $20 billion default", d: "In 2022, Google paid Apple about $20 billion for one preselected option. Here is a dropdown that shows its default loud and clear.", w: "select" },
  { n: "02", amount: "$900,000,000", date: "14 October 2026", t: "The $900 million checkbox", d: "Citibank meant to pay $7.8 million in interest. One box ticked, two settings missing, and the whole loan went out.", w: "check" },
  { n: "01", amount: "$300,000,000", date: "13 October 2026", t: "The $300 million button", d: "An online store changed one button and made $300 million more in a year. Here is the button, live, ready to copy.", w: "button" },
];

export default function Home() {
  return (
    <EggProvider>
      <Preloader />
      <Nav />
      <Ruler />
      <RevealObserver />

      <main>
        <Hero />
        <Build />

        {/* Philosophy */}
        <section id="studio" className="block">
          <div className="container">
            <span className="label reveal">Studio</span>
            <h2 className="statement reveal" style={{ marginTop: "1.5rem" }} data-spec="H2 · Bricolage 500">
              I build websites and software that land in the first moment and hold up in the second.{" "}
              <span className="muted">Impact on the outside, clean construction underneath.</span>
            </h2>
            <div className="pillars">
              {PILLARS.map((p, i) => (
                <div key={p.t} className="pillar reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span className="label">0{i + 1}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="block" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-head reveal">
              <h2 data-spec="H2 · 600 · -0.04em">Services</h2>
              <span className="label">07 disciplines</span>
            </div>
            <Services />
          </div>
        </section>

        {/* Work */}
        <section id="work" className="block" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-head reveal">
              <h2 data-spec="H2 · 600 · -0.04em">Work</h2>
              <a href="#work" className="link-arrow">All work ↗</a>
            </div>
            <div className="work-grid">
              {WORK.map((w) => (
                <a key={w.name} href="#work" className="work-card reveal">
                  <div className="work-media dot-grid">
                    <div className="mock">
                      <div className="mock-bar"><i /><i /><i /></div>
                      <div className="mock-body">
                        <h4>{w.mock.replace(/\.$/, "")}<span className="dot">.</span></h4>
                        <div className="bars">
                          <i style={{ width: "60%" }} />
                          <i style={{ width: "45%" }} />
                          <i style={{ width: "52%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="work-meta label">
                    <span>Website</span>
                    <span>2026</span>
                  </div>
                  <h3>{w.name}</h3>
                  <p>{w.line}</p>
                  <div className="tags">
                    {w.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                    <span className="tag" style={{ background: "var(--ink)", color: "var(--paper)", borderColor: "var(--ink)" }}>
                      Case study ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Journal */}
        <section id="journal" className="block" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-head reveal">
              <h2 data-spec="H2 · 600 · -0.04em">From the journal.</h2>
              <a href="#journal" className="link-arrow">All articles ↗</a>
            </div>
            <div className="journal-grid">
              {JOURNAL.map((j, i) => (
                <a key={j.t} href="#journal" className="j-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="j-visual">
                    <div className="j-top">
                      <span>metic<span className="dot">.</span> Million-dollar details</span>
                      <span>EP {j.n}</span>
                    </div>
                    <div className="j-widget">
                      <div className="j-amount">{j.amount}</div>
                      {j.w === "select" && (
                        <div className="j-select">Google <em>DEFAULT</em> <span>▾</span></div>
                      )}
                      {j.w === "check" && (
                        <div className="j-check"><span>✓</span> Pay off loan in full</div>
                      )}
                      {j.w === "button" && (
                        <span className="btn btn-primary" style={{ height: 44, fontSize: "0.85rem" }}>
                          Start a project <span className="btn-icon" style={{ width: 32, height: 32 }}>↗</span>
                        </span>
                      )}
                    </div>
                    <div className="j-top"><span>0{i + 1} · 4:3</span><span>metic.studio</span></div>
                  </div>
                  <span className="label">Insight · {j.date}</span>
                  <h3>{j.t}</h3>
                  <p>{j.d}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="cta-band dot-grid">
          <div className="container reveal">
            <span className="hand">psst — this part is real.</span>
            <h2 data-spec="H2 · Display · -0.045em">
              Let&apos;s take a<br />closer look<span className="dot">.</span>
            </h2>
            <a href="mailto:office@metic.studio" className="btn btn-primary">
              Start a project <span className="btn-icon">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="foot-grid">
            <div>
              <div className="logo">metic<span className="dot">.</span></div>
              <p>Web and digital agency from St. Georgen am Walde, Upper Austria. Design and code by one person.</p>
              <div className="definition">metic. from meticulous: precise to the detail.</div>
              <div style={{ marginTop: "2.5rem" }}>
                <span className="label">Awarded</span>
                <div className="awards" style={{ marginTop: 0 }}>
                  {["CSSDA WOTD", "Best UI", "Best UX", "Best Innovation", "Awwwards HM", "Muzli Picks"].map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <span className="label">Chapters</span>
              <ul>
                {["Work", "Services", "Studio", "Journal", "Contact", "Start a project"].map((l) => (
                  <li key={l}><a href={`#${l === "Start a project" ? "contact" : l.toLowerCase()}`}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <span className="label">Contact</span>
              <ul>
                <li><a href="mailto:office@metic.studio">office@metic.studio</a></li>
                <li>+43 677 62054960</li>
                <li>Linden 118, 4372 St. Georgen am Walde</li>
                <li>Mühlviertel &amp; surroundings</li>
                <li><a href="#">Instagram</a> · <a href="#">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 metic. · Manuel Mayrhofer</span>
            <nav>
              <a href="#">Imprint</a>
              <a href="#">Privacy</a>
            </nav>
          </div>
        </div>
      </footer>
    </EggProvider>
  );
}
