"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SprayLayer, { type SprayStroke } from "../fx/SprayLayer";
import TagStamp from "../ui/TagStamp";
import { event, tracks } from "@/app/data/siteContent";

const heroStrokes: SprayStroke[] = [
  {
    bezier: [
      [-0.05, 0.82],
      [0.28, 0.55],
      [0.62, 0.92],
      [1.05, 0.62],
    ],
    samples: 48,
    stepInterval: 22,
    thickness: 1.1,
    startDelay: 200,
  },
  {
    bezier: [
      [0.55, 0.08],
      [0.72, 0.22],
      [0.88, 0.12],
      [1.05, 0.26],
    ],
    samples: 22,
    stepInterval: 28,
    thickness: 0.8,
    startDelay: 900,
  },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // Mobile devices struggle with the 4-way scroll-linked parallax (two
  // translate axes + opacity recomputed every scroll frame composite
  // against the global CRT + wall layers). We disable the parallax on
  // narrow viewports so scrolling stays buttery. Desktop keeps the full
  // cinematic exit animation.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const disableParallax = reduced || isMobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yFar = useTransform(scrollYProgress, [0, 1], [0, disableParallax ? 0 : -80]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, disableParallax ? 0 : -160]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, disableParallax ? 0 : -240]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, disableParallax ? 1 : 0.2]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden px-6 pt-6 md:px-12 md:pt-10"
    >
      {/* Hero backplate */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: -1,
          background:
            "radial-gradient(ellipse 55% 42% at 50% 52%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.22) 45%, transparent 75%)," +
            "radial-gradient(ellipse 45% 30% at 50% 48%, rgba(92,205,15,0.12) 0%, rgba(92,205,15,0.04) 45%, transparent 75%)",
        }}
      />

      <SprayLayer strokes={heroStrokes} />

      {/* ── Screen 1: fills the viewport on mobile ── */}
      <div className="flex min-h-[100svh] flex-col md:min-h-0">
        {/* Top bar */}
        <motion.div
          className="relative z-20 flex items-start justify-between gap-4"
          style={{ y: yNear }}
        >
          <div className="flex items-center gap-2 md:gap-5">
            <Image
              src="/cornell_tech.png"
              alt="Cornell Tech"
              width={410}
              height={130}
              priority
              className="h-9 w-auto md:h-12"
            />
            <span aria-hidden className="hidden h-8 w-px bg-bone/25 md:block" />
            <a
              href="https://www.nycxdesign.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="NYCxDESIGN Week"
            >
              <Image
                src="/NYCxDESIGN_Logo.png"
                alt="NYCxDESIGN Week"
                width={1024}
                height={576}
                priority
                className="h-9 w-auto opacity-90 transition-opacity duration-200 group-hover:opacity-100 md:h-12"
                style={{ filter: "invert(1) brightness(1.05)" }}
              />
            </a>
          </div>

          <TagStamp
            rotate={-2}
            size="sm"
            variant="acid"
            className="chalk self-start !text-[0.55rem] !px-1.5 !py-0.5 shadow-[0_0_0_1px_rgba(200,179,28,0.3)] md:!text-base md:!px-4 md:!py-2"
          >
            Creative Tech Summit
          </TagStamp>
        </motion.div>

        {/* Centerpiece */}
        <div className="relative z-10 flex flex-1 items-center justify-center py-8 md:py-10">
          <motion.div
            className="relative w-full max-w-[1200px]"
            style={{ y: yMid, opacity }}
          >
            {/* DIS: venom swirl */}
            <motion.div
              aria-hidden
              className="relative z-[1] ml-[10%] md:ml-[14%]"
              style={{ y: yFar }}
            >
              <span
                className="chalk glow-neon inline-block select-none whitespace-nowrap font-[family-name:var(--font-venom)] text-[26vw] leading-[0.85] text-neon md:text-[14vw]"
                style={{ filter: "blur(0.8px)", transform: "rotate(-5deg)" }}
              >
                DIS:
              </span>
            </motion.div>

            {/* Track tags */}
            <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
              <div className="absolute left-[58%] top-[8%]">
                <TagStamp rotate={-8} size="md" className="chalk" delay={0.55}>
                  {tracks[0].name}
                </TagStamp>
              </div>
              <div className="absolute left-[78%] top-[2%]">
                <TagStamp rotate={6} size="md" className="chalk" delay={0.7}>
                  {tracks[1].name}
                </TagStamp>
              </div>
              <div className="absolute left-[4%] top-[62%]">
                <TagStamp rotate={-6} size="md" className="chalk" delay={0.85}>
                  {tracks[2].name}
                </TagStamp>
              </div>
              <div className="absolute right-[4%] top-[62%]">
                <TagStamp rotate={7} size="md" className="chalk" delay={1}>
                  {tracks[3].name}
                </TagStamp>
              </div>
            </div>

            {/* PLAY */}
            <motion.h1
              aria-label="DIS:PLAY"
              className="relative z-[2] mt-[3vw] flex flex-col items-center text-center font-[family-name:var(--font-display)] leading-[0.82] md:mt-[4vw]"
              initial={reduced ? {} : { opacity: 0, y: 50 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
            >
              <span className="chalk glow-neon block text-[36vw] tracking-[-0.04em] text-neon md:text-[19vw]">
                PLAY
              </span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Tagline + subtext + event meta */}
        <motion.div
          className="relative z-20 mb-8 flex flex-col gap-6 md:mb-0 md:flex-row md:items-end md:justify-between md:gap-10"
          style={{ y: yNear }}
        >
          <div className="max-w-xl md:flex-1">
            <h2 className="emboss font-[family-name:var(--font-body-bold)] text-2xl uppercase leading-[1.05] tracking-[0.02em] text-bone md:text-3xl">
              Disrupt the display.
              <br />
              Play with the rules.
            </h2>
            <p className="emboss-sm mt-4 max-w-md font-[family-name:var(--font-body)] text-[0.95rem] leading-relaxed text-white">
              DIS:PLAY is about breaking the frame. Showing work that&apos;s raw,
              unfinished, and unapologetically experimental.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 text-bone md:flex-1 md:items-end md:text-right">
            <div className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-display)] text-lg uppercase tracking-[0.04em] md:text-xl">
              <span className="text-neon glow-neon-soft">{event.date}</span>
              <Dot />
              <span className="text-neon glow-neon-soft">{event.time}</span>
              <Dot />
              <span className="emboss-sm">{event.venue}</span>
            </div>
            <div className="emboss-sm font-[family-name:var(--font-display)] text-sm tracking-[0.04em] text-rust md:text-base">
              {event.address}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Screen 2 on mobile: RSVP cards ── */}
      <motion.div
        className="relative z-20 grid grid-cols-1 gap-4 py-10 md:mb-12 md:mt-6 md:grid-cols-2 md:gap-5 md:py-0"
        style={{ y: yNear }}
      >
        <a
          href="https://luma.com/bsye2xar"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden border-2 border-dashed border-neon bg-ink/80 p-7 transition-colors duration-300 hover:bg-neon/[0.08] md:p-8"
          style={{ boxShadow: "inset 0 0 0 1px rgba(92,205,15,0.08), 0 0 28px rgba(92,205,15,0.12)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-neon/[0.04]" />
          <div className="flex items-start justify-between">
            <span className="emboss-sm font-[family-name:var(--font-body-bold)] text-[0.65rem] uppercase tracking-[0.3em] text-neon">
              // Summit
            </span>
            <span className="emboss-sm font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.06em] text-acid">
              May 13 · 12–7PM
            </span>
          </div>
          <div className="mt-6 flex items-end justify-between gap-4">
            <h3 className="chalk font-[family-name:var(--font-display)] text-5xl leading-[0.9] tracking-[-0.02em] text-neon glow-neon md:text-6xl">
              RSVP
            </h3>
            <span className="emboss-sm inline-flex items-center gap-2 font-[family-name:var(--font-body-bold)] text-sm uppercase tracking-[0.18em] text-neon transition-transform duration-200 group-hover:translate-x-1">
              Register ↗
            </span>
          </div>
          <p className="emboss-sm mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-white">
            Workshops, panels, fireside chats, startup demos, and keynotes.
          </p>
        </a>

        <a
          href="https://luma.com/x9h9uj1r"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden border border-bone/20 bg-ink-2/60 p-7 transition-colors duration-300 hover:border-bone/50 md:p-8"
        >
          <div className="flex items-start justify-between">
            <span className="emboss-sm font-[family-name:var(--font-body-bold)] text-[0.65rem] uppercase tracking-[0.3em] text-acid">
              // After Party
            </span>
            <span className="emboss-sm font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.06em] text-acid">
              7–9PM · River Room
            </span>
          </div>
          <div className="mt-6 flex items-end justify-between gap-4">
            <h3 className="chalk emboss font-[family-name:var(--font-display)] text-5xl leading-[0.9] tracking-[-0.02em] text-bone md:text-6xl">
              RSVP
            </h3>
            <span className="emboss-sm inline-flex items-center gap-2 font-[family-name:var(--font-body-bold)] text-sm uppercase tracking-[0.18em] text-rust transition-transform duration-200 group-hover:translate-x-1 group-hover:text-rust">
              Register ↗
            </span>
          </div>
          <p className="emboss-sm mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-white">
            Rapid-fire demos, open networking, and a Mio Matcha pop-up at the
            River Room. Hosted with Epic Connector.
          </p>
        </a>
      </motion.div>
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="inline-block h-2 w-2 bg-neon"
      style={{ boxShadow: "0 0 8px rgba(92,205,15,0.9)" }}
    />
  );
}
