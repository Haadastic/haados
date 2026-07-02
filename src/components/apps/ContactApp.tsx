"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/data";

export function ContactApp() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="os-scroll h-full overflow-y-auto bg-paper p-5">
      <p className="font-mono text-sm leading-relaxed">
        Building something difficult? Hiring interns who ship?
        <br />
        Or just want to argue about Emacs? Reach out.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        <a
          href={`mailto:${CONTACT.email}`}
          className="border-2 border-ink bg-purple px-4 py-2.5 font-pixel text-[11px] text-paper shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          ✉ {CONTACT.email}
        </a>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noreferrer"
          className="border-2 border-ink bg-ink px-4 py-2.5 font-pixel text-[11px] text-paper shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          ↗ github.com/haadastic
        </a>
        <a
          href={CONTACT.papergenre}
          target="_blank"
          rel="noreferrer"
          className="border-2 border-ink bg-orange px-4 py-2.5 font-pixel text-[11px] text-paper shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          ↗ papergenre.com
        </a>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(CONTACT.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="border-2 border-ink bg-paper-dim px-4 py-2 text-left font-mono text-xs hover:bg-yellow"
        >
          {copied ? "copied to clipboard ✓" : "copy email address"}
        </button>
      </div>
    </div>
  );
}
