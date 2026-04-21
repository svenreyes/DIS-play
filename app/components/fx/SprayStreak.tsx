"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  d: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  gradient?: "horizontal" | "vertical";
  drips?: Array<{ cx: number; cy: number; r?: number; delay?: number }>;
  viewBox?: string;
  preserveAspectRatio?: string;
  triggerOnView?: boolean;
};

export default function SprayStreak({
  d,
  width,
  height,
  strokeWidth = 26,
  className,
  delay = 0.2,
  duration = 1.4,
  once = true,
  gradient = "horizontal",
  drips = [],
  viewBox,
  preserveAspectRatio = "none",
  triggerOnView = true,
}: Props) {
  const reduced = useReducedMotion();
  const gradId = gradient === "vertical" ? "sprayVertical" : "sprayGradient";

  const pathMotion = reduced
    ? { initial: { pathLength: 1, opacity: 1 }, animate: { pathLength: 1, opacity: 1 } }
    : triggerOnView
    ? {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once, amount: 0.35 },
      }
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
      };

  return (
    <svg
      aria-hidden
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      fill="none"
    >
      <motion.path
        d={d}
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth + 18}
        strokeLinecap="round"
        fill="none"
        opacity={0.35}
        filter="url(#chalkHard) url(#neonGlowHeavy)"
        {...pathMotion}
        transition={{ duration: duration + 0.2, delay, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <motion.path
        d={d}
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        filter="url(#chalk) url(#neonGlow)"
        {...pathMotion}
        transition={{ duration, delay, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <motion.path
        d={d}
        stroke="#7dff58"
        strokeWidth={Math.max(2, strokeWidth / 8)}
        strokeLinecap="round"
        fill="none"
        opacity={0.8}
        {...pathMotion}
        transition={{ duration, delay: delay + 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      />
      {drips.map((drip, i) => (
        <motion.circle
          key={i}
          cx={drip.cx}
          cy={drip.cy}
          r={drip.r ?? 3}
          fill="#39ff14"
          filter="url(#chalk) url(#neonGlow)"
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once, amount: 0.3 }}
          transition={{
            duration: 0.45,
            delay: delay + duration * 0.9 + (drip.delay ?? 0),
            ease: "easeOut",
          }}
        />
      ))}
    </svg>
  );
}
