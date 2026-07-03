"use client";

import { useEffect, useState } from "react";
import { useWM } from "./WindowManager";
import type { AppId } from "@/lib/data";

const MENU: { appId: AppId; label: string }[] = [
  { appId: "projects", label: "projects" },
  { appId: "about", label: "about" },
  { appId: "arcade", label: "arcade" },
  { appId: "terminal", label: "terminal" },
  { appId: "contact", label: "contact" },
];

export function MenuBar() {
  const { dispatch } = useWM();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d
          .toLocaleString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", "")
      );
    };
    tick();
    const t = setInterval(tick, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[110] flex h-10 items-center gap-1 border-b border-line-soft bg-bg/85 px-4 backdrop-blur-md">
      <span className="mr-1 inline-block h-2 w-2 rounded-[2px] bg-accent" />
      <span className="font-serif text-[15px] font-semibold tracking-tight">
        Haad
      </span>
      <nav className="ml-4 flex items-center gap-1 max-md:hidden">
        {MENU.map(({ appId, label }) => (
          <button
            key={appId}
            onClick={() => dispatch({ type: "OPEN", appId })}
            className="rounded-md px-2.5 py-1 font-mono text-xs text-dim transition-colors hover:bg-line-soft hover:text-ink"
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-3">
        <span className="font-mono text-xs text-dim">{time}</span>
      </div>
    </header>
  );
}
