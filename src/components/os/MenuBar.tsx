"use client";

import { useEffect, useState } from "react";
import { useWM } from "./WindowManager";
import { useTheme } from "./theme";
import { IconSun, IconMoon } from "./icons";
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
  const { mode, toggleMode } = useTheme();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date()
          .toLocaleString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", "")
      );
    tick();
    const t = setInterval(tick, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[110] flex h-10 items-center gap-1 border-b-2 border-line bg-bg-2 px-3">
      <span className="mr-1.5 inline-block h-2.5 w-2.5 bg-accent" />
      <span className="mr-3 font-display text-[13px] font-bold tracking-wide">HaadOS</span>
      <nav className="flex items-center gap-0.5 max-md:hidden">
        {MENU.map(({ appId, label }) => (
          <button
            key={appId}
            onClick={() => dispatch({ type: "OPEN", appId })}
            className="px-2.5 py-1 font-mono text-xs text-dim transition-colors hover:bg-line hover:text-ink"
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={toggleMode}
          title={mode === "dark" ? "switch to light mode" : "switch to dark mode"}
          aria-label={mode === "dark" ? "switch to light mode" : "switch to dark mode"}
          className="flex h-6 w-6 items-center justify-center border border-line text-dim transition-colors hover:border-accent hover:text-accent"
        >
          <span className="h-3.5 w-3.5">
            {mode === "dark" ? <IconSun /> : <IconMoon />}
          </span>
        </button>
        <span className="font-display text-[10px] tracking-wide text-dim">{time}</span>
      </div>
    </header>
  );
}
