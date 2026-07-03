"use client";

/* Interactive desktop pet (sprites from sankalpaacharya/webpets).
   - runs toward the cursor when it's far, walks when near, idles when close
   - curls up to sleep after you leave it alone
   - click it to play: it swipes, hops, and drops a little heart */

import { useCallback, useEffect, useRef, useState } from "react";
import { ACCENT_META, useTheme } from "./theme";

type Action = "idle" | "walk" | "run" | "swipe" | "lie";

const NEAR = 70; // within this, the pet stops and idles
const RUN = 360; // beyond this, the pet runs
const WALK_SPEED = 1.7;
const RUN_SPEED = 3.6;
const SLEEP_AFTER = 7000; // ms of stillness before it lies down
const SWIPE_MS = 640;
const HOP_MS = 440;
const PET_W = 48;

export function Pet() {
  const { accent } = useTheme();
  const meta = ACCENT_META[accent];
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);
  const heartId = useRef(0);

  const src = useCallback(
    (a: Action) => `/pets/${meta.pet}_${a}.gif`,
    [meta.pet]
  );

  // Mutable animation state shared between the loop and click handler.
  const st = useRef({
    x: 80,
    facing: 1 as 1 | -1,
    action: "idle" as Action,
    mouseX: typeof window !== "undefined" ? window.innerWidth / 2 : 400,
    lastMove: 0,
    swipeUntil: 0,
    hopUntil: 0,
  });

  const play = useCallback(() => {
    const now = performance.now();
    st.current.swipeUntil = now + SWIPE_MS;
    st.current.hopUntil = now + HOP_MS;
    const id = heartId.current++;
    const left = st.current.x + PET_W / 2 + (Math.random() * 16 - 8);
    setHearts((h) => [...h, { id, left }]);
    window.setTimeout(
      () => setHearts((h) => h.filter((x) => x.id !== id)),
      900
    );
  }, []);

  useEffect(() => {
    // Preload every frame set so switching actions never flashes blank.
    (["idle", "walk", "run", "swipe", "lie"] as Action[]).forEach((a) => {
      const im = new Image();
      im.src = src(a);
    });
  }, [src]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    const s = st.current;
    s.lastMove = performance.now();

    let raf = 0;
    let last = 0;

    const onMouse = (e: MouseEvent) => {
      s.mouseX = e.clientX;
      s.lastMove = performance.now();
    };
    window.addEventListener("mousemove", onMouse);

    function setAction(a: Action) {
      if (s.action !== a) {
        s.action = a;
        img!.src = src(a);
      }
    }

    function frame(ts: number) {
      raf = requestAnimationFrame(frame);
      if (ts - last < 33) return;
      last = ts;

      // Rest just above the dock band so the pet stays clickable
      // (the full-width dock container would otherwise eat pointer events).
      const floorY = window.innerHeight - 134;
      let yOff = 0;

      if (ts < s.swipeUntil) {
        setAction("swipe");
        if (ts < s.hopUntil) {
          const p = 1 - (s.hopUntil - ts) / HOP_MS; // 0..1
          yOff = -Math.sin(p * Math.PI) * 16;
        }
      } else {
        const dx = s.mouseX - s.x;
        const dist = Math.abs(dx);
        const still = ts - s.lastMove;

        if (dist <= NEAR) {
          setAction(still > SLEEP_AFTER ? "lie" : "idle");
        } else {
          const dir: 1 | -1 = dx > 0 ? 1 : -1;
          s.facing = dir;
          if (dist > RUN) {
            setAction("run");
            s.x += dir * RUN_SPEED;
          } else {
            setAction("walk");
            s.x += dir * WALK_SPEED;
          }
          s.x = Math.max(6, Math.min(window.innerWidth - PET_W - 6, s.x));
        }
      }

      wrap!.style.transform = `translate(${s.x}px, ${floorY + yOff}px) scaleX(${s.facing})`;
    }

    img.src = src(s.action);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [src]);

  return (
    <>
      {/* floating hearts on the desktop layer (not flipped with the pet) */}
      {hearts.map((h) => (
        <span
          key={h.id}
          aria-hidden
          className="pet-heart pointer-events-none fixed z-[106] font-mono text-sm select-none"
          style={{
            left: h.left,
            bottom: 150,
            color: "var(--accent)",
          }}
        >
          ♥
        </span>
      ))}

      <div
        ref={wrapRef}
        className="fixed top-0 left-0 z-[105] h-12 w-12"
        style={{ imageRendering: "pixelated" }}
      >
        <img
          ref={imgRef}
          alt=""
          title={`${meta.creature} — click to play`}
          onPointerDown={play}
          draggable={false}
          className="h-full w-full cursor-pointer object-contain object-bottom"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    </>
  );
}
