"use client";

import { useCallback, useEffect, useState } from "react";
import { WindowProvider } from "./WindowManager";
import { ThemeProvider } from "./theme";
import { Desktop } from "./Desktop";
import { BootScreen } from "./BootScreen";

export function HaadOS() {
  // null = undecided (avoids SSR flash), then "boot" | "desktop"
  const [phase, setPhase] = useState<null | "boot" | "desktop">(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const skip = sessionStorage.getItem("haados-booted") === "1";
    setPhase(skip ? "desktop" : "boot");
  }, []);

  const finishBoot = useCallback(() => {
    sessionStorage.setItem("haados-booted", "1");
    setBooted(true);
    setPhase("desktop");
  }, []);

  if (phase === null) {
    return <div className="fixed inset-0 bg-bg" />;
  }

  return (
    <ThemeProvider>
      <WindowProvider>
        {phase === "boot" ? (
          <BootScreen onDone={finishBoot} />
        ) : (
          <Desktop autoOpenAbout={booted} />
        )}
      </WindowProvider>
    </ThemeProvider>
  );
}
