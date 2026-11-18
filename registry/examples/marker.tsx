import { ArrowDownIcon, CheckCircleIcon } from '@phosphor-icons/react/ssr';
import { Marker, MarkerContent, MarkerIcon } from '@/registry/ui/marker';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A quiet inline label for timelines and chats: a date divider, a read marker or a system note.',
    ar: 'وسم هادئ ضمن السطر للجداول الزمنية والمحادثات: فاصل تاريخ أو علامة قراءة أو ملاحظة نظام.',
  },
  usage: `import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>`,
  examples: {
    Default: { en: 'Default with icon', ar: 'افتراضي مع أيقونة' },
    Separator: { en: 'Separator', ar: 'فاصل' },
    Border: { en: 'Border', ar: 'بإطار' },
    AsLink: { en: 'As a link', ar: 'كرابط' },
  },
  accessibility: [
    { en: 'The icon is hidden from screen readers: the text carries the meaning.', ar: 'الأيقونة مخفية عن قارئات الشاشة: النص هو الذي يحمل المعنى.' },
    { en: 'Use render={<a />} or a button when the marker is interactive, such as "Jump to new messages".', ar: 'استخدم render={<a />} أو زرًا عندما يكون الوسم تفاعليًا مثل "الانتقال إلى الرسائل الجديدة".' },
    { en: 'The separator lines use logical margins, so the layout is identical in RTL.', ar: 'خطوط الفاصل تستخدم هوامش منطقية، فالتخطيط متطابق في RTL.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <Marker className="max-w-sm">
      <MarkerIcon>
        <CheckCircleIcon weight="regular" />
      </MarkerIcon>
      <MarkerContent>{lang === 'ar' ? 'تمت قراءة الرسائل حتى هنا' : 'Read up to here'}</MarkerContent>
    </Marker>
  );
}

export function Separator({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Marker variant="separator">
        <MarkerContent>{ar ? 'اليوم' : 'Today'}</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>
          {ar ? 'رسائل جديدة' : 'New messages'}
        </MarkerContent>
      </Marker>
    </div>
  );
}

export function Border({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Marker variant="border" className="max-w-sm">
      <MarkerContent>
        {ar ? 'انضمت سارة إلى المحادثة في ' : 'Sara joined the conversation at '}
        <bdi>{ar ? '٩:٤٢ ص' : '9:42 AM'}</bdi>
      </MarkerContent>
    </Marker>
  );
}

export function AsLink({ lang }: ExampleProps) {
  return (
    <Marker render={<a href="#new" />} className="max-w-sm">
      <MarkerIcon>
        <ArrowDownIcon weight="regular" />
      </MarkerIcon>
      <MarkerContent>{lang === 'ar' ? 'الانتقال إلى الرسائل الجديدة' : 'Jump to new messages'}</MarkerContent>
    </Marker>
  );
}
