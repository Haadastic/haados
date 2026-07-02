"use client";

import { useEffect, useState } from "react";
import { BOOT_LINES } from "@/lib/data";

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const done = count >= BOOT_LINES.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(BOOT_LINES.length);
      const t = setTimeout(onDone, 400);
      return () => clearTimeout(t);
    }
    if (done) {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setCount((c) => c + 1),
      BOOT_LINES[count] === "" ? 220 : 110
    );
    return () => clearTimeout(t);
  }, [count, done, onDone]);

  useEffect(() => {
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 cursor-pointer bg-term-bg p-6 sm:p-10">
      <div className="font-term text-lg leading-relaxed text-term-green sm:text-xl">
        {BOOT_LINES.slice(0, count).map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre ${line.includes("WARN") ? "text-yellow" : ""}`}
          >
            {line || " "}
          </div>
        ))}
        {!done && <span className="caret-blink">█</span>}
      </div>
      <div className="absolute bottom-6 left-6 font-term text-base text-term-dim sm:bottom-10 sm:left-10">
        press any key to skip
      </div>
    </div>
  );
}
