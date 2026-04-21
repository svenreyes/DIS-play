"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
  offset?: ["start end" | "start start" | "end start", "end end" | "end start" | "start end"];
};

export default function Parallax({
  children,
  speed = 0.3,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * speed]) as MotionValue<number>;

  return (
    <div ref={ref} className={className}>
      {reduced ? (
        <div>{children}</div>
      ) : (
        <motion.div style={{ y, willChange: "transform" }}>{children}</motion.div>
      )}
    </div>
  );
}
