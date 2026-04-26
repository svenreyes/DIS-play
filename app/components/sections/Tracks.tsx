"use client";

import { motion, useReducedMotion } from "framer-motion";
import SprayLayer, { type SprayStroke } from "../fx/SprayLayer";
import Reveal from "../ui/Reveal";
import { useCanHover } from "@/app/hooks/useCanHover";
import { tracks } from "@/app/data/siteContent";

const strokes: SprayStroke[] = [
  {
    bezier: [
      [-0.05, 0.48],
      [0.3, 0.3],
      [0.65, 0.6],
      [1.05, 0.4],
    ],
    samples: 44,
    stepInterval: 22,
    thickness: 1,
    startDelay: 120,
  },
  {
    bezier: [
      [0.5, 0.92],
      [0.7, 0.82],
      [0.88, 0.96],
      [1.05, 0.86],
    ],
    samples: 22,
    stepInterval: 28,
    thickness: 0.75,
    startDelay: 900,
  },
];

type Placement = {
  className: string;
  rotate: number;
  scale: number;
};

const placements: Placement[] = [
  {
    className: "md:col-start-1 md:col-end-5 md:row-start-1 md:row-end-3",
    rotate: -3,
    scale: 1,
  },
  {
    className: "md:col-start-6 md:col-end-10 md:row-start-1 md:row-end-2 md:translate-y-6",
    rotate: 2,
    scale: 0.85,
  },
  {
    className: "md:col-start-5 md:col-end-9 md:row-start-3 md:row-end-4 md:-translate-y-4",
    rotate: -4,
    scale: 1.1,
  },
  {
    className: "md:col-start-9 md:col-end-13 md:row-start-2 md:row-end-4 md:translate-y-6",
    rotate: 5,
    scale: 0.95,
  },
];

export default function Tracks() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-28 md:px-12 md:py-40">
      <SprayLayer strokes={strokes} />

      {/* Header */}
      <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 bg-neon" style={{ boxShadow: "0 0 10px rgba(92,205,15,0.9)" }} />
            <span className="emboss-sm font-[family-name:var(--font-body-bold)] text-xs uppercase tracking-[0.3em] text-bone/70">
              // Tracks
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="chalk max-w-2xl font-[family-name:var(--font-display)] text-5xl leading-[0.85] tracking-[-0.03em] text-bone md:text-right md:text-6xl">
            FOUR CORNERS
            <br />
            <span className="text-neon glow-neon-soft">OF DIS:PLAY</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12 md:grid-rows-3 md:gap-6">
        {tracks.map((t, i) => (
          <TrackCard
            key={t.name}
            name={t.name}
            tagline={t.tagline}
            index={i + 1}
            placement={placements[i]}
            delay={i * 0.1}
          />
        ))}
      </div>
    </section>
  );
}

function TrackCard({
  name,
  tagline,
  index,
  placement,
  delay,
}: {
  name: string;
  tagline: string;
  index: number;
  placement: Placement;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const canHover = useCanHover();
  const hoverOrTap = (hoverClasses: string, tapClasses = hoverClasses) =>
    canHover ? hoverClasses : tapClasses;
  const displaySizeClass =
    index === 1
      ? "text-[clamp(2.4rem,7.5vw,6rem)]"
      : "text-[clamp(3rem,10vw,8rem)]";

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 30, rotate: placement.rotate + 4 }}
      whileInView={
        reduced
          ? undefined
          : { opacity: 1, y: 0, rotate: placement.rotate, scale: placement.scale }
      }
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={
        canHover && !reduced
          ? { rotate: placement.rotate + 1.5, scale: placement.scale * 1.03 }
          : undefined
      }
      whileTap={
        !canHover && !reduced
          ? { rotate: placement.rotate + 1.5, scale: placement.scale * 1.03 }
          : undefined
      }
      className={`group relative ${placement.className}`}
    >
      <div className="relative isolate aspect-[4/3] w-full overflow-hidden border-[2px] border-dashed border-acid/60 bg-ink/60 p-6 md:p-8">
        {/* corner marks */}
        <Corner className="absolute left-2 top-2" />
        <Corner className="absolute right-2 top-2 rotate-90" />
        <Corner className="absolute bottom-2 left-2 -rotate-90" />
        <Corner className="absolute bottom-2 right-2 rotate-180" />

        <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.25em] text-acid/80">
          <span className="font-[family-name:var(--font-body-bold)]">TRACK / {String(index).padStart(2, "0")}</span>
          <span className="font-[family-name:var(--font-body-light)] text-bone/40">DIS:PLAY 2026</span>
        </div>

        <div className="relative mt-auto pt-10">
          {/* Glitch RGB split (purely decorative) */}
          <span
            aria-hidden
            className={`chalk-hard absolute inset-0 font-[family-name:var(--font-display)] ${displaySizeClass} leading-[0.8] tracking-[-0.03em] text-[#ff2bd6] mix-blend-screen opacity-0 transition-opacity duration-200 ${hoverOrTap("group-hover:opacity-60", "group-active:opacity-60")}`}
            style={{ transform: "translate(-2px, 1px)" }}
          >
            {name.toUpperCase()}
          </span>
          <span
            aria-hidden
            className={`chalk-hard absolute inset-0 font-[family-name:var(--font-display)] ${displaySizeClass} leading-[0.8] tracking-[-0.03em] text-[#2bffe8] mix-blend-screen opacity-0 transition-opacity duration-200 ${hoverOrTap("group-hover:opacity-60", "group-active:opacity-60")}`}
            style={{ transform: "translate(2px, -1px)" }}
          >
            {name.toUpperCase()}
          </span>
          <h3
            className={`chalk relative font-[family-name:var(--font-display)] ${displaySizeClass} leading-[0.8] tracking-[-0.03em] text-bone transition-colors duration-300 ${hoverOrTap("group-hover:text-neon group-hover:glow-neon", "group-active:text-neon group-active:glow-neon")}`}
          >
            {name.toUpperCase()}
          </h3>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <p className="max-w-[60%] font-[family-name:var(--font-body-light)] text-sm leading-snug text-bone/65">
            {tagline}
          </p>
          <span
            aria-hidden
            className={`h-px w-16 bg-neon transition-all duration-300 ${hoverOrTap("group-hover:w-28", "group-active:w-28")}`}
            style={{ boxShadow: "0 0 10px rgba(92,205,15,0.8)" }}
          />
        </div>

        {/* Hover spray flash */}
        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${hoverOrTap("group-hover:opacity-100", "group-active:opacity-100")}`}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 80%, rgba(92,205,15,0.15) 0%, transparent 50%)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-4 w-4 border-l-2 border-t-2 border-acid/80 ${className}`}
    />
  );
}
