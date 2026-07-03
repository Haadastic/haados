import { ABOUT_TEXT } from "@/lib/data";

export function AboutApp() {
  return (
    <div className="os-scroll h-full overflow-y-auto bg-surface">
      <div className="border-b-2 border-line-soft bg-surface-2 px-4 py-1.5 font-mono text-[11px] text-faint">
        C:\Users\haad\about.txt — read-only
      </div>
      <pre className="px-5 py-5 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-ink sm:px-6">
        {ABOUT_TEXT}
      </pre>
    </div>
  );
}
