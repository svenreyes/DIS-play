"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { Spray } from "dripping-spray";
import { Drawer } from "dripping-spray-canvas";
import { sampleBezier } from "./sampleBezier";
import type { SprayColor, SprayStroke } from "./types";

type Pt = [number, number];

type StrokePlan = {
  pathPoints: Pt[];
  dripSpots: Pt[];
  holdFrames: number;
  dripDelay: number;
  startDelay: number;
  stepInterval: number;
  thickness: number;
  color: SprayColor;
  pathCursor: number;
  dripSpotIndex: number;
  dripFrameInSpot: number;
  pathDoneAt: number;
  sprayRef: ReturnType<typeof Spray> | null;
};

// Drives the two-stage spray effect: draw the path, then pause at drip spots.
export function useSprayAnimation(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  strokes: SprayStroke[],
  color: SprayColor,
  dpr: number,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // On small / touch viewports, cap the canvas pixel ratio at 1.0. The
    // spray strokes are low-frequency abstract shapes so the difference
    // between 1.0× and 1.5× dpr is imperceptible on a 5–6" screen, but it
    // cuts canvas pixel count (and per-frame draw cost) by ~55%.
    const isSmallViewport =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(hover: none)").matches;
    const effectiveDpr = isSmallViewport ? Math.min(dpr, 1) : dpr;
    const scale = Math.min(window.devicePixelRatio || 1, effectiveDpr);

    const sizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return false;
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * scale));
      const h = Math.max(1, Math.floor(rect.height * scale));

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        return true;
      }

      return false;
    };

    if (!sizeCanvas()) {
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * scale));
    }

    const makePlan = (): StrokePlan[] =>
      strokes.map((stroke) => {
        const samples = Math.max(6, Math.floor(stroke.samples ?? 36));
        const basePts = sampleBezier(stroke.bezier, samples);
        const holdFrames = Math.max(4, Math.floor(stroke.holdFrames ?? 18));
        const holdIdxs = getHoldIndexes(stroke, samples);
        const pathPoints: Pt[] = basePts.map(
          ([nx, ny]) => [nx * canvas.width, ny * canvas.height] as Pt,
        );

        return {
          pathPoints,
          dripSpots: holdIdxs.map((idx) => pathPoints[idx]),
          holdFrames,
          dripDelay: 180,
          startDelay: stroke.startDelay ?? 0,
          stepInterval: stroke.stepInterval ?? 26,
          thickness: stroke.thickness ?? 1,
          color: stroke.color ?? color,
          pathCursor: 0,
          dripSpotIndex: 0,
          dripFrameInSpot: 0,
          pathDoneAt: 0,
          sprayRef: null,
        };
      });

    const drawer = Drawer(canvas);
    const plans = makePlan();
    const baseSize = Math.max(3, 5 * scale);

    for (const plan of plans) {
      const speedBoost = Math.min(2.2, 28 / Math.max(8, plan.stepInterval));
      const splatterAmount = Math.round(
        Math.min(140, 32 * speedBoost * plan.thickness + 18),
      );

      plan.sprayRef = Spray({
        canvas,
        color: plan.color,
        size: Math.max(2, baseSize * plan.thickness),
        splatterAmount,
        splatterRadius: Math.max(14, 34 * scale * plan.thickness),
        dripper: true,
        dripThreshold: 38,
        dripSpeed: 5,
      });
    }

    let rafId = 0;
    let startTime = 0;
    let stopped = false;

    const tick = (ts: number) => {
      if (stopped) return;
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      // Advance every plan each frame. Using Array.some here would
      // short-circuit as soon as any plan returned true, starving later
      // strokes (e.g. the top hero streak) until the first stroke fully
      // finishes its path + drip phases.
      let stillWorking = false;
      for (const plan of plans) {
        if (advancePlan(plan, drawer, elapsed)) {
          stillWorking = true;
        }
      }

      if (stillWorking) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const start = () => {
      if (prefersReducedMotion) {
        paintReducedMotion(plans, drawer);
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(canvas);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [canvasRef, strokes, color, dpr]);
}

function getHoldIndexes(stroke: SprayStroke, samples: number) {
  if (stroke.holdPositions && stroke.holdPositions.length > 0) {
    return stroke.holdPositions.map((position) =>
      Math.min(samples - 1, Math.max(1, Math.round(position * samples))),
    );
  }

  const holdCount = Math.max(
    0,
    Math.floor(stroke.holds ?? 2 + Math.random() * 2),
  );
  const indexes = new Set<number>();
  let guard = 0;

  while (indexes.size < holdCount && guard++ < holdCount * 8) {
    indexes.add(Math.floor(samples * (0.2 + Math.random() * 0.6)));
  }

  return [...indexes].sort((a, b) => a - b);
}

function advancePlan(
  plan: StrokePlan,
  drawer: ReturnType<typeof Drawer>,
  elapsed: number,
) {
  if (!plan.sprayRef) return false;

  if (elapsed < plan.startDelay) return true;

  const localElapsed = elapsed - plan.startDelay;

  if (drawPathPhase(plan, drawer, localElapsed)) return true;

  if (plan.pathDoneAt === 0) {
    plan.pathDoneAt = localElapsed;
  }

  const phase2Elapsed = localElapsed - plan.pathDoneAt - plan.dripDelay;

  if (phase2Elapsed < 0) {
    plan.sprayRef.draw(drawer);
    return true;
  }

  if (drawDripPhase(plan, drawer, phase2Elapsed)) return true;

  return Boolean(plan.sprayRef.draw(drawer));
}

function drawPathPhase(
  plan: StrokePlan,
  drawer: ReturnType<typeof Drawer>,
  localElapsed: number,
) {
  if (plan.pathCursor >= plan.pathPoints.length) return false;

  const targetStep = Math.floor(localElapsed / plan.stepInterval);
  let sprayed = false;

  while (
    plan.pathCursor <= targetStep &&
    plan.pathCursor < plan.pathPoints.length
  ) {
    const [x, y] = plan.pathPoints[plan.pathCursor];
    plan.sprayRef?.draw(drawer, { x, y });
    plan.pathCursor++;
    sprayed = true;
  }

  if (!sprayed) plan.sprayRef?.draw(drawer);

  return true;
}

function drawDripPhase(
  plan: StrokePlan,
  drawer: ReturnType<typeof Drawer>,
  phase2Elapsed: number,
) {
  if (plan.dripSpotIndex >= plan.dripSpots.length) return false;

  const spotStepsElapsed = Math.floor(phase2Elapsed / plan.stepInterval);

  while (plan.dripSpotIndex < plan.dripSpots.length) {
    const framesDoneInPreviousSpots = plan.dripSpotIndex * plan.holdFrames;
    const targetFrameInSpot = Math.min(
      plan.holdFrames,
      spotStepsElapsed - framesDoneInPreviousSpots,
    );

    if (targetFrameInSpot <= plan.dripFrameInSpot) break;

    const [x, y] = plan.dripSpots[plan.dripSpotIndex];

    while (plan.dripFrameInSpot < targetFrameInSpot) {
      plan.sprayRef?.draw(drawer, { x, y });
      plan.dripFrameInSpot++;
    }

    if (plan.dripFrameInSpot < plan.holdFrames) break;

    plan.dripSpotIndex++;
    plan.dripFrameInSpot = 0;
  }

  return true;
}

function paintReducedMotion(
  plans: StrokePlan[],
  drawer: ReturnType<typeof Drawer>,
) {
  for (const plan of plans) {
    if (!plan.sprayRef) continue;

    for (const [x, y] of plan.pathPoints) {
      plan.sprayRef.draw(drawer, { x, y });
    }
  }
}
