"use client";

import { useEffect, useRef } from "react";
import { Spray } from "dripping-spray";
import { Drawer } from "dripping-spray-canvas";

/**
 * A single spray stroke expressed as a cubic bezier curve in normalized
 * coordinates (0–1 of the canvas's bounding box), plus timing options.
 */
export type SprayStroke = {
  /** Cubic bezier control points in normalized 0–1 coords. */
  bezier: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];
  /** Number of sample points along the curve. More = denser paint. */
  samples?: number;
  /** Delay before this stroke starts, in ms. */
  startDelay?: number;
  /** ms between each spray sample (controls how fast the stroke "draws"). */
  stepInterval?: number;
  /** Relative spray thickness (scales size + splatterRadius). */
  thickness?: number;
  /** Override the default color. RGB 0–255. */
  color?: { r: number; g: number; b: number };
  /**
   * How many "hold" moments to inject along the stroke where the spray
   * sits still long enough to form drips. Defaults to 2–3 random ones.
   */
  holds?: number;
  /**
   * How many frames each hold lingers in place (each frame adds another
   * layer of splatter and accumulates drip charge). Defaults to 14.
   */
  holdFrames?: number;
  /**
   * Explicit hold positions (0–1 along the curve) — overrides `holds`.
   */
  holdPositions?: number[];
};

type Props = {
  strokes: SprayStroke[];
  className?: string;
  /** Default color for strokes that don't specify one. */
  color?: { r: number; g: number; b: number };
  /** Pixel density cap. */
  dpr?: number;
};

function sampleBezier(
  [p0, p1, p2, p3]: SprayStroke["bezier"],
  samples: number,
): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const mt = 1 - t;
    const x =
      mt * mt * mt * p0[0] +
      3 * mt * mt * t * p1[0] +
      3 * mt * t * t * p2[0] +
      t * t * t * p3[0];
    const y =
      mt * mt * mt * p0[1] +
      3 * mt * mt * t * p1[1] +
      3 * mt * t * t * p2[1] +
      t * t * t * p3[1];
    out.push([x, y]);
  }
  return out;
}

