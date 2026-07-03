"use client";

import { useEffect } from "react";
import { useWM } from "./WindowManager";
import { Window } from "./Window";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { Pet } from "./Pet";
import { useTheme } from "./theme";
import type { AppId } from "@/lib/data";
import {
  IconFolder,
  IconFile,
  IconGamepad,
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
    { appId: "projects", label: "projects", icon: <IconFolder /> },
    { appId: "about", label: "about.txt", icon: <IconFile /> },
    { appId: "arcade", label: "arcade", icon: <IconGamepad /> },
    { appId: "terminal", label: "terminal", icon: <IconTerminal /> },
    { appId: "contact", label: "contact", icon: <IconMail /> },
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
  const { petOn } = useTheme();
  const topZ = Math.max(0, ...state.windows.map((w) => w.z));

  useEffect(() => {
    if (autoOpenAbout) {
      const t = setTimeout(() => dispatch({ type: "OPEN", appId: "about" }), 280);
      return () => clearTimeout(t);
    }
  }, [autoOpenAbout, dispatch]);

  return (
    <div className="wallpaper fixed inset-0 overflow-hidden">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute right-6 bottom-16 text-right selectable-none max-md:hidden"
        style={{ opacity: 0.05 }}
      >
        <div className="font-display text-6xl tracking-tight text-ink">HaadOS</div>
      </div>

      <MenuBar />

      {/* Desktop icons */}
      <div className="absolute top-14 left-4 flex flex-col gap-1.5 max-md:right-4 max-md:grid max-md:grid-cols-4">
        {DESKTOP_ICONS.map(({ appId, label, icon }) => (
          <button
            key={appId}
            onClick={() => dispatch({ type: "OPEN", appId })}
            className="group flex w-[78px] flex-col items-center gap-1.5 border-2 border-transparent p-2 transition-colors hover:border-line-soft hover:bg-surface/50 focus-visible:outline-1 focus-visible:outline-accent"
          >
            <span className="h-9 w-9 transition-transform group-hover:-translate-y-0.5">
              {icon}
            </span>
            <span className="border border-transparent bg-bg/40 px-1 font-display text-[9px] leading-tight text-dim group-hover:border-line group-hover:text-ink">
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

      {petOn && <Pet />}
      <Dock />
    </div>
  );
}
