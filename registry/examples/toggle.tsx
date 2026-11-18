import { HeartIcon, TextBIcon, TextItalicIcon } from '@phosphor-icons/react/ssr';
import { Toggle } from '@/registry/ui/toggle';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A two-state button that stays pressed. Built on Base UI Toggle.',
    ar: 'زر بحالتين يبقى مضغوطًا. مبني على Toggle من Base UI.',
  },
  usage: `import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Toggle bold">
  <TextBIcon />
</Toggle>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Outline: { en: 'Outline', ar: 'بإطار' },
    WithText: { en: 'With text', ar: 'مع نص' },
    Sizes: { en: 'Sizes and disabled', ar: 'المقاسات ومعطّل' },
  },
  accessibility: [
    { en: 'The toggle sets aria-pressed. Enter and Space switch it.', ar: 'يضبط الزر aria-pressed. يبدّله Enter وSpace.' },
    { en: 'Icon-only toggles need an aria-label.', ar: 'الأزرار التي تحتوي أيقونة فقط تحتاج aria-label.' },
    { en: 'The pressed state shows with a background, not only an icon color.', ar: 'تظهر حالة الضغط بخلفية وليس بلون الأيقونة فقط.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <Toggle aria-label={lang === 'ar' ? 'تبديل الخط الغليظ' : 'Toggle bold'}>
      <TextBIcon weight="regular" />
    </Toggle>
  );
}

export function Outline({ lang }: ExampleProps) {
  return (
    <Toggle variant="outline" aria-label={lang === 'ar' ? 'تبديل الخط المائل' : 'Toggle italic'}>
      <TextItalicIcon weight="regular" />
    </Toggle>
  );
}

export function WithText({ lang }: ExampleProps) {
  return (
    <Toggle variant="outline" defaultPressed>
      <HeartIcon weight="regular" data-icon="inline-start" />
      {lang === 'ar' ? 'إعجاب' : 'Like'}
    </Toggle>
  );
}

export function Sizes({ lang }: ExampleProps) {
  const label = lang === 'ar' ? 'خط غليظ' : 'Bold';
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" size="sm" aria-label={label}>
        <TextBIcon weight="regular" />
      </Toggle>
      <Toggle variant="outline" aria-label={label}>
        <TextBIcon weight="regular" />
      </Toggle>
      <Toggle variant="outline" size="lg" aria-label={label}>
        <TextBIcon weight="regular" />
      </Toggle>
      <Toggle variant="outline" disabled aria-label={lang === 'ar' ? `${label}، معطّل` : `${label}, disabled`}>
        <TextBIcon weight="regular" />
      </Toggle>
    </div>
  );
}
