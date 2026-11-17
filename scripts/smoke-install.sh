#!/usr/bin/env bash
# Installs registry items into a fresh Vite app from a local build, then type-checks and builds it.
set -euo pipefail
PORT="${PORT:-4000}"
BASE="http://localhost:$PORT"
ITEMS="${ITEMS:-button price sidebar chart format}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP="$(mktemp -d)/smoke"

cd "$ROOT"
REGISTRY_BASE_URL="$BASE" bun scripts/build-registry.ts
bunx shadcn build
git checkout -- registry.json
PORT="$PORT" bun scripts/serve-registry.ts &
SERVER=$!
trap 'kill $SERVER' EXIT
sleep 1

bunx shadcn init -t vite -b base -p nova --rtl --no-monorepo -y -n smoke -c "$(dirname "$APP")"
cd "$APP"
bunx shadcn add -y --overwrite $(for i in $ITEMS; do printf '%s/r/%s.json ' "$BASE" "$i"; done)
for f in src/components/ui/button.tsx src/components/ui/price.tsx src/components/ui/sidebar.tsx src/components/ui/chart.tsx src/lib/format.ts; do test -f "$f" || { echo "missing $f"; exit 1; }; done
grep -rn "@/registry" src && { echo "unrewritten registry import"; exit 1; } || true
bunx tsc -b
bunx vite build
