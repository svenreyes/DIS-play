export default function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="concrete absolute inset-0" />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0, transparent 45%)," +
            "radial-gradient(circle at 70% 80%, rgba(255,255,255,0.04) 0, transparent 40%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.22] mix-blend-overlay"
        preserveAspectRatio="none"
      >
        <rect width="100%" height="100%" fill="url(#noiseTile)" />
      </svg>

      <div className="scratch-overlay absolute inset-0 opacity-40" />

      <div className="absolute inset-0 noise-soft grain-anim opacity-[0.12] mix-blend-soft-light" />

      <div className="absolute inset-0 flicker pointer-events-none" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.8) 0, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 3px)",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
