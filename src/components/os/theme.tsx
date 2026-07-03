"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const ACCENTS = ["ember", "tide", "moss", "gold", "slate"] as const;
export type Accent = (typeof ACCENTS)[number];

const ThemeContext = createContext<{
  accent: Accent;
  setAccent: (a: Accent) => void;
  petOn: boolean;
  setPetOn: (on: boolean) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<Accent>("ember");
  const [petOn, setPetOnState] = useState(true);

  useEffect(() => {
    const savedAccent = localStorage.getItem("haados-accent") as Accent | null;
    if (savedAccent && ACCENTS.includes(savedAccent)) setAccentState(savedAccent);
    const savedPet = localStorage.getItem("haados-pet");
    if (savedPet === "0") setPetOnState(false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPetOnState(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
  }, [accent]);

  const setAccent = (a: Accent) => {
    setAccentState(a);
    localStorage.setItem("haados-accent", a);
  };
  const setPetOn = (on: boolean) => {
    setPetOnState(on);
    localStorage.setItem("haados-pet", on ? "1" : "0");
  };

  return (
    <ThemeContext.Provider value={{ accent, setAccent, petOn, setPetOn }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme outside ThemeProvider");
  return ctx;
}
