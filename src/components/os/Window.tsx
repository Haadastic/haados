"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { useWM, type Win } from "./WindowManager";
import type { AppId } from "@/lib/data";

const ACCENTS: Record<AppId, string> = {
  about: "bg-orange",
  projects: "bg-blue",
  arcade: "bg-green",
  terminal: "bg-ink",
  contact: "bg-purple",
};

export function Window({
  win,
  focused,
  children,
}: {
  win: Win;
  focused: boolean;
  children: ReactNode;
}) {
  const { dispatch } = useWM();
  const frameRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, startY: 0, winX: 0, winY: 0, on: false });
  const resize = useRef({ startX: 0, startY: 0, winW: 0, winH: 0, on: false });

  function clampPos(x: number, y: number) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: Math.min(Math.max(x, -win.w + 80), vw - 80),
      y: Math.min(Math.max(y, 0), vh - 88),
    };
  }

  function onTitleDown(e: PointerEvent<HTMLDivElement>) {
    if (win.maximized) return;
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      winX: win.x,
      winY: win.y,
      on: true,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onTitleMove(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current.on || !frameRef.current) return;
    const { x, y } = clampPos(
      drag.current.winX + e.clientX - drag.current.startX,
      drag.current.winY + e.clientY - drag.current.startY
    );
    frameRef.current.style.left = `${x}px`;
    frameRef.current.style.top = `${y}px`;
  }
  function onTitleUp(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current.on) return;
    drag.current.on = false;
    const { x, y } = clampPos(
      drag.current.winX + e.clientX - drag.current.startX,
      drag.current.winY + e.clientY - drag.current.startY
    );
    dispatch({ type: "MOVE", id: win.id, x, y });
  }

  function onResizeDown(e: PointerEvent<HTMLDivElement>) {
    if (win.maximized) return;
    e.stopPropagation();
    resize.current = {
      startX: e.clientX,
      startY: e.clientY,
      winW: win.w,
      winH: win.h,
      on: true,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onResizeMove(e: PointerEvent<HTMLDivElement>) {
    if (!resize.current.on || !frameRef.current) return;
    const w = Math.max(320, resize.current.winW + e.clientX - resize.current.startX);
    const h = Math.max(220, resize.current.winH + e.clientY - resize.current.startY);
    frameRef.current.style.width = `${w}px`;
    frameRef.current.style.height = `${h}px`;
  }
  function onResizeUp(e: PointerEvent<HTMLDivElement>) {
    if (!resize.current.on) return;
    resize.current.on = false;
    const w = Math.max(320, resize.current.winW + e.clientX - resize.current.startX);
    const h = Math.max(220, resize.current.winH + e.clientY - resize.current.startY);
    dispatch({ type: "MOVE", id: win.id, x: win.x, y: win.y, w, h });
  }

  const maximizedStyle = win.maximized
    ? { left: 0, top: 0, width: "100%", height: "calc(100% - 52px)" }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <div
      ref={frameRef}
      role="dialog"
      aria-label={win.title}
      className={`absolute flex flex-col border-2 border-ink bg-paper max-md:!inset-0 max-md:!h-[calc(100%-52px)] max-md:!w-full ${
        focused ? "shadow-hard" : "shadow-hard-sm opacity-95"
      } ${win.minimized ? "hidden" : ""}`}
      style={{ ...maximizedStyle, zIndex: win.z }}
      onPointerDown={() => dispatch({ type: "FOCUS", id: win.id })}
    >
      {/* Title bar */}
      <div
        className={`flex h-9 shrink-0 cursor-grab touch-none items-center gap-2 border-b-2 border-ink px-2 selectable-none active:cursor-grabbing ${
          focused ? ACCENTS[win.appId] : "bg-ink-soft"
        }`}
        onPointerDown={onTitleDown}
        onPointerMove={onTitleMove}
        onPointerUp={onTitleUp}
        onDoubleClick={() => dispatch({ type: "TOGGLE_MAX", id: win.id })}
      >
        <span className="font-pixel text-[11px] tracking-wide text-paper">
          {win.title}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <TitleButton
            label="Minimize"
            onClick={() => dispatch({ type: "MINIMIZE", id: win.id })}
          >
            _
          </TitleButton>
          <TitleButton
            label="Maximize"
            className="max-md:hidden"
            onClick={() => dispatch({ type: "TOGGLE_MAX", id: win.id })}
          >
            □
          </TitleButton>
          <TitleButton
            label="Close"
            onClick={() => dispatch({ type: "CLOSE", id: win.id })}
          >
            ×
          </TitleButton>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>

      {/* Resize handle */}
      {!win.maximized && (
        <div
          className="absolute -right-1 -bottom-1 h-5 w-5 cursor-nwse-resize touch-none max-md:hidden"
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          aria-hidden
        >
          <div className="absolute right-1.5 bottom-1.5 h-2.5 w-2.5 border-r-2 border-b-2 border-ink" />
        </div>
      )}
    </div>
  );
}

function TitleButton({
  children,
  label,
  onClick,
  className = "",
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-6 w-6 items-center justify-center border-2 border-ink bg-paper font-mono text-sm leading-none font-bold text-ink hover:bg-yellow focus-visible:outline-2 focus-visible:outline-paper ${className}`}
    >
      {children}
    </button>
  );
}
