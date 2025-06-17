# Project2048 🟫➡️🟩

Monorepo **pnpm-workspaces**  
— `packages/core` : 2048 game logic (TypeScript, 100 % tests)  
— `apps/web`     : client (React + Vite + Tailwind v4)

## Quick Start

```bash
pnpm install
pnpm --filter @project2048/web dev   # localhost:5173
```

## Scripts

| Scripts | Description |
|-------------|-------------|
| `pnpm -r lint` | ESLint + TypeScript rules |
| `pnpm -r test` | Vitest (jsdom) |
| `pnpm --filter @project2048/web build` | production-build |


## CI / CD

- CI — lint → test → build (GitHub Actions)
- Deploy — apps/web/dist → GitHub Pages

