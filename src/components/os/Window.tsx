"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { useWM, type Win } from "./WindowManager";
import { IconMinimize, IconClose, IconMaximize } from "./icons";

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
    ? { left: 8, top: 44, width: "calc(100% - 16px)", height: "calc(100% - 120px)" }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <div
      ref={frameRef}
      role="dialog"
      aria-label={win.title}
      className={`win-enter absolute flex flex-col overflow-hidden rounded-xl border bg-surface max-md:!top-10 max-md:!left-0 max-md:!h-[calc(100%-40px)] max-md:!w-full max-md:rounded-none ${
        focused ? "win-shadow border-line" : "win-shadow-dim border-line-soft opacity-90"
      } ${win.minimized ? "hidden" : ""}`}
      style={{ ...maximizedStyle, zIndex: win.z }}
      onPointerDown={() => dispatch({ type: "FOCUS", id: win.id })}
    >
      {/* Title bar */}
      <div
        className="flex h-9 shrink-0 cursor-grab touch-none items-center border-b border-line-soft bg-surface-2 pr-2 pl-3.5 selectable-none active:cursor-grabbing"
        onPointerDown={onTitleDown}
        onPointerMove={onTitleMove}
        onPointerUp={onTitleUp}
        onDoubleClick={() => dispatch({ type: "TOGGLE_MAX", id: win.id })}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${focused ? "bg-accent" : "bg-faint"}`}
        />
        <span className="ml-2.5 font-mono text-xs text-dim">{win.title}</span>
        <div className="ml-auto flex items-center gap-1">
          <TitleButton
            label="Minimize"
            onClick={() => dispatch({ type: "MINIMIZE", id: win.id })}
          >
            <IconMinimize />
          </TitleButton>
          <TitleButton
            label="Maximize"
            className="max-md:hidden"
            onClick={() => dispatch({ type: "TOGGLE_MAX", id: win.id })}
          >
            <IconMaximize />
          </TitleButton>
          <TitleButton
            label="Close"
            danger
            onClick={() => dispatch({ type: "CLOSE", id: win.id })}
          >
            <IconClose />
          </TitleButton>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>

      {/* Resize handle */}
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
  children,
  label,
  onClick,
  danger = false,
  className = "",
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-6 w-6 items-center justify-center rounded-md p-1 text-dim transition-colors focus-visible:outline-1 focus-visible:outline-accent ${
        danger
          ? "hover:bg-[rgba(224,122,95,0.18)] hover:text-[#e07a5f]"
          : "hover:bg-line-soft hover:text-ink"
      } ${className}`}
    >
      {children}
    </button>
  );
}
