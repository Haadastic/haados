"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/data";
import { IconExtern, IconMail, IconDiscord } from "@/components/os/icons";

type Row = {
  key: string;
  icon: React.ReactNode;
  label: string;
  hint: string;
  href?: string;
  copy?: string;
  external?: boolean;
};

export function ContactApp() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function copy(key: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1600);
  }

  const rows: Row[] = [
    {
      key: "email",
      href: `mailto:${CONTACT.email}`,
      icon: <IconMail />,
      label: CONTACT.email,
      hint: "email",
    },
    {
      key: "discord",
      copy: `@${CONTACT.discord}`,
      icon: <IconDiscord />,
      label: `@${CONTACT.discord}`,
      hint: "discord",
    },
    {
      key: "github",
      href: CONTACT.github,
      icon: <IconExtern />,
      label: CONTACT.githubLabel,
      hint: "code",
      external: true,
    },
    {
      key: "papergenre",
      href: CONTACT.papergenre,
      icon: <IconExtern />,
      label: CONTACT.papergenreLabel,
      hint: "product",
      external: true,
    },
  ];

  const rowClass =
    "group flex w-full items-center gap-3 border-2 border-line-soft bg-surface-2/50 px-4 py-3 text-left transition-colors hover:border-accent btn-soft";

  return (
    <div className="os-scroll h-full overflow-y-auto bg-surface p-6">
      <h2 className="font-display text-xl font-bold tracking-tight text-ink">
        {CONTACT.headline}
      </h2>
      <p className="mt-2 font-mono text-xs text-dim">{CONTACT.sub}</p>

      <div className="mt-6 flex flex-col gap-2.5">
        {rows.map((r) => {
          const inner = (
            <>
              <span className="h-4 w-4 shrink-0 text-ink">{r.icon}</span>
              <span className="font-mono text-[13px] text-ink">{r.label}</span>
              <span className="ml-auto font-display text-[9px] font-medium tracking-[0.14em] text-faint uppercase">
                {r.key === copiedKey ? "copied ✓" : r.hint}
              </span>
            </>
          );

          return r.copy ? (
            <button
              key={r.key}
              onClick={() => copy(r.key, r.copy!)}
              className={rowClass}
            >
              {inner}
            </button>
          ) : (
            <a
              key={r.key}
              href={r.href}
              target={r.external ? "_blank" : undefined}
              rel="noreferrer"
              className={rowClass}
            >
              {inner}
            </a>
          );
        })}
      </div>

      <button
        onClick={() => copy("email-btn", CONTACT.email)}
        className="mt-4 font-mono text-xs text-faint transition-colors hover:text-accent"
      >
        {copiedKey === "email-btn" ? "copied ✓" : "copy email to clipboard"}
      </button>
    </div>
  );
}
