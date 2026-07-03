"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/data";
import { IconExtern, IconMail } from "@/components/os/icons";

export function ContactApp() {
  const [copied, setCopied] = useState(false);

  const rows = [
    { key: "email", href: `mailto:${CONTACT.email}`, icon: <IconMail />, label: CONTACT.email, hint: "email" },
    { key: "github", href: CONTACT.github, icon: <IconExtern />, label: CONTACT.githubLabel, hint: "code" },
    { key: "papergenre", href: CONTACT.papergenre, icon: <IconExtern />, label: CONTACT.papergenreLabel, hint: "product" },
  ];

  return (
    <div className="os-scroll h-full overflow-y-auto bg-surface p-6">
      <h2 className="font-pixel text-base leading-snug text-ink">
        {CONTACT.headline}
      </h2>
      <p className="mt-2 font-mono text-xs text-dim">{CONTACT.sub}</p>

      <div className="mt-6 flex flex-col gap-2.5">
        {rows.map((r) => (
          <a
            key={r.key}
            href={r.href}
            target={r.key === "email" ? undefined : "_blank"}
            rel="noreferrer"
            className="group flex items-center gap-3 border-2 border-line-soft bg-surface-2/50 px-4 py-3 transition-colors hover:border-accent btn-soft"
          >
            <span className="h-4 w-4 shrink-0">{r.icon}</span>
            <span className="font-mono text-[13px] text-ink">{r.label}</span>
            <span className="ml-auto font-pixel text-[8px] tracking-wider text-faint uppercase">
              {r.hint}
            </span>
          </a>
        ))}
      </div>

      <button
        onClick={async () => {
          await navigator.clipboard.writeText(CONTACT.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
        className="mt-4 font-mono text-xs text-faint transition-colors hover:text-accent"
      >
        {copied ? "copied ✓" : "copy email to clipboard"}
      </button>
    </div>
  );
}
