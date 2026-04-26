import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DIS:PLAY — Creative Tech Summit at Cornell Tech",
    short_name: "DIS:PLAY",
    description:
      "Disrupt the display. Play with the rules. An experimental creative tech summit at Cornell Tech.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
