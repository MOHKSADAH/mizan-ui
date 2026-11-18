import { CheckCircleIcon } from '@phosphor-icons/react/ssr';
import { Progress, ProgressLabel, ProgressValue } from '@/registry/ui/progress';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Shows how far a task has come. The bar fills from the inline start, so it grows from the right in Arabic.',
    ar: 'يعرض مدى تقدم مهمة. يمتلئ الشريط من بداية السطر، فينمو من اليمين في العربية.',
  },
  usage: `import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

<Progress value={60}>
  <ProgressLabel>Uploading</ProgressLabel>
  <ProgressValue />
</Progress>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithLabel: { en: 'With label and value', ar: 'مع تسمية وقيمة' },
    Steps: { en: 'Thicker bar and complete state', ar: 'شريط أعرض وحالة مكتملة' },
  },
  accessibility: [
    { en: 'The root has role="progressbar" with aria-valuenow, aria-valuemin and aria-valuemax.', ar: 'للجذر role="progressbar" مع aria-valuenow وaria-valuemin وaria-valuemax.' },
    { en: 'ProgressLabel names the bar. Without a label, set aria-label on the root.', ar: 'يسمّي ProgressLabel الشريط. وبدون تسمية اضبط aria-label على الجذر.' },
    { en: 'Show the value as text too, so the progress never depends on the bar color or length alone.', ar: 'اعرض القيمة كنص أيضًا، فلا يعتمد التقدم على لون الشريط أو طوله وحده.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <Progress value={60} className="max-w-sm" aria-label={lang === 'ar' ? 'تقدم الرفع' : 'Upload progress'} />;
}

export function WithLabel({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Progress value={45} className="max-w-sm">
      <ProgressLabel>{ar ? 'جارٍ رفع الملفات' : 'Uploading files'}</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}

export function Steps({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Progress value={33} className="**:data-[slot=progress-track]:h-2">
        <ProgressLabel>{ar ? 'الخطوة 1 من 3' : 'Step 1 of 3'}</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={100} className="**:data-[slot=progress-track]:h-2">
        <ProgressLabel className="flex items-center gap-1.5">
          <CheckCircleIcon weight="regular" className="size-4" aria-hidden="true" />
          {ar ? 'اكتمل الرفع' : 'Upload complete'}
        </ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  );
}
