/* Pixel-grid icons, 16x16, crisp edges — warm and boxy. */

function Px({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 16 16" className="h-full w-full" shapeRendering="crispEdges" aria-hidden>
      {children}
    </svg>
  );
}

export function IconFolder() {
  return (
    <Px>
      <path d="M1 4h5l1 1.5h8V13H1z" fill="var(--accent)" stroke="#17110a" strokeWidth="1" />
      <rect x="1" y="6.5" width="14" height="1" fill="#17110a" opacity="0.25" />
    </Px>
  );
}

export function IconFile() {
  return (
    <Px>
      <path d="M3 1.5h7l3 3V14.5H3z" fill="#f1e7d3" stroke="#17110a" strokeWidth="1" />
      <path d="M10 1.5v3h3" fill="none" stroke="#17110a" strokeWidth="1" />
      <rect x="5" y="7" width="6" height="1" fill="var(--accent)" />
      <rect x="5" y="9.5" width="6" height="1" fill="#17110a" />
      <rect x="5" y="12" width="4" height="1" fill="#17110a" />
    </Px>
  );
}

export function IconGamepad() {
  return (
    <Px>
      <rect x="1.5" y="5.5" width="13" height="7" rx="0" fill="#94c07a" stroke="#17110a" strokeWidth="1" />
      <rect x="3.5" y="8" width="1.2" height="3" fill="#17110a" />
      <rect x="2.5" y="9" width="3.2" height="1.2" fill="#17110a" />
      <rect x="10" y="8.2" width="1.6" height="1.6" fill="#17110a" />
      <rect x="12" y="9.8" width="1.6" height="1.6" fill="#17110a" />
    </Px>
  );
}

export function IconTerminal() {
  return (
    <Px>
      <rect x="1.5" y="2.5" width="13" height="11" fill="#17110a" stroke="#3f3220" strokeWidth="1" />
      <path d="M3.5 5.5 6 8l-2.5 2.5" fill="none" stroke="var(--accent)" strokeWidth="1.3" />
      <rect x="7" y="10" width="5" height="1.3" fill="var(--accent)" />
    </Px>
  );
}

export function IconMail() {
  return (
    <Px>
      <rect x="1.5" y="3.5" width="13" height="9" fill="#e6b643" stroke="#17110a" strokeWidth="1" />
      <path d="M1.5 3.5 8 9l6.5-5.5" fill="none" stroke="#17110a" strokeWidth="1.1" />
    </Px>
  );
}

export function IconExtern() {
  return (
    <Px>
      <path d="M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11.5 4.5 5 11" stroke="currentColor" strokeWidth="1.4" />
    </Px>
  );
}

export function IconPaw() {
  return (
    <Px>
      <circle cx="5" cy="6" r="1.4" fill="currentColor" />
      <circle cx="8" cy="5" r="1.4" fill="currentColor" />
      <circle cx="11" cy="6" r="1.4" fill="currentColor" />
      <path d="M5.5 10c0-1.6 1.1-2.5 2.5-2.5S10.5 8.4 10.5 10 9.4 12.5 8 12.5 5.5 11.6 5.5 10z" fill="currentColor" />
    </Px>
  );
}

export function IconDiscord() {
  return (
    <Px>
      <path
        d="M4 3.6h8l1.6 8.2-2.7 2-1-1.6H6.1l-1 1.6-2.7-2z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <ellipse cx="6.2" cy="8" rx="1" ry="1.3" fill="var(--surface)" />
      <ellipse cx="9.8" cy="8" rx="1" ry="1.3" fill="var(--surface)" />
    </Px>
  );
}

export function IconSun() {
  return (
    <Px>
      <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 1.4v2.1M8 12.5v2.1M1.4 8h2.1M12.5 8h2.1M3.3 3.3l1.5 1.5M11.2 11.2l1.5 1.5M12.7 3.3l-1.5 1.5M4.8 11.2l-1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Px>
  );
}

export function IconMoon() {
  return (
    <Px>
      <path
        d="M13.2 9.6A5.3 5.3 0 0 1 6.4 2.8 5.4 5.4 0 1 0 13.2 9.6z"
        fill="currentColor"
      />
    </Px>
  );
}
