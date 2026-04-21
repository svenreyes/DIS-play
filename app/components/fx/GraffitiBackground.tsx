"use client";

/**
 * Faded handwritten graffiti scrawled down the whole wall.
 *
 * Layout:
 *   The container is `absolute inset-0` inside <body>, which (because body
 *   grows with the page) means it spans the full scrollable document. Tags
 *   are positioned with `top` values in `vh`, so different passages come
 *   into view as the user scrolls — it reads like walking down a wall of
 *   scribbled thoughts.
 *
 * Reveal:
 *   Base state is essentially invisible (see `.graffiti-layer` in
 *   globals.css). When the cursor flashlight is on, a radial alpha mask
 *   centered at (`--mx`, `--my`) — which CursorGlow publishes in *document*
 *   coordinates — lifts the text to a legible-but-still-faint level under
 *   the beam. Everywhere else it stays as faded wall residue.
 */

type Tag = {
  text: string;
  /** Horizontal position as a CSS value (e.g. "12%", "72%"). */
  x: string;
  /** Vertical position as a CSS value. Use vh so tags spread through the
   *  whole scroll. */
  y: string;
  rotate: number;
  /** Font size (CSS). */
  size: string;
  /** Optional local opacity multiplier (0–1), baseline is 1. */
  weight?: number;
  /** Optional letter-spacing override. */
  tracking?: string;
  /** Optional italic / weight tweak via inline style. */
  italic?: boolean;
  /** Optional accent color. */
  accent?: "bone" | "neon";
  /** Max width (CSS) so longer passages wrap. */
  maxWidth?: string;
};

// Loose, handwritten-feeling passages scribbled down the wall.
const tags: Tag[] = [
  {
    text: "we are in such a weird time, kids.",
    x: "6%",
    y: "8vh",
    rotate: -2,
    size: "1.6vw",
    maxWidth: "42vw",
  },
  {
    text: "artificial intelligence literally defining who we ought to be —",
    x: "48%",
    y: "16vh",
    rotate: 1,
    size: "1.3vw",
    maxWidth: "46vw",
    italic: true,
  },
  {
    text: "to compete in this cutthroat world, not ourselves.",
    x: "54%",
    y: "24vh",
    rotate: -1,
    size: "1.35vw",
    maxWidth: "40vw",
  },
  {
    text: "you want to be a creative?",
    x: "8%",
    y: "36vh",
    rotate: -3,
    size: "1.8vw",
  },
  {
    text: "be a CREEATIVEEEE.",
    x: "12%",
    y: "42vh",
    rotate: -4,
    size: "3.2vw",
    tracking: "0.02em",
    accent: "neon",
    weight: 0.85,
  },
  {
    text: "create something.",
    x: "62%",
    y: "48vh",
    rotate: 2,
    size: "1.6vw",
  },
  {
    text: "write something.",
    x: "66%",
    y: "54vh",
    rotate: 2,
    size: "1.6vw",
  },
  {
    text: "code something.",
    x: "70%",
    y: "60vh",
    rotate: 2,
    size: "1.6vw",
  },

  {
    text: "stop optimizing your life for an algorithm you did not write.",
    x: "4%",
    y: "78vh",
    rotate: -1,
    size: "1.4vw",
    maxWidth: "50vw",
    italic: true,
  },
  {
    text: "make the ugly thing.",
    x: "70%",
    y: "86vh",
    rotate: -3,
    size: "1.7vw",
  },
  {
    text: "ship the broken thing.",
    x: "72%",
    y: "92vh",
    rotate: -2,
    size: "1.7vw",
  },
  {
    text: "let your fingerprints show.",
    x: "68%",
    y: "98vh",
    rotate: -3,
    size: "1.7vw",
  },

  {
    text: "the machines can copy the surface.",
    x: "8%",
    y: "118vh",
    rotate: 1,
    size: "1.4vw",
    maxWidth: "44vw",
  },
  {
    text: "they cannot copy the scar tissue.",
    x: "10%",
    y: "124vh",
    rotate: 2,
    size: "1.4vw",
    italic: true,
    maxWidth: "44vw",
  },
  {
    text: "keep failing loud. keep the receipts.",
    x: "58%",
    y: "140vh",
    rotate: -2,
    size: "1.3vw",
    maxWidth: "40vw",
  },
  {
    text: "keep the drafts.",
    x: "62%",
    y: "146vh",
    rotate: -1,
    size: "1.6vw",
    accent: "neon",
    weight: 0.75,
  },

  {
    text: "nothing about this is supposed to feel clean.",
    x: "6%",
    y: "168vh",
    rotate: -2,
    size: "1.5vw",
    maxWidth: "48vw",
  },
  {
    text: "the work is the mess. the mess is the work.",
    x: "8%",
    y: "176vh",
    rotate: 1,
    size: "1.55vw",
    italic: true,
    maxWidth: "50vw",
  },

  {
    text: "you are not content.",
    x: "64%",
    y: "196vh",
    rotate: 2,
    size: "1.6vw",
  },
  {
    text: "you are not a pipeline.",
    x: "66%",
    y: "202vh",
    rotate: 2,
    size: "1.6vw",
  },
  {
    text: "you are not a feed.",
    x: "68%",
    y: "208vh",
    rotate: 2,
    size: "1.6vw",
  },
  {
    text: "you are a person with hands. use them.",
    x: "60%",
    y: "216vh",
    rotate: 0,
    size: "1.5vw",
    italic: true,
    maxWidth: "40vw",
    accent: "neon",
    weight: 0.7,
  },

  {
    text: "display > perform.",
    x: "10%",
    y: "236vh",
    rotate: -3,
    size: "1.6vw",
  },
  {
    text: "raw > polished.",
    x: "12%",
    y: "242vh",
    rotate: -2,
    size: "1.6vw",
  },
  {
    text: "unfinished > untrue.",
    x: "14%",
    y: "248vh",
    rotate: -1,
    size: "1.6vw",
  },
  {
    text: "ship it anyway.",
    x: "16%",
    y: "254vh",
    rotate: 0,
    size: "1.7vw",
    accent: "neon",
    weight: 0.75,
  },

  {
    text: "your weirdness is not a bug.",
    x: "62%",
    y: "272vh",
    rotate: 2,
    size: "1.5vw",
    italic: true,
    maxWidth: "40vw",
  },
  {
    text: "please do not smooth it out.",
    x: "64%",
    y: "280vh",
    rotate: 1,
    size: "1.5vw",
    maxWidth: "40vw",
  },
];

export default function GraffitiBackground() {
  return (
    <div
      aria-hidden
      className="graffiti-layer pointer-events-none absolute inset-0 z-0 select-none"
    >
      {tags.map((t, i) => (
        <span
          key={`${i}-${t.text.slice(0, 8)}`}
          className={
            "graffiti-tex absolute whitespace-pre-wrap " +
            (t.accent === "neon" ? "graffiti-tag--neon" : "")
          }
          style={{
            left: t.x,
            top: t.y,
            transform: `translate(-4%, -50%) rotate(${t.rotate}deg)`,
            fontFamily: "var(--font-body-light)",
            fontSize: t.size,
            letterSpacing: t.tracking ?? "0.01em",
            lineHeight: 1.05,
            fontStyle: t.italic ? "italic" : "normal",
            opacity: t.weight ?? 1,
            maxWidth: t.maxWidth,
          }}
        >
          {t.text}
        </span>
      ))}
    </div>
  );
}
