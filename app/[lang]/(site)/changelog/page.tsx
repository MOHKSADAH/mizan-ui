import type { Metadata } from 'next';
import { Badge } from '@/registry/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/ui/card';
import { formatNumber } from '@/registry/lib/format';
import { SITE, type Lang } from '@/lib/strings';
import { themes } from '@/lib/settings';
import { PageHeader } from '@/components/page-header';

const COPY = {
  en: {
    description: 'What changed in each release.',
    summary: 'First public release.',
    items: (n: string) => [
      'Components: the full shadcn set on Base UI, with right-to-left support and Phosphor icons.',
      `Themes: ${n} themes as installable token files, with light and dark modes.`,
      'Commerce pieces: a price component with the official riyal, dirham and rial signs, VAT summary, coupons, installments, delivery estimates, payment methods and product gallery.',
      'Gulf pieces: Hijri dates, IBAN, Saudi ID, VAT and phone inputs, the Saudi national address form and a ZATCA simplified invoice with QR.',
      'Inputs, display and ASCII packs: file upload, tags, masks, color picker, signature pad, stat card, countdown, marquee, timeline, tree view and more.',
      '59 blocks with English and Arabic labels: navbars, heroes, features, pricing, testimonials, footers, app shells, dashboard, data tables, settings and sign-in screens.',
      'Docs site: component pages with previews and code, blocks, charts, typography, tokens and icons, in English and Arabic.',
    ],
  },
  ar: {
    description: 'ما الذي تغيّر في كل إصدار.',
    summary: 'الإصدار العام الأول.',
    items: (n: string) => [
      'المكوّنات: مجموعة shadcn كاملة على Base UI، مع دعم الاتجاه من اليمين إلى اليسار وأيقونات Phosphor.',
      `الثيمات: ${n} ثيمًا كملفات رموز قابلة للتثبيت، بوضعين فاتح وداكن.`,
      'قطع التجارة: مكوّن سعر بالرموز الرسمية للريال والدرهم والريال العُماني، وملخص الضريبة والقسائم والتقسيط وموعد التوصيل وطرق الدفع ومعرض صور المنتج.',
      'قطع خليجية: التاريخ الهجري، وحقول الآيبان والهوية الوطنية والرقم الضريبي والجوال، ونموذج العنوان الوطني، وفاتورة ضريبية مبسطة برمز QR.',
      'حزم الإدخال والعرض وASCII: رفع الملفات والوسوم والأقنعة ومنتقي الألوان والتوقيع وبطاقة الإحصاء والعد التنازلي والشريط المتحرك والخط الزمني والشجرة وغيرها.',
      '59 قالبًا بتسميات عربية وإنجليزية: أشرطة التنقل والواجهات والمزايا والأسعار والآراء والتذييلات وهياكل التطبيقات ولوحة التحكم والجداول والإعدادات وشاشات الدخول.',
      'موقع التوثيق: صفحات المكوّنات بمعاينة وشيفرة، والقوالب والرسوم البيانية والخطوط والرموز والأيقونات، بالعربية والإنجليزية.',
    ],
  },
};

export default async function Page(props: PageProps<'/[lang]/changelog'>) {
  const lang = (await props.params).lang as Lang;
  const c = COPY[lang];
  const items = c.items(formatNumber(themes.length, { lang }));
  // The count sits in <bdi> so it keeps its order inside Arabic text.
  const withBdi = (s: string) =>
    s.split(/(\d+)/).map((part, i) => (/^\d+$/.test(part) ? <bdi key={i}>{part}</bdi> : part));

  return (
    <div className="grid min-w-0 gap-8">
      <PageHeader title={SITE[lang].pages.changelog} description={c.description} />
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <bdi dir="ltr">v0.1</bdi>
            <Badge variant="secondary">{SITE[lang].newBadge}</Badge>
          </CardTitle>
          <CardDescription>{c.summary}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid list-disc gap-2 ps-5 text-sm">
            {items.map((s) => (
              <li key={s}>{withBdi(s)}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateMetadata(props: PageProps<'/[lang]/changelog'>): Promise<Metadata> {
  const lang = (await props.params).lang as Lang;
  return { title: SITE[lang].pages.changelog, description: COPY[lang].description };
}
