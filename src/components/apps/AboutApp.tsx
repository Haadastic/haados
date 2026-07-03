import { ABOUT } from "@/lib/data";

/* Colorful line — the five theme hues, warm to cool. */
const NAME_LINE =
  "linear-gradient(90deg, #f08a3c, #e6b643, #8bc06e, #56b0d6)";

export function AboutApp() {
  return (
    <div className="os-scroll h-full overflow-y-auto bg-surface">
      <div className="flex items-center justify-between border-b-2 border-line-soft bg-surface-2 px-4 py-1.5 font-mono text-[11px] text-faint">
        <span>about</span>
        <span>{ABOUT.location}</span>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        {/* Name hero — first name, colorful line, last name */}
        <div className="flex items-center gap-3 sm:gap-5">
          <h1 className="font-serif text-4xl leading-none font-normal tracking-tight text-ink sm:text-5xl">
            {ABOUT.first}
          </h1>
          <span
            className="h-[3px] flex-1 rounded-full"
            style={{ background: NAME_LINE }}
            aria-hidden
          />
          <h1 className="font-serif text-4xl leading-none font-normal tracking-tight text-ink sm:text-5xl">
            {ABOUT.last}
          </h1>
        </div>
        <p className="mt-3 font-display text-[11px] tracking-[0.18em] text-faint uppercase">
          {ABOUT.role}
        </p>

        {/* Lede */}
        <div className="mt-6 flex flex-col gap-3 font-mono text-[13px] leading-relaxed text-dim">
          <p>{ABOUT.lede}</p>
          <p>{ABOUT.lede2}</p>
        </div>

        {/* Current focus box */}
        <section className="mt-7 border-2 border-line-soft bg-surface-2/50 p-4 sm:p-5">
          <h2 className="font-display text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
            Current focus
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {ABOUT.focus.map((item, i) => (
              <li key={i} className="flex gap-3 font-mono text-[13px] leading-relaxed text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-7 font-mono text-[12px] leading-relaxed text-faint">
          I like difficult problems and I learn fast. Everything else is
          negotiable.
        </p>
      </div>
    </div>
  );
}
