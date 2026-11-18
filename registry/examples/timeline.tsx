import { Timeline, TimelineItem, timelineLabelsAr } from '@/registry/ui/timeline';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'An ordered list of events with a status dot, a date and a description. It runs vertically or horizontally and follows the reading direction.',
    ar: 'قائمة مرتبة بالأحداث مع نقطة حالة وتاريخ ووصف. تعمل عموديا أو أفقيا وتتبع اتجاه القراءة.',
  },
  usage: `import { Timeline, TimelineItem } from "@/components/ui/timeline"\n\n<Timeline>\n  <TimelineItem status="success" date={new Date("2026-11-17")} title="Order placed">Payment received</TimelineItem>\n</Timeline>`,
  examples: {
    Default: { en: 'Vertical', ar: 'عمودي' },
    Horizontal: { en: 'Horizontal', ar: 'أفقي' },
  },
  accessibility: [
    {
      en: 'The list is an ol, so screen readers announce the position. Each item starts with hidden status text, such as "Completed", so the status is not carried by color alone.',
      ar: 'القائمة ol فتعلن قارئات الشاشة الترتيب. ويبدأ كل عنصر بنص حالة مخفي مثل "مكتمل" فلا تعتمد الحالة على اللون وحده.',
    },
    {
      en: 'Dates use the time element and the shared date formatter, so the calendar and digits follow the language.',
      ar: 'تستخدم التواريخ عنصر time ومنسق التاريخ المشترك فيتبع التقويم والأرقام اللغة.',
    },
  ],
};

function events(ar: boolean) {
  return [
    { status: 'success', date: new Date(Date.UTC(2026, 10, 14)), title: ar ? 'تم استلام الطلب' : 'Order placed', text: ar ? 'تم الدفع بنجاح' : 'Payment received' },
    { status: 'success', date: new Date(Date.UTC(2026, 10, 15)), title: ar ? 'تم التجهيز' : 'Packed', text: ar ? 'جاهز للشحن' : 'Ready to ship' },
    { status: 'info', date: new Date(Date.UTC(2026, 10, 16)), title: ar ? 'في الطريق' : 'On the way', text: ar ? 'مع شركة الشحن' : 'With the carrier' },
    { status: 'muted', date: new Date(Date.UTC(2026, 10, 18)), title: ar ? 'التسليم' : 'Delivery', text: undefined },
  ] as const;
}

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Timeline lang={lang} labels={ar ? timelineLabelsAr : undefined}>
      {events(ar).map((e) => (
        <TimelineItem key={e.title} status={e.status} date={e.date} title={e.title}>
          {e.text}
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export function Horizontal({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Timeline orientation="horizontal" lang={lang} labels={ar ? timelineLabelsAr : undefined} className="w-full max-w-3xl">
      {events(ar).map((e) => (
        <TimelineItem key={e.title} status={e.status} date={e.date} title={e.title}>
          {e.text}
        </TimelineItem>
      ))}
    </Timeline>
  );
}
