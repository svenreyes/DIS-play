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

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cornellcreativetech.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "DIS:PLAY — Creative Tech Summit at Cornell Tech",
  description:
    "Disrupt the display. Play with the rules. An experimental creative tech summit at Cornell Tech. May 13th · 12PM–7PM · 2 West Loop Rd, New York, NY.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "creative tech summit",
    "Cornell Tech",
    "DIS:PLAY",
    "design",
    "fashion tech",
    "film tech",
    "music tech",
    "New York",
    "student summit",
    "creative technology",
  ],
  openGraph: {
    title: "DIS:PLAY — Creative Tech Summit",
    description:
      "Disrupt the display. Play with the rules. An experimental creative tech summit at Cornell Tech. May 13 · 12PM–7PM · Roosevelt Island, NYC.",
    type: "website",
    url: BASE_URL,
    siteName: "DIS:PLAY",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DIS:PLAY — Creative Tech Summit at Cornell Tech, May 13",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIS:PLAY — Creative Tech Summit",
    description:
      "Disrupt the display. Play with the rules. Cornell Tech · May 13 · 12PM–7PM.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "DIS:PLAY — Creative Tech Summit",
  description:
    "Disrupt the display. Play with the rules. An experimental creative tech summit at Cornell Tech featuring workshops, panels, fireside chats, startup demos, and more.",
  startDate: "2026-05-13T12:00:00-04:00",
  endDate: "2026-05-13T19:00:00-04:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Cornell Tech",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 West Loop Rd",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10044",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Cornell Tech",
    url: "https://tech.cornell.edu",
  },
  image: `${BASE_URL}/og-image.png`,
  url: BASE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${venom.variable} ${body.variable} ${bodyBold.variable} ${bodyLight.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
