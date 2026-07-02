"use client";

import { useEffect, useState } from "react";
import { useWM } from "./WindowManager";
import { CONTACT, type AppId } from "@/lib/data";
import {
  IconTxt,
  IconFolder,
  IconJoystick,
  IconTerminal,
  IconMail,
} from "./icons";

const APP_ICONS: Record<AppId, React.ReactNode> = {
  about: <IconTxt />,
  projects: <IconFolder />,
  arcade: <IconJoystick />,
  terminal: <IconTerminal />,
  contact: <IconMail />,
};

const START_APPS: { appId: AppId; label: string }[] = [
  { appId: "about", label: "about.txt" },
  { appId: "projects", label: "projects" },
  { appId: "arcade", label: "arcade" },
  { appId: "terminal", label: "terminal" },
  { appId: "contact", label: "contact.txt" },
];

export function Taskbar() {
  const { state, dispatch } = useWM();
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    tick();
    const t = setInterval(tick, 15000);
    return () => clearInterval(t);
  }, []);

  const topZ = Math.max(0, ...state.windows.map((w) => w.z));

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-[90]"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div className="fixed inset-x-0 bottom-0 z-[100] flex h-[52px] items-center gap-2 border-t-2 border-ink bg-paper px-2">
        {/* Start button */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={`flex h-9 items-center gap-2 border-2 border-ink px-3 font-pixel text-[11px] shadow-hard-sm transition-none hover:bg-yellow focus-visible:outline-2 focus-visible:outline-ink ${
              menuOpen ? "translate-x-[2px] translate-y-[2px] bg-yellow shadow-none" : "bg-orange text-paper"
            }`}
          >
            <span className={menuOpen ? "text-ink" : "text-paper"}>◆ HaadOS</span>
          </button>

          {menuOpen && (
            <div className="absolute bottom-12 left-0 w-56 border-2 border-ink bg-paper shadow-hard">
              <div className="border-b-2 border-ink bg-ink px-3 py-2 font-pixel text-[10px] text-paper">
                HaadOS v18.0
              </div>
              {START_APPS.map(({ appId, label }) => (
                <button
                  key={appId}
                  onClick={() => {
                    dispatch({ type: "OPEN", appId });
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left font-mono text-sm hover:bg-yellow"
                >
                  <span className="h-4 w-4 shrink-0">{APP_ICONS[appId]}</span>
                  {label}
                </button>
              ))}
              <div className="border-t-2 border-ink">
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center gap-2.5 px-3 py-2 font-mono text-sm hover:bg-yellow"
                >
                  <span className="font-pixel text-[10px]">↗</span> github
                </a>
                <a
                  href={CONTACT.papergenre}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center gap-2.5 px-3 py-2 font-mono text-sm hover:bg-yellow"
                >
                  <span className="font-pixel text-[10px]">↗</span>{" "}
                  papergenre.com
                </a>
                <button
                  onClick={() => {
                    sessionStorage.removeItem("haados-booted");
                    location.reload();
                  }}
                  className="flex w-full items-center gap-2.5 border-t-2 border-ink px-3 py-2 text-left font-mono text-sm hover:bg-red hover:text-paper"
                >
                  <span className="font-pixel text-[10px]">⏻</span> restart
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Open windows */}
        <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
          {state.windows.map((w) => {
            const active = w.z === topZ && !w.minimized;
            return (
              <button
                key={w.id}
                onClick={() =>
                  active
                    ? dispatch({ type: "MINIMIZE", id: w.id })
                    : dispatch({ type: "FOCUS", id: w.id })
                }
                className={`flex h-9 shrink-0 items-center gap-2 border-2 border-ink px-2.5 font-mono text-xs ${
                  active
                    ? "bg-ink text-paper"
                    : "bg-paper-dim hover:bg-yellow"
                }`}
              >
                <span className="h-3.5 w-3.5">{APP_ICONS[w.appId]}</span>
                <span className="max-w-28 truncate max-md:hidden">
                  {w.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clock */}
        <div className="flex h-9 items-center border-2 border-ink bg-paper-dim px-3 font-pixel text-[11px]">
          {time || "--:--"}
        </div>
      </div>
    </>
  );
}
