"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SprayStreak from "../fx/SprayStreak";
import TagStamp from "../ui/TagStamp";
import { event, tracks } from "../../content";

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
      {/* Top bar */}
      <motion.div
        className="relative z-20 flex items-start justify-between"
        style={{ y: yNear }}
      >
        <div className="flex items-center gap-3">
          <CornellCrest />
          <div className="leading-[0.95]">
            <div className="font-[family-name:var(--font-body-bold)] text-sm tracking-[0.18em] text-bone">
              CORNELL
            </div>
            <div className="font-[family-name:var(--font-body-bold)] text-sm tracking-[0.18em] text-bone">
              TECH
            </div>
          </div>
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
          {/* Scattered track tags (behind headline) */}
          <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
            <div className="absolute left-[6%] top-[34%] -translate-y-1/2">
              <TagStamp rotate={-14} size="md" className="chalk" delay={0.5}>
                {tracks[0].name}
              </TagStamp>
            </div>
            <div className="absolute left-[30%] top-[44%]">
              <TagStamp rotate={-5} size="md" className="chalk" delay={0.65}>
                {tracks[1].name}
              </TagStamp>
            </div>
            <div className="absolute left-[54%] top-[42%]">
              <TagStamp rotate={-9} size="md" className="chalk" delay={0.8}>
                {tracks[2].name}
              </TagStamp>
            </div>
            <div className="absolute right-[6%] top-[36%]">
              <TagStamp rotate={6} size="md" className="chalk" delay={0.95}>
                {tracks[3].name}
              </TagStamp>
            </div>
          </div>

          {/* DIS: venom swirl behind */}
          <motion.div
            aria-hidden
            className="absolute inset-0 z-[1] flex items-center justify-center"
            style={{ y: yFar }}
          >
            <span
              className="chalk glow-neon select-none whitespace-nowrap font-[family-name:var(--font-venom)] text-[22vw] leading-none text-neon md:text-[18vw]"
              style={{ filter: "blur(0.8px)" }}
            >
              DIS:
            </span>
          </motion.div>

          {/* DIS:PLAY crisp layer */}
          <motion.h1
            className="relative z-[2] flex flex-col items-center text-center font-[family-name:var(--font-display)] leading-[0.82]"
            initial={reduced ? {} : { opacity: 0, y: 40 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
          >
            <span className="chalk glow-neon-soft block text-[18vw] tracking-[-0.03em] text-neon md:text-[14vw]">
              DIS:
            </span>
            <span className="chalk glow-neon block -mt-[2vw] text-[22vw] tracking-[-0.04em] text-neon md:text-[17vw]">
              PLAY
            </span>
          </motion.h1>

          {/* Spray streak across centerpiece */}
          <SprayStreak
            className="pointer-events-none absolute left-0 top-0 h-full w-full z-[3]"
            viewBox="0 0 1200 600"
            d="M -40 440 C 180 380, 360 520, 580 460 S 960 360, 1240 420"
            strokeWidth={22}
            delay={0.6}
            duration={1.6}
            triggerOnView={false}
            drips={[
              { cx: 220, cy: 500, r: 4, delay: 0.05 },
              { cx: 820, cy: 420, r: 5, delay: 0.2 },
              { cx: 980, cy: 480, r: 3, delay: 0.3 },
            ]}
          />
        </motion.div>
      </div>

      {/* Tagline + subtext + event meta */}
      <motion.div
        className="relative z-20 mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        style={{ y: yNear }}
      >
        <div className="max-w-xl">
          <h2 className="font-[family-name:var(--font-body-bold)] text-2xl uppercase leading-[1.05] tracking-[0.02em] text-bone md:text-3xl">
            Disrupt the display.
            <br />
            Play with the rules.
          </h2>
          <p className="mt-4 max-w-md font-[family-name:var(--font-body-light)] text-[0.95rem] leading-relaxed text-bone/75">
            DIS:PLAY is about breaking the frame. Showing work that&apos;s raw,
            unfinished, and unapologetically experimental.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 text-sm font-[family-name:var(--font-body-bold)] uppercase tracking-[0.12em] text-bone md:items-end md:text-right">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-neon glow-neon-soft">{event.date}</span>
            <Dot />
            <span className="text-neon glow-neon-soft">{event.time}</span>
            <Dot />
            <span>{event.venue}</span>
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

function CornellCrest() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-9 w-9 text-bone"
      fill="none"
      aria-hidden
    >
      <rect x="1" y="1" width="38" height="38" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M8 30 L20 8 L32 30 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M14 28 H26" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="22" r="2" fill="currentColor" />
    </svg>
  );
}
