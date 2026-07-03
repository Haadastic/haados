import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-space",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const fraunces = Fraunces({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "HaadOS — Haad's portfolio",
  description:
    "Haad, 18. Builder of PaperGenre, emulators, and games. Boot up HaadOS, poke around, and adopt a pixel pet.",
};

// Apply saved accent + light/dark mode before first paint (no flash).
const THEME_INIT = `(function(){try{var d=document.documentElement;var a=localStorage.getItem('haados-accent');var m=localStorage.getItem('haados-mode');d.setAttribute('data-accent',['ember','tide','moss','gold','slate'].indexOf(a)>-1?a:'ember');d.setAttribute('data-mode',m==='light'?'light':'dark');}catch(e){var d=document.documentElement;d.setAttribute('data-accent','ember');d.setAttribute('data-mode','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrains.variable} ${fraunces.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
