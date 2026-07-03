"use client";

/* Desktop cat, adapted from the classic oneko (sprite via webpets). */

import { useEffect, useRef } from "react";

type Frame = [number, number];
const SPRITES: Record<string, Frame[]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

export function Pet() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 48;
    let y = 96;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let frame = 0;
    let idleTime = 0;
    let idleAnim: string | null = null;
    let idleFrame = 0;
    let last = 0;
    let raf = 0;
    const SPEED = 10;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    function setSprite(name: string, f: number) {
      const frames = SPRITES[name];
      const [fx, fy] = frames[f % frames.length];
      el!.style.backgroundPosition = `${fx * 32}px ${fy * 32}px`;
    }

    function resetIdle() {
      idleAnim = null;
      idleFrame = 0;
    }

    function idle() {
      idleTime += 1;
      if (idleTime > 10 && Math.random() < 0.005 && idleAnim === null) {
        const options = ["sleeping", "scratchSelf"];
        if (x < 32) options.push("scratchWallW");
        if (y < 64) options.push("scratchWallN");
        if (x > window.innerWidth - 32) options.push("scratchWallE");
        if (y > window.innerHeight - 32) options.push("scratchWallS");
        idleAnim = options[Math.floor(Math.random() * options.length)];
      }
      switch (idleAnim) {
        case "sleeping":
          if (idleFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleFrame / 4));
          if (idleFrame > 192) resetIdle();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnim, idleFrame);
          if (idleFrame > 9) resetIdle();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleFrame += 1;
    }

    function step() {
      frame += 1;
      const diffX = x - mouseX;
      const diffY = y - mouseY;
      const dist = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (dist < SPEED || dist < 48) {
        idle();
        return;
      }

      idleAnim = null;
      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }
      idleTime = 0;

      let dir = "";
      dir += diffY / dist > 0.5 ? "N" : "";
      dir += diffY / dist < -0.5 ? "S" : "";
      dir += diffX / dist > 0.5 ? "W" : "";
      dir += diffX / dist < -0.5 ? "E" : "";
      setSprite(dir || "idle", frame);

      x -= (diffX / dist) * SPEED;
      y -= (diffY / dist) * SPEED;
      x = Math.min(Math.max(16, x), window.innerWidth - 16);
      y = Math.min(Math.max(56, y), window.innerHeight - 24);

      el!.style.left = `${x - 16}px`;
      el!.style.top = `${y - 16}px`;
    }

    function loop(ts: number) {
      if (ts - last > 100) {
        last = ts;
        step();
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-[105] h-8 w-8"
      style={{
        left: 32,
        top: 80,
        backgroundImage: "url(/pets/oneko.gif)",
        imageRendering: "pixelated",
        filter: "var(--pet-filter)",
      }}
    />
  );
}
