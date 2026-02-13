"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Rocket } from "lucide-react";

const SHIPS = [
  { top: "8%", duration: 26, delay: 0, scale: 0.95, opacity: 0.55 },
  { top: "22%", duration: 32, delay: 4, scale: 1.1, opacity: 0.7 },
  { top: "38%", duration: 24, delay: 2, scale: 0.9, opacity: 0.5 },
  { top: "57%", duration: 35, delay: 6, scale: 1.2, opacity: 0.65 },
  { top: "76%", duration: 28, delay: 1, scale: 1, opacity: 0.6 },
];

export function GlobalSpaceships() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {SHIPS.map((ship, index) => (
        <motion.div
          key={index}
          className="absolute -left-24 rounded-full border border-cyan-300/25 bg-cyan-300/10 p-3 shadow-[0_0_28px_rgba(34,211,238,0.28)]"
          style={{ top: ship.top, scale: ship.scale, opacity: ship.opacity }}
          animate={{
            x: ["0vw", "115vw"],
            y: [0, -24, 10, -16, 0],
            rotate: [0, 7, -5, 0],
          }}
          transition={{
            duration: ship.duration,
            delay: ship.delay,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        >
          <Rocket className="h-5 w-5 text-cyan-100" />
        </motion.div>
      ))}
    </div>
  );
}
