# HaadOS — portfolio

Haad's portfolio as a small retro operating system: boot sequence, draggable
windows, taskbar, working terminal, and an arcade for Pygame games compiled
to WebAssembly.

Built with Next.js + Tailwind CSS. Deployed on Vercel.

## Develop

```
npm install
npm run dev
```

## Content

- Projects / about / contact copy lives in `src/lib/data.ts`
- Games: drop a pygbag build into `public/games/<slug>/` and set `playPath`
  on the matching entry in `GAMES` in `src/lib/data.ts`
