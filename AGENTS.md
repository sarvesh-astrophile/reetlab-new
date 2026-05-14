# AGENTS.md

## Quick Start

```bash
bun install           # Bun is the only package manager; lockfile is bun.lock
bun run dev           # Start all apps (Turborepo, persistent process)
bun run dev:web       # Start only web app at http://localhost:3001
bun run check         # Format + lint with Biome (writes fixes in place)
bun run check-types   # TypeScript type-checking across all workspaces
bun run build         # Production build
bun run deploy        # Deploy to Cloudflare via Alchemy
bun run destroy       # Tear down Cloudflare deployment
```

# Context7 MCP Library IDs
Tanstack Start: "/websites/tanstack_start_framework_react"
Tanstack Router: "/websites/tanstack_router"


## Project Structure

```
reetlab-new/
├── AGENTS.md                          # AI agent instructions / project conventions
├── README.md                          # Project README (Better-T-Stack scaffold)
├── .gitignore                         # Git ignore rules
├── biome.json                         # Biome formatter/linter config
├── bts.jsonc                          # Better-T-Stack metadata / reproducible stack command
├── bun.lock                           # Bun lockfile (only package manager)
├── package.json                       # Root workspace package.json (monorepo)
├── tsconfig.json                      # Root TypeScript config (references)
├── turbo.json                         # Turborepo pipeline config
│
├── apps/
│   └── web/                           # TanStack Start fullstack app (React 19, SSR, Cloudflare Workers)
│       ├── .env                       # App environment variables
│       ├── .gitignore                 # App-specific gitignore
│       ├── components.json            # shadcn/ui components config (app blocks)
│       ├── package.json               # App package.json
│       ├── tsconfig.json              # App TypeScript config
│       ├── vite.config.ts             # Vite config (conditional Cloudflare plugin + Tailwind v4)
│       ├── public/
│       │   └── robots.txt             # robots.txt
│       ├── .tanstack/
│       │   └── tmp/                   # TanStack Start temporary/generated files
│       └── src/
│           ├── index.css              # Main CSS entry (Tailwind v4 via @tailwindcss/vite)
│           ├── routeTree.gen.ts       # AUTO-GENERATED route tree (do not edit)
│           ├── router.tsx             # TanStack Router setup
│           ├── components/
│           │   ├── header.tsx         # App header component
│           │   └── loader.tsx         # App loader/spinner component
│           └── routes/
│               ├── __root.tsx         # Root route (layout wrapper)
│               └── index.tsx          # Index/home route
│
└── packages/
    ├── ui/                            # Shared shadcn/ui components (Base UI primitives)
    │   ├── components.json            # shadcn/ui config (aliases, style preset)
    │   ├── package.json               # Package config
    │   ├── tsconfig.json              # TypeScript config
    │   ├── postcss.config.mjs         # PostCSS config (Tailwind v4 processing)
    │   └── src/
    │       ├── hooks/
    │       │   └── .gitkeep           # Placeholder for shared hooks directory
    │       ├── lib/
    │       │   └── utils.ts           # Utility functions (cn, clsx, cva helpers)
    │       ├── styles/
    │       │   └── globals.css        # Global CSS / design tokens (Tailwind v4)
    │       └── components/
    │           ├── button.tsx         # Button primitive (Base UI)
    │           ├── card.tsx           # Card primitive
    │           ├── checkbox.tsx       # Checkbox primitive
    │           ├── dropdown-menu.tsx  # Dropdown menu primitive
    │           ├── input.tsx          # Input primitive
    │           ├── label.tsx          # Label primitive
    │           ├── skeleton.tsx       # Skeleton/loading primitive
    │           └── sonner.tsx         # Sonner (toast) primitive
    │
    ├── env/                           # Typed environment variable validation (@t3-oss/env-core)
    │   ├── env.d.ts                   # Env type declarations (shared types)
    │   ├── package.json               # Package config
    │   ├── tsconfig.json              # TypeScript config
    │   └── src/
    │       ├── server.ts              # Server env (reads Cloudflare bindings)
    │       ├── web.ts                 # Client env (VITE_ prefix)
    │       └── cloudflare-local.ts    # Local Cloudflare shim (dev fallback)
    │
    ├── config/                        # Shared TypeScript config
    │   ├── package.json               # Package config
    │   └── tsconfig.base.json         # Base tsconfig extended by all workspaces
    │
    └── infra/                         # Alchemy deployment configuration
        ├── .env                       # Infra env vars (e.g., CORS_ORIGIN)
        ├── package.json               # Package config
        ├── alchemy.run.ts             # Alchemy deploy config (bindings, app target)
        └── .alchemy/                  # Alchemy runtime output (gitignored)
            ├── logs/
            │   └── reetlab-new-web-sarve.log
            ├── pids/
            │   └── reetlab-new-web-sarve.pid.json
            └── reetlab-new/sarve/
                └── web.json
```

