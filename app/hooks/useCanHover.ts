"use client";

import { useLayoutEffect, useState } from "react";

const fineHoverQuery = "(hover: hover) and (pointer: fine)";

/**
 * True for mouse / trackpad users; false for touch and coarse pointers.
 * Used to avoid mounting hover-only FX and Framer `whileHover` on mobile.
 */
export function useCanHover() {
  const [can, setCan] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(fineHoverQuery);
    setCan(mq.matches);
    const onChange = () => setCan(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return can;
}
