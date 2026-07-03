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
export type Mode = "dark" | "light";

/* Color = Creature: each theme summons a matching pet.
   `dot` is the pure hue used for the picker swatch. */
export const ACCENT_META: Record<
  Accent,
  { dot: string; label: string; pet: string; creature: string }
> = {
  ember: { dot: "#f08a3c", label: "ember", pet: "fox", creature: "fox" },
  tide: { dot: "#56b0d6", label: "tide", pet: "skeleton", creature: "skeleton" },
  moss: { dot: "#8bc06e", label: "moss", pet: "turtle", creature: "turtle" },
  gold: { dot: "#e6b643", label: "gold", pet: "rubber-duck", creature: "duck" },
  slate: { dot: "#b0a89c", label: "slate", pet: "totoro", creature: "totoro" },
};

const ThemeContext = createContext<{
  accent: Accent;
  setAccent: (a: Accent) => void;
  mode: Mode;
  toggleMode: () => void;
  petOn: boolean;
  setPetOn: (on: boolean) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<Accent>("ember");
  const [mode, setModeState] = useState<Mode>("dark");
  const [petOn, setPetOnState] = useState(true);

  useEffect(() => {
    const savedAccent = localStorage.getItem("haados-accent") as Accent | null;
    if (savedAccent && ACCENTS.includes(savedAccent)) setAccentState(savedAccent);
    const savedMode = localStorage.getItem("haados-mode");
    if (savedMode === "light") setModeState("light");
    const savedPet = localStorage.getItem("haados-pet");
    if (savedPet === "0") setPetOnState(false);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
  }, [accent]);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  const setAccent = (a: Accent) => {
    setAccentState(a);
    localStorage.setItem("haados-accent", a);
  };
  const toggleMode = () => {
    setModeState((m) => {
      const next: Mode = m === "dark" ? "light" : "dark";
      localStorage.setItem("haados-mode", next);
      return next;
    });
  };
  const setPetOn = (on: boolean) => {
    setPetOnState(on);
    localStorage.setItem("haados-pet", on ? "1" : "0");
  };

  return (
    <ThemeContext.Provider
      value={{ accent, setAccent, mode, toggleMode, petOn, setPetOn }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme outside ThemeProvider");
  return ctx;
}
