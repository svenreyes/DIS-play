/**
 * Global page background.
 *
 * Layered, fixed to the viewport so the whole site feels like it's pasted
 * onto a single physical wall. Order (back → front):
 *
 *   1. Grunge-wall base (the real photo texture)
 *   2. A second, scaled/flipped pass of the same wall, blended in for
 *      richness so it never reads as a repeating wallpaper
 *   3. Dark unifying gradient (keeps brightness + tone in check)
 *   4. Subtle color washes (neon + rust) to match the site palette
 *   5. Fractal-noise overlay (fine grit)
 *   6. Animated soft-noise grain (alive, not static)
 *   7. Large turbulence scratches
 *   8. Flicker overlay (very subtle)
 *   9. Vignette (focuses the eye toward center)
 */
export default function BackgroundFX() {
  const wallUrl = "url('/grunge-wall.png')";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 1. Base wall — cover the whole viewport, tuned darker so neon pops */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: wallUrl,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.5) contrast(1.12) saturate(0.55)",
          transform: "scale(1.02)",
        }}
      />

      {/* 2. Secondary grunge pass — flipped + enlarged + blurred so the
             eye can never find a repeat; adds depth rather than pattern.
             Hidden on small viewports via the .fx-wall-secondary class
             because the 3px blur on a full-viewport scaled image is one
             of the most expensive layers on low-power GPUs. */}
      <div
        className="fx-wall-secondary absolute inset-0 opacity-[0.32] mix-blend-overlay"
        style={{
          backgroundImage: wallUrl,
          backgroundSize: "175%",
          backgroundPosition: "20% 85%",
          backgroundRepeat: "no-repeat",
          transform: "scaleX(-1) scale(1.1)",
          filter: "blur(3px) brightness(0.9) contrast(1.2)",
        }}
      />

      {/* 3. Dark unifier — vertical gradient holds the overall tone in
             charcoal without killing texture readability. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,7,6,0.78) 0%, rgba(10,11,10,0.48) 42%, rgba(6,7,6,0.72) 100%)",
        }}
      />

      {/* 4. Color washes — whisper of neon + rust, matches the site palette
             without turning the wall green. */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 15% 20%, rgba(92,205,15,0.14) 0%, transparent 55%)," +
            "radial-gradient(ellipse 60% 50% at 85% 80%, rgba(166,67,35,0.12) 0%, transparent 55%)," +
            "radial-gradient(ellipse 40% 35% at 70% 15%, rgba(200,179,28,0.08) 0%, transparent 55%)",
        }}
      />

      {/* 5. Fine fractal noise — the dust in the air. */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay"
        preserveAspectRatio="none"
      >
        <rect width="100%" height="100%" fill="url(#noiseTile)" />
      </svg>

      {/* 6. Animated fine grain — keeps the wall feeling alive.
             .fx-grain class lets mobile CSS hide it: the 1.2s stepped
             transform animation forces continuous repaints, and the
             grain is imperceptible at mobile pixel densities. */}
      <div className="fx-grain absolute inset-0 noise-soft grain-anim opacity-[0.09] mix-blend-soft-light" />

      {/* 7. Large scratches — light, additive, adds "been lived on" wear.
             .fx-scratch class lets mobile CSS drop this; the inline
             data-URI SVG uses a 1200×800 feTurbulence filter which is
             CPU-heavy on phones. */}
      <div className="fx-scratch scratch-overlay absolute inset-0 opacity-30" />

      {/* 8. Flicker — very subtle, gives the wall a bad-ballast lamp feel. */}
      <div className="fx-flicker absolute inset-0 flicker" />

      {/* 9. Vignette — focuses attention and darkens edges. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.92) 100%)",
        }}
      />
    </div>
  );
}
