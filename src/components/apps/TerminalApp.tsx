"use client";

import { useEffect, useRef, useState } from "react";
import { useWM } from "@/components/os/WindowManager";
import { ABOUT_TEXT, CONTACT, PROJECTS, type AppId } from "@/lib/data";

type Line = { text: string; kind?: "in" | "err" | "accent" };

const NEOFETCH = String.raw`
   __  __              __ ____  _____
  / / / /___ _____ ___/ // __ \/ ___/
 / /_/ / __ '/ __ '/ _  // / / /\__ \
/ __  / /_/ / /_/ / /_/ // /_/ /___/ /
/_/ /_/\__,_/\__,_/\__,_/ \____//____/

  guest@haados
  ------------
  os        haadOS v18 (student build)
  host      LGS, Lahore
  uptime    18 years
  shell     a-levels (ongoing)
  editor    vscode -> emacs (in progress)
  lang      learning rust
  flagship  papergenre.com (300+ beta users)
  pet       pick a color in the dock`;

const HELP = `commands:
  help           this
  ls             list files
  projects       list all projects
  open <app>     open a window (projects, about, arcade, terminal, contact)
  cat about.txt  print the about file
  neofetch       system info
  whoami         who am i
  clear          clear screen
  exit           close terminal`;

export function TerminalApp() {
  const { dispatch } = useWM();
  const [lines, setLines] = useState<Line[]>([
    { text: "haadOS terminal — type 'help' to get started.", kind: "accent" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  function print(...texts: (string | Line)[]) {
    setLines((prev) => [
      ...prev,
      ...texts.map((t) => (typeof t === "string" ? { text: t } : t)),
    ]);
  }

  function run(raw: string) {
    const cmd = raw.trim();
    print({ text: `guest@haad:~$ ${cmd}`, kind: "in" });
    if (!cmd) return;
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").toLowerCase();

    switch (name.toLowerCase()) {
      case "help":
        print(HELP);
        break;
      case "ls":
        print("about.txt  projects/  arcade/  contact.card  secrets/ (permission denied)");
        break;
      case "projects":
        print(
          ...PROJECTS.map(
            (p) => `  ${(p.title.toLowerCase() + " ").padEnd(18, "·")} ${p.meta}`
          )
        );
        break;
      case "open": {
        const apps: AppId[] = ["projects", "about", "arcade", "terminal", "contact"];
        const target = apps.find((a) => arg.startsWith(a));
        if (target) {
          dispatch({ type: "OPEN", appId: target });
          print(`opening ${target}...`);
        } else {
          print({ text: `open: unknown app '${arg}'. try: ${apps.join(", ")}`, kind: "err" });
        }
        break;
      }
      case "cat":
        if (arg.includes("about")) print(ABOUT_TEXT);
        else print({ text: `cat: ${arg || "?"}: no such file`, kind: "err" });
        break;
      case "neofetch":
        print({ text: NEOFETCH, kind: "accent" });
        break;
      case "whoami":
        print("haad — 18, a-levels @ LGS, builds things. see about.txt");
        break;
      case "github":
        window.open(CONTACT.github, "_blank");
        print(`opening ${CONTACT.github}...`);
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        dispatch({ type: "CLOSE", id: "terminal" });
        break;
      case "sudo":
        print({ text: "haad is not in the sudoers file. this incident will be reported to his mom.", kind: "err" });
        break;
      case "rm":
        print({ text: "rm: refusing to delete the portfolio you're currently judging", kind: "err" });
        break;
      case "vim":
        print("this is an emacs household now. (:q! to cope)");
        break;
      case "emacs":
        print("connecting with the old uncs... M-x butterfly");
        break;
      case "pet":
        print("pick a color in the dock — each one is a different animal.");
        break;
      default:
        print({ text: `${name}: command not found. try 'help'`, kind: "err" });
    }
  }

  return (
    <div className="flex h-full flex-col bg-bg" onClick={() => inputRef.current?.focus()}>
      <div ref={scrollRef} className="os-scroll min-h-0 flex-1 overflow-y-auto p-3.5">
        {lines.map((l, i) => (
          <pre
            key={i}
            className={`font-mono text-xs leading-[1.65] whitespace-pre-wrap ${
              l.kind === "err"
                ? "text-[#e8825a]"
                : l.kind === "in"
                  ? "text-ink"
                  : l.kind === "accent"
                    ? "text-accent"
                    : "text-dim"
            }`}
          >
            {l.text}
          </pre>
        ))}
      </div>
      <form
        className="flex items-center gap-2 border-t-2 border-line-soft px-3.5 py-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
      >
        <span className="font-mono text-xs text-accent">guest@haad:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-w-0 flex-1 bg-transparent font-mono text-xs text-ink outline-none"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="terminal input"
        />
      </form>
    </div>
  );
}
