// Run with node (Playwright does not launch under Bun on Windows); needs the dev server up (bun run dev).
// Usage: bun run shots <item...> [--family f] [--themes a,b] [--out dir] [--url u] [--mobile]
import { parseArgs } from 'node:util';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

export const LANGS = ['en', 'ar'];
// The key the theme switcher stores its settings under (lib/settings.ts), read by the pre-paint script.
const STORAGE_KEY = 'mizan-settings';

export function parseShotArgs(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      family: { type: 'string', multiple: true, default: [] },
      themes: { type: 'string', default: 'mizan-base,mizan-noir,tweakcn-modern-minimal' },
      out: { type: 'string', default: '.shots' },
      url: { type: 'string', default: 'http://localhost:3000' },
      mobile: { type: 'boolean', default: false },
    },
  });
  return {
    items: positionals,
    families: values.family,
    themes: values.themes.split(',').filter(Boolean),
    out: values.out,
    url: values.url.replace(/\/$/, ''),
    mobile: values.mobile,
  };
}

export const shotName = (item, theme, lang, mobile = false) => `${item}.${theme}.${lang}${mobile ? '.mobile' : ''}.png`;

// Items come from registry.json. A block opens alone in its docs view route, a component on its docs page.
// A family is every block named <family>-NN.
export function resolveItems(registry, items, families) {
  const blocks = registry.filter((i) => i.type === 'registry:block').map((i) => i.name);
  const inFamily = blocks.filter((name) => families.includes(name.replace(/-\d+[a-z]?$/, '')));
  return [...new Set([...items, ...inFamily])].map((name) => {
    const item = registry.find((i) => i.name === name);
    if (!item) throw new Error(`Unknown item "${name}" (is registry.json up to date? bun run registry:generate)`);
    return { name, path: item.type === 'registry:block' ? `/blocks/view/${name}` : `/docs/components/${name}` };
  });
}

// Arabic lives under /ar.
export const urlOf = (base, path, lang) => `${base}${lang === 'ar' ? '/ar' : ''}${path}`;

// A lazy image that never loads makes img.decode() wait forever, so each wait gives up after `ms`.
// Playwright serializes this function, so it must not use anything outside its own body.
export const DECODE_TIMEOUT_MS = 3000;
export async function settlePage(ms) {
  await document.fonts.ready;
  await Promise.all(
    [...document.images].map((img) => Promise.race([img.decode().catch(() => {}), new Promise((resolve) => setTimeout(resolve, ms))])),
  );
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function contactSheet(names, themes, mobile) {
  const sections = names
    .map(
      (name) =>
        `<h2>${esc(name)}</h2><div class="grid">${themes
          .flatMap((theme) =>
            LANGS.map((lang) => {
              const file = esc(shotName(name, theme, lang, mobile));
              return `<figure><a href="${file}"><img src="${file}" loading="lazy" alt="${file}"></a><figcaption>${esc(theme)} / ${lang}</figcaption></figure>`;
            }),
          )
          .join('')}</div>`,
    )
    .join('');
  return `<!doctype html><meta charset="utf-8"><title>Shots</title><style>body{font:14px system-ui;margin:16px}.grid{display:grid;grid-template-columns:repeat(${LANGS.length},1fr);gap:12px}figure{margin:0}img{width:100%;border:1px solid #888}</style>${sections}`;
}

async function main() {
  const args = parseShotArgs(process.argv.slice(2));
  const registry = JSON.parse(await readFile('registry.json', 'utf8')).items;
  const items = resolveItems(registry, args.items, args.families);
  if (!items.length) throw new Error('Pass at least one item name or --family <name>');
  await mkdir(args.out, { recursive: true });
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    for (const theme of args.themes) {
      const context = await browser.newContext({ viewport: { width: args.mobile ? 390 : 1280, height: 800 }, colorScheme: 'light' });
      await context.addInitScript(([key, value]) => localStorage.setItem(key, value), [STORAGE_KEY, JSON.stringify({ theme })]);
      const page = await context.newPage();
      for (const { name, path } of items) {
        for (const lang of LANGS) {
          const response = await page.goto(urlOf(args.url, path, lang), { waitUntil: 'networkidle' });
          if (!response?.ok()) throw new Error(`${name} (${lang}): HTTP ${response?.status()}`);
          const applied = await page.evaluate(() => document.documentElement.dataset.theme);
          if (applied !== theme) throw new Error(`${name}: theme is "${applied}", expected "${theme}"`);
          await page.evaluate(settlePage, DECODE_TIMEOUT_MS);
          const file = shotName(name, theme, lang, args.mobile);
          await page.screenshot({ path: `${args.out}/${file}`, fullPage: true, animations: 'disabled' });
          console.log(file);
        }
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
  await writeFile(`${args.out}/index.html`, contactSheet(items.map((i) => i.name), args.themes, args.mobile));
  console.log(`${args.out}/index.html`);
}

if (import.meta.main) await main();
