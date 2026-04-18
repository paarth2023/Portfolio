import { useState, useEffect } from "react";
import "./ProjectsGUI.css";
import { projects } from "../data/projects";

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" className="github-icon" fill="white">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

const CalendarAnimation = () => {
    const [marked, setMarked] = useState([]);
    useEffect(() => {
        const it = setInterval(() => {
            setMarked(m => m.length >= 10 ? [] : [...m, Math.floor(Math.random() * 28)]);
        }, 800);
        return () => clearInterval(it);
    }, []);
    return (
        <div className="calendar-mockup">
            <div className="calendar-grid">
                {Array.from({ length: 28 }).map((_, i) => (
                    <div key={i} className={`calendar-cell ${marked.includes(i) ? 'marked' : ''}`} />
                ))}
            </div>
        </div>
    );
};

const InventoryAnimation = () => {
    return (
        <div className="bulk-grid">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="commodity-box" style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
        </div>
    );
};

const ScanningAnimation = () => {
    const [pts, setPts] = useState([]);
    useEffect(() => {
        const it = setInterval(() => {
            setPts(p => p.length >= 6 ? [] : [...p, { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }]);
        }, 500);
        return () => clearInterval(it);
    }, []);
    return (
        <div className="scanning-box">
            <div className="scan-line" />
            {pts.map((p, i) => (
                <div key={i} className="detection-point" style={{ top: `${p.y}%`, left: `${p.x}%` }} />
            ))}
        </div>
    );
};


export const ProjectsGUI = ({ onExit }) => {
    const allProjects = projects.map(p => {
        let visualType = "fallback";
        if (p.id === "bookify") visualType = "bookify";
        else if (p.id === "stockmaster") visualType = "stock";
        else if (p.id === "apex") visualType = "apex";

        const stack = p.meta ? p.meta.split(" · ") : [];
        return { ...p, visualType, stack };
    });

    return (
        <div className="projects-gui-container">
            <nav className="gui-nav">
                <div className="gui-brand">Curated Portfolio / {allProjects.length} Projects</div>
                <button className="gui-close" onClick={onExit}>Home</button>
            </nav>

            <div className="projects-snap-list">
                {allProjects.filter((_, idx) => idx !== 3 && idx !== 4).map((project, idx) => (
                    <section className="project-section" key={project.id}>
                        <div className="project-container">
                            <div className="project-text">
                                <p className="eyebrow">Project / 0{idx + 1}</p>
                                <h1 className="project-title">{project.title}</h1>
                                <p className="project-summary">{project.description}</p>

                                <div className="project-stack-row">
                                    <div className="project-stack">
                                        {project.stack.map(tech => (
                                            <span className="stack-pill" key={tech}>{tech}</span>
                                        ))}
                                    </div>
                                    {project.github && project.id !== "apex" && (
                                        <a href={project.github} target="_blank" rel="noreferrer" className="github-link">
                                            <GitHubIcon />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="project-visual-box">
                                {project.visualType === "bookify" && <CalendarAnimation />}
                                {project.visualType === "stock" && <InventoryAnimation />}
                                {project.visualType === "apex" && <ScanningAnimation />}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};
