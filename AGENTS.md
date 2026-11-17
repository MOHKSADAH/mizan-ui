# Mizan UI

Mizan UI (ميزان) is a public shadcn registry plus its docs site. It holds every UI piece reused across projects: customized shadcn components, extra primitives, and commerce, marketing and app blocks. Every item works in Arabic (RTL) and English (LTR) and installs with the shadcn CLI into Next.js, Vite, TanStack Start, React Router and Laravel (Inertia + React).

## Stack

- Next.js 16, React 19, Tailwind CSS v4, TypeScript strict
- Fumadocs (Base UI build of `fumadocs-ui`) + Fumadocs MDX for the docs
- shadcn `base-nova` style, Base UI primitives (`@base-ui/react`), `rtl: true`
- Phosphor icons (`@phosphor-icons/react`)
- Bun: package manager, script runner and test runner (`bun test`)

## Folder map

```text
registry.json        shadcn registry root, input of `shadcn build`
registry/
  base/              registry:base item (components.json config, tokens, font)
  themes/            one CSS file per theme, each a registry:theme item
  ui/                forked shadcn items and extended primitives
  blocks/            commerce, marketing and app blocks
  icons-3d/          curated CC0 3D icon set + Icon3D
  lib/  hooks/       shared helpers (utils.ts holds cn)
app/[lang]/          docs routes (en default, ar falls back to en content)
app/api/search/      docs search route
content/docs/en/     docs pages (MDX)
lib/                 docs-site code (i18n, source, layout options)
components/          docs-site components
scripts/             repo checks (physical-class guard)
public/r/            registry build output, gitignored
```

## Commands

```bash
bun install
bun run dev             # docs site
bun run build           # shadcn build to public/r, registry validate, next build
bun run registry:build  # registry only
bun run lint
bun run typecheck
bun test
bun run check:physical
```

## New-item checklist

- kebab-case name, with an entry in `registry.json` (category set)
- source files in `registry/`
- docs page with a preview, a variant grid and Arabic labels
- a kitchen-sink entry
- no physical classes
- `rtl:rotate-180` on directional icons
- `/ssr` icons in server components
- checked in every theme (kitchen sink with the theme switcher)
- one Conventional Commit

## New-theme checklist

- one file in `registry/themes/`
- every required token set for light and dark (the contract check enforces this)
- an entry in `registry.json`
- a `/themes` gallery entry
- axe contrast green

## Updates and versions

- `@mizan/x` (from the docs domain) always gives the latest version. `MOHKSADAH/mizan-ui/x#v1.2.0` gives a pinned version. Real projects use the pinned form.
- A pin does not carry over to dependencies, so every Mizan `registryDependencies` entry inside the registry uses a full address. The release script stamps the tag into them.
- Use upstream shadcn items through `registryDependencies`. Fork a shadcn component into `registry/ui/` only when tokens cannot produce the design. A fork keeps the upstream name.
- In consuming projects, never edit Mizan-installed files in place. Change tokens, or wrap the component in your own file.
- Upgrade on a branch with `npx shadcn add <item>#vNEW --overwrite`, then review the `git diff`.
- Releases are tags `v0.x`, each with a `CHANGELOG.md` entry.

## i18n rules

- Primitives contain no text.
- Blocks take a typed `labels?: Partial<Labels>` prop merged with English defaults, and export an Arabic object next to the block: `<name>LabelsAr` (for example `productCardLabelsAr`). A label with a count is a function `(n) => string` built on `Intl.PluralRules`.
- Logical classes only (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`, `rounded-s`, `border-s`, ...). `bun run check:physical` fails on physical ones. A line may opt out with a `mizan-allow-physical` comment.
- Directional icons we add get `rtl:rotate-180`. shadcn's own components flip theirs already.
- Server Components import icons from `@phosphor-icons/react/ssr` and pass `weight` on each icon. `IconContext` works only in client trees.
- Numbers, prices and IDs inside Arabic text go in `<bdi>` or `dir="ltr"`.

## Commits

- Conventional Commits, subject line only, under 100 characters, no body.
- No `Co-Authored-By` trailer.
- One commit per slice, each green on its own.

## Fumadocs references

The Fumadocs APIs may differ from your training data. Check the docs:

- Writing pages: <https://fumadocs.dev/docs/next/markdown.md>
- Page conventions: <https://fumadocs.dev/docs/next/page-conventions.md>
- Theme and colors: <https://fumadocs.dev/docs/ui/theme.md>
- Full index: <https://fumadocs.dev/llms.txt>
