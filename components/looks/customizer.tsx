'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { ArrowCounterClockwiseIcon, CaretDownIcon, CheckIcon, CopyIcon, HeartIcon, WarningIcon } from '@phosphor-icons/react';
import { Button } from '@/registry/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/registry/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/ui/select';
import { Slider } from '@/registry/ui/slider';
import { Textarea } from '@/registry/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/registry/ui/toggle-group';
import { formatNumber } from '@/registry/lib/format';
import { themeById, TUNE_VARS, type IconWeight, type Tune } from '@/lib/settings';
import { CH, SITE, type Lang } from '@/lib/strings';
import { useSettings } from '@/components/settings';
import { ThemeCombobox } from '@/components/theme-combobox';
import { bidi } from '@/components/looks/text';

const FONTS = ['auto', 'geist', 'plex', 'markazi', 'kufi', 'readex', 'tajawal'] as const;
const WEIGHTS = ['auto', 'thin', 'light', 'regular', 'bold', 'fill', 'duotone'] as const;
const CURRENCIES = ['SAR', 'AED', 'KWD', 'QAR', 'BHD', 'OMR', 'EGP', 'USD', 'EUR', 'GBP'];

const RANGES: Record<keyof Tune, { min: number; max: number; step: number }> = {
  radius: { min: 0, max: 1.5, step: 0.125 },
  spacing: { min: 0.2, max: 0.32, step: 0.01 },
  shadowOpacity: { min: 0, max: 1, step: 0.01 },
  shadowBlur: { min: 0, max: 24, step: 1 },
  shadowY: { min: 0, max: 12, step: 1 },
  tracking: { min: -0.03, max: 0.05, step: 0.005 },
};
const TUNE_KEYS = Object.keys(RANGES) as (keyof Tune)[];

type Tokens = Record<string, { light: Record<string, string>; dark: Record<string, string>; radius?: string }>;

const block = (selector: string, decls: [string, string][]) =>
  `${selector} {\n${decls.map(([p, v]) => `  ${p}: ${v};`).join('\n')}\n}`;

// The theme's own CSS (what `shadcn add @mizan/theme-<id>` writes) plus the fine tuning overrides.
function themeCss(tokens: Tokens, id: string, tune: Tune) {
  const t = tokens[id];
  const light = new Map(Object.entries(t.light).map(([k, v]) => [`--${k}`, v]));
  if (t.radius) light.set('--radius', t.radius);
  for (const k of TUNE_KEYS) {
    const v = tune[k];
    if (v !== undefined) light.set(TUNE_VARS[k][0], v + TUNE_VARS[k][1]);
  }
  return `${block(':root', [...light])}\n\n${block('.dark', Object.entries(t.dark).map(([k, v]) => [`--${k}`, v]))}`;
}

// The slider starts at the value the theme gives, read with this page's own overrides removed.
function readDefaults() {
  const root = document.documentElement;
  const saved = TUNE_KEYS.map((k) => root.style.getPropertyValue(TUNE_VARS[k][0]));
  TUNE_KEYS.forEach((k) => root.style.removeProperty(TUNE_VARS[k][0]));
  const css = getComputedStyle(root);
  const out = Object.fromEntries(
    TUNE_KEYS.map((k) => {
      const raw = css.getPropertyValue(TUNE_VARS[k][0]).trim();
      const v = parseFloat(raw);
      return [k, Number.isFinite(v) ? (TUNE_VARS[k][1] === 'rem' && raw.endsWith('px') ? v / 16 : v) : 0];
    }),
  ) as Required<Tune>;
  TUNE_KEYS.forEach((k, i) => saved[i] && root.style.setProperty(TUNE_VARS[k][0], saved[i]));
  return out;
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 min-w-0 content-start gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </div>
  );
}

