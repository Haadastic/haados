"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { useWM, type Win } from "./WindowManager";

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
      x: Math.min(Math.max(x, -win.w + 96), vw - 96),
      y: Math.min(Math.max(y, 40), vh - 72),
    };
  }

  function onTitleDown(e: PointerEvent<HTMLDivElement>) {
    if (win.maximized) return;
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = { startX: e.clientX, startY: e.clientY, winX: win.x, winY: win.y, on: true };
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
    resize.current = { startX: e.clientX, startY: e.clientY, winW: win.w, winH: win.h, on: true };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onResizeMove(e: PointerEvent<HTMLDivElement>) {
    if (!resize.current.on || !frameRef.current) return;
    const w = Math.max(360, resize.current.winW + e.clientX - resize.current.startX);
    const h = Math.max(240, resize.current.winH + e.clientY - resize.current.startY);
    frameRef.current.style.width = `${w}px`;
    frameRef.current.style.height = `${h}px`;
  }
  function onResizeUp(e: PointerEvent<HTMLDivElement>) {
    if (!resize.current.on) return;
    resize.current.on = false;
    const w = Math.max(360, resize.current.winW + e.clientX - resize.current.startX);
    const h = Math.max(240, resize.current.winH + e.clientY - resize.current.startY);
    dispatch({ type: "MOVE", id: win.id, x: win.x, y: win.y, w, h });
  }

  const maximizedStyle = win.maximized
    ? { left: 8, top: 44, width: "calc(100% - 16px)", height: "calc(100% - 116px)" }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <div
      ref={frameRef}
      role="dialog"
      aria-label={win.title}
      className={`win-enter absolute flex flex-col overflow-hidden border-2 bg-surface max-md:!top-10 max-md:!left-0 max-md:!h-[calc(100%-40px)] max-md:!w-full ${
        focused ? "win-soft border-line" : "win-soft-dim border-line-soft opacity-95"
      } ${win.minimized ? "hidden" : ""}`}
      style={{ ...maximizedStyle, zIndex: win.z }}
      onPointerDown={() => dispatch({ type: "FOCUS", id: win.id })}
    >
      {/* Title bar */}
      <div
        className={`flex h-9 shrink-0 cursor-grab touch-none items-center gap-2 border-b-2 px-2.5 selectable-none active:cursor-grabbing ${
          focused ? "border-line bg-surface-2" : "border-line-soft bg-surface-2/60"
        }`}
        onPointerDown={onTitleDown}
        onPointerMove={onTitleMove}
        onPointerUp={onTitleUp}
        onDoubleClick={() => dispatch({ type: "TOGGLE_MAX", id: win.id })}
      >
        <span className="font-pixel text-[10px] tracking-wide text-dim">
          {win.title}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <TitleButton
            label="Minimize"
            className="bg-line text-ink/70 hover:bg-dim hover:text-bg"
            onClick={() => dispatch({ type: "MINIMIZE", id: win.id })}
          />
          <TitleButton
            label="Maximize"
            className="bg-line text-ink/70 hover:bg-dim hover:text-bg max-md:hidden"
            onClick={() => dispatch({ type: "TOGGLE_MAX", id: win.id })}
          />
          <TitleButton
            label="Close"
            className="bg-accent text-bg hover:brightness-110"
            onClick={() => dispatch({ type: "CLOSE", id: win.id })}
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>

      {!win.maximized && (
        <div
          className="absolute right-0 bottom-0 h-4 w-4 cursor-nwse-resize touch-none max-md:hidden"
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          aria-hidden
        />
      )}
    </div>
  );
}

function TitleButton({
  label,
  onClick,
  className = "",
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`h-4 w-4 border border-bg/30 transition-colors focus-visible:outline-1 focus-visible:outline-accent ${className}`}
    />
  );
}
