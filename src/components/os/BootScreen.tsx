"use client";

import { useEffect, useState } from "react";
import { BOOT_LINES } from "@/lib/data";

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const done = count >= BOOT_LINES.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(BOOT_LINES.length);
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
    if (done) {
      const t = setTimeout(onDone, 850);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setCount((c) => c + 1),
      BOOT_LINES[count] === "" ? 190 : 100
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
    <div className="fixed inset-0 z-50 cursor-pointer bg-bg p-6 sm:p-12">
      <div className="font-mono text-[13px] leading-[1.7] text-dim sm:text-sm">
        {BOOT_LINES.slice(0, count).map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre ${line.includes("[ warn ]") ? "text-[#e6b643]" : ""}`}
          >
            {line.includes("[ ok ]") ? (
              <>
                <span className="text-accent">{"  [ ok ] "}</span>
                {line.slice(9)}
              </>
            ) : line.startsWith("boot complete") || line.startsWith("booting") ? (
              <span className="text-ink">{line}</span>
            ) : (
              line || " "
            )}
          </div>
        ))}
        {!done && <span className="caret-blink text-accent">▌</span>}
      </div>
      <div className="absolute bottom-8 left-6 font-mono text-xs text-faint sm:left-12">
        press any key to skip
      </div>
    </div>
  );
}
