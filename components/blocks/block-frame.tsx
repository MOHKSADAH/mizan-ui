'use client';

import * as React from 'react';
import { DesktopIcon, DeviceMobileIcon, DeviceTabletIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/registry/ui/toggle-group';
import { Button } from '@/registry/ui/button';
import { Skeleton } from '@/registry/ui/skeleton';
import { localePath } from '@/lib/nav';
import { SITE, type Lang } from '@/lib/strings';
import { CopyButton } from '@/components/docs/preview-tabs';

const WIDTHS = { desktop: '100%', tablet: '768px', mobile: '375px' } as const;
type Width = keyof typeof WIDTHS;

const T = {
  en: { desktop: 'Desktop', tablet: 'Tablet', mobile: 'Mobile', width: 'Preview width', lang: 'Block language', open: 'Open in a new tab' },
  ar: { desktop: 'سطح المكتب', tablet: 'جهاز لوحي', mobile: 'جوال', width: 'عرض المعاينة', lang: 'لغة القالب', open: 'فتح في علامة تبويب جديدة' },
};

export function BlockFrame({
  name,
  title,
  lang,
  code,
  height = 560,
}: {
  name: string;
  title: string;
  lang: Lang;
  code: React.ReactNode;
  height?: number;
}) {
  const t = SITE[lang];
  const l = T[lang];
  const [width, setWidth] = React.useState<Width>('desktop');
  const [blockLang, setBlockLang] = React.useState<Lang>(lang);
  const [frameHeight, setFrameHeight] = React.useState(height);
  const [loaded, setLoaded] = React.useState(false);
  const frameRef = React.useRef<HTMLIFrameElement>(null);
  const src = localePath(blockLang, `/blocks/view/${name}`);
  const install = `npx shadcn@latest add @mizan/${name}`;

  React.useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== location.origin || typeof e.data?.mizanBlockHeight !== 'number') return;
      if (!String(e.data.href).endsWith(`/blocks/view/${name}`)) return;
      setFrameHeight(Math.max(240, e.data.mizanBlockHeight));
      setLoaded(true);
    };
    window.addEventListener('message', onMessage);
    frameRef.current?.contentWindow?.postMessage('mizan-measure', location.origin);
    return () => window.removeEventListener('message', onMessage);
  }, [name]);

  return (
    <section aria-labelledby={`block-${name}`} className="grid min-w-0 gap-3">
      <Tabs defaultValue="preview" className="min-w-0 gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id={`block-${name}`} className="text-lg font-semibold tracking-tight">
            {title} <span className="font-mono text-sm font-normal text-muted-foreground" dir="ltr">{name}</span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <TabsList>
              <TabsTrigger value="preview">{t.preview}</TabsTrigger>
              <TabsTrigger value="code">{t.code}</TabsTrigger>
            </TabsList>
            <ToggleGroup
              aria-label={l.width}
              value={[width]}
              onValueChange={(v) => v[0] && setWidth(v[0] as Width)}
              variant="outline"
              size="sm"
              className="hidden md:flex"
            >
              <ToggleGroupItem value="desktop" aria-label={l.desktop}>
                <DesktopIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="tablet" aria-label={l.tablet}>
                <DeviceTabletIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="mobile" aria-label={l.mobile}>
                <DeviceMobileIcon />
              </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
              aria-label={l.lang}
              value={[blockLang]}
              onValueChange={(v) => {
                if (!v[0]) return;
                setLoaded(false);
                setBlockLang(v[0] as Lang);
              }}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="en" lang="en">EN</ToggleGroupItem>
              <ToggleGroupItem value="ar" lang="ar">ع</ToggleGroupItem>
            </ToggleGroup>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label={l.open}
              nativeButton={false}
              render={<a href={src} target="_blank" rel="noreferrer" />}
            >
              <ArrowSquareOutIcon className="rtl:-scale-x-100" />
            </Button>
          </div>
        </div>
        <TabsContent value="preview">
          <div className="relative overflow-hidden rounded-xl border bg-muted/40">
            <div className="mx-auto transition-[max-width] duration-200 ease-out" style={{ maxWidth: WIDTHS[width] }}>
              {!loaded && <Skeleton className="absolute inset-3 rounded-lg" />}
              <iframe
                key={src}
                ref={frameRef}
                src={src}
                title={title}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className="block w-full border-0 bg-background"
                style={{ height: frameHeight }}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code" className="min-w-0 [&_figure]:my-0">
          {code}
        </TabsContent>
      </Tabs>
      <div className="flex min-w-0 items-center gap-2 rounded-lg border px-3 py-1.5">
        <code dir="ltr" className="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap [scrollbar-width:thin]">
          {install}
        </code>
        <CopyButton value={install} lang={lang} />
      </div>
    </section>
  );
}
