"use client";

import { useEffect, useRef, useState } from "react";
import { useWM } from "@/components/os/WindowManager";
import { ABOUT_TEXT, CONTACT, PROJECTS, type AppId } from "@/lib/data";

type Line = { text: string; kind?: "in" | "err" };

const NEOFETCH = String.raw`
  ██   ██  █████   █████  ██████
  ██   ██ ██   ██ ██   ██ ██   ██
  ███████ ███████ ███████ ██   ██
  ██   ██ ██   ██ ██   ██ ██   ██
  ██   ██ ██   ██ ██   ██ ██████

  haad@haados
  -----------
  OS:       HaadOS v18.0 (student build)
  Host:     LGS, Lahore
  Uptime:   18 years
  Shell:    a-levels (ongoing)
  Editor:   vscode -> emacs (in progress)
  Lang:     learning rust
  Flagship: papergenre.com (300+ beta users)`;

const HELP = `commands:
  help          this
  ls            list apps & files
  projects      list all projects
  open <app>    open a window (about, projects, arcade, terminal, contact)
  cat about.txt print the about file
  neofetch      system info
  whoami        who am i
  clear         clear screen
  exit          close terminal`;

export function TerminalApp() {
  const { dispatch } = useWM();
  const [lines, setLines] = useState<Line[]>([
    { text: "HaadOS terminal — type 'help' to get started." },
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
    print({ text: `haad@haados:~$ ${cmd}`, kind: "in" });
    if (!cmd) return;
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").toLowerCase();

    switch (name.toLowerCase()) {
      case "help":
        print(HELP);
        break;
      case "ls":
        print(
          "about.txt  projects/  arcade/  contact.txt  terminal  secrets/ (permission denied)"
        );
        break;
      case "projects":
        print(
          ...PROJECTS.map(
            (p) =>
              `  ${p.filename.padEnd(24)} ${p.title}${p.stat ? ` — ${p.stat}` : ""}`
          )
        );
        break;
      case "open": {
        const apps: AppId[] = ["about", "projects", "arcade", "terminal", "contact"];
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
        print(NEOFETCH);
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
      case "vercel":
        print("already deployed here, nice try");
        break;
      default:
        print({ text: `${name}: command not found. try 'help'`, kind: "err" });
    }
  }

  return (
    <div
      className="flex h-full flex-col bg-term-bg"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="os-scroll min-h-0 flex-1 overflow-y-auto p-3"
      >
        {lines.map((l, i) => (
          <pre
            key={i}
            className={`font-term text-base leading-snug whitespace-pre-wrap ${
              l.kind === "err"
                ? "text-red"
                : l.kind === "in"
                  ? "text-term-green"
                  : "text-term-dim"
            }`}
          >
            {l.text}
          </pre>
        ))}
      </div>
      <form
        className="flex items-center gap-2 border-t border-ink-soft px-3 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
      >
        <span className="font-term text-base text-term-green">
          haad@haados:~$
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-w-0 flex-1 bg-transparent font-term text-base text-term-green outline-none"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="terminal input"
        />
      </form>
    </div>
  );
}
