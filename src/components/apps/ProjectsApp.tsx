"use client";

import { PROJECTS } from "@/lib/data";
import { IconExtern } from "@/components/os/icons";

export function ProjectsApp() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-line-soft px-5 py-2.5">
        <span className="font-mono text-xs text-dim">
          {PROJECTS.length} items
        </span>
        <span className="font-mono text-xs text-faint">sorted by impact</span>
      </div>

      <div className="os-scroll min-h-0 flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROJECTS.map((p) => {
            const Card = (
              <div
                className={`group relative flex h-full flex-col rounded-xl border bg-surface-2/60 p-4 transition-colors ${
                  p.flagship
                    ? "border-accent/40 hover:border-accent/70"
                    : "border-line-soft hover:border-line"
                } ${p.link ? "cursor-pointer" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider ${
                      p.flagship
                        ? "border-accent/50 bg-accent-soft text-accent"
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
                <h3 className="mt-2.5 font-serif text-xl font-medium tracking-tight text-ink">
                  {p.title}
                </h3>
                <div className="mt-0.5 font-mono text-[11px] text-faint">
                  {p.meta}
                </div>
                <p className="mt-2.5 font-mono text-xs leading-relaxed text-dim">
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
                {Card}
              </a>
            ) : (
              <div key={p.slug}>{Card}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
