import type { Metadata } from "next";
import { Silkscreen, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "HaadOS — Haad's portfolio",
  description:
    "Haad, 18. Builder of PaperGenre, emulators, and games. Boot up HaadOS, poke around, and adopt a pixel pet.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${silkscreen.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
