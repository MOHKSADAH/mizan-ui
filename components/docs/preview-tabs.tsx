'use client';

import * as React from 'react';
import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs';
import { Button } from '@/registry/ui/button';
import { cn } from '@/registry/lib/utils';
import { SITE, type Lang } from '@/lib/strings';

export function PreviewTabs({
  lang,
  preview,
  code,
  className,
}: {
  lang: Lang;
  preview: React.ReactNode;
  code: React.ReactNode;
  className?: string;
}) {
  const t = SITE[lang];
  return (
    <Tabs defaultValue="preview" className={cn('min-w-0 gap-3', className)}>
      <TabsList variant="line">
        <TabsTrigger value="preview">{t.preview}</TabsTrigger>
        <TabsTrigger value="code">{t.code}</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="flex min-h-56 items-center justify-center overflow-x-auto rounded-xl border bg-background p-6 sm:p-10">
          {preview}
        </div>
      </TabsContent>
      <TabsContent value="code" className="min-w-0 [&_figure]:my-0">
        {code}
      </TabsContent>
    </Tabs>
  );
}

const MANAGERS = [
  ['bun', 'bunx --bun shadcn@latest add'],
  ['pnpm', 'pnpm dlx shadcn@latest add'],
  ['npm', 'npx shadcn@latest add'],
] as const;

export function CopyButton({ value, lang, className }: { value: string; lang: Lang; className?: string }) {
  const t = SITE[lang];
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={className}
      aria-label={copied ? t.copied : t.copy}
      onClick={() => navigator.clipboard.writeText(value).then(() => setCopied(true), () => {})}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}

// bun / pnpm / npm tabs. The command never clips: it scrolls inside its own box.
export function InstallTabs({ item, lang }: { item: string; lang: Lang }) {
  return (
    <Tabs defaultValue="bun" className="gap-0 overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between border-b bg-muted/50 pe-1">
        <TabsList variant="line" className="h-9 px-2">
          {MANAGERS.map(([m]) => (
            <TabsTrigger key={m} value={m} className="font-mono text-xs">
              {m}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {MANAGERS.map(([m, cmd]) => {
        const full = `${cmd} ${item}`;
        return (
          <TabsContent key={m} value={m} className="flex items-center gap-2 px-3 py-2">
            <code dir="ltr" className="min-w-0 flex-1 overflow-x-auto py-1 font-mono text-sm whitespace-nowrap [scrollbar-width:thin]">
              {full}
            </code>
            <CopyButton value={full} lang={lang} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
