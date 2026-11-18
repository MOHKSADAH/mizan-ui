import { CheckCircleIcon, InfoIcon, WarningIcon } from '@phosphor-icons/react/ssr';
import { Badge } from '@/registry/ui/badge';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A small label for status, counts and categories. Six variants; status colors come from theme tokens.',
    ar: 'وسم صغير للحالة والأعداد والتصنيفات. ستة أنواع، وألوان الحالة من رموز الثيم.',
  },
  usage: `import { Badge } from "@/components/ui/badge"

<Badge variant="secondary">New</Badge>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Variants: { en: 'Variants', ar: 'الأنواع' },
    Status: { en: 'Status', ar: 'الحالة' },
    WithIcon: { en: 'With icon and count', ar: 'مع أيقونة وعدد' },
  },
  accessibility: [
    { en: 'Color alone never carries meaning: pair it with text or an icon.', ar: 'اللون وحده لا يحمل المعنى: اقرنه بنص أو أيقونة.' },
    { en: 'Status badges use the success, warning and info tokens, which pass contrast in light and dark.', ar: 'تستخدم شارات الحالة رموز النجاح والتحذير والمعلومة، وهي تجتاز التباين في الفاتح والداكن.' },
    { en: 'Decorative icons inside a badge are hidden from screen readers.', ar: 'الأيقونات الزخرفية داخل الشارة مخفية عن قارئات الشاشة.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <Badge>{lang === 'ar' ? 'جديد' : 'New'}</Badge>;
}

const VARIANTS = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;
const VARIANT_LABELS = {
  en: ['Default', 'Secondary', 'Destructive', 'Outline', 'Ghost', 'Link'],
  ar: ['افتراضي', 'ثانوي', 'تحذيري', 'بإطار', 'شفاف', 'رابط'],
};

export function Variants({ lang }: ExampleProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {VARIANTS.map((v, i) => (
        <Badge key={v} variant={v}>
          {VARIANT_LABELS[lang][i]}
        </Badge>
      ))}
    </div>
  );
}

export function Status({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge className="bg-success text-success-foreground">
        <CheckCircleIcon weight="fill" aria-hidden data-icon="inline-start" />
        {ar ? 'مكتمل' : 'Paid'}
      </Badge>
      <Badge className="bg-warning text-warning-foreground">
        <WarningIcon weight="fill" aria-hidden data-icon="inline-start" />
        {ar ? 'قيد المراجعة' : 'Pending'}
      </Badge>
      <Badge className="bg-info text-info-foreground">
        <InfoIcon weight="fill" aria-hidden data-icon="inline-start" />
        {ar ? 'للعلم' : 'Info'}
      </Badge>
      <Badge variant="destructive">{ar ? 'متأخر' : 'Overdue'}</Badge>
    </div>
  );
}

export function WithIcon({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="secondary">
        <CheckCircleIcon weight="fill" aria-hidden data-icon="inline-start" />
        {ar ? 'موثّق' : 'Verified'}
      </Badge>
      <Badge variant="outline">
        {ar ? 'الإشعارات' : 'Notifications'}
        <bdi className="tabular-nums">12</bdi>
      </Badge>
      <Badge className="size-5 rounded-full px-0 tabular-nums" aria-label={ar ? '٣ رسائل جديدة' : '3 new messages'}>
        <bdi aria-hidden>3</bdi>
      </Badge>
    </div>
  );
}
