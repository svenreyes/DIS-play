declare module "dripping-spray" {
  export interface SprayColor {
    r: number;
    g: number;
    b: number;
  }

  export interface SprayOptions {
    canvas: HTMLCanvasElement;
    color?: SprayColor;
    size?: number;
    splatterAmount?: number;
    splatterRadius?: number;
    dripper?: boolean;
    dripThreshold?: number;
    dripSpeed?: number;
  }

  export interface SprayDrawer {
    drawShapes(shapes: unknown): void;
  }

  export interface SprayInstance {
    draw(drawer: SprayDrawer, coords?: { x: number; y: number }): boolean;
    resetDrips(): void;
    stopDrips(): void;
  }

  export function Spray(options: SprayOptions): SprayInstance;
}

declare module "dripping-spray-canvas" {
  import type { SprayDrawer } from "dripping-spray";

  export function Drawer(
    canvas: HTMLCanvasElement
  ): SprayDrawer & { clear(): void };
}
