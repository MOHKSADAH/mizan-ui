import { PlusIcon, TextBIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/registry/ui/button';
import { Kbd } from '@/registry/ui/kbd';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/registry/ui/tooltip';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A short label that appears on hover or keyboard focus to describe an element.',
    ar: 'تسمية قصيرة تظهر عند تمرير المؤشر أو تركيز لوحة المفاتيح لوصف عنصر.',
  },
  usage: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Sides: { en: 'Sides', ar: 'الجوانب' },
    WithKbd: { en: 'Icon button with shortcut', ar: 'زر أيقونة مع اختصار' },
    Disabled: { en: 'Disabled button', ar: 'زر معطّل' },
  },
  accessibility: [
    {
      en: 'Shown on keyboard focus as well as hover, and Escape dismisses it.',
      ar: 'يظهر عند تركيز لوحة المفاتيح كما عند التمرير، ويخفيه Escape.',
    },
    {
      en: 'A tooltip is a hint, not the only name. Icon-only buttons still need an aria-label.',
      ar: 'التلميح إشارة وليس الاسم الوحيد. الأزرار التي تحتوي أيقونة فقط ما زالت تحتاج aria-label.',
    },
    {
      en: 'Use inline-start and inline-end for sides so the tooltip mirrors in Arabic.',
      ar: 'استخدم inline-start وinline-end للجوانب لينعكس التلميح في العربية.',
    },
    {
      en: 'Never put interactive content in a tooltip. Use a popover instead.',
      ar: 'لا تضع محتوى تفاعليًا داخل التلميح. استخدم popover بدلًا منه.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>{ar ? 'مرّر المؤشر' : 'Hover'}</TooltipTrigger>
      <TooltipContent>{ar ? 'أضف إلى المكتبة' : 'Add to library'}</TooltipContent>
    </Tooltip>
  );
}

const SIDES = [
  { side: 'top', en: 'Top', ar: 'أعلى' },
  { side: 'inline-start', en: 'Start', ar: 'البداية' },
  { side: 'inline-end', en: 'End', ar: 'النهاية' },
  { side: 'bottom', en: 'Bottom', ar: 'أسفل' },
] as const;

export function Sides({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SIDES.map((s) => (
        <Tooltip key={s.side}>
          <TooltipTrigger render={<Button variant="outline" />}>{s[lang]}</TooltipTrigger>
          <TooltipContent side={s.side}>{ar ? 'أضف إلى المكتبة' : 'Add to library'}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

export function WithKbd({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <TooltipProvider delay={200}>
      <div className="flex items-center justify-center gap-2">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="icon" aria-label={ar ? 'غامق' : 'Bold'} />}>
            <TextBIcon weight="regular" />
          </TooltipTrigger>
          <TooltipContent>
            {ar ? 'غامق' : 'Bold'}
            <Kbd>
              <bdi>Ctrl B</bdi>
            </Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button size="icon" aria-label={ar ? 'إضافة' : 'Add'} />}>
            <PlusIcon weight="regular" />
          </TooltipTrigger>
          <TooltipContent>{ar ? 'إضافة عنصر' : 'Add item'}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export function Disabled({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Tooltip>
      <TooltipTrigger render={<span tabIndex={0} className="inline-block rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50" />}>
        <Button disabled className="pointer-events-none">
          {ar ? 'نشر' : 'Publish'}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{ar ? 'أكمل الحقول المطلوبة أولًا' : 'Complete the required fields first'}</TooltipContent>
    </Tooltip>
  );
}
