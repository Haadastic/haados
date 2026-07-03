# HaadOS — portfolio

Haad's portfolio as a small warm-dark operating system: boot sequence,
draggable windows, a menu bar and dock, a working terminal, an arcade of
Pygame games compiled to WebAssembly, and a pixel pet that follows your cursor.

Built with Next.js + Tailwind CSS. Deployed on Vercel.

## Develop

```
npm install
npm run dev
```

## Structure

- Projects / about / contact copy — `src/lib/data.ts`
- OS shell (windows, menu bar, dock, boot, pet) — `src/components/os/`
- App windows — `src/components/apps/`
- Accent themes + accent→pet mapping — `src/components/os/theme.tsx`

## Games (self-hosted)

The arcade runs Pygame games in the browser via pygbag (Python → WebAssembly).

- Game source lives in `games-src/<slug>/`; built output is copied to
  `public/games/<slug>/`.
- The pygbag runtime is vendored under `public/cdn/` so games load fast and
  don't depend on any external site. Each game's `index.html` is repointed from
  `https://pygame-web.github.io/cdn/` to `/cdn/`.
- To rebuild a game: `python -m pygbag --build games-src/<slug>`, copy
  `build/web/*` into `public/games/<slug>/`, then replace
  `https://pygame-web.github.io/cdn/` with `/cdn/` in its `index.html`.

## Credits

Pixel pets (fox, skeleton, turtle, duck, totoro) are sprites from
[webpets](https://github.com/sankalpaacharya/webpets); see that project's
`public/` asset folders for individual sprite licenses (some are CC BY-ND 4.0).
The cursor-follow behaviour is a re-implementation of the classic oneko.
