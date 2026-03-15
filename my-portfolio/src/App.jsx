import { useEffect } from "react";

function useScrollEffects() {
  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll(".reveal"));

    if (revealEls.length > 0 && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -40px 0px",
        }
      );

      revealEls.forEach((el) => io.observe(el));

      return () => io.disconnect();
    } else {
      revealEls.forEach((el) => el.classList.add("visible"));
    }
  }, []);

  useEffect(() => {
    const parallaxCards = Array.from(
      document.querySelectorAll(".parallax-card")
    );

    const handleScroll = () => {
      const viewportH = window.innerHeight;

      parallaxCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardMid = rect.top + rect.height / 2;
        const normalized = (cardMid - viewportH / 2) / viewportH;
        const offset = normalized * -18;
        card.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    parallaxCards.forEach((card) => {
      const onEnter = () => card.classList.add("hovered");
      const onLeave = () => card.classList.remove("hovered");

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      parallaxCards.forEach((card) => {
        card.classList.remove("hovered");
      });
    };
  }, []);
}

function App() {
  useScrollEffects();

  const year = new Date().getFullYear();

  return (
    <div>
      <div className="noise-overlay" />
      <header className="site-header">
        <div className="shell">
          <div className="header-inner">
            <a href="#top" className="brand">
              <div className="brand-text">
                <span className="brand-name">Paarth Mahadik</span>
                <span className="brand-tagline">
                  Backend &amp; Systems-Focused Engineer
                </span>
              </div>
            </a>
            <nav className="nav">
              <a href="#work" className="nav-link">
                Work
              </a>
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#skills" className="nav-link">
                Skills
              </a>
              <a href="#education" className="nav-link">
                Education
              </a>
              <a href="#achievements" className="nav-link">
                Achievements
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero shell">
          <div className="hero-grid">
            <div className="hero-text reveal">
              <p className="eyebrow">Backend • Systems • AI</p>
              <h1 className="hero-title">
                Building reliable backend systems
                <br />
                while moving closer to the metal.
              </h1>
              <p className="hero-summary">
                Backend-focused computer engineering student at Sardar Patel
                Institute of Technology, transitioning into systems programming.
                I enjoy designing resilient services, reasoning about
                performance, and shipping production-ready features in
                Linux-based environments.
              </p>
              <div className="hero-actions">
                <a href="#work" className="btn primary">
                  View selected work
                </a>
                <a href="#contact" className="btn ghost">
                  Get in touch
                </a>
              </div>
              <div className="hero-meta">
                <span>Sardar Patel Institute of Technology · 2023–2027</span>
                <span>Smart India Hackathon 2024 Winner</span>
              </div>
            </div>

            <div className="hero-work reveal">
              <div className="hero-card hero-card-primary parallax-card">
                <p className="card-eyebrow">Flagship</p>
                <h2 className="card-title">
                  Bookify – Appointment Management System
                </h2>
                <p className="card-body">
                  High-performance orchestration platform for complex
                  scheduling, built with Django, DRF, React, PostgreSQL,
                  RabbitMQ, Redis, and Celery.
                </p>
                <ul className="card-list">
                  <li>AI-assisted multi-turn scheduling with Gemini</li>
                  <li>
                    Persona-based RBAC for admins, organisers, and customers
                  </li>
                  <li>Asynchronous notifications via email and Twilio SMS</li>
                  <li>Hybrid UUIDv4 + BigInt identifier strategy</li>
                </ul>
                <a
                  href="https://github.com/MahadevBalla/appointment_management_system"
                  className="card-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
              </div>

              <div className="hero-card hero-card-secondary parallax-card">
                <p className="card-eyebrow">Recent</p>
                <h2 className="card-title">StockMaster – Smart Inventory</h2>
                <p className="card-body">
                  Real-time, multi-warehouse inventory management system
                  replacing spreadsheet-based workflows.
                </p>
                <ul className="card-list">
                  <li>
                    Role-based access with JWT + OTP security flows
                  </li>
                  <li>Activity feed, low-stock and expiry alerts</li>
                  <li>Full stock movement history and AI summaries</li>
                </ul>
                <a
                  href="https://github.com/MahadevBalla/StockMaster"
                  className="card-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section shell">
          <div className="section-header reveal">
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">
              A mix of production-ready web systems and applied machine
              learning research.
            </p>
          </div>

          <div className="projects-grid">
            <article className="project-card reveal parallax-card">
              <header className="project-header">
                <h3 className="project-title">Apex Detector</h3>
                <p className="project-meta">
                  PyTorch · OpenCV · Vision Transformers
                </p>
              </header>
              <p className="project-body">
                Video analysis pipeline that identifies deepfake generation
                techniques, going beyond simple real/fake classification using
                frame-level transformer-based feature extraction.
              </p>
              <ul className="project-points">
                <li>Labeled dataset organised by generation method</li>
                <li>Vision Transformer model for feature extraction</li>
                <li>Hyperparameter tuning for classification consistency</li>
              </ul>
            </article>

            <article className="project-card reveal parallax-card">
              <header className="project-header">
                <h3 className="project-title">
                  Bookify – Appointment Management
                </h3>
                <p className="project-meta">
                  Django · DRF · React · PostgreSQL · RabbitMQ · Redis
                </p>
              </header>
              <p className="project-body">
                Appointment orchestration platform with dynamic resource
                allocation, strict RBAC, and asynchronous notifications across
                email and SMS.
              </p>
              <ul className="project-points">
                <li>
                  Composite, partial, and time-series indexing for performance
                </li>
                <li>
                  Redis caching and Celery result backend to offload the DB
                </li>
                <li>Secure Razorpay integration and robust payment flows</li>
              </ul>
              <div className="project-footer">
                <a
                  href="https://github.com/MahadevBalla/appointment_management_system"
                  className="project-pill link-pill"
                  target="_blank"
                  rel="noreferrer"
                >
                  View repository
                </a>
              </div>
            </article>

            <article className="project-card reveal parallax-card">
              <header className="project-header">
                <h3 className="project-title">
                  StockMaster – Inventory Platform
                </h3>
                <p className="project-meta">
                  React · Node.js · Express · MongoDB · JWT
                </p>
              </header>
              <p className="project-body">
                Real-time multi-warehouse inventory platform with full stock
                history, analytics, and AI-generated summaries using Gemini.
              </p>
              <ul className="project-points">
                <li>Dynamic dashboard with live stock updates and alerts</li>
                <li>Bulk CSV import/export for large-scale operations</li>
                <li>
                  Granular RBAC for admins, managers, and staff
                </li>
              </ul>
              <div className="project-footer">
                <a
                  href="https://github.com/MahadevBalla/StockMaster"
                  className="project-pill link-pill"
                  target="_blank"
                  rel="noreferrer"
                >
                  View repository
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="about" className="section shell">
          <div className="two-column">
            <div className="section-header reveal">
              <p className="eyebrow">About</p>
              <h2 className="section-title">From backend to systems</h2>
            </div>
            <div className="section-body reveal">
              <p>
                I’m a computer engineering student focused on backend
                development and systems-level thinking. Most of my work lives
                in Linux environments, where I care about how requests move
                through services, how data is stored, and how to keep systems
                reliable under load.
              </p>
              <p>
                Recently, I’ve been moving closer to the metal: operating
                systems, memory management, and networking. I’m especially
                interested in how low-level design choices surface as latency,
                throughput, and reliability at the API layer.
              </p>
              <p>
                I like projects that combine strong engineering fundamentals
                with a real-world impact – from deepfake detection to
                production-ready appointment and inventory systems.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="section shell">
          <div className="two-column">
            <div className="section-header reveal">
              <p className="eyebrow">Skills</p>
              <h2 className="section-title">What I work with</h2>
            </div>
            <div className="section-body reveal">
              <div className="pill-group">
                <div className="pill-group-label">Languages</div>
                <div className="pill-row">
                  <span className="pill">Python</span>
                  <span className="pill">C</span>
                  <span className="pill">C++</span>
                  <span className="pill">Rust</span>
                  <span className="pill">JavaScript</span>
                  <span className="pill">HTML</span>
                  <span className="pill">CSS</span>
                </div>
              </div>
              <div className="pill-group">
                <div className="pill-group-label">Frameworks</div>
                <div className="pill-row">
                  <span className="pill">Node.js</span>
                  <span className="pill">Express.js</span>
                  <span className="pill">FastAPI</span>
                  <span className="pill">Flask</span>
                  <span className="pill">Django</span>
                </div>
              </div>
              <div className="pill-group">
                <div className="pill-group-label">Databases</div>
                <div className="pill-row">
                  <span className="pill">PostgreSQL</span>
                  <span className="pill">MySQL</span>
                  <span className="pill">MongoDB</span>
                </div>
              </div>
              <div className="pill-group">
                <div className="pill-group-label">Tools &amp; Platforms</div>
                <div className="pill-row">
                  <span className="pill">Linux</span>
                  <span className="pill">Git</span>
                  <span className="pill">GitHub</span>
                  <span className="pill">Neovim</span>
                  <span className="pill">VS Code</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="section shell">
          <div className="two-column">
            <div className="section-header reveal">
              <p className="eyebrow">Education</p>
              <h2 className="section-title">B.Tech in Computer Engineering</h2>
            </div>
            <div className="section-body reveal">
              <p>
                Sardar Patel Institute of Technology, Andheri, Mumbai (2023 –
                2027). Coursework in data structures, algorithms, databases,
                computer systems, and machine learning.
              </p>
            </div>
          </div>
        </section>

        <section id="achievements" className="section shell">
          <div className="two-column">
            <div className="section-header reveal">
              <p className="eyebrow">Achievements</p>
              <h2 className="section-title">Highlights</h2>
            </div>
            <div className="section-body reveal">
              <ul className="achievements-list">
                <li className="achievement-item">
                  <h3>Smart India Hackathon 2024 – Winner</h3>
                  <p>
                    National-level hackathon organised by the Government of
                    India. Built a production-focused solution under tight
                    constraints, from idea to working prototype.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="section shell section-contact">
          <div className="two-column">
            <div className="section-header reveal">
              <p className="eyebrow">Contact</p>
              <h2 className="section-title">Let’s build something</h2>
            </div>
            <div className="section-body reveal">
              <p>
                I’m open to internships, backend roles, and systems-focused
                opportunities where I can contribute to real-world products
                while going deeper into operating systems and performance
                engineering.
              </p>
              <div className="contact-grid">
                <a
                  href="mailto:paarth.mahadik@gmail.com"
                  className="contact-item"
                >
                  <span className="contact-label">Email</span>
                  <span className="contact-value">
                    paarth.mahadik@gmail.com
                  </span>
                </a>
                <a
                  href="https://github.com/paarth2023"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-item"
                >
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">@paarth2023</span>
                </a>
                <a
                  href="https://linkedin.com/in/paarth-mahadik"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-item"
                >
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">
                    linkedin.com/in/paarth-mahadik
                  </span>
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
            Designed and built with a focus on reliability.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
