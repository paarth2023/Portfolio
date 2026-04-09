import { useState, useEffect } from 'react';

const titles = [
  "Hi, I am Paarth Mahadik",
  "A Backend Systems Engineer",
  "Linux Enthusiast & Power User",
  "Passionate about Low-Level Systems",
  "Designing Resilient Microservices"
];

export function RotatingTitle() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={`hero-title rotating-title ${fade ? 'fade-in' : 'fade-out'}`}>
      {titles[index]}
    </h1>
  );
}
