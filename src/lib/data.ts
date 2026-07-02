export type AppId =
  | "about"
  | "projects"
  | "arcade"
  | "terminal"
  | "contact";

export type Project = {
  slug: string;
  filename: string;
  title: string;
  year: string;
  kind: string;
  stat?: string;
  description: string[];
  tags: string[];
  link?: { label: string; url: string };
  flagship?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "papergenre",
    filename: "papergenre.exe",
    title: "PaperGenre",
    year: "2025 — now",
    kind: "SaaS · EdTech",
    stat: "300+ beta users",
    flagship: true,
    description: [
      "An exam-prep platform for O/A-level students: past-paper practice without the tutor tax. Currently in beta with around 300 users and growing.",
      "This is the project I care about most — I'm a student sitting these exams myself, so every feature comes from a real complaint. Ditch the tutor.",
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "Python"],
    link: { label: "papergenre.com", url: "https://papergenre.com" },
  },
  {
    slug: "dataset-builder",
    filename: "dataset_builder.py",
    title: "PaperGenre Dataset Builder",
    year: "2025 — now",
    kind: "Internal tooling",
    description: [
      "The unglamorous machine behind PaperGenre: a UI for scraping, extracting and classifying thousands of past-paper questions into a clean, structured dataset.",
      "Handles PDF extraction, question segmentation and topic classification — the data pipeline that makes the product possible.",
    ],
    tags: ["Python", "Data pipeline", "UI"],
  },
  {
    slug: "gameboy-emulator",
    filename: "gameboy_emu",
    title: "Game Boy Emulator",
    year: "Ongoing",
    kind: "Emulation",
    description: [
      "An emulator for the Nintendo Game Boy: CPU instruction set, memory bus, timers and the picture processing unit, built from the hardware documentation.",
      "Emulation is my favorite rabbit hole — it's the project that pulled me into low-level programming and operating systems.",
    ],
    tags: ["Emulation", "Low-level"],
  },
  {
    slug: "chip8-emulator",
    filename: "chip8_emu",
    title: "CHIP-8 Emulator",
    year: "Ongoing",
    kind: "Emulation",
    description: [
      "The classic first emulator project: a CHIP-8 virtual machine with a full opcode interpreter, display and input handling — the gateway drug that led to the Game Boy emulator.",
    ],
    tags: ["Emulation", "Low-level"],
  },
  {
    slug: "discord-bot",
    filename: "discord_bot.py",
    title: "Discord Server Bot",
    year: "2021",
    kind: "Bot · Community",
    stat: "1,000+ users",
    description: [
      "A custom bot for a community server, deployed in 2021 — moderation, utilities and server-specific features. Over 1,000 users have used it.",
      "One of the first things I shipped that strangers actually relied on.",
    ],
    tags: ["Python", "Discord API"],
  },
  {
    slug: "roblox",
    filename: "roblox_games.rbxl",
    title: "Roblox Games",
    year: "2020 — 2022",
    kind: "Game dev · Lua",
    stat: "1.8M visits contributed",
    description: [
      "Worked as a scripter and indie dev on Roblox, shipping two games and contributing to 1.8 million visits.",
      "This is where I learned that shipping a game and keeping players is a completely different problem from writing code.",
    ],
    tags: ["Lua", "Roblox Studio", "Game design"],
  },
  {
    slug: "lgs-olympiad",
    filename: "lgs_olympiad.md",
    title: "LGS Olympiad",
    year: "2024",
    kind: "Event · Organizing",
    description: [
      "Hosted a computer science olympiad at LGS — organizing problems, logistics and participants for a school-wide competitive programming event.",
    ],
    tags: ["Organizing", "Competitive programming"],
  },
  {
    slug: "qryptec",
    filename: "qryptec_internship.pdf",
    title: "Qryptec — Intern",
    year: "2025",
    kind: "Internship · Quantum cryptography",
    description: [
      "Interned at Qryptec, working on quantum cryptography at the NUST 5G Lab — my first taste of research-grade engineering.",
    ],
    tags: ["Quantum cryptography", "Research"],
  },
  {
    slug: "stanford-ml",
    filename: "stanford_ml.cert",
    title: "Stanford Machine Learning Specialization",
    year: "Certificate",
    kind: "Certification",
    description: [
      "Completed the Stanford Machine Learning Specialization (Andrew Ng) — supervised learning, neural networks, and the math underneath the magic.",
    ],
    tags: ["ML", "Certification"],
  },
];

export type Game = {
  slug: string;
  cartLabel: string;
  title: string;
  blurb: string;
  color: "green" | "orange" | "blue";
  // Path to a pygbag build under /public/games/<slug>/index.html, when available
  playPath?: string;
};

export const GAMES: Game[] = [
  {
    slug: "zelda",
    cartLabel: "HYRULE.PY",
    title: "Zelda-like",
    blurb: "Top-down action adventure built in Pygame — combat, enemies, magic.",
    color: "green",
  },
  {
    slug: "stardew",
    cartLabel: "VALLEY.PY",
    title: "Stardew-like",
    blurb: "Farming sim built in Pygame — tools, crops, day/night cycle.",
    color: "orange",
  },
  {
    slug: "platformer",
    cartLabel: "JUMP.PY",
    title: "Platformer",
    blurb: "Tight-controls 2D platformer built in Pygame.",
    color: "blue",
  },
];

export const ABOUT_TEXT = `Hi, I'm Haad.

18 years old, doing my A-levels at LGS, Lahore.

I've been writing code since I was 13. It started the way it
should: Minecraft autoclickers and small cheats, because that
was the kind of problem a 13-year-old is properly motivated
to solve. I grew up on Michael Reeves chaos, Primeagen rants
and small indie devs shipping games from their bedrooms, and
just... kept going.

WHAT I'M INTO
  > game dev — shipped Roblox games (1.8M visits contributed),
    built Pygame games you can play in the Arcade
  > emulation — CHIP-8 and Game Boy emulators
  > operating systems & low-level stuff — currently learning
    Rust alongside OS development
  > currently migrating from VSCode to Emacs so I can connect
    with the old uncs

WHAT I'M BUILDING
  PaperGenre — an exam-prep platform for O/A-level students,
  in beta with 300+ users. I'm a student sitting these exams
  myself, so it's built from the inside.

CREDENTIALS, SUCH AS THEY ARE
  > Stanford Machine Learning Specialization
  > Intern @ Qryptec (quantum cryptography, NUST 5G Lab)
  > Hosted the LGS computer science olympiad

I like difficult problems and I learn fast. Everything else
is negotiable.`;

export const CONTACT = {
  email: "papergenre@gmail.com",
  github: "https://github.com/haadastic",
  papergenre: "https://papergenre.com",
};

export const BOOT_LINES = [
  "HaadBIOS v1.8 — (C) 2013-2026 Haad Systems",
  "CPU: Teenage Brain @ 4.0GHz (unstable before 10am)",
  "Memory test: 640K OK — should be enough for anybody",
  "",
  "Booting HaadOS ...",
  "  [ OK ] minecraft_autoclicker.jar ..... deprecated (2013)",
  "  [ OK ] roblox_games.rbxl ............. 1.8M visits served",
  "  [ OK ] discord_bot.py ................ 1,000+ users",
  "  [ OK ] chip8_emu, gameboy_emu ........ cycles accurate-ish",
  "  [ OK ] papergenre.exe ................ 300+ beta users",
  "  [ WARN ] emacs_config.el ............. learning curve detected",
  "  [ OK ] rustup ........................ borrow checker appeased",
  "",
  "Boot complete. Welcome to HaadOS.",
];
