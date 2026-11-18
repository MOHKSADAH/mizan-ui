import { CheckCircleIcon, MagnifyingGlassIcon, SpinnerIcon, WarningCircleIcon } from '@phosphor-icons/react/ssr';
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@/registry/ui/trace';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A compact log of the steps an assistant took: a line per step with status, an optional duration and expandable detail.',
    ar: 'سجل مختصر لخطوات نفّذها المساعد: سطر لكل خطوة مع الحالة ومدة اختيارية وتفاصيل قابلة للتوسيع.',
  },
  usage: `import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"

<Trace>
  <TraceLine status="running">
    <TraceIcon><SpinnerIcon /></TraceIcon>
    <TraceTitle>Searching the catalog</TraceTitle>
  </TraceLine>
</Trace>`,
  examples: {
    Default: { en: 'Steps', ar: 'الخطوات' },
    Status: { en: 'Running, pending and error', ar: 'جارٍ ومعلّق وخطأ' },
    Collapsible: { en: 'Expandable detail', ar: 'تفاصيل قابلة للتوسيع' },
  },
  accessibility: [
    { en: 'The status is color and motion only: write it in the title, for example "Failed to read the file".', ar: 'الحالة لون وحركة فقط: اكتبها في العنوان، مثل "تعذّرت قراءة الملف".' },
    { en: 'Icons are hidden from screen readers; the title carries the meaning.', ar: 'الأيقونات مخفية عن قارئات الشاشة؛ والعنوان يحمل المعنى.' },
    { en: 'The shimmer on a running title stops when the user prefers reduced motion.', ar: 'يتوقف لمعان عنوان الخطوة الجارية عندما يفضّل المستخدم تقليل الحركة.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <CheckCircleIcon weight="regular" />
        </TraceIcon>
        <TraceTitle>{ar ? 'قراءة الفاتورة' : 'Read the invoice'}</TraceTitle>
        <TraceDescription>
          <bdi>{ar ? '٠٫٤ ث' : '0.4s'}</bdi>
        </TraceDescription>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <CheckCircleIcon weight="regular" />
        </TraceIcon>
        <TraceTitle>{ar ? 'مطابقة المبالغ' : 'Matched the totals'}</TraceTitle>
        <TraceDescription>
          <bdi>{ar ? '١٫٢ ث' : '1.2s'}</bdi>
        </TraceDescription>
      </TraceLine>
    </Trace>
  );
}

export function Status({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Trace className="max-w-sm">
      <TraceLine status="running">
        <TraceIcon>
          <SpinnerIcon className="animate-spin motion-reduce:animate-none" />
        </TraceIcon>
        <TraceTitle>{ar ? 'البحث في الكتالوج' : 'Searching the catalog'}</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <MagnifyingGlassIcon weight="regular" />
        </TraceIcon>
        <TraceTitle>{ar ? 'ترتيب النتائج' : 'Ranking the results'}</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <WarningCircleIcon weight="regular" />
        </TraceIcon>
        <TraceTitle>{ar ? 'تعذّرت قراءة الملف' : 'Failed to read the file'}</TraceTitle>
      </TraceLine>
    </Trace>
  );
}

export function Collapsible({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Trace className="max-w-sm">
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <CheckCircleIcon weight="regular" />
            </TraceIcon>
            <TraceTitle>{ar ? 'تحليل المصروفات' : 'Analyzed the expenses'}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          {ar ? 'تم فحص ' : 'Checked '}
          <bdi>48</bdi>
          {ar ? ' معاملة، ووُجدت ' : ' transactions and found '}
          <bdi>2</bdi>
          {ar ? ' مكررة.' : ' duplicates.'}
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  );
}
