"use client";

import { graffitiTags } from "@/app/data/graffitiTags";
import { useCanHover } from "@/app/hooks/useCanHover";

/**
 * Faded handwritten graffiti scrawled down the whole wall.
 *
 * The layer spans the full scrollable body. CursorGlow publishes cursor
 * coordinates to CSS variables, and globals.css uses them as a flashlight
 * mask so these tags become readable only under the beam.
 *
 * Not mounted on touch: no cursor flashlight, and skipping ~80 filter-heavy
 * spans saves layout/paint on mobile.
 */
export default function GraffitiBackground() {
  const canHover = useCanHover();
  if (!canHover) return null;

  return (
    <div
      aria-hidden
      className="graffiti-layer pointer-events-none absolute inset-0 z-0 select-none"
    >
      {graffitiTags.map((tag, i) => (
        <span
          key={`${i}-${tag.text.slice(0, 8)}`}
          className={
            "graffiti-tex absolute whitespace-pre-wrap " +
            (tag.accent === "neon" ? "graffiti-tag--neon" : "")
          }
          style={{
            left: tag.x,
            top: tag.y,
            transform: `translate(-4%, -50%) rotate(${tag.rotate}deg)`,
            fontFamily: "var(--font-body-light)",
            fontSize: tag.size,
            letterSpacing: tag.tracking ?? "0.01em",
            lineHeight: 1.05,
            fontStyle: tag.italic ? "italic" : "normal",
            opacity: tag.weight ?? 1,
            maxWidth: tag.maxWidth,
          }}
        >
          {tag.text}
        </span>
      ))}
    </div>
  );
}
