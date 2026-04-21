"use client";

import Reveal from "../ui/Reveal";
import SprayLayer, { type SprayStroke } from "../fx/SprayLayer";
import { event } from "../../content";

type Card = {
  eyebrow: string;
  value: string;
  sub?: string;
  rotate: number;
  variant: "neon" | "acid" | "stroke";
  className: string;
  size: "sm" | "md" | "lg";
};

const cards: Card[] = [
  {
    eyebrow: "When",
    value: event.date,
    sub: "2026",
    rotate: -4,
    variant: "neon",
    className: "md:col-start-1 md:row-start-1",
    size: "lg",
  },
  {
    eyebrow: "Hours",
    value: event.time,
    rotate: 3,
    variant: "acid",
    className: "md:col-start-3 md:row-start-1 md:translate-y-6",
    size: "md",
  },
  {
    eyebrow: "Where",
    value: event.venue,
    rotate: -2,
    variant: "stroke",
    className: "md:col-start-2 md:row-start-2 md:translate-y-4",
    size: "lg",
  },
  {
    eyebrow: "Address",
    value: event.address,
    rotate: 4,
    variant: "neon",
    className: "md:col-start-4 md:row-start-2 md:-translate-y-2",
    size: "md",
  },
];

const strokes: SprayStroke[] = [
  {
    bezier: [
      [-0.05, 0.18],
      [0.3, 0.05],
      [0.65, 0.3],
      [1.05, 0.16],
    ],
    samples: 36,
    stepInterval: 26,
    thickness: 0.85,
    startDelay: 120,
  },
  {
    bezier: [
      [1.05, 0.78],
      [0.7, 0.6],
      [0.3, 0.95],
      [-0.05, 0.72],
    ],
    samples: 30,
    stepInterval: 28,
    thickness: 0.7,
    startDelay: 650,
  },
];

export default function EventInfo() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-28 md:px-12 md:py-40">
      <SprayLayer strokes={strokes} />

      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <span className="h-2 w-2 bg-neon" style={{ boxShadow: "0 0 10px rgba(57,255,20,0.9)" }} />
          <span className="emboss-sm font-[family-name:var(--font-body-bold)] text-xs uppercase tracking-[0.3em] text-bone/70">
            // Event Info
          </span>
        </div>
      </Reveal>

      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:grid-rows-2 md:gap-6">
        {cards.map((c, i) => (
          <Reveal
            key={c.eyebrow}
            delay={i * 0.15}
            y={40}
            rotate={c.rotate}
            className={c.className}
          >
            <InfoCard {...c} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function InfoCard({ eyebrow, value, sub, variant, size }: Card) {
  const valueSize =
    size === "lg"
      ? "text-4xl md:text-6xl"
      : size === "md"
      ? "text-3xl md:text-5xl"
      : "text-2xl md:text-4xl";

  const border =
    variant === "neon"
      ? "border-neon/70 bg-neon/[0.03]"
      : variant === "acid"
      ? "border-acid/70 bg-acid/[0.04]"
      : "border-bone/50 bg-bone/[0.02]";

  const valueClr =
    variant === "neon"
      ? "text-neon glow-neon"
      : variant === "acid"
      ? "text-acid"
      : "text-bone stroke-text";

  return (
    <div
      className={`chalk relative flex min-h-[140px] flex-col justify-between border-2 border-dashed p-5 md:p-6 ${border}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-body-bold)] text-[0.7rem] uppercase tracking-[0.2em] text-bone/60">
          {eyebrow}
        </span>
        <span className="font-[family-name:var(--font-body-light)] text-[0.65rem] uppercase tracking-[0.3em] text-bone/40">
          /// 01
        </span>
      </div>
      <div className="mt-4">
        <div
          className={`font-[family-name:var(--font-display)] leading-[0.9] tracking-[-0.02em] ${valueClr} ${valueSize}`}
        >
          {value}
        </div>
        {sub ? (
          <div className="mt-2 font-[family-name:var(--font-body-light)] text-sm uppercase tracking-[0.2em] text-bone/50">
            {sub}
          </div>
        ) : null}
      </div>
    </div>
  );
}
