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
      const t = setTimeout(() => dispatch({ type: "OPEN", appId: "about" }), 300);
      return () => clearTimeout(t);
    }
  }, [autoOpenAbout, dispatch]);

  return (
    <div className="wallpaper fixed inset-0 overflow-hidden">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute -top-24 -left-8 font-serif italic selectable-none"
        style={{ fontSize: "clamp(180px, 26vw, 420px)", lineHeight: 1, color: "var(--color-ink)", opacity: 0.035 }}
      >
        haadOS
      </div>

      <MenuBar />

      {/* Desktop icons */}
      <div className="absolute top-16 left-5 flex flex-col gap-2 max-md:right-5 max-md:grid max-md:grid-cols-4">
        {DESKTOP_ICONS.map(({ appId, label, icon }) => (
          <button
            key={appId}
            onClick={() => dispatch({ type: "OPEN", appId })}
            onDoubleClick={(e) => e.preventDefault()}
            className="group flex w-[76px] flex-col items-center gap-1.5 rounded-lg p-2 transition-colors hover:bg-line-soft/50 focus-visible:outline-1 focus-visible:outline-accent"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-soft bg-surface/70 p-2.5 text-dim transition-colors group-hover:border-line group-hover:text-ink">
              {icon}
            </span>
            <span className="font-mono text-[11px] text-dim group-hover:text-ink">
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
