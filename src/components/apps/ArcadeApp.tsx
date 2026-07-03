"use client";

import { useState } from "react";
import { GAMES, type Game } from "@/lib/data";

export function ArcadeApp() {
  const [playing, setPlaying] = useState<Game | null>(null);

  if (playing?.playPath) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 border-b border-line-soft px-4 py-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span className="font-mono text-xs text-ink">{playing.file}</span>
          <span className="font-mono text-[11px] text-faint max-sm:hidden">
            {playing.controls}
          </span>
          <button
            onClick={() => setPlaying(null)}
            className="ml-auto rounded-md border border-line-soft px-2.5 py-1 font-mono text-[11px] text-dim transition-colors hover:border-accent/50 hover:text-accent"
          >
            eject
          </button>
        </div>
        <iframe
          src={playing.playPath}
          title={playing.title}
          className="min-h-0 w-full flex-1 bg-[#0a0f15]"
          allow="autoplay; fullscreen; gamepad"
        />
      </div>
    );
  }

  return (
    <div className="os-scroll h-full overflow-y-auto p-6 sm:p-7">
      <h2 className="font-serif text-[26px] font-medium tracking-tight text-ink">
        Pygames, in your browser.
      </h2>
      <p className="mt-1 font-mono text-xs text-dim">
        Compiled to WebAssembly. Boot one right here — no downloads.
      </p>

      <div className="mt-6 space-y-2.5">
        {GAMES.map((g) => (
          <div
            key={g.slug}
            className="flex items-center gap-4 rounded-xl border border-line-soft bg-surface-2/60 px-4 py-3.5"
          >
            <div className="min-w-0">
              <div className="font-mono text-[13px] text-ink">{g.file}</div>
              <div className="mt-0.5 font-mono text-[11px] text-faint">
                {g.meta}
              </div>
            </div>
            {g.playPath ? (
              <button
                onClick={() => setPlaying(g)}
                className="ml-auto shrink-0 rounded-lg border border-accent/50 bg-accent-soft px-4 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-bg"
              >
                ▶ play
              </button>
            ) : (
              <span className="ml-auto shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] tracking-wider text-faint">
                QUEUED
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-5 font-mono text-[11px] leading-relaxed text-faint">
        first launch downloads the Python runtime (~15 MB, one time). click
        inside the game once it loads. keyboard needed — phones are spectators
        here.
      </p>
    </div>
  );
}
