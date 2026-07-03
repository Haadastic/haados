"use client";

import { PROJECTS } from "@/lib/data";
import { IconExtern } from "@/components/os/icons";

export function ProjectsApp() {
  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex items-center gap-3 border-b-2 border-line-soft bg-surface-2 px-4 py-2">
        <span className="font-pixel text-[10px] text-dim">
          {PROJECTS.length} items
        </span>
        <span className="font-mono text-[11px] text-faint">sorted by impact</span>
      </div>

      <div className="os-scroll min-h-0 flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROJECTS.map((p) => {
            const inner = (
              <div
                className={`group flex h-full flex-col border-2 bg-surface-2/50 p-4 transition-colors ${
                  p.flagship
                    ? "border-accent/60 hover:border-accent"
                    : "border-line-soft hover:border-line"
                } ${p.link ? "cursor-pointer" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`border px-1.5 py-0.5 font-pixel text-[8px] tracking-wider ${
                      p.flagship
                        ? "border-accent/60 bg-accent-soft text-accent"
                        : "border-line text-dim"
                    }`}
                  >
                    {p.chip}
                  </span>
                  {p.link && (
                    <span className="h-3.5 w-3.5 text-faint transition-colors group-hover:text-accent">
                      <IconExtern />
                    </span>
                  )}
                </div>
                <h3 className="mt-2.5 font-pixel text-[13px] leading-tight text-ink">
                  {p.title}
                </h3>
                <div className="mt-1.5 font-mono text-[11px] text-faint">
                  {p.meta}
                </div>
                <p className="mt-2 font-mono text-xs leading-relaxed text-dim">
                  {p.description}
                </p>
              </div>
            );
            return p.link ? (
              <a
                key={p.slug}
                href={p.link.url}
                target="_blank"
                rel="noreferrer"
                className="focus-visible:outline-1 focus-visible:outline-accent"
              >
                {inner}
              </a>
            ) : (
              <div key={p.slug}>{inner}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
