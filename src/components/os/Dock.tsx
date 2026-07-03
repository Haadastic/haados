"use client";

import { useWM } from "./WindowManager";
import type { AppId } from "@/lib/data";
import {
  IconFolder,
  IconFile,
  IconGamepad,
  IconTerminal,
  IconMail,
  IconPaw,
} from "./icons";
import { ACCENTS, ACCENT_META, useTheme, type Accent } from "./theme";

const DOCK_APPS: { appId: AppId; label: string; icon: React.ReactNode }[] = [
  { appId: "projects", label: "projects", icon: <IconFolder /> },
  { appId: "about", label: "about.txt", icon: <IconFile /> },
  { appId: "arcade", label: "arcade", icon: <IconGamepad /> },
  { appId: "terminal", label: "terminal", icon: <IconTerminal /> },
  { appId: "contact", label: "contact", icon: <IconMail /> },
];

export function Dock() {
  const { state, dispatch } = useWM();
  const { accent, setAccent, petOn, setPetOn } = useTheme();

  return (
    <div className="fixed inset-x-0 bottom-4 z-[110] flex justify-center max-md:bottom-0">
      <div className="flex items-center gap-1.5 border-2 border-line bg-surface px-2.5 py-2 win-soft-dim max-md:w-full max-md:justify-around max-md:border-x-0 max-md:border-b-0">
        {DOCK_APPS.map(({ appId, label, icon }) => {
          const open = state.windows.some((w) => w.appId === appId);
          return (
            <button
              key={appId}
              title={label}
              aria-label={label}
              onClick={() => dispatch({ type: "OPEN", appId })}
              className="group relative flex h-10 w-10 items-center justify-center border-2 border-transparent p-1.5 transition-colors hover:border-line hover:bg-surface-2"
            >
              <span className="h-6 w-6">{icon}</span>
              <span
                className={`absolute -bottom-[3px] h-[3px] w-3 transition-opacity ${
                  open ? "bg-accent opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}

        <div className="mx-1.5 h-7 w-0.5 bg-line max-md:hidden" />

        {/* Color = Creature */}
        <div className="flex items-center gap-1.5 max-md:hidden">
          {(ACCENTS as readonly Accent[]).map((a) => (
            <button
              key={a}
              title={`${ACCENT_META[a].label} · ${ACCENT_META[a].creature}`}
              aria-label={`${a} theme`}
              onClick={() => setAccent(a)}
              className={`h-4 w-4 border-2 transition-transform hover:scale-110 ${
                accent === a ? "border-ink" : "border-transparent"
              }`}
              style={{ backgroundColor: ACCENT_META[a].dot }}
            />
          ))}
        </div>

        <div className="mx-1.5 h-7 w-0.5 bg-line max-md:hidden" />

        <button
          title={petOn ? `hide ${ACCENT_META[accent].creature}` : `summon ${ACCENT_META[accent].creature}`}
          aria-label="toggle pet"
          onClick={() => setPetOn(!petOn)}
          className={`flex h-10 w-10 items-center justify-center border-2 p-2 transition-colors max-md:hidden ${
            petOn ? "border-line bg-accent-soft text-accent" : "border-transparent text-faint hover:text-dim"
          }`}
        >
          <IconPaw />
        </button>
      </div>
    </div>
  );
}
