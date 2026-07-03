"use client";

import { useState } from "react";
import { GAMES, type Game } from "@/lib/data";

export function ArcadeApp() {
  const [playing, setPlaying] = useState<Game | null>(null);

  if (playing?.playPath) {
    return (
      <div className="flex h-full flex-col bg-bg">
        <div className="flex items-center gap-3 border-b-2 border-line bg-surface-2 px-3 py-2">
          <span className="h-2 w-2 animate-pulse bg-accent" />
          <span className="font-pixel text-[10px] text-ink">{playing.file}</span>
          <span className="font-mono text-[11px] text-faint max-sm:hidden">
            {playing.controls}
          </span>
          <button
            onClick={() => setPlaying(null)}
            className="ml-auto border-2 border-line px-2.5 py-1 font-pixel text-[9px] text-dim transition-colors hover:border-accent hover:text-accent"
          >
            eject
          </button>
        </div>
        <iframe
          key={playing.slug}
          src={playing.playPath}
          title={playing.title}
          className="min-h-0 w-full flex-1 bg-black"
          allow="autoplay; fullscreen; gamepad"
        />
      </div>
    );
  }

  return (
    <div className="os-scroll h-full overflow-y-auto bg-surface p-6">
      <h2 className="font-pixel text-base text-ink">Arcade</h2>
      <p className="mt-2 font-mono text-xs text-dim">
        Pygame games compiled to WebAssembly. They run right here — click a
        cartridge, then click inside the game once and press a key.
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        {GAMES.map((g) => (
          <button
            key={g.slug}
            onClick={() => setPlaying(g)}
            className="group flex items-center gap-4 border-2 border-line-soft bg-surface-2/50 px-4 py-3.5 text-left transition-colors hover:border-accent"
          >
            <div className="min-w-0">
              <div className="font-pixel text-[11px] text-ink">{g.file}</div>
              <div className="mt-1.5 font-mono text-[11px] text-faint">{g.meta}</div>
            </div>
            <span className="ml-auto shrink-0 border-2 border-accent/60 bg-accent-soft px-3.5 py-1.5 font-pixel text-[9px] text-accent transition-colors group-hover:bg-accent group-hover:text-bg">
              ▶ PLAY
            </span>
          </button>
        ))}
      </div>

      <p className="mt-5 font-mono text-[11px] leading-relaxed text-faint">
        first launch unpacks a small Python runtime (a few seconds). keyboard
        required — phones are spectators here.
      </p>
    </div>
  );
}
