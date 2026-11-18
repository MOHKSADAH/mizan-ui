import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/ui/card';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/registry/ui/table';
import { Price } from '@/registry/ui/price';
import { formatNumber, minorUnits } from '@/registry/lib/format';
import { SITE, T, type Lang } from '@/lib/strings';
import { PageHeader } from '@/components/page-header';
import { ColorSwatches } from '@/components/foundations/color-swatches';
import { Rich } from '@/components/foundations/rich';
import { ScrollRegion } from '@/components/foundations/scroll-region';

const RADII = { sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg', xl: 'rounded-xl', '2xl': 'rounded-2xl' };
const SHADOWS = {
  '2xs': 'shadow-2xs', xs: 'shadow-xs', sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg', xl: 'shadow-xl', '2xl': 'shadow-2xl',
};
const SPACING = [1, 2, 3, 4, 6, 8, 12];
const CURRENCIES = ['SAR', 'AED', 'KWD', 'QAR', 'BHD', 'OMR', 'EGP', 'USD', 'EUR', 'GBP'];
const AMOUNT = 1234.5;

const COPY = {
  en: { minor: 'Minor units', normal: 'Normal', compact: 'Compact', indic: 'Arabic-Indic', radius: 'Radius', shadow: 'Shadow', spacing: 'Spacing' },
  ar: { minor: 'الخانات العشرية', normal: 'عادي', compact: 'مختصر', indic: 'أرقام هندية', radius: 'الزوايا', shadow: 'الظل', spacing: 'المسافات' },
};

export default async function Page(props: PageProps<'/[lang]/tokens'>) {
  const lang = (await props.params).lang as Lang;
  const t = T[lang];
  const c = COPY[lang];
  const names = new Intl.DisplayNames(lang, { type: 'currency' });
  const [title, desc] = t.sec.tokens;

  return (
    <div className="grid min-w-0 grid-cols-1 gap-8">
      <PageHeader title={title} description={desc} />
      <Card>
        <CardHeader>
          <CardTitle>{t.colors[0]}</CardTitle>
          <CardDescription>{t.colors[1]}</CardDescription>
        </CardHeader>
        <CardContent>
          <ColorSwatches />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t.shape[0]}</CardTitle>
          <CardDescription>
            <Rich text={t.shape[1]} lang={lang} />
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <section aria-labelledby="radius" className="grid min-w-0 gap-3">
            <h2 id="radius" className="text-sm font-medium">{c.radius}</h2>
            <ul className="flex flex-wrap gap-6">
              {Object.entries(RADII).map(([k, cls]) => (
                <li key={k} className="grid gap-2">
                  <div className={`size-16 border bg-muted ${cls}`} aria-hidden="true" />
                  <code dir="ltr" className="font-mono text-xs text-muted-foreground">radius-{k}</code>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="shadow" className="grid min-w-0 gap-3">
            <h2 id="shadow" className="text-sm font-medium">{c.shadow}</h2>
            <ul className="flex flex-wrap gap-6">
              {Object.entries(SHADOWS).map(([k, cls]) => (
                <li key={k} className="grid gap-2">
                  <div className={`size-16 rounded-lg border bg-card ${cls}`} aria-hidden="true" />
                  <code dir="ltr" className="font-mono text-xs text-muted-foreground">shadow-{k}</code>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="spacing" className="grid min-w-0 gap-3">
            <h2 id="spacing" className="text-sm font-medium">{c.spacing}</h2>
            <ul className="grid grid-cols-1 gap-2">
              {SPACING.map((n) => (
                <li key={n} className="flex min-w-0 items-center gap-3">
                  <code dir="ltr" className="w-24 shrink-0 font-mono text-xs text-muted-foreground">spacing-{n}</code>
                  <span className="h-3 max-w-full min-w-0 rounded-sm bg-primary" style={{ width: `calc(var(--spacing) * ${n * 4})` }} aria-hidden="true" />
                </li>
              ))}
            </ul>
          </section>
        </CardContent>
      </Card>
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>{t.money[0]}</CardTitle>
          <CardDescription>{t.money[1]}</CardDescription>
        </CardHeader>
        <CardContent className="min-w-0">
          <ScrollRegion label={t.money[0]}>
            <table className="w-full min-w-xl text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead>{t.moneyCols[0]}</TableHead>
                  <TableHead>{c.minor}</TableHead>
                  <TableHead>{c.normal}</TableHead>
                  <TableHead>{c.compact}</TableHead>
                  <TableHead>{c.indic}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CURRENCIES.map((code) => (
                  <TableRow key={code}>
                    <TableCell>
                      <bdi dir="ltr" className="font-medium">{code}</bdi>
                      <span className="block text-muted-foreground">{names.of(code)}</span>
                    </TableCell>
                    <TableCell className="text-start tabular-nums">{formatNumber(minorUnits(code), { lang })}</TableCell>
                    <TableCell className="text-start"><Price amount={AMOUNT} currency={code} lang={lang} decimals /></TableCell>
                    <TableCell className="text-start"><Price amount={AMOUNT} currency={code} lang={lang} compact /></TableCell>
                    <TableCell className="text-start"><Price amount={AMOUNT} currency={code} lang="ar" digits="arab" decimals /></TableCell>
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

export async function generateMetadata(props: PageProps<'/[lang]/tokens'>): Promise<Metadata> {
  const lang = (await props.params).lang as Lang;
  return { title: SITE[lang].pages.tokens, description: T[lang].sec.tokens[1] };
}
