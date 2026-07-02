import type { Metadata } from "next";
import { Silkscreen, VT323, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: "HaadOS — Haad's portfolio",
  description:
    "Haad, 18. Builder of PaperGenre, emulators, games and questionable Minecraft autoclickers. Boot up HaadOS and look around.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${silkscreen.variable} ${vt323.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
