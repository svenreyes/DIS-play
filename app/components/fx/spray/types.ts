export type SprayColor = { r: number; g: number; b: number };

/**
 * A single spray stroke expressed as a cubic bezier curve in normalized
 * coordinates (0-1 of the canvas bounding box), plus timing options.
 */
export type SprayStroke = {
  bezier: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];
  samples?: number;
  startDelay?: number;
  stepInterval?: number;
  thickness?: number;
  color?: SprayColor;
  holds?: number;
  holdFrames?: number;
  holdPositions?: number[];
};

export type SprayLayerProps = {
  strokes: SprayStroke[];
  className?: string;
  color?: SprayColor;
  dpr?: number;
};
