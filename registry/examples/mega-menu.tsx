import { MegaMenu, megaMenuLabelsAr } from '@/registry/ui/mega-menu';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A navigation bar whose items open multi-column panels with an optional featured block. Below 768px it becomes an accordion of the same links.',
    ar: 'شريط تنقل تفتح عناصره لوحات متعددة الأعمدة مع كتلة مميزة اختيارية. وتحت 768 بكسل يتحول إلى أكورديون بالروابط نفسها.',
  },
  usage: `import { MegaMenu } from "@/components/ui/mega-menu"\n\n<MegaMenu items={[{ label: "Shop", columns: [{ title: "Men", links: [{ label: "Shirts", href: "/shirts" }] }], featured: <p>New season</p> }, { label: "Sale", href: "/sale" }]} />`,
  examples: { Default: { en: 'Default', ar: 'افتراضي' } },
  accessibility: [
    {
      en: 'Each top item is a disclosure button. Arrow keys move between items, Down or Enter opens a panel, Escape closes it and returns focus to the item. The panel holds links, so it is not a menubar.',
      ar: 'كل عنصر علوي زر كشف. تنقل مفاتيح الأسهم بين العناصر، ويفتح السهم لأسفل أو Enter اللوحة، ويغلقها Escape ويعيد التركيز إلى العنصر. تحتوي اللوحة على روابط لذلك ليست menubar.',
    },
    {
      en: 'Arrow keys follow the reading direction when the page is inside a DirectionProvider, and the panel opens at the inline start.',
      ar: 'تتبع مفاتيح الأسهم اتجاه القراءة عندما تكون الصفحة داخل DirectionProvider، وتفتح اللوحة عند بداية السطر.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const t = (en: string, arabic: string) => (ar ? arabic : en);
  return (
    <MegaMenu
      labels={ar ? megaMenuLabelsAr : undefined}
      items={[
        {
          label: t('Shop', 'المتجر'),
          columns: [
            {
              title: t('Women', 'نسائي'),
              links: [
                { label: t('Abayas', 'عبايات'), href: '#abayas', description: t('New season designs', 'تصاميم الموسم الجديد') },
                { label: t('Dresses', 'فساتين'), href: '#dresses' },
              ],
            },
            {
              title: t('Men', 'رجالي'),
              links: [
                { label: t('Thobes', 'ثياب'), href: '#thobes' },
                { label: t('Shirts', 'قمصان'), href: '#shirts' },
              ],
            },
          ],
          featured: (
            <>
              <p className="font-medium">{t('Summer edit', 'مجموعة الصيف')}</p>
              <p className="text-muted-foreground">{t('Light fabrics for hot days.', 'أقمشة خفيفة للأيام الحارة.')}</p>
            </>
          ),
        },
        { label: t('Gifts', 'هدايا'), columns: [{ links: [{ label: t('Gift cards', 'بطاقات الهدايا'), href: '#cards' }] }] },
        { label: t('Sale', 'التخفيضات'), href: '#sale' },
      ]}
    />
  );
}
