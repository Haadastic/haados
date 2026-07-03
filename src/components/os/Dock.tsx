"use client";

import { useWM } from "./WindowManager";
import type { AppId } from "@/lib/data";
import {
  IconFolder,
  IconFile,
  IconGamepad,
  IconTerminal,
  IconMail,
  IconCat,
} from "./icons";
import { ACCENTS, useTheme, type Accent } from "./theme";

const DOCK_APPS: { appId: AppId; label: string; icon: React.ReactNode }[] = [
  { appId: "projects", label: "projects", icon: <IconFolder /> },
  { appId: "about", label: "about.txt", icon: <IconFile /> },
  { appId: "arcade", label: "arcade", icon: <IconGamepad /> },
  { appId: "terminal", label: "terminal", icon: <IconTerminal /> },
  { appId: "contact", label: "contact", icon: <IconMail /> },
];

const DOT_COLORS: Record<Accent, string> = {
  ember: "#e29b6a",
  tide: "#8fbedf",
  moss: "#a9c88e",
  gold: "#d9b45f",
  slate: "#9aa7b5",
};

export function Dock() {
  const { state, dispatch } = useWM();
  const { accent, setAccent, petOn, setPetOn } = useTheme();

  return (
    <div className="fixed inset-x-0 bottom-4 z-[110] flex justify-center max-md:bottom-0 max-md:px-0">
      <div className="flex items-center gap-1.5 rounded-2xl border border-line-soft bg-surface/80 px-2.5 py-2 win-shadow-dim backdrop-blur-md max-md:w-full max-md:justify-around max-md:rounded-none max-md:border-x-0 max-md:border-b-0">
        {DOCK_APPS.map(({ appId, label, icon }) => {
          const open = state.windows.some((w) => w.appId === appId);
          return (
            <button
              key={appId}
              title={label}
              aria-label={label}
              onClick={() => dispatch({ type: "OPEN", appId })}
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent p-2.5 text-dim transition-all hover:-translate-y-0.5 hover:border-line-soft hover:bg-line-soft hover:text-ink"
            >
              {icon}
              <span
                className={`absolute -bottom-1 h-1 w-1 rounded-full transition-opacity ${
                  open ? "bg-accent opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}

        <div className="mx-1.5 h-6 w-px bg-line-soft max-md:hidden" />

        {/* Color = Creature */}
        <div className="flex items-center gap-1.5 max-md:hidden">
          {(Object.keys(DOT_COLORS) as Accent[]).map((a) => (
            <button
              key={a}
              title={`${a} theme`}
              aria-label={`${a} theme`}
              onClick={() => setAccent(a)}
              className={`h-3.5 w-3.5 rounded-full transition-transform hover:scale-125 ${
                accent === a ? "ring-2 ring-ink/60 ring-offset-2 ring-offset-surface" : ""
              }`}
              style={{ backgroundColor: DOT_COLORS[a] }}
            />
          ))}
        </div>

        <div className="mx-1.5 h-6 w-px bg-line-soft max-md:hidden" />

        <button
          title={petOn ? "shoo the cat" : "summon the cat"}
          aria-label="toggle pet"
          onClick={() => setPetOn(!petOn)}
          className={`flex h-10 w-10 items-center justify-center rounded-xl p-2.5 transition-all hover:-translate-y-0.5 max-md:hidden ${
            petOn ? "bg-accent-soft text-accent" : "text-faint hover:text-dim"
          }`}
        >
          <IconCat />
        </button>
      </div>
    </div>
  );
}

export { ACCENTS };
