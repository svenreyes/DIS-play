"use client";

import { useLayoutEffect, useState } from "react";
import CursorGlow from "./CursorGlow";

/**
 * Do not mount CursorGlow (springs, listeners, rAF) on touch / coarse
 * pointers where it never runs anyway.
 */
export default function CursorGlowGate() {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setShow(mq.matches);
    const onChange = () => setShow(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!show) return null;
  return <CursorGlow />;
}
