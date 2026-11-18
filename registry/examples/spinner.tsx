import { Button } from '@/registry/ui/button';
import { Spinner, spinnerLabelsAr } from '@/registry/ui/spinner';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A spinning indicator for work in progress with an unknown length.',
    ar: 'مؤشر دوّار لعمل قيد التنفيذ بمدة غير معروفة.',
  },
  usage: `import { Spinner } from "@/components/ui/spinner"

<Spinner />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Sizes: { en: 'Sizes', ar: 'المقاسات' },
    InButton: { en: 'In a button', ar: 'داخل زر' },
    WithText: { en: 'With text', ar: 'مع نص' },
  },
  accessibility: [
    { en: 'The spinner has role="status" and an aria-label. Pass labels for another language.', ar: 'للمؤشر role="status" وaria-label. مرّر labels للغة أخرى.' },
    { en: 'In a button, also disable the button and change its text so the state is not only an animation.', ar: 'داخل الزر، عطّل الزر وغيّر نصه كي لا تكون الحالة حركة فقط.' },
    { en: 'Use a Skeleton instead when you know the shape of the content.', ar: 'استخدم Skeleton بدلًا منه عندما تعرف شكل المحتوى.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <Spinner labels={lang === 'ar' ? spinnerLabelsAr : undefined} />;
}

export function Sizes({ lang }: ExampleProps) {
  const labels = lang === 'ar' ? spinnerLabelsAr : undefined;
  return (
    <div className="flex items-center gap-6">
      <Spinner labels={labels} className="size-3" />
      <Spinner labels={labels} />
      <Spinner labels={labels} className="size-6" />
      <Spinner labels={labels} className="size-8" />
    </div>
  );
}

export function InButton({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>
        <Spinner data-icon="inline-start" aria-hidden="true" />
        {ar ? 'جارٍ الحفظ…' : 'Saving…'}
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" aria-hidden="true" />
        {ar ? 'يرجى الانتظار' : 'Please wait'}
      </Button>
    </div>
  );
}

export function WithText({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner labels={ar ? spinnerLabelsAr : undefined} />
      {ar ? 'جارٍ مزامنة الطلبات…' : 'Syncing orders…'}
    </div>
  );
}
