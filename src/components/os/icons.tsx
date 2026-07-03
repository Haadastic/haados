/* Line icons, 24-grid, 1.5px stroke — quiet and precise. */

function I({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function IconFolder() {
  return (
    <I>
      <path d="M3.5 6.5a2 2 0 0 1 2-2h3.6l2 2.5h7.4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
    </I>
  );
}

export function IconFile() {
  return (
    <I>
      <path d="M6.5 3.5h7l4 4v13h-11z" />
      <path d="M13.5 3.5v4h4" />
      <path d="M9 12h6M9 15.5h4.5" />
    </I>
  );
}

export function IconGamepad() {
  return (
    <I>
      <path d="M7 8.5h10a4.5 4.5 0 0 1 4.4 5.4l-.6 3a2.6 2.6 0 0 1-4.6 1l-1.4-1.9H9.2l-1.4 1.9a2.6 2.6 0 0 1-4.6-1l-.6-3A4.5 4.5 0 0 1 7 8.5z" />
      <path d="M8.5 12v3M7 13.5h3" />
      <circle cx="15.4" cy="12.6" r="0.2" />
      <circle cx="17.6" cy="14.4" r="0.2" />
    </I>
  );
}

export function IconTerminal() {
  return (
    <I>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="m7 9.5 3 2.75L7 15" />
      <path d="M12.5 15H17" />
    </I>
  );
}

export function IconMail() {
  return (
    <I>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </I>
  );
}

export function IconExtern() {
  return (
    <I>
      <path d="M9 6h9v9" />
      <path d="M18 6 6 18" />
    </I>
  );
}

export function IconMinimize() {
  return (
    <I>
      <path d="M6 12h12" />
    </I>
  );
}

export function IconClose() {
  return (
    <I>
      <path d="m7 7 10 10M17 7 7 17" />
    </I>
  );
}

export function IconMaximize() {
  return (
    <I>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" />
    </I>
  );
}

export function IconCat() {
  return (
    <I>
      <path d="M5.5 10.5V5l3 2.5h7L18.5 5v5.5a6.5 6.5 0 0 1-13 0z" />
      <path d="M9.5 12h.01M14.5 12h.01" strokeWidth="2" />
      <path d="M10.5 15c.5.6 2.5.6 3 0" />
    </I>
  );
}
