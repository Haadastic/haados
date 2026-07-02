"use client";

import { useState } from "react";
import { GAMES, type Game } from "@/lib/data";

const CART_COLORS: Record<Game["color"], string> = {
  green: "bg-green",
  orange: "bg-orange",
  blue: "bg-blue",
};

export function ArcadeApp() {
  const [playing, setPlaying] = useState<Game | null>(null);

  if (playing?.playPath) {
    return (
      <div className="flex h-full flex-col bg-term-bg">
        <div className="flex items-center justify-between border-b-2 border-ink bg-paper px-3 py-1.5">
          <span className="font-pixel text-[10px]">{playing.cartLabel}</span>
          <button
            onClick={() => setPlaying(null)}
            className="border-2 border-ink bg-paper-dim px-2 py-0.5 font-mono text-xs hover:bg-red hover:text-paper"
          >
            eject
          </button>
        </div>
        <iframe
          src={playing.playPath}
          title={playing.title}
          className="min-h-0 w-full flex-1"
          allow="autoplay; fullscreen; gamepad"
        />
      </div>
    );
  }

  return (
    <div className="os-scroll h-full overflow-y-auto bg-paper p-5">
      <p className="font-mono text-xs leading-relaxed text-ink-soft">
        Pygame games compiled to WebAssembly — they run right here in the
        browser. Pick a cartridge.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {GAMES.map((g) => (
          <div
            key={g.slug}
            className="flex flex-col border-2 border-ink shadow-hard-sm"
          >
            {/* Cartridge */}
            <div className={`${CART_COLORS[g.color]} p-3 pb-4`}>
              <div className="border-2 border-ink bg-paper px-2 py-3 text-center">
                <div className="font-pixel text-[10px] font-bold">
                  {g.cartLabel}
                </div>
              </div>
              <div className="mx-auto mt-2 h-1.5 w-2/3 bg-ink opacity-30" />
              <div className="mx-auto mt-1 h-1.5 w-2/3 bg-ink opacity-30" />
            </div>
            <div className="flex flex-1 flex-col gap-2 border-t-2 border-ink bg-paper-dim p-3">
              <div className="font-mono text-xs leading-snug">{g.blurb}</div>
              {g.playPath ? (
                <button
                  onClick={() => setPlaying(g)}
                  className="mt-auto border-2 border-ink bg-ink px-3 py-1.5 font-pixel text-[10px] text-paper hover:bg-green"
                >
                  ▶ PLAY
                </button>
              ) : (
                <div className="mt-auto border-2 border-dashed border-ink-soft px-3 py-1.5 text-center font-pixel text-[9px] text-ink-soft">
                  INSERTING CARTRIDGE…
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 font-mono text-[11px] text-ink-soft">
        note: cartridges being dumped from the originals — playable builds
        landing here soon.
      </p>
    </div>
  );
}