## Architecture

Monorepo: Turborepo + Bun workspaces. Four packages, one app.

| Directory | Purpose |
|---|---|
| `apps/web/` | TanStack Start fullstack app (React 19, SSR, deployed to Cloudflare Workers) |
| `packages/ui/` | Shared shadcn/ui components (Base UI primitives, not Radix) |
| `packages/env/` | Typed env validation via `@t3-oss/env-core` |
| `packages/config/` | Shared `tsconfig.base.json` |
| `packages/infra/` | Alchemy deploy config (`alchemy.run.ts`) |

## Critical Gotchas

- **Never edit `routeTree.gen.ts`** — it is auto-generated by TanStack Router from `src/routes/`. It has `// @ts-nocheck` and is excluded from Biome.
- **Bun only** — `bun.lock` is the lockfile. `npm`/`yarn`/`pnpm` will not work correctly.
- **shadcn uses Base UI** — the headless layer is `@base-ui/react`, not Radix. The style preset is `base-lyra`. Import primitives from `@reetlab-new/ui/components/<name>`.
- **Tailwind v4** — no `tailwind.config.ts` file exists. Configuration is CSS-based via `@tailwindcss/vite` plugin. Do not create a config file or reference Tailwind v3 patterns.
- **Biome, not ESLint** — `bun run check` runs `biome check --write .`. Formatting uses tabs, double quotes, organized imports, sorted Tailwind classes.
- **Alchemy `.alchemy/` dirs** — these are gitignored runtime directories. They must be generated (via `alchemy dev` or deploy flow) before the deploy commands work.
- **Conditional Alchemy plugin** — `apps/web/vite.config.ts` only loads the Alchemy Cloudflare plugin when `.alchemy/local/wrangler.jsonc` exists on disk. If that file is absent, it falls back to a local `cloudflare:workers` shim.
- **No test framework is configured yet** — there is no vitest, jest, or CI workflow. Tests do not exist in this repo.

## Environment Variables

- **Server**: Accessed via `@reetlab-new/env/server` → reads from `cloudflare:workers` module (real Cloudflare bindings in prod, local shim in dev via `packages/env/src/cloudflare-local.ts`).
- **Client**: Accessed via `@reetlab-new/env/web` → uses `VITE_` prefix. Defined in `packages/env/src/web.ts`.
- **Infra**: `packages/infra/alchemy.run.ts` loads `.env` from both the infra package and `apps/web/.env`. Bindings (e.g. `CORS_ORIGIN`) are defined in that file and typed via `env.d.ts`.

## Adding shadcn Components

- Shared primitives (from root): `npx shadcn@latest add <component> -c packages/ui`
- App-specific blocks (from `apps/web`): same command, run from `apps/web` directory

## Biome Config

- Formatter: tabs, double quotes
- Linter: organizes imports, sorts Tailwind classes via `useSortedClasses` (functions: `cn`, `clsx`, `cva`)
- Excluded: `routeTree.gen.ts`, `.next`, `dist`, `.turbo`, `.alchemy`, `.wrangler`, `wrangler.jsonc`, `bts.jsonc`
