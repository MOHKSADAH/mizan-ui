import { AnnouncementBar, announcementBarLabelsAr } from '@/registry/ui/announcement-bar';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A dismissible strip for a promotion or notice, with an optional link and an optional countdown slot. It stores nothing: remember the dismissal in your own code.',
    ar: 'شريط قابل للإغلاق لعرض أو إشعار، مع رابط اختياري ومكان اختياري لعداد تنازلي. لا يخزن شيئا: احفظ الإغلاق في كودك.',
  },
  usage: `import { AnnouncementBar } from "@/components/ui/announcement-bar"\n\n<AnnouncementBar\n  dismissKey="spring-sale"\n  dismissed={stored}\n  onDismiss={(key) => localStorage.setItem(key, "1")}\n  action={<a href="/sale">Shop now</a>}\n>\n  Free shipping this week\n</AnnouncementBar>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Primary: { en: 'Primary tone with a link and a slot', ar: 'اللون الأساسي مع رابط ومكان إضافي' },
  },
  accessibility: [
    {
      en: 'The bar is a labelled region, not a live alert, so it does not interrupt screen readers on load.',
      ar: 'الشريط منطقة لها تسمية وليس تنبيها حيا، فلا يقاطع قارئات الشاشة عند التحميل.',
    },
    {
      en: 'The dismiss button sits at the inline end and has its own label.',
      ar: 'زر الإغلاق عند نهاية السطر وله تسمية خاصة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <AnnouncementBar labels={ar ? announcementBarLabelsAr : undefined}>
      {ar ? 'شحن مجاني على الطلبات فوق 200 ريال' : 'Free shipping on orders over SAR 200'}
    </AnnouncementBar>
  );
}

export function Primary({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <AnnouncementBar
      tone="primary"
      labels={ar ? announcementBarLabelsAr : undefined}
      action={<a href="#">{ar ? 'تسوق الآن' : 'Shop now'}</a>}
      countdown={<span className="tabular-nums">{ar ? 'ينتهي خلال يومين' : 'Ends in 2 days'}</span>}
    >
      {ar ? 'تخفيضات الموسم' : 'Season sale'}
    </AnnouncementBar>
  );
}