function Tuning({ lang }: { lang: Lang }) {
  const c = CH[lang];
  const { tune, digits, update } = useSettings();
  const [defaults] = React.useState(readDefaults);
  const label: Record<keyof Tune, string> = {
    radius: c.radius,
    spacing: c.spacing,
    shadowOpacity: c.shadowOpacity,
    shadowBlur: c.shadowBlur,
    shadowY: c.shadowY,
    tracking: c.tracking,
  };
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 pt-4 sm:grid-cols-2 lg:grid-cols-3">
      {TUNE_KEYS.map((k) => {
        const value = tune[k] ?? defaults[k];
        const id = `tune-${k}`;
        return (
          <div key={k} className="grid grid-cols-1 gap-2">
            <div className="flex items-baseline justify-between gap-2">
              <span id={id} className="text-sm">
                {label[k]}
              </span>
              <bdi dir="ltr" className="text-sm text-muted-foreground tabular-nums">
                {formatNumber(value, { lang, digits }, { maximumFractionDigits: 3 })}
                {TUNE_VARS[k][1]}
              </bdi>
            </div>
            <Slider
              {...RANGES[k]}
              aria-labelledby={id}
              value={[value]}
              onValueChange={(v) => {
                const n = Array.isArray(v) ? v[0] : v;
                update({ tune: { ...tune, [k]: Number(n.toFixed(3)) } });
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export function Customizer({ lang }: { lang: Lang }) {
  const c = CH[lang];
  const { theme, font, weight, currency, digits, tune, update, reset, checks } = useSettings();
  const mode = useTheme().resolvedTheme === 'dark' ? 'dark' : 'light';
  const meta = themeById[theme];
  const themeWeight = (meta?.weight ?? 'regular') as IconWeight;
  const command = `npx shadcn@latest add @mizan/theme-${theme}`;

  const tokens = React.useRef<Tokens | null>(null);
  React.useEffect(() => {
    void import('@/lib/themes/tokens.json').then((m) => (tokens.current = m.default as Tokens));
  }, []);

  const [status, setStatus] = React.useState<'copied' | 'failed' | null>(null);
  const [fallback, setFallback] = React.useState('');
  const area = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (status !== 'copied') return;
    const id = setTimeout(() => setStatus(null), 2500);
    return () => clearTimeout(id);
  }, [status]);
  React.useEffect(() => {
    if (!fallback) return;
    area.current?.focus();
    area.current?.select();
  }, [fallback]);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setFallback('');
        setStatus('copied');
      },
      () => {
        setFallback(text);
        setStatus('failed');
      },
    );
  };
  const copyCss = async () => {
    const all = tokens.current ?? ((await import('@/lib/themes/tokens.json')).default as Tokens);
    copy(themeCss(all, theme, tune));
  };

  const fonts = Object.fromEntries(FONTS.map((f) => [f, bidi(c.fonts[f], lang)]));
  const weights = Object.fromEntries(
    WEIGHTS.map((w) => [
      w,
      <span key={w} className="flex items-center gap-2">
        <HeartIcon weight={w === 'auto' ? themeWeight : w} />
        {c.weights[w]}
      </span>,
    ]),
  );
  const currencyNames = React.useMemo(() => new Intl.DisplayNames(lang, { type: 'currency' }), [lang]);

  return (
    <section aria-label={c.h1} className="grid grid-cols-1 gap-5 rounded-xl border p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Control label={c.theme}>
          <ThemeCombobox lang={lang} className="h-8 w-full max-w-none justify-between" />
        </Control>
        <Control label={c.font}>
          <Select items={fonts} value={font} onValueChange={(v) => v && update({ font: v })}>
            <SelectTrigger aria-label={c.font} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {FONTS.map((f) => (
                <SelectItem key={f} value={f}>
                  {fonts[f]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Control>
        <Control label={c.iconStyle}>
          <Select items={weights} value={weight} onValueChange={(v) => v && update({ weight: v as IconWeight })}>
            <SelectTrigger aria-label={c.iconStyle} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {WEIGHTS.map((w) => (
                <SelectItem key={w} value={w}>
                  {weights[w]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Control>
        <Control label={c.currency}>
          <Select value={currency} onValueChange={(v) => v && update({ currency: v })}>
            <SelectTrigger aria-label={c.currency} className="w-full">
              <SelectValue>{(v: string) => <bdi lang="en">{v}</bdi>}</SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {CURRENCIES.map((code) => (
                <SelectItem key={code} value={code}>
                  <bdi lang="en">{code}</bdi>
                  <span className="text-muted-foreground">{currencyNames.of(code)}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Control>
        <Control label={c.numerals}>
          <ToggleGroup
            variant="outline"
            spacing={0}
            aria-label={c.numerals}
            value={[digits]}
            onValueChange={(v) => v[0] && update({ digits: v[0] as 'latn' | 'arab' })}
          >
            {(
              [
                ['latn', c.western],
                ['arab', c.arabicIndic],
              ] as const
            ).map(([v, text]) => (
              <ToggleGroupItem
                key={v}
                value={v}
                lang={v === 'arab' ? 'ar' : 'en'}
                className="aria-pressed:border-field-border aria-pressed:font-semibold"
              >
                {text}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Control>
      </div>

      <Collapsible>
        <CollapsibleTrigger className="group flex items-center gap-2 rounded-md text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <CaretDownIcon className="size-4 -rotate-90 motion-safe:transition-transform group-data-panel-open:rotate-0 rtl:rotate-90 rtl:group-data-panel-open:rotate-0" />
          {c.fine}
          <span className="font-normal text-muted-foreground">{c.fineHint}</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Tuning key={theme + mode} lang={lang} />
        </CollapsibleContent>
      </Collapsible>

      <div className="grid grid-cols-1 gap-3">
        {checks.aaFailures.length > 0 && <Warning>{SITE[lang].failsAA}</Warning>}
        {meta?.group === 'tweakcn' && <Warning>{c.notAA}</Warning>}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={reset}>
            <ArrowCounterClockwiseIcon data-icon="inline-start" />
            {c.reset}
          </Button>
          <Button variant="outline" onClick={copyCss}>
            <CopyIcon data-icon="inline-start" />
            {c.copyCss}
          </Button>
          <div className="flex min-w-0 flex-1 basis-80 items-center gap-2 rounded-lg border ps-3 pe-1">
            <span className="shrink-0 text-sm text-muted-foreground">{c.install}</span>
            <code
              dir="ltr"
              tabIndex={0}
              className="min-w-0 flex-1 overflow-x-auto py-1.5 text-sm whitespace-nowrap [scrollbar-width:thin]"
            >
              {command}
            </code>
            <Button variant="ghost" size="icon-sm" aria-label={c.copyInstall} onClick={() => copy(command)}>
              {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
            </Button>
          </div>
        </div>
        <p role="status" className="text-sm text-muted-foreground empty:hidden">
          {status === 'copied' && c.copied}
          {status === 'failed' && c.copyFail}
        </p>
        {fallback && (
          <Textarea ref={area} readOnly dir="ltr" aria-label={c.copyCss} value={fallback} className="max-h-60 font-mono text-xs" />
        )}
      </div>
    </section>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-sm">
      <WarningIcon weight="fill" className="mt-0.5 size-4 shrink-0 text-warning" />
      <span>{children}</span>
    </p>
  );
}
