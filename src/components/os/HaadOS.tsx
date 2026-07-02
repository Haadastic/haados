"use client";

import { useCallback, useEffect, useState } from "react";
import { WindowProvider } from "./WindowManager";
import { Desktop } from "./Desktop";
import { BootScreen } from "./BootScreen";

export function HaadOS() {
  // null = not decided yet (avoids SSR/client flash), then "boot" | "desktop"
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
    return <div className="fixed inset-0 bg-term-bg" />;
  }

  return (
    <WindowProvider>
      {phase === "boot" ? (
        <BootScreen onDone={finishBoot} />
      ) : (
        <Desktop autoOpenAbout={booted} />
      )}
    </WindowProvider>
  );
}
