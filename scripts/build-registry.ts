import { manifest, type ManifestItem } from '../registry/manifest';
import { gitConfig } from '../lib/shared';
import themeIndex from '../lib/themes/index.json';
import themeTokens from '../lib/themes/tokens.json';

const PEERS = new Set(['react', 'react-dom']);
const LOCAL = /^@\/registry\/(?:ui|lib|hooks)\/([\w-]+)$/;
// REGISTRY_BASE_URL (for example https://mizan.dev) turns dependencies into full URLs of the built items.
export const address = (name: string, base = process.env.REGISTRY_BASE_URL) =>
  base ? `${base.replace(/\/$/, '')}/r/${name}.json` : `${gitConfig.user}/${gitConfig.repo}/${name}`;
const pkgName = (spec: string) => spec.split('/').slice(0, spec.startsWith('@') ? 2 : 1).join('/');

export function readImports(source: string): string[] {
  return [...source.matchAll(/(?:import|export)[^'"]*?from\s+['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g)].map(
    (m) => m[1] ?? m[2],
  );
}

const title = (name: string) => name.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

export async function toItem(item: ManifestItem, versions: Record<string, string>) {
  const deps = new Set<string>();
  const registryDeps = new Set<string>();
  for (const file of item.files) {
    for (const spec of readImports(await Bun.file(file).text())) {
      const local = spec.match(LOCAL);
      if (local) registryDeps.add(address(local[1]));
      else if (!spec.startsWith('.') && !spec.startsWith('@/') && !PEERS.has(pkgName(spec))) deps.add(pkgName(spec));
    }
  }
  registryDeps.delete(address(item.name));
  const missing = [...deps].filter((d) => !versions[d]);
  if (missing.length) throw new Error(`${item.name}: ${missing.join(', ')} not in package.json`);
  return {
    name: item.name,
    type: item.type,
    title: item.title ?? title(item.name),
    ...(item.description && { description: item.description }),
    ...(deps.size && { dependencies: [...deps].sort().map((d) => `${d}@^${versions[d].replace(/^\^/, '')}`) }),
    ...(registryDeps.size && { registryDependencies: [...registryDeps].sort() }),
    files: item.files.map((path) => ({ path, type: item.type })),
    ...(item.category && { categories: [item.category] }),
  };
}

if (import.meta.main) {
  const pkg = await Bun.file('package.json').json();
  const versions: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies };
  const registry = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'mizan',
    homepage: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    items: [
      ...(await Promise.all(manifest.map((item) => toItem(item, versions)))),
      ...themeIndex.map(({ id, name }) => {
        const { light, dark, radius } = themeTokens[id as keyof typeof themeTokens] as {
          light: Record<string, string>;
          dark: Record<string, string>;
          radius?: string;
        };
        return {
          name: `theme-${id}`,
          type: 'registry:theme',
          title: `${name} theme`,
          cssVars: { light: { ...(radius && { radius }), ...light }, dark },
        };
      }),
    ],
  };
  await Bun.write('registry.json', JSON.stringify(registry, null, 2) + '\n');
  console.log(`registry.json: ${registry.items.length} items`);
}
