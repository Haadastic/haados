"use client";

import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import { IconTxt, IconPaper } from "@/components/os/icons";

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project>(PROJECTS[0]);
  const [mobileDetail, setMobileDetail] = useState(false);

  return (
    <div className="flex h-full bg-paper">
      {/* File list */}
      <div
        className={`os-scroll w-56 shrink-0 overflow-y-auto border-r-2 border-ink bg-paper-dim max-md:w-full max-md:border-r-0 ${
          mobileDetail ? "max-md:hidden" : ""
        }`}
      >
        <div className="sticky top-0 border-b-2 border-ink bg-blue px-3 py-1.5 font-pixel text-[10px] text-paper">
          {PROJECTS.length} items
        </div>
        {PROJECTS.map((p) => (
          <button
            key={p.slug}
            onClick={() => {
              setSelected(p);
              setMobileDetail(true);
            }}
            className={`flex w-full items-center gap-2 px-3 py-2 text-left font-mono text-xs ${
              selected.slug === p.slug
                ? "bg-ink text-paper"
                : "hover:bg-yellow"
            }`}
          >
            <span className="h-4 w-4 shrink-0">
              {p.flagship ? <IconPaper /> : <IconTxt />}
            </span>
            <span className="truncate">{p.filename}</span>
            {p.flagship && (
              <span className="ml-auto shrink-0 font-pixel text-[8px] text-orange">
                ★
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Detail */}
      <div
        className={`os-scroll min-w-0 flex-1 overflow-y-auto ${
          mobileDetail ? "" : "max-md:hidden"
        }`}
      >
        <button
          onClick={() => setMobileDetail(false)}
          className="mb-2 hidden w-full border-b-2 border-ink bg-paper-dim px-4 py-2 text-left font-mono text-xs max-md:block"
        >
          ← back to files
        </button>
        <div className="p-5 sm:p-6">
          <div className="font-mono text-[11px] text-ink-soft">
            {selected.kind} · {selected.year}
          </div>
          <h2 className="mt-1 font-pixel text-lg leading-snug font-bold sm:text-xl">
            {selected.title}
          </h2>

          {selected.stat && (
            <div className="mt-3 inline-block border-2 border-ink bg-yellow px-2.5 py-1 font-pixel text-[10px] shadow-hard-sm">
              {selected.stat}
            </div>
          )}

          <div className="mt-4 space-y-3">
            {selected.description.map((para, i) => (
              <p key={i} className="font-mono text-[13px] leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {selected.tags.map((t) => (
              <span
                key={t}
                className="border border-ink bg-paper-dim px-2 py-0.5 font-mono text-[11px]"
              >
                {t}
              </span>
            ))}
          </div>

          {selected.link ? (
            <a
              href={selected.link.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block border-2 border-ink bg-blue px-4 py-2 font-pixel text-[11px] text-paper shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              ↗ {selected.link.label}
            </a>
          ) : (
            <div className="mt-6 font-mono text-[11px] text-ink-soft">
              link coming soon — ask me about it
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
