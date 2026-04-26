"use client";

import { motion, useReducedMotion } from "framer-motion";
import SprayLayer, { type SprayStroke } from "../fx/SprayLayer";
import Reveal from "../ui/Reveal";
import { schedule, type ScheduleItem } from "@/app/data/siteContent";

const rotations = [-0.8, 0.6, -0.4, 0.8, -0.6, 0.5, -0.9, 0.7, -0.3, 0.6];

type ScheduleSlot = { time: string; items: ScheduleItem[] };

function groupByTime(items: ScheduleItem[]): ScheduleSlot[] {
  const slots: ScheduleSlot[] = [];
  for (const item of items) {
    const last = slots[slots.length - 1];
    if (last && last.time === item.time) {
      last.items.push(item);
    } else {
      slots.push({ time: item.time, items: [item] });
    }
  }
  return slots;
}

const strokes: SprayStroke[] = [
  {
    bezier: [
      [0.08, 0.02],
      [0.12, 0.3],
      [0.05, 0.65],
      [0.1, 0.98],
    ],
    samples: 60,
    stepInterval: 22,
    thickness: 0.85,
    startDelay: 100,
  },
  {
    bezier: [
      [-0.05, 0.18],
      [0.25, 0.12],
      [0.55, 0.22],
      [1.05, 0.14],
    ],
    samples: 28,
    stepInterval: 26,
    thickness: 0.7,
    startDelay: 700,
  },
];

export default function Schedule() {
  const reduced = useReducedMotion();
  const slots = groupByTime(schedule);
  const totalItems = schedule.length;

  return (
    <section
      id="schedule"
      className="relative isolate overflow-hidden px-6 pt-40 pb-28 md:px-12 md:pt-56 md:pb-40"
      style={{ scrollMarginTop: "6rem" }}
    >
      <SprayLayer strokes={strokes} color={{ r: 191, g: 29, b: 53 }} />

      <div className="mb-14 flex items-end justify-between">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 bg-neon" style={{ boxShadow: "0 0 10px rgba(92,205,15,0.9)" }} />
            <span className="emboss-sm font-[family-name:var(--font-body-bold)] text-xs uppercase tracking-[0.3em] text-bone/70">
              // Schedule
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="chalk font-[family-name:var(--font-display)] text-3xl leading-[0.85] tracking-[-0.03em] text-bone md:text-7xl">
            <span className="text-neon glow-neon-soft">RUN</span>
            <span className="stroke-text"> / </span>
            OF SHOW
          </h2>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Divider */}
        <div
          aria-hidden
          className="absolute left-52 top-0 bottom-0 hidden w-px md:block"
          style={{
            background:
              "repeating-linear-gradient(to bottom, rgba(206,206,206,0.35) 0 6px, transparent 6px 14px)",
          }}
        />

        <ul className="relative flex flex-col">
          {slots.map((slot, slotIndex) => {
            const firstItemIndex = schedule.findIndex(
              (it) => it.time === slot.time && it.title === slot.items[0].title,
            );
            return (
              <motion.li
                key={slot.time + "-" + slotIndex}
                initial={reduced ? {} : { opacity: 0, x: -20 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0, rotate: rotations[slotIndex % rotations.length] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.65,
                  delay: slotIndex * 0.06,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="group relative grid grid-cols-1 items-baseline gap-2 border-b border-dashed border-bone/15 py-5 md:grid-cols-[13rem_1fr] md:gap-6 md:py-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="whitespace-nowrap font-[family-name:var(--font-display)] text-2xl leading-none tracking-[-0.02em] text-neon glow-neon-soft md:text-3xl">
                    {slot.time}
                  </span>
                  <span className="font-[family-name:var(--font-body-light)] text-[0.65rem] uppercase tracking-[0.25em] text-bone/40 md:hidden">
                    {String(slotIndex + 1).padStart(2, "0")}
                  </span>
                </div>
                <div
                  className={
                    slot.items.length > 1
                      ? "grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2"
                      : "grid grid-cols-1"
                  }
                >
                  {slot.items.map((item, itemIndex) => {
                    const globalIndex = firstItemIndex + itemIndex;
                    return (
                      <div key={item.title}>
                        <div className="flex items-baseline gap-3">
                          <h3 className="chalk font-[family-name:var(--font-body-bold)] text-xl uppercase tracking-[0.02em] text-bone transition-colors duration-300 group-hover:text-neon md:text-2xl">
                            {item.title}
                          </h3>
                          <span className="hidden font-[family-name:var(--font-body-light)] text-[0.65rem] uppercase tracking-[0.25em] text-bone/40 md:inline">
                            [ {String(globalIndex + 1).padStart(2, "0")} / {totalItems} ]
                          </span>
                        </div>
                        <p className="emboss-sm mt-1.5 max-w-xl font-[family-name:var(--font-body-light)] text-sm leading-relaxed text-bone/65">
                          {item.description}
                        </p>
                        {item.speakers && item.speakers.length > 0 ? (
                          <ul className="mt-3 max-w-xl space-y-1 font-[family-name:var(--font-body-light)] text-[0.85rem] leading-snug">
                            {item.speakers.map((speaker) => (
                              <li
                                key={speaker.name}
                                className="flex flex-wrap items-baseline gap-x-2"
                              >
                                <span className="font-[family-name:var(--font-body-bold)] uppercase tracking-[0.02em] text-acid">
                                  {speaker.name}
                                </span>
                                {speaker.role ? (
                                  <span className="emboss-sm text-bone/55">
                                    — {speaker.role}
                                  </span>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
