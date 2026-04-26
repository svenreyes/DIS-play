"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useCanHover } from "@/app/hooks/useCanHover";

type Props = {
  children: ReactNode;
  rotate?: number;
  variant?: "acid" | "neon";
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  delay?: number;
};

const sizes = {
  sm: "text-[0.7rem] px-2 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-base px-4 py-2",
};

export default function TagStamp({
  children,
  rotate = 0,
  variant = "acid",
  className = "",
  size = "md",
  animated = true,
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();
  const canHover = useCanHover();
  const base = "tag-stamp" + (variant === "neon" ? " tag-stamp--neon" : "");

  if (!animated || reduced) {
    return (
      <span
        className={`${base} ${sizes[size]} ${className}`}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={`${base} ${sizes[size]} ${className}`}
      initial={{ opacity: 0, rotate: rotate + 6, scale: 0.85 }}
      whileInView={{ opacity: 1, rotate, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      whileHover={
        canHover && !reduced
          ? {
              rotate: rotate + 1.5,
              scale: 1.04,
              transition: { duration: 0.2 },
            }
          : undefined
      }
    >
      {children}
    </motion.span>
  );
}
