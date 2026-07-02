/* Pixel-art style SVG icons, drawn on a 16x16 grid with crisp edges. */

function Px({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-full w-full"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function IconTxt() {
  return (
    <Px>
      <path d="M3 1h8l2 2v12H3z" fill="#f6f1e3" stroke="#1c1a17" strokeWidth="1" />
      <path d="M11 1v2h2" fill="none" stroke="#1c1a17" strokeWidth="1" />
      <rect x="5" y="6" width="6" height="1" fill="#e8590c" />
      <rect x="5" y="8" width="6" height="1" fill="#1c1a17" />
      <rect x="5" y="10" width="4" height="1" fill="#1c1a17" />
    </Px>
  );
}

export function IconFolder() {
  return (
    <Px>
      <path d="M1 3h5l1 2h8v8H1z" fill="#2464c4" stroke="#1c1a17" strokeWidth="1" />
      <rect x="1" y="6" width="14" height="1" fill="#f6f1e3" opacity="0.5" />
    </Px>
  );
}

export function IconJoystick() {
  return (
    <Px>
      <rect x="2" y="9" width="12" height="5" fill="#2f9e44" stroke="#1c1a17" strokeWidth="1" />
      <rect x="7" y="4" width="2" height="5" fill="#1c1a17" />
      <circle cx="8" cy="3.5" r="2.5" fill="#e03131" stroke="#1c1a17" strokeWidth="1" />
      <rect x="11" y="10.5" width="2" height="2" fill="#f5b41f" stroke="#1c1a17" strokeWidth="0.5" />
    </Px>
  );
}

export function IconTerminal() {
  return (
    <Px>
      <rect x="1" y="2" width="14" height="12" fill="#141210" stroke="#1c1a17" strokeWidth="1" />
      <path d="M3.5 5.5 6 8l-2.5 2.5" fill="none" stroke="#6fdd8b" strokeWidth="1.4" />
      <rect x="7" y="10" width="5" height="1.4" fill="#6fdd8b" />
    </Px>
  );
}

export function IconMail() {
  return (
    <Px>
      <rect x="1" y="3" width="14" height="10" fill="#8f3fb8" stroke="#1c1a17" strokeWidth="1" />
      <path d="M1 3l7 6 7-6" fill="none" stroke="#f6f1e3" strokeWidth="1.2" />
    </Px>
  );
}

export function IconPaper() {
  return (
    <Px>
      <rect x="2" y="2" width="12" height="12" fill="#1c1a17" stroke="#1c1a17" strokeWidth="1" />
      <rect x="4" y="4" width="8" height="8" fill="#f6f1e3" />
      <rect x="5" y="6" width="6" height="1" fill="#e8590c" />
      <rect x="5" y="8" width="6" height="1" fill="#1c1a17" />
      <rect x="5" y="10" width="3" height="1" fill="#1c1a17" />
    </Px>
  );
}

export function IconCart({ color = "#2f9e44" }: { color?: string }) {
  return (
    <Px>
      <path d="M3 2h10v12H3z" fill={color} stroke="#1c1a17" strokeWidth="1" />
      <rect x="5" y="4" width="6" height="4" fill="#f6f1e3" stroke="#1c1a17" strokeWidth="0.5" />
      <rect x="5" y="10" width="6" height="2" fill="#1c1a17" opacity="0.35" />
    </Px>
  );
}
