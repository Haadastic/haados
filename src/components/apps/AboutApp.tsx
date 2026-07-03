import { ABOUT, CONTACT } from "@/lib/data";

export function AboutApp() {
  return (
    <div className="os-scroll h-full overflow-y-auto p-6 sm:p-7">
      <div className="font-mono text-xs text-accent">{ABOUT.prompt}</div>

      <h1 className="mt-4 font-serif text-[26px] leading-[1.2] font-medium tracking-tight text-ink sm:text-[30px]">
        {ABOUT.headline}
      </h1>

      <div className="mt-5 space-y-4">
        {ABOUT.paragraphs.slice(0, 2).map((p, i) => (
          <p key={i} className="font-mono text-[13px] leading-[1.75] text-dim">
            {i === 1 ? (
              <>
                Now it&apos;s game dev, emulation, and operating systems.
                I&apos;m learning Rust and low-level guts while building{" "}
                <a
                  href={CONTACT.papergenre}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                >
                  PaperGenre
                </a>
                , an ed-tech product I actually care about.
              </>
            ) : (
              p
            )}
          </p>
        ))}
        <p className="font-mono text-[13px] leading-[1.75]">
          <span className="text-ink">I like difficult problems and I learn fast.</span>{" "}
          <span className="text-faint">{ABOUT.footer}</span>
        </p>
      </div>

      <div className="mt-7 border-t border-line-soft pt-5">
        <div className="font-mono text-xs text-accent">{"// currently"}</div>
        <ul className="mt-3 space-y-2">
          {ABOUT.currently.map((c) => (
            <li key={c} className="font-mono text-[13px] text-dim">
              <span className="mr-2 text-faint">—</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
