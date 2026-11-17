# Mizan UI

A shadcn registry of Arabic (RTL) and English components, built on Base UI with Phosphor icons. You install each item with the shadcn CLI and own the code.

## Install

Coming in v0.1:

```bash
npx shadcn init MOHKSADAH/mizan-ui/base
```

## Docs

The docs site lives in this repo (`content/docs`). Run it locally with `bun run dev`.

## Development

```bash
bun install
bun run dev             # docs site at http://localhost:3000
bun run build           # registry build to public/r, then next build
bun run lint
bun run typecheck
bun test
bun run check:physical  # fail on physical direction classes in registry/
```

## License

MIT. Third-party asset credits are in `NOTICE`.
