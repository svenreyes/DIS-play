"use client";

import Image from "next/image";
import { useCanHover } from "@/app/hooks/useCanHover";
import Reveal from "../ui/Reveal";
import SprayLayer, { type SprayStroke } from "../fx/SprayLayer";
import { event } from "@/app/data/siteContent";

const strokes: SprayStroke[] = [
  {
    bezier: [
      [-0.05, 0.05],
      [0.3, 0.18],
      [0.7, 0.02],
      [1.05, 0.14],
    ],
    samples: 36,
    stepInterval: 24,
    thickness: 1,
    startDelay: 100,
  },
];

export default function Footer() {
  const canHover = useCanHover();
  return (
    <footer className="relative isolate overflow-hidden px-6 pt-24 pb-10 md:px-12 md:pt-40">
      <SprayLayer strokes={strokes} />

      <Reveal>
        <h2
          aria-label="DIS:PLAY"
          className="chalk-hard font-[family-name:var(--font-display)] text-[clamp(4.5rem,24vw,22rem)] leading-[0.8] tracking-[-0.04em] stroke-text text-center"
        >
          DIS:PLAY
        </h2>
      </Reveal>

      <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-8 border-t border-dashed border-bone/20 pt-10 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-2 font-[family-name:var(--font-body-bold)] text-[0.7rem] uppercase tracking-[0.3em] text-neon glow-neon-soft">
            {event.venue} — {event.date}, {event.year}
          </div>
          <div className="font-[family-name:var(--font-body-light)] text-sm text-bone/65">
            {event.address}
          </div>
          <div className="mt-1 font-[family-name:var(--font-body-light)] text-sm text-bone/65">
            {event.time}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <a
            href={`mailto:${event.email}`}
            className={`group inline-flex items-center gap-2 font-[family-name:var(--font-body-bold)] text-sm uppercase tracking-[0.2em] text-bone transition-colors duration-200${canHover ? " hover:text-neon" : ""}`}
          >
            <span className="chalk">{event.email}</span>
            <span
              aria-hidden
              className={`h-px w-10 bg-bone/40 transition-all duration-300${canHover ? " group-hover:w-20 group-hover:bg-neon" : ""}`}
            />
          </a>
          <div className="font-[family-name:var(--font-body-light)] text-[0.7rem] uppercase tracking-[0.25em] text-bone/40">
            Creative Tech Summit / A Cornell Tech production
          </div>
          <a
            href="https://www.nycxdesign.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={`group mt-2 inline-flex items-center gap-2 transition-opacity duration-200${canHover ? " hover:opacity-100" : ""}`}
            aria-label="Officially part of NYCxDESIGN Week"
          >
            <span className="font-[family-name:var(--font-body-bold)] text-[0.6rem] uppercase tracking-[0.28em] text-bone/55">
              Officially part of
            </span>
            <Image
              src="/NYCxDESIGN_Logo.png"
              alt="NYCxDESIGN Week"
              width={1024}
              height={576}
              className="h-5 w-auto opacity-85 transition-opacity duration-200 group-hover:opacity-100 md:h-6"
              style={{ filter: "invert(1) brightness(1.05)" }}
            />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-5xl items-center justify-between font-[family-name:var(--font-body-light)] text-[0.65rem] uppercase tracking-[0.3em] text-bone/30">
        <span>{`© ${event.year} DIS:PLAY`}</span>
        <span>Unfinished, on purpose.</span>
      </div>
    </footer>
  );
}
