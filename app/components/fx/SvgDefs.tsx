export default function SvgDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter id="chalk" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
        </filter>

        <filter id="chalkHard" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.4"
            numOctaves="2"
            seed="9"
            result="noise2"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise2" scale="4.5" />
        </filter>

        <filter id="spray" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="2"
            seed="3"
            result="sprayNoise"
          />
          <feDisplacementMap in="SourceGraphic" in2="sprayNoise" scale="6" />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>

        <filter id="neonGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur1" />
          <feGaussianBlur stdDeviation="8" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="neonGlowHeavy" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b1" />
          <feGaussianBlur stdDeviation="18" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Figma-style "noise" texture: fine fractal grain composited into
            the text so it looks dusty / printed, instead of flat vector. */}
        <filter
          id="grafTexture"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.1"
            numOctaves="2"
            seed="11"
            stitchTiles="stitch"
            result="noise"
          />
          {/* Convert the color noise into a speckled alpha mask.
              The matrix isolates luminance into alpha and boosts contrast
              so only high-luminance noise pixels become opaque. */}
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1.1 -0.35"
            result="grain"
          />
          {/* Carve the grain out of the text: "out" keeps SourceGraphic
              where grain is transparent, producing a speckled letterform
              rather than a flat block of color. */}
          <feComposite in="SourceGraphic" in2="grain" operator="out" />
        </filter>

        <linearGradient id="sprayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5ccd0f" stopOpacity="0" />
          <stop offset="8%" stopColor="#5ccd0f" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#5ccd0f" stopOpacity="1" />
          <stop offset="92%" stopColor="#5ccd0f" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#5ccd0f" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="sprayVertical" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5ccd0f" stopOpacity="0" />
          <stop offset="15%" stopColor="#5ccd0f" stopOpacity="0.8" />
          <stop offset="85%" stopColor="#5ccd0f" stopOpacity="1" />
          <stop offset="100%" stopColor="#5ccd0f" stopOpacity="0" />
        </linearGradient>

        <pattern id="noiseTile" x="0" y="0" width="220" height="220" patternUnits="userSpaceOnUse">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0" />
          </filter>
          <rect width="220" height="220" filter="url(#noiseFilter)" opacity="0.9" />
        </pattern>
      </defs>
    </svg>
  );
}
