"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import SprayStreak from "../fx/SprayStreak";
import { event, roles } from "../../content";

const rotations = [-1.2, 0.8, -0.6, 1.1, -0.9, 0.5];

export default function GetInvolved() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-28 md:px-12 md:py-40">
      <div className="mb-14 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 bg-neon" style={{ boxShadow: "0 0 10px rgba(57,255,20,0.9)" }} />
            <span className="font-[family-name:var(--font-body-bold)] text-xs uppercase tracking-[0.3em] text-bone/70">
              // Get Involved
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="chalk max-w-2xl font-[family-name:var(--font-display)] text-5xl leading-[0.85] tracking-[-0.03em] text-bone md:text-6xl">
            BRING YOUR
            <br />
            <span className="text-neon glow-neon-soft">UNFINISHED WORK.</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {roles.map((role, i) => (
          <RoleCard
            key={role.index}
            index={role.index}
            title={role.title}
            description={role.description}
            rotate={rotations[i % rotations.length]}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* CTA */}
      <Reveal delay={0.3} className="mt-20">
        <div className="relative mx-auto max-w-3xl">
          <SprayStreak
            className="pointer-events-none absolute -left-10 -top-12 h-28 w-[120%]"
            viewBox="0 0 1200 120"
            d="M 20 80 C 240 10, 520 110, 820 40 S 1120 90, 1180 60"
            strokeWidth={14}
            delay={0.1}
          />
          <div className="relative border-2 border-dashed border-neon bg-neon/[0.04] p-8 md:p-12">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 font-[family-name:var(--font-body-bold)] text-[0.7rem] uppercase tracking-[0.3em] text-neon/80">
                  Sign up
                </div>
                <h3 className="chalk font-[family-name:var(--font-display)] text-4xl leading-[0.85] tracking-[-0.02em] text-bone md:text-6xl">
                  Pitch your <span className="text-neon glow-neon">project</span>.
                </h3>
                <p className="mt-4 max-w-md font-[family-name:var(--font-body-light)] text-sm leading-relaxed text-bone/70">
                  Send a short note and link. We respond to everything.
                </p>
              </div>
              <MailCTA email={event.email} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function RoleCard({
  index,
  title,
  description,
  rotate,
  delay,
}: {
  index: string;
  title: string;
  description: string;
  rotate: number;
  delay: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? {} : { opacity: 0, y: 22, rotate: rotate + 2 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={reduced ? undefined : { y: -4, rotate: rotate + 0.4 }}
      className="group relative overflow-hidden border border-bone/15 bg-ink-2/60 p-6 transition-colors duration-300 hover:border-neon/60 md:p-7"
    >
      <div className="flex items-start justify-between">
        <span
          className="chalk font-[family-name:var(--font-display)] text-5xl leading-none text-acid"
          style={{ transform: "rotate(-4deg)", display: "inline-block" }}
        >
          {index}
        </span>
        <span className="font-[family-name:var(--font-body-light)] text-[0.65rem] uppercase tracking-[0.3em] text-bone/40">
          ROLE
        </span>
      </div>
      <h3 className="chalk mt-6 font-[family-name:var(--font-body-bold)] text-xl uppercase tracking-[0.01em] text-bone transition-colors duration-300 group-hover:text-neon md:text-2xl">
        {title}
      </h3>
      <p className="mt-3 font-[family-name:var(--font-body-light)] text-sm leading-relaxed text-bone/65">
        {description}
      </p>
      {/* Hover underline draw */}
      <svg
        aria-hidden
        className="pointer-events-none mt-6 h-2 w-full overflow-visible text-neon"
        viewBox="0 0 200 8"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0 4 Q 50 0, 100 4 T 200 4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          filter="url(#chalk) url(#neonGlow)"
          initial={{ pathLength: 0, opacity: 0.6 }}
          whileHover={{ pathLength: 1, opacity: 1 }}
          animate={{ pathLength: 0.15 }}
          transition={{ duration: 0.6 }}
        />
      </svg>
    </motion.article>
  );
}

function MailCTA({ email }: { email: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      href={`mailto:${email}`}
      className="group relative inline-flex items-center gap-3 border-2 border-neon bg-ink px-6 py-4 font-[family-name:var(--font-body-bold)] text-sm uppercase tracking-[0.18em] text-neon glow-neon-soft md:text-base"
      style={{ boxShadow: "0 0 0 1px rgba(57,255,20,0.25), 0 0 28px rgba(57,255,20,0.25)" }}
      whileHover={reduced ? undefined : { rotate: -1.5, scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <span className="chalk">{email}</span>
      <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path d="M4 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}
