"use client";

import { useEffect } from "react";
import { useWM } from "./WindowManager";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import type { AppId } from "@/lib/data";
import {
  IconTxt,
  IconFolder,
  IconJoystick,
  IconTerminal,
  IconMail,
} from "./icons";
import { AboutApp } from "@/components/apps/AboutApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { ArcadeApp } from "@/components/apps/ArcadeApp";
import { TerminalApp } from "@/components/apps/TerminalApp";
import { ContactApp } from "@/components/apps/ContactApp";

const DESKTOP_ICONS: { appId: AppId; label: string; icon: React.ReactNode }[] =
  [
    { appId: "about", label: "about.txt", icon: <IconTxt /> },
    { appId: "projects", label: "projects", icon: <IconFolder /> },
    { appId: "arcade", label: "arcade", icon: <IconJoystick /> },
    { appId: "terminal", label: "terminal", icon: <IconTerminal /> },
    { appId: "contact", label: "contact.txt", icon: <IconMail /> },
  ];

const APP_VIEWS: Record<AppId, React.ReactNode> = {
  about: <AboutApp />,
  projects: <ProjectsApp />,
  arcade: <ArcadeApp />,
  terminal: <TerminalApp />,
  contact: <ContactApp />,
};

export function Desktop({ autoOpenAbout }: { autoOpenAbout: boolean }) {
  const { state, dispatch } = useWM();
  const topZ = Math.max(0, ...state.windows.map((w) => w.z));

  useEffect(() => {
    if (autoOpenAbout) {
      const t = setTimeout(() => dispatch({ type: "OPEN", appId: "about" }), 250);
      return () => clearTimeout(t);
    }
  }, [autoOpenAbout, dispatch]);

  return (
    <div className="wallpaper fixed inset-0 overflow-hidden">
      {/* Desktop wordmark */}
      <div className="pointer-events-none absolute right-5 bottom-16 text-right selectable-none max-md:hidden">
        <div className="font-pixel text-4xl font-bold tracking-tight text-ink opacity-[0.16]">
          HaadOS
        </div>
        <div className="font-mono text-xs text-ink opacity-[0.28]">
          v18.0 — student build · Lahore
        </div>
      </div>

      {/* Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 max-md:right-4 max-md:grid max-md:grid-cols-4 max-md:gap-2">
        {DESKTOP_ICONS.map(({ appId, label, icon }) => (
          <button
            key={appId}
            onClick={() => dispatch({ type: "OPEN", appId })}
            className="group flex w-20 flex-col items-center gap-1.5 rounded-sm p-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            <span className="h-10 w-10 transition-transform group-hover:-translate-y-0.5 group-active:translate-y-0">
              {icon}
            </span>
            <span className="border border-transparent bg-desk px-1 font-pixel text-[10px] leading-tight text-ink group-hover:border-ink group-hover:bg-yellow">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {state.windows.map((w) => (
        <Window key={w.id} win={w} focused={w.z === topZ}>
          {APP_VIEWS[w.appId]}
        </Window>
      ))}

      <Taskbar />
    </div>
  );
}