export default function SprayLayer({
  strokes,
  className,
  color = { r: 57, g: 255, b: 20 },
  dpr = 1.5,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scale = Math.min(window.devicePixelRatio || 1, dpr);

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

    type Pt = [number, number];
    type StrokePlan = {
      /** Phase 1: the bezier path, painted edge-to-edge with no pauses. */
      pathPoints: Pt[];
      /** Phase 2: fixed points on top of the finished stroke that each
       *  linger for `holdFrames` frames so the library produces drips. */
      dripSpots: Pt[];
      /** Frames each drip spot holds for. */
      holdFrames: number;
      /** Delay between the path finishing and the drips starting (ms). */
      dripDelay: number;
      startDelay: number;
      stepInterval: number;
      thickness: number;
      color: { r: number; g: number; b: number };
      /** Progress trackers. */
      pathCursor: number;
      dripSpotIndex: number;
      dripFrameInSpot: number;
      pathDoneAt: number; // set when phase 1 ends
      sprayRef: ReturnType<typeof Spray> | null;
    };

    const makePlan = (): StrokePlan[] =>
      strokes.map((s) => {
        const samples = Math.max(6, Math.floor(s.samples ?? 36));
        const basePts = sampleBezier(s.bezier, samples);

        // Select the spots along the stroke where drips will later form.
        const holdFrames = Math.max(4, Math.floor(s.holdFrames ?? 18));
        let holdIdxs: number[];
        if (s.holdPositions && s.holdPositions.length > 0) {
          holdIdxs = s.holdPositions.map((p) =>
            Math.min(samples - 1, Math.max(1, Math.round(p * samples))),
          );
        } else {
          const holdCount = Math.max(
            0,
            Math.floor(s.holds ?? 2 + Math.random() * 2),
          );
          const set = new Set<number>();
          let guard = 0;
          while (set.size < holdCount && guard++ < holdCount * 8) {
            const idx = Math.floor(samples * (0.2 + Math.random() * 0.6));
            set.add(idx);
          }
          holdIdxs = [...set].sort((a, b) => a - b);
        }

        const pathPoints: Pt[] = basePts.map(
          ([nx, ny]) =>
            [nx * canvas.width, ny * canvas.height] as Pt,
        );
        const dripSpots: Pt[] = holdIdxs.map((idx) => pathPoints[idx]);

        return {
          pathPoints,
          dripSpots,
          holdFrames,
          dripDelay: 180,
          startDelay: s.startDelay ?? 0,
          stepInterval: s.stepInterval ?? 26,
          thickness: s.thickness ?? 1,
          color: s.color ?? color,
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
      // Speed-compensated splatter: faster strokes (smaller stepInterval)
      // get heavier splatter per sample so they don't look thin when the
      // "paint" sweeps across the canvas quickly.
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
        // Lower threshold -> drips start sooner when a hold lands.
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

      let stillWorking = false;

      for (const plan of plans) {
        if (!plan.sprayRef) continue;

        if (elapsed < plan.startDelay) {
          stillWorking = true;
          continue;
        }

        const localElapsed = elapsed - plan.startDelay;

        // ---- Phase 1: draw the bezier path, non-stop, one point per
        //               stepInterval of wall-clock time. ----
        if (plan.pathCursor < plan.pathPoints.length) {
          stillWorking = true;
          const targetStep = Math.floor(localElapsed / plan.stepInterval);
          let sprayed = false;
          while (
            plan.pathCursor <= targetStep &&
            plan.pathCursor < plan.pathPoints.length
          ) {
            const [x, y] = plan.pathPoints[plan.pathCursor];
            plan.sprayRef.draw(drawer, { x, y });
            plan.pathCursor++;
            sprayed = true;
          }
          if (!sprayed) plan.sprayRef.draw(drawer);
          continue;
        }

        // Record the moment phase 1 finished, so phase 2 can pace itself
        // from there.
        if (plan.pathDoneAt === 0) {
          plan.pathDoneAt = localElapsed;
        }

        const phase2Elapsed = localElapsed - plan.pathDoneAt - plan.dripDelay;
        if (phase2Elapsed < 0) {
          // Small breather between path end and drip start.
          stillWorking = true;
          plan.sprayRef.draw(drawer);
          continue;
        }

        // ---- Phase 2: drip holds, sequential. Each spot stays still for
        //               `holdFrames` frames, then we move to the next. ----
        if (plan.dripSpotIndex < plan.dripSpots.length) {
          stillWorking = true;
          const spotStepsElapsed = Math.floor(phase2Elapsed / plan.stepInterval);
          // Total frames that should have been sprayed across all spots by
          // now, capped at the last spot's budget.
          while (plan.dripSpotIndex < plan.dripSpots.length) {
            const framesDoneInPreviousSpots =
              plan.dripSpotIndex * plan.holdFrames;
            const targetFrameOverall = spotStepsElapsed;
            const targetFrameInSpot = Math.min(
              plan.holdFrames,
              targetFrameOverall - framesDoneInPreviousSpots,
            );
            if (targetFrameInSpot <= plan.dripFrameInSpot) break;

            const [x, y] = plan.dripSpots[plan.dripSpotIndex];
            while (plan.dripFrameInSpot < targetFrameInSpot) {
              plan.sprayRef.draw(drawer, { x, y });
              plan.dripFrameInSpot++;
            }
            if (plan.dripFrameInSpot >= plan.holdFrames) {
              plan.dripSpotIndex++;
              plan.dripFrameInSpot = 0;
            } else {
              break;
            }
          }
          continue;
        }

        // ---- Phase 3: nothing to spray, but let any in-flight drips
        //               finish falling. ----
        const dripsLeft = plan.sprayRef.draw(drawer);
        if (dripsLeft) stillWorking = true;
      }

      if (!stillWorking) return;
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (prefersReducedMotion) {
        // Paint the whole plan instantly; no motion, no drips.
        for (const plan of plans) {
          if (!plan.sprayRef) continue;
          for (const [x, y] of plan.pathPoints) {
            plan.sprayRef.draw(drawer, { x, y });
          }
        }
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
  }, [strokes, color, dpr]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 h-full w-full " + (className ?? "")
      }
      style={{
        opacity: 0.95,
        mixBlendMode: "screen",
        filter: "drop-shadow(0 0 10px rgba(57,255,20,0.4))",
        zIndex: -1,
      }}
    />
  );
}
