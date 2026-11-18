import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/ui/card';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/registry/ui/table';
import { formatNumber } from '@/registry/lib/format';
import { cn } from '@/registry/lib/utils';
import { ROLE_SAMPLES, SITE, T, type Lang } from '@/lib/strings';
import { PageHeader } from '@/components/page-header';
import { FontName } from '@/components/foundations/font-name';
import { MetaSamples } from '@/components/foundations/meta-samples';
import { Rich } from '@/components/foundations/rich';
import { ScrollRegion } from '@/components/foundations/scroll-region';

const SCALE = [
  { token: 'display', size: 32, weight: 600, cls: 'font-heading text-[32px] leading-tight font-semibold', kind: 'h' },
  { token: 'h1', size: 24, weight: 600, cls: 'font-heading text-2xl font-semibold', kind: 'h' },
  { token: 'h2', size: 18, weight: 600, cls: 'font-heading text-lg font-semibold', kind: 'h' },
  { token: 'card-title', size: 16, weight: 600, cls: 'font-heading text-base font-semibold', kind: 'h' },
  { token: 'body-lg', size: 16, weight: 400, cls: 'text-base', kind: 'b' },
  { token: 'body-md', size: 14, weight: 400, cls: 'text-sm', kind: 'b' },
  { token: 'meta', size: 12, weight: 500, cls: 'text-xs font-medium tabular-nums', kind: 'm' },
] as const;

function sample(kind: 'h' | 'b' | 'm', lang: Lang) {
  if (kind === 'm')
    return (
      <>
        <bdi>MZ-20481</bdi> · <bdi>{formatNumber(1284, { lang })}</bdi> · <bdi>{formatNumber(4299, { lang }, { minimumFractionDigits: 2 })}</bdi>
      </>
    );
  if (kind === 'h') return <>{ROLE_SAMPLES[lang].h[2]} <bdi>2026</bdi></>;
  return ROLE_SAMPLES[lang].b[0].split(/[,،]/)[0];
}


export default async function Page(props: PageProps<'/[lang]/typography'>) {
  const lang = (await props.params).lang as Lang;
  const t = T[lang];
  const [title, desc] = t.sec.typography;
  const roles = [
    { name: t.heading, token: '--font-heading', used: t.usedFor.heading, font: 'heading' as const },
    { name: t.body, token: '--font-sans', used: t.usedFor.body, font: 'body' as const },
    { name: t.metaRole, token: '--font-sans + tabular-nums', used: t.usedFor.meta, font: 'body' as const },
  ];
  const samples = [
    <div key="h" className="grid gap-6 md:grid-cols-2">
      {(['en', 'ar'] as const).map((l) => (
        <div key={l} lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'} className="grid content-start gap-2 font-heading">
          <p className="text-[32px] leading-tight font-semibold">{ROLE_SAMPLES[l].h[0]}</p>
          <p className="text-2xl font-semibold">{ROLE_SAMPLES[l].h[1]}</p>
          <p className="text-lg font-semibold">{ROLE_SAMPLES[l].h[2]}</p>
        </div>
      ))}
    </div>,
    <div key="b" className="grid gap-6 md:grid-cols-2">
      {(['en', 'ar'] as const).map((l) => (
        <div key={l} lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'} className="grid content-start gap-2">
          <p className="text-base">{ROLE_SAMPLES[l].b[0]}</p>
          <p className="text-sm text-muted-foreground">
            <Rich text={ROLE_SAMPLES[l].b[1]} lang={l} />
          </p>
        </div>
      ))}
    </div>,
    <div key="m" className="grid gap-6 md:grid-cols-2">
      <MetaSamples lang="en" />
      <MetaSamples lang="ar" />
    </div>,
  ];

  return (
    <div className="grid min-w-0 gap-8">
      <PageHeader title={title} description={desc} />
      <Card>
        <CardContent className="grid gap-8">
          {roles.map((r, i) => (
            <section key={r.token} aria-labelledby={`role-${i}`} className={cn('grid gap-4 md:grid-cols-[14rem_1fr]', i > 0 && 'border-t pt-8')}>
              <div className="grid content-start gap-1">
                <h2 id={`role-${i}`} className="text-base font-semibold">
                  {r.name}
                </h2>
                <code dir="ltr" className="w-fit rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  {r.token}
                </code>
                <FontName role={r.font} />
                <p className="text-sm text-muted-foreground">{r.used}</p>
              </div>
              {samples[i]}
            </section>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t.scaleTitle[0]}</CardTitle>
          <CardDescription>{t.scaleTitle[1]}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollRegion label={t.scaleTitle[0]}>
            <table className="w-full min-w-176 text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead>{t.scaleCols[0]}</TableHead>
                  <TableHead>{t.scaleCols[1]}</TableHead>
                  <TableHead>
                    {t.scaleCols[2]} (<bdi lang="en">English</bdi>)
                  </TableHead>
                  <TableHead>
                    {t.scaleCols[2]} (<bdi lang="ar">العربية</bdi>)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SCALE.map((s) => (
                  <TableRow key={s.token}>
                    <TableCell>
                      <code dir="ltr" className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {s.token}
                      </code>
                    </TableCell>
                    <TableCell dir="ltr" className="text-start whitespace-nowrap text-muted-foreground tabular-nums">
                      {s.size}px / {s.weight}
                    </TableCell>
                    <TableCell lang="en" dir="ltr" className="text-start">
                      <span className={s.cls}>{sample(s.kind, 'en')}</span>
                    </TableCell>
                    <TableCell lang="ar" dir="rtl" className="text-start">
                      <span className={s.cls}>{sample(s.kind, 'ar')}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </table>
          </ScrollRegion>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateMetadata(props: PageProps<'/[lang]/typography'>): Promise<Metadata> {
  const lang = (await props.params).lang as Lang;
  return { title: SITE[lang].pages.typography, description: T[lang].sec.typography[1] };
}
