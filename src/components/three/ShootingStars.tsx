import { useMemo } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  angle: number;
  length: number;
}

export default function ShootingStars() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${1.2 + Math.random() * 1.8}s`,
      angle: 15 + Math.random() * 40,
      length: 80 + Math.random() * 160,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            "--angle": `${star.angle}deg`,
            "--length": `${star.length}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
