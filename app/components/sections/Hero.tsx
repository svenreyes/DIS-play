"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yFar = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -160]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -240]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="scanlines relative isolate flex min-h-[100svh] flex-col overflow-hidden px-6 pt-6 md:px-12 md:pt-10"
    >
      {/* Hero backplate: a soft dark oval + neon halo pinned behind the
          title so the wall reads as a stage-lit surface instead of just a
          dark gradient. Kept as a transparent radial tint only, so the
          global wall texture continues through it seamlessly. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: -1,
          background:
            "radial-gradient(ellipse 55% 42% at 50% 52%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.22) 45%, transparent 75%)," +
            "radial-gradient(ellipse 45% 30% at 50% 48%, rgba(57,255,20,0.12) 0%, rgba(57,255,20,0.04) 45%, transparent 75%)",
        }}
      />

      <SprayLayer strokes={heroStrokes} />

      {/* Top bar */}
      <motion.div
        className="relative z-20 flex items-start justify-between"
        style={{ y: yNear }}
      >
        <div className="flex items-center">
          <Image
            src="/cornell_tech.png"
            alt="Cornell Tech"
            width={410}
            height={130}
            priority
            className="h-10 w-auto md:h-12"
          />
        </div>

        <TagStamp rotate={-2} size="lg" variant="acid" className="chalk shadow-[0_0_0_1px_rgba(214,194,58,0.3)]">
          Creative Tech Summit
        </TagStamp>
      </motion.div>

      {/* Centerpiece */}
      <div className="relative z-10 flex flex-1 items-center justify-center py-10">
        <motion.div
          className="relative w-full max-w-[1200px]"
          style={{ y: yMid, opacity }}
        >
          {/* DIS: venom swirl — upper-left, angled up */}
          <motion.div
            aria-hidden
            className="relative z-[1] ml-[10%] md:ml-[14%]"
            style={{ y: yFar }}
          >
            <span
              className="chalk glow-neon inline-block select-none whitespace-nowrap font-[family-name:var(--font-venom)] text-[19vw] leading-[0.85] text-neon md:text-[14vw]"
              style={{ filter: "blur(0.8px)", transform: "rotate(-5deg)" }}
            >
              DIS:
            </span>
          </motion.div>

          {/* Track tags scattered across the midfield */}
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

          {/* PLAY crisp layer — sits below DIS, centered, straight */}
          <motion.h1
            aria-label="DIS:PLAY"
            className="relative z-[2] mt-[3vw] flex flex-col items-center text-center font-[family-name:var(--font-display)] leading-[0.82] md:mt-[4vw]"
            initial={reduced ? {} : { opacity: 0, y: 50 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
          >
            <span className="chalk glow-neon block text-[26vw] tracking-[-0.04em] text-neon md:text-[19vw]">
              PLAY
            </span>
          </motion.h1>
        </motion.div>
      </div>

      {/* Tagline + subtext + event meta */}
      <motion.div
        className="relative z-20 mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-10"
        style={{ y: yNear }}
      >
        <div className="max-w-xl md:flex-1">
          <h2 className="emboss font-[family-name:var(--font-body-bold)] text-2xl uppercase leading-[1.05] tracking-[0.02em] text-bone md:text-3xl">
            Disrupt the display.
            <br />
            Play with the rules.
          </h2>
          <p className="emboss-sm mt-4 max-w-md font-[family-name:var(--font-body-light)] text-[0.95rem] leading-relaxed text-bone/75">
            DIS:PLAY is about breaking the frame. Showing work that&apos;s raw,
            unfinished, and unapologetically experimental.
          </p>
        </div>

        <div className="flex items-center justify-center md:flex-none md:self-center">
          <AgendaButton reduced={reduced} />
        </div>

        <div className="flex flex-col items-start gap-2 text-sm font-[family-name:var(--font-body-bold)] uppercase tracking-[0.12em] text-bone md:flex-1 md:items-end md:text-right">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-neon glow-neon-soft">{event.date}</span>
            <Dot />
            <span className="text-neon glow-neon-soft">{event.time}</span>
            <Dot />
            <span className="emboss-sm">{event.venue}</span>
          </div>
          <div className="font-[family-name:var(--font-body-light)] text-xs tracking-[0.08em] text-bone/60">
            {event.address}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="inline-block h-2 w-2 bg-neon"
      style={{ boxShadow: "0 0 8px rgba(57,255,20,0.9)" }}
    />
  );
}

function AgendaButton({ reduced }: { reduced: boolean | null }) {
  return (
    <motion.a
      href="#schedule"
      initial={reduced ? undefined : { opacity: 0, y: 16, rotate: -4 }}
      animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={
        reduced
          ? undefined
          : { rotate: 1, scale: 1.04, y: -2 }
      }
      whileTap={reduced ? undefined : { scale: 0.97 }}
      className="group relative inline-flex items-center gap-3 border-2 border-neon bg-ink/70 px-7 py-4 font-[family-name:var(--font-body-bold)] text-sm uppercase tracking-[0.22em] text-neon backdrop-blur-[2px] md:text-base"
      style={{
        boxShadow:
          "0 0 0 1px rgba(57,255,20,0.22), 0 0 22px rgba(57,255,20,0.3), inset 0 0 0 1px rgba(57,255,20,0.15)",
      }}
      aria-label="Jump to the schedule"
    >
      <span
        aria-hidden
        className="absolute -left-1 -top-1 h-2 w-2 border-l-2 border-t-2 border-neon opacity-70 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="absolute -right-1 -bottom-1 h-2 w-2 border-b-2 border-r-2 border-neon opacity-70 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span className="chalk glow-neon">Agenda</span>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
      >
        <path
          d="M12 4v14m0 0l-5-5m5 5l5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.a>
  );
}

