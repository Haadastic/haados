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

/* Color = Creature: each theme summons a matching pet */
export const ACCENT_META: Record<
  Accent,
  { dot: string; label: string; pet: string; creature: string }
> = {
  ember: { dot: "#f08a3c", label: "ember", pet: "fox", creature: "fox" },
  tide: { dot: "#6bb6d6", label: "tide", pet: "skeleton", creature: "skeleton" },
  moss: { dot: "#94c07a", label: "moss", pet: "turtle", creature: "turtle" },
  gold: { dot: "#e6b643", label: "gold", pet: "rubber-duck", creature: "duck" },
  slate: { dot: "#b0a89c", label: "slate", pet: "totoro", creature: "totoro" },
};

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
