"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isHover = window.matchMedia("(hover: hover)").matches;
    if (!isHover || reduced) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-50 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: sx,
          top: sy,
          background:
            "radial-gradient(circle, rgba(57,255,20,0.22) 0%, rgba(57,255,20,0.08) 35%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(14px)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: x,
          top: y,
          background: "#39ff14",
          boxShadow: "0 0 16px rgba(57,255,20,0.9), 0 0 36px rgba(57,255,20,0.6)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
