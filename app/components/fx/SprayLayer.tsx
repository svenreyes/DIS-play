"use client";

import { useRef } from "react";
import { useSprayAnimation } from "./spray/useSprayAnimation";
import type { SprayLayerProps, SprayStroke } from "./spray/types";

export type { SprayStroke };

const DEFAULT_SPRAY_COLOR = { r: 57, g: 255, b: 20 };

// Canvas shell for the dripping spray animation used behind each section.
export default function SprayLayer({
  strokes,
  className,
  color = DEFAULT_SPRAY_COLOR,
  dpr = 1.5,
}: SprayLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useSprayAnimation(canvasRef, strokes, color, dpr);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 h-full w-full " + (className ?? "")
      }
      style={{
        opacity: 0.95,
        mixBlendMode: "screen",
        filter: "drop-shadow(0 0 10px rgba(57,255,20,0.4))",
        zIndex: -1,
      }}
    />
  );
}
