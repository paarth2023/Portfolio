import { useState, useEffect } from "react";
import { RotatingTitle } from "./components/RotatingTitle";
import { Terminal } from "./components/Terminal";
import { ProjectsGUI } from "./components/ProjectsGUI";

function useScrollEffects(view) {
  useEffect(() => {
    if (view !== "home") return;

    // Slight delay to ensure DOM has rendered
    const timeout = setTimeout(() => {
      const revealEls = Array.from(document.querySelectorAll(".reveal"));

      if (revealEls.length > 0 && "IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: "0px",
          }
        );

        revealEls.forEach((el) => io.observe(el));
        return () => io.disconnect();
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [view]);
}

function App() {
  const [view, setView] = useState("home");
  useScrollEffects(view);

  useEffect(() => {
    if (view === "home") {
      // Use requestAnimationFrame for smoother timing
      window.requestAnimationFrame(() => {
        const container = document.querySelector('.home-container');
        if (container) {
          container.scrollTop = 0;
        }
        window.scrollTo(0, 0);
      });
    }
  }, [view]);

  const year = new Date().getFullYear();

  if (view === "projects") {
    return (
      <div className="terminal-view-container">
        <Terminal onExit={() => setView("home")} />
      </div>
    );
  }

  if (view === "projects-gui") {
    return (
      <ProjectsGUI onExit={() => setView("home")} />
    );
  }

  return (
    <div className="home-container">
      <div className="noise-overlay" />
      
      <header className="site-header">
        <div className="shell">
          <div className="header-inner">
            <a href="#top" className="brand">
              <div className="brand-text">
                <span className="brand-name">Paarth Mahadik</span>
                <span className="brand-tagline">Backend &amp; Systems Engineer</span>
              </div>
            </a>
            <nav className="nav">
              <a href="#top" className="nav-link">Home</a>
              <button onClick={() => setView("projects")} className="nav-link btn-link">
                Projects (TUI)
              </button>
              <button onClick={() => setView("projects-gui")} className="nav-link btn-link">
                Projects (GUI)
              </button>
              <a href="#about-skills" className="nav-link">About &amp; Skills</a>
              <a href="#achievements" className="nav-link">Achievements</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Section 1: Hero */}
        <section id="top" className="section-snap hero shell">
          <div className="hero-content">
            <div className="hero-text reveal">
              <p className="eyebrow">Backend • Systems • Linux</p>
              <RotatingTitle />
              <p className="hero-summary">
                I design resilient services and reason about performance in
                Linux-based environments. Currently moving closer to the metal.
              </p>
              <div className="hero-actions">
                <button onClick={() => setView("projects-gui")} className="btn primary">
                  View Projects
                </button>
                <button onClick={() => setView("projects")} className="btn ghost">
                  Launch Terminal
                </button>
              </div>
              <div className="hero-meta">
                <span>Smart India Hackathon 2024 Winner</span>
              </div>
            </div>
          </div>
          <div className="section-separator" />
        </section>

        {/* Section 2: Merged About & Skills */}
        <section id="about-skills" className="section-snap shell">
          <div className="identity-grid reveal">
            <div className="about-content">
              <p className="eyebrow">01. Identity</p>
              <h2 className="section-title">From Backend to Systems</h2>
              <div className="section-body">
                <p>
                  Most of my work lives in Linux environments, where I care about
                  how requests move through services and how systems remain
                  reliable under load.
                </p>
                <p>
                  I'm moving closer to the metal: operating systems, memory
                  management, and networking. I love the intersection of
                  engineering fundamentals and real-world impact.
                </p>
              </div>
            </div>
            
            <div className="skills-content">
              <p className="eyebrow">02. Toolkit</p>
              <div className="skills-compact">
                <div className="skill-category">
                  <h3>Languages</h3>
                  <div className="pill-row">
                    <span className="pill">Rust</span>
                    <span className="pill">C/C++</span>
                    <span className="pill">Python</span>
                    <span className="pill">Go</span>
                  </div>
                </div>
                <div className="skill-category">
                  <h3>Systems &amp; DB</h3>
                  <div className="pill-row">
                    <span className="pill">Linux</span>
                    <span className="pill">PostgreSQL</span>
                    <span className="pill">Redis</span>
                    <span className="pill">Docker</span>
                  </div>
                  <div className="pill-row" style={{ marginTop: '8px' }}>
                    <span className="pill">RabbitMQ</span>
                    <span className="pill">Kafka</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-separator" />
        </section>

        {/* Section 3: Achievements */}
        <section id="achievements" className="section-snap shell">
          <div className="two-column reveal">
            <div className="section-header">
              <p className="eyebrow">03. Recognition</p>
              <h2 className="section-title">Highlights</h2>
            </div>
            <div className="section-body">
              <ul className="achievements-list">
                <li className="achievement-item">
                  <h3>Smart India Hackathon 2024 – Winner</h3>
                  <p>
                    National-level hackathon organised by the Government of India.
                    Built a production-focused solution under tight constraints.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="section-separator" />
        </section>

        {/* Section 4: Contact */}
        <section id="contact" className="section-snap shell">
          <div className="two-column reveal">
            <div className="section-header">
              <p className="eyebrow">04. Connection</p>
              <h2 className="section-title">Let’s Build Something</h2>
            </div>
            <div className="section-body">
              <p>
                I’m open to systems-focused roles and low-level performance
                engineering opportunities.
              </p>
              <div className="contact-grid">
                <a href="mailto:paarth.mahadik@gmail.com" className="contact-item">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">paarth.mahadik@gmail.com</span>
                </a>
                <a href="https://github.com/paarth2023" target="_blank" rel="noreferrer" className="contact-item">
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">@paarth2023</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <span>© {year} Paarth Mahadik</span>
          <span className="footer-subtle">
            Backend &amp; Systems Engineering Portfolio
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
