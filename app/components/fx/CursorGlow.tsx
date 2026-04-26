"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Soft neon "flashlight" that follows the cursor.
 *
 * Perf notes:
 *  - Positioning is done via CSS transforms (x / y motion values) on a
 *    wrapper div, NOT `top` / `left`. This keeps the glow on the GPU
 *    composite layer and avoids per-frame layout + paint.
 *  - Blur radius is kept moderate (the wall is already dark, we don't
 *    need a 22px blur to sell "soft light").
 *  - The document-coord motion values publish CSS variables on <html>
 *    for the graffiti mask to consume. Those vars are updated via sprung
 *    motion values so they share one rAF loop with the visible glow.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  // Viewport-coord values drive the visible glow (position: fixed).
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 520, damping: 34, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 520, damping: 34, mass: 0.2 });

  // Document-coord values drive the graffiti mask (position: absolute
  // across the scrollable document).
  const xDoc = useMotionValue(-400);
  const yDoc = useMotionValue(-400);
  const sxDoc = useSpring(xDoc, { stiffness: 520, damping: 34, mass: 0.2 });
  const syDoc = useSpring(yDoc, { stiffness: 520, damping: 34, mass: 0.2 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFineHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!isFineHover || reduced) return;
    setEnabled(true);

    const root = document.documentElement;
    root.dataset.cursor = "on";

    let lastClientX = -400;
    let lastClientY = -400;

    const onMove = (e: MouseEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      x.set(e.clientX);
      y.set(e.clientY);
      xDoc.set(e.clientX + window.scrollX);
      yDoc.set(e.clientY + window.scrollY);
    };

    const onScroll = () => {
      xDoc.set(lastClientX + window.scrollX);
      yDoc.set(lastClientY + window.scrollY);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      delete root.dataset.cursor;
      root.style.removeProperty("--mx");
      root.style.removeProperty("--my");
    };
  }, [reduced, x, y, xDoc, yDoc]);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    const unsubX = sxDoc.on("change", (v) => {
      root.style.setProperty("--mx", `${v}px`);
    });
    const unsubY = syDoc.on("change", (v) => {
      root.style.setProperty("--my", `${v}px`);
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [enabled, sxDoc, syDoc]);

  if (!enabled) return null;

  // We wrap each visual in a transform-only motion.div so changes in
  // `sx`/`sy` don't trigger layout — just a compositor reflow.
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50"
        style={{ x: sx, y: sy, willChange: "transform" }}
      >
        {/* Outer soft beam */}
        <div
          className="h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(92,205,15,0.14) 0%, rgba(92,205,15,0.06) 32%, rgba(92,205,15,0.02) 55%, transparent 72%)",
            mixBlendMode: "screen",
            filter: "blur(14px)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50"
        style={{ x: sx, y: sy, willChange: "transform" }}
      >
        {/* Tight inner hot-spot — still a glow, not a dot */}
        <div
          className="h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(130,220,80,0.26) 0%, rgba(92,205,15,0.12) 40%, transparent 70%)",
            mixBlendMode: "screen",
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </>
  );
}
