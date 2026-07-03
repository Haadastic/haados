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
      <path d="M1 4h5l1 1.5h8V13H1z" fill="#f08a3c" stroke="#17110a" strokeWidth="1" />
      <rect x="1" y="6.5" width="14" height="1" fill="#17110a" opacity="0.25" />
    </Px>
  );
}

export function IconFile() {
  return (
    <Px>
      <path d="M3 1.5h7l3 3V14.5H3z" fill="#f1e7d3" stroke="#17110a" strokeWidth="1" />
      <path d="M10 1.5v3h3" fill="none" stroke="#17110a" strokeWidth="1" />
      <rect x="5" y="7" width="6" height="1" fill="#f08a3c" />
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
      <path d="M3.5 5.5 6 8l-2.5 2.5" fill="none" stroke="#f08a3c" strokeWidth="1.3" />
      <rect x="7" y="10" width="5" height="1.3" fill="#f08a3c" />
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
