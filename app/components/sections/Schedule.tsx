"use client";

import { motion, useReducedMotion } from "framer-motion";
import SprayStreak from "../fx/SprayStreak";
import Reveal from "../ui/Reveal";
import { schedule } from "../../content";

const rotations = [-0.8, 0.6, -0.4, 0.8, -0.6, 0.5, -0.9, 0.7, -0.3, 0.6];

export default function Schedule() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden px-6 py-28 md:px-12 md:py-40">
      <div className="mb-14 flex items-end justify-between">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 bg-neon" style={{ boxShadow: "0 0 10px rgba(57,255,20,0.9)" }} />
            <span className="font-[family-name:var(--font-body-bold)] text-xs uppercase tracking-[0.3em] text-bone/70">
              // Schedule
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="chalk font-[family-name:var(--font-display)] text-5xl leading-[0.85] tracking-[-0.03em] text-bone md:text-7xl">
            <span className="text-neon glow-neon-soft">RUN</span>
            <span className="stroke-text"> / </span>
            OF SHOW
          </h2>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Divider with vertical spray streak */}
        <div
          aria-hidden
          className="absolute left-[22%] top-0 bottom-0 hidden w-px md:block"
          style={{
            background:
              "repeating-linear-gradient(to bottom, rgba(237,234,224,0.35) 0 6px, transparent 6px 14px)",
          }}
        />
        <div aria-hidden className="absolute left-[22%] top-0 bottom-0 hidden w-16 -translate-x-1/2 md:block">
          <SprayStreak
            className="h-full w-full"
            viewBox="0 0 40 1000"
            preserveAspectRatio="none"
            d="M 20 20 C 28 180, 12 340, 22 520 S 18 820, 20 980"
            strokeWidth={6}
            gradient="vertical"
            delay={0.1}
            duration={2}
            drips={[
              { cx: 22, cy: 320, r: 2 },
              { cx: 18, cy: 640, r: 2.5 },
            ]}
          />
        </div>

        <ul className="relative flex flex-col">
          {schedule.map((item, i) => (
            <motion.li
              key={item.time + item.title}
              initial={reduced ? {} : { opacity: 0, x: -20 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0, rotate: rotations[i % rotations.length] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.65,
                delay: i * 0.06,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="group relative grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-dashed border-bone/15 py-5 md:grid-cols-[22%_1fr] md:gap-10 md:py-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-display)] text-3xl leading-none tracking-[-0.02em] text-neon glow-neon-soft md:text-5xl">
                  {item.time}
                </span>
                <span className="font-[family-name:var(--font-body-light)] text-[0.65rem] uppercase tracking-[0.25em] text-bone/40 md:hidden">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <h3 className="chalk font-[family-name:var(--font-body-bold)] text-xl uppercase tracking-[0.02em] text-bone transition-colors duration-300 group-hover:text-neon md:text-2xl">
                    {item.title}
                  </h3>
                  <span className="hidden font-[family-name:var(--font-body-light)] text-[0.65rem] uppercase tracking-[0.25em] text-bone/40 md:inline">
                    [ {String(i + 1).padStart(2, "0")} / {schedule.length} ]
                  </span>
                </div>
                <p className="mt-1.5 max-w-xl font-[family-name:var(--font-body-light)] text-sm leading-relaxed text-bone/65">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Bottom scribble */}
        <SprayStreak
          className="pointer-events-none absolute -bottom-10 -right-6 h-20 w-72"
          viewBox="0 0 300 80"
          d="M 10 40 C 60 10, 140 70, 200 30 S 270 55, 290 40"
          strokeWidth={8}
          delay={0.3}
        />
      </div>
    </section>
  );
}
