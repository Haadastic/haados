"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { AppId } from "@/lib/data";

export type Win = {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

type State = { windows: Win[]; nextZ: number };

type Action =
  | { type: "OPEN"; appId: AppId }
  | { type: "CLOSE"; id: string }
  | { type: "FOCUS"; id: string }
  | { type: "MINIMIZE"; id: string }
  | { type: "TOGGLE_MAX"; id: string }
  | { type: "MOVE"; id: string; x: number; y: number; w?: number; h?: number };

const APP_DEFAULTS: Record<
  AppId,
  { title: string; w: number; h: number }
> = {
  about: { title: "about.txt", w: 560, h: 520 },
  projects: { title: "projects", w: 760, h: 540 },
  arcade: { title: "arcade", w: 700, h: 520 },
  terminal: { title: "terminal", w: 640, h: 420 },
  contact: { title: "contact.txt", w: 460, h: 360 },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN": {
      const existing = state.windows.find((w) => w.appId === action.appId);
      if (existing) {
        return {
          nextZ: state.nextZ + 1,
          windows: state.windows.map((w) =>
            w.id === existing.id
              ? { ...w, minimized: false, z: state.nextZ + 1 }
              : w
          ),
        };
      }
      const def = APP_DEFAULTS[action.appId];
      const idx = state.windows.length;
      const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const w = Math.min(def.w, vw - 24);
      const h = Math.min(def.h, vh - 90);
      const x = Math.max(12, (vw - w) / 2 + ((idx % 5) - 2) * 36);
      const y = Math.max(12, (vh - 48 - h) / 2 + ((idx % 4) - 1) * 28);
      return {
        nextZ: state.nextZ + 1,
        windows: [
          ...state.windows,
          {
            id: action.appId,
            appId: action.appId,
            title: def.title,
            x,
            y,
            w,
            h,
            z: state.nextZ + 1,
            minimized: false,
            maximized: false,
          },
        ],
      };
    }
    case "CLOSE":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
      };
    case "FOCUS":
      return {
        nextZ: state.nextZ + 1,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, z: state.nextZ + 1, minimized: false }
            : w
        ),
      };
    case "MINIMIZE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
      };
    case "TOGGLE_MAX":
      return {
        nextZ: state.nextZ + 1,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, maximized: !w.maximized, z: state.nextZ + 1 }
            : w
        ),
      };
    case "MOVE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? {
                ...w,
                x: action.x,
                y: action.y,
                w: action.w ?? w.w,
                h: action.h ?? w.h,
              }
            : w
        ),
      };
  }
}

const WMContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { windows: [], nextZ: 10 });
  return (
    <WMContext.Provider value={{ state, dispatch }}>
      {children}
    </WMContext.Provider>
  );
}

export function useWM() {
  const ctx = useContext(WMContext);
  if (!ctx) throw new Error("useWM outside WindowProvider");
  return ctx;
}
