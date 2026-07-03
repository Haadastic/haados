export type AppId =
  | "about"
  | "projects"
  | "arcade"
  | "terminal"
  | "contact";

export type Project = {
  slug: string;
  chip: string;
  title: string;
  meta: string;
  description: string;
  link?: { label: string; url: string };
  flagship?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "papergenre",
    chip: "FLAGSHIP",
    title: "PaperGenre",
    meta: "SaaS · beta · ~300 users",
    description:
      "Ed-tech product I actually care about. Past-paper prep for O/A-level students — built by someone sitting the exams. Live and growing.",
    link: { label: "papergenre.com", url: "https://papergenre.com" },
    flagship: true,
  },
  {
    slug: "discord-bot",
    chip: "COMMUNITY",
    title: "Discord Bot",
    meta: "1000+ users · since 2021",
    description: "Custom-server bot that just kept getting used.",
  },
  {
    slug: "emulators",
    chip: "LOW-LEVEL",
    title: "Emulators",
    meta: "CHIP-8 · Game Boy",
    description:
      "Writing the guts of old machines, one opcode at a time.",
  },
  {
    slug: "pygame-trio",
    chip: "GAMES",
    title: "Pygame Trio",
    meta: "Ninja · Sprout Land · Monsters",
    description:
      "Three full games — playable right now in the arcade, compiled to WebAssembly.",
  },
  {
    slug: "roblox",
    chip: "GAMES",
    title: "Roblox",
    meta: "1.8M+ visits",
    description: "Scripter + indie dev across two shipped games.",
  },
  {
    slug: "qryptec",
    chip: "RESEARCH",
    title: "Qryptec",
    meta: "quantum internship · NUST 5G",
    description: "Quantum cryptography at the NUST 5G Lab.",
  },
  {
    slug: "dataset-builder",
    chip: "TOOLING",
    title: "Dataset Builder",
    meta: "Python · internal",
    description:
      "The machine behind PaperGenre — scraping, extracting and classifying thousands of past-paper questions.",
  },
  {
    slug: "lgs-olympiad",
    chip: "EVENT",
    title: "LGS Olympiad",
    meta: "organizer · 2024",
    description: "Hosted the computer science olympiad at LGS.",
  },
  {
    slug: "stanford-ml",
    chip: "CERT",
    title: "Stanford ML",
    meta: "specialization",
    description:
      "Machine Learning Specialization (Andrew Ng) — the math underneath the magic.",
  },
];

export type Game = {
  slug: string;
  file: string;
  title: string;
  meta: string;
  controls: string;
  playPath?: string;
};

export const GAMES: Game[] = [
  {
    slug: "ninja",
    file: "ninja.py",
    title: "Ninja",
    meta: "Pygame · 2D platformer",
    controls: "arrows to move · up jumps · X dashes",
    playPath: "/games/ninja/index.html",
  },
  {
    slug: "stardew",
    file: "sprout_land.py",
    title: "Sprout Land",
    meta: "Pygame · farming sim",
    controls: "arrows · Q/E switch tools · Space acts · Enter shop",
    playPath: "/games/stardew/index.html",
  },
  {
    slug: "monsters",
    file: "monsters.py",
    title: "Monster Hunter",
    meta: "Pygame · creature battles",
    controls: "WASD/arrows · Space confirms · Enter index",
    playPath: "/games/monsters/index.html",
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
  headline: "Let's build something.",
  sub: "Preferably something hard.",
  email: "papergenre@gmail.com",
  github: "https://github.com/haadastic",
  githubLabel: "github.com/haadastic",
  papergenre: "https://papergenre.com",
  papergenreLabel: "papergenre.com",
};

export const BOOT_LINES = [
  "haadbios v1.8 — (c) 2013-2026 haad systems",
  "cpu: teenage brain @ 4.0GHz (unstable before 10am)",
  "memory test: 640K ok — should be enough for anybody",
  "",
  "booting haadOS ...",
  "  [ ok ] minecraft_autoclicker.jar ..... deprecated (2013)",
  "  [ ok ] roblox_games.rbxl ............. 1.8M visits served",
  "  [ ok ] discord_bot.py ................ 1,000+ users",
  "  [ ok ] chip8, gameboy ................ cycles accurate-ish",
  "  [ ok ] papergenre.exe ................ 300+ beta users",
  "  [ warn ] emacs_config.el ............. learning curve detected",
  "  [ ok ] oneko.gif ..................... one (1) cat attached",
  "",
  "boot complete. welcome.",
];
