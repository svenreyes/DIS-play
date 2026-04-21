"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  rotate?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section";
};

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  rotate = 0,
  duration = 0.8,
  once = true,
  amount = 0.3,
  className,
  as = "div",
}: Props) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduced) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x, rotate: rotate ? rotate - 2 : 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </Comp>
  );
}
