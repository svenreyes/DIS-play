import type { SprayStroke } from "./types";

export function sampleBezier(
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
