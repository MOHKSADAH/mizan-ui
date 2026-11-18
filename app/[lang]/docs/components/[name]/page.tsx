import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import { uiItems } from '@/registry/manifest';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';
import { i18n } from '@/lib/i18n';
import { componentTitle } from '@/lib/nav';
import { SITE, type Lang } from '@/lib/strings';
import { PageHeader } from '@/components/page-header';
import { InstallTabs, PreviewTabs } from '@/components/docs/preview-tabs';

type ExampleModule = { doc: ExampleDoc } & Record<string, React.ComponentType<ExampleProps>>;

async function load(name: string) {
  const item = uiItems.find((i) => i.name === name);
  if (!item) return null;
  try {
    const mod = (await import(`@/registry/examples/${name}`)) as ExampleModule;
    const dir = path.join(process.cwd(), 'registry/examples');
    const source = await readFile(path.join(dir, `${name}.tsx`), 'utf8');
    const client = await readFile(path.join(dir, `${name}.client.tsx`), 'utf8').catch(() => '');
    return { item, mod, source, client };
  } catch {
    return null;
  }
}

// Code tab: the imports, the top-level helpers the example uses, and the example function itself.
function exampleSource(source: string, fn: string, client: string, name: string) {
  const starts = [...source.matchAll(/^(?:export )?(?:const|function|type) (\w+)/gm)].map((m) => ({
    name: m[1],
    at: m.index,
    exported: m[0].startsWith('export'),
  }));
  const chunk = (i: number) => source.slice(starts[i].at, starts[i + 1]?.at).trim();
  const own = starts.findIndex((s) => s.name === fn);
  if (own < 0) return source;
  const body = chunk(own);
  const helpers = starts.flatMap((s, i) => (!s.exported && new RegExp(`\\b${s.name}\\b`).test(body) ? [chunk(i)] : []));
  const imports = source
    .split('\n')
    .filter((l) => l.startsWith('import ') && !l.includes('@/registry/examples/types'))
    .join('\n');
  const code = [imports, ...helpers, body].join('\n\n').replace(/: ExampleProps/g, ": { lang: 'en' | 'ar' }");
  // Hooks live in <name>.client.tsx: show that file too when the example imports from it.
  return client && imports.includes('.client') ? `${code}\n\n// ${name}.client.tsx\n\n${client.trim()}` : code;
}

export default async function Page(props: PageProps<'/[lang]/docs/components/[name]'>) {
  const { lang: l, name } = await props.params;
  const lang = l as Lang;
  const t = SITE[lang];
  const loaded = await load(name);
  if (!loaded) notFound();
  const { item, mod, source, client } = loaded;
  const { doc } = mod;
  const examples = Object.entries(doc.examples).filter(([fn]) => typeof mod[fn] === 'function');

  return (
    <article className="mx-auto grid max-w-4xl min-w-0 grid-cols-1 gap-10">
      <PageHeader title={item.title ?? componentTitle(name)} description={doc.description[lang]} />
      {examples.map(([fn, title], i) => {
        const Example = mod[fn];
        return (
          <section key={fn} className="grid min-w-0 gap-3" aria-labelledby={`ex-${fn}`}>
            <h2 id={`ex-${fn}`} className="text-xl font-semibold tracking-tight">
              {i === 0 ? t.preview : title[lang]}
            </h2>
            <PreviewTabs
              lang={lang}
              preview={<Example lang={lang} />}
              code={<ServerCodeBlock code={exampleSource(source, fn, client, name)} lang="tsx" codeblock={{ dir: 'ltr' }} />}
            />
            {i === 0 && (
              <div className="grid gap-3 pt-6">
                <h2 className="text-xl font-semibold tracking-tight">{t.installation}</h2>
                <InstallTabs item={`@mizan/${name}`} lang={lang} />
                {doc.usage && (
                  <>
                    <h2 className="pt-6 text-xl font-semibold tracking-tight">{t.usage}</h2>
                    <ServerCodeBlock code={doc.usage} lang="tsx" codeblock={{ dir: 'ltr' }} />
                  </>
                )}
                {examples.length > 1 && <h2 className="pt-6 text-xl font-semibold tracking-tight">{t.examples}</h2>}
              </div>
            )}
          </section>
        );
      })}
      <section className="grid gap-3">
        <h2 className="text-xl font-semibold tracking-tight">{t.accessibility}</h2>
        <ul className="grid list-disc gap-1.5 ps-5 text-muted-foreground">
          {doc.accessibility.map((a) => (
            <li key={a.en}>{a[lang]}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export function generateStaticParams() {
  // Only items with an example file get a page; the rest wait for theirs.
  const documented = uiItems.filter((i) => existsSync(path.join(process.cwd(), 'registry/examples', `${i.name}.tsx`)));
  return i18n.languages.flatMap((lang) => documented.map((i) => ({ lang, name: i.name })));
}

export async function generateMetadata(props: PageProps<'/[lang]/docs/components/[name]'>): Promise<Metadata> {
  const { lang, name } = await props.params;
  const loaded = await load(name);
  if (!loaded) return { title: componentTitle(name) };
  return { title: loaded.item.title ?? componentTitle(name), description: loaded.mod.doc.description[lang as Lang] };
}
