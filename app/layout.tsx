import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BackgroundFX from "./components/fx/BackgroundFX";
import CursorGlowGate from "./components/fx/CursorGlowGate";
import GraffitiBackground from "./components/fx/GraffitiBackground";
import SvgDefs from "./components/fx/SvgDefs";

const display = localFont({
  src: "../public/fonts/Anton-Regular.ttf",
  variable: "--font-display",
  display: "swap",
});

const venom = localFont({
  src: "../public/fonts/BlackMambaTrial-Venom.otf",
  variable: "--font-venom",
  display: "swap",
});

const body = localFont({
  src: "../public/fonts/DeFonte reduced Normale.ttf",
  variable: "--font-body",
  display: "swap",
});

const bodyBold = localFont({
  src: "../public/fonts/DeFonte reduced DemiGras.ttf",
  variable: "--font-body-bold",
  display: "swap",
});

const bodyLight = localFont({
  src: "../public/fonts/DeFonte reduced Leger.otf",
  variable: "--font-body-light",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DIS:PLAY — Creative Tech Summit at Cornell Tech",
  description:
    "Disrupt the display. Play with the rules. An experimental creative tech summit at Cornell Tech. May 13th · 12PM–7PM · 2 West Loop Rd, New York, NY.",
  openGraph: {
    title: "DIS:PLAY — Creative Tech Summit",
    description: "Breaking the frame. Raw, unfinished, experimental work.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${venom.variable} ${body.variable} ${bodyBold.variable} ${bodyLight.variable}`}
    >
      <body className="relative antialiased">
        <SvgDefs />
        <BackgroundFX />
        <GraffitiBackground />
        <CursorGlowGate />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
