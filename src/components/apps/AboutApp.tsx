import { ABOUT_TEXT } from "@/lib/data";

export function AboutApp() {
  return (
    <div className="os-scroll h-full overflow-y-auto bg-paper">
      <div className="border-b-2 border-ink bg-paper-dim px-4 py-1.5 font-mono text-[11px] text-ink-soft">
        C:\Users\haad\about.txt — read-only
      </div>
      <pre className="px-4 py-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap sm:px-6">
        {ABOUT_TEXT}
      </pre>
    </div>
  );
}
