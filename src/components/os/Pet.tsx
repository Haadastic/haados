"use client";

/* GIF desktop pet (sprites from sankalpaacharya/webpets).
   Wanders along the desktop floor and ambles toward the cursor. */

import { useEffect, useRef } from "react";
import { ACCENT_META, useTheme } from "./theme";

export function Pet() {
  const { accent } = useTheme();
  const meta = ACCENT_META[accent];
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    let x = 80;
    const floor = () => window.innerHeight - 96;
    let mouseX = window.innerWidth / 2;
    let facing: 1 | -1 = 1;
    let moving = false;
    let raf = 0;
    let last = 0;
    const SPEED = 1.6;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
    };
    window.addEventListener("mousemove", onMouse);

    const idleSrc = `/pets/${meta.pet}_idle.gif`;
    const walkSrc = `/pets/${meta.pet}_walk.gif`;

    function step(ts: number) {
      raf = requestAnimationFrame(step);
      if (ts - last < 33) return;
      last = ts;

      const dx = mouseX - x;
      const dist = Math.abs(dx);
      const nextMoving = dist > 64;

      if (nextMoving) {
        const dir = dx > 0 ? 1 : -1;
        if (dir !== facing) facing = dir as 1 | -1;
        x += dir * SPEED;
        x = Math.max(8, Math.min(window.innerWidth - 56, x));
      }

      if (nextMoving !== moving) {
        moving = nextMoving;
        if (img) img.src = moving ? walkSrc : idleSrc;
      }
      wrap!.style.transform = `translate(${x}px, ${floor()}px) scaleX(${facing})`;
    }
    img.src = idleSrc;
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [meta.pet]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[105] h-12 w-12"
      style={{ imageRendering: "pixelated" }}
    >
      <img
        ref={imgRef}
        alt=""
        className="h-full w-full object-contain object-bottom"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
