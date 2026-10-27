"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  drift: string;
  rotation: string;
  duration: string;
  delay: string;
}

export default function PetalsLayer() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    // Generate lightweight steady stream of petals
    const initialPetals: Petal[] = Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.floor(11 + Math.random() * 10),
      drift: `${Math.random() * 120 - 60}px`,
      rotation: `${Math.floor(Math.random() * 360)}deg`,
      duration: `${(9 + Math.random() * 6).toFixed(1)}s`,
      delay: `${(i * 1.2).toFixed(1)}s`
    }));

    setPetals(initialPetals);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[40] overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal-element"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${Math.floor(petal.size * 1.35)}px`,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            ["--drift-x" as any]: petal.drift,
            ["--rot" as any]: petal.rotation
          }}
        />
      ))}
    </div>
  );
}
