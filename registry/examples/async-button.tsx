import { AsyncButtonDemo } from '@/registry/examples/async-button.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A button that shows idle, pending, done and error in place. The label changes and the width stays fixed, so the layout never jumps. The done state returns to idle by itself, and the error state stays until the next click.',
    ar: 'زر يعرض الحالات الخاملة وقيد التنفيذ والمنجزة والخطأ في مكانه. تتغير التسمية ويبقى العرض ثابتًا فلا يقفز التخطيط. تعود حالة الإنجاز إلى الخمول وحدها، وتبقى حالة الخطأ حتى النقرة التالية.',
  },
  usage: `import { AsyncButton } from "@/components/ui/async-button"\n\n<AsyncButton onAction={() => save()}>Save changes</AsyncButton>`,
  examples: {
    Default: { en: 'Succeeds after a moment', ar: 'ينجح بعد لحظة' },
    Failing: { en: 'Fails, then retries', ar: 'يفشل ثم يعيد المحاولة' },
  },
  accessibility: [
    {
      en: 'A polite live region announces pending, done and error. While pending the button is aria-disabled but keeps focus, and further clicks do nothing.',
      ar: 'تعلن منطقة حية مهذبة عن قيد التنفيذ والإنجاز والخطأ. أثناء التنفيذ يكون الزر aria-disabled لكنه يحتفظ بالتركيز، ولا تفعل النقرات الإضافية شيئًا.',
    },
    {
      en: 'The error state uses an icon and text as well as the destructive color. The spinner stops under reduced motion and the pending text still shows.',
      ar: 'تستخدم حالة الخطأ أيقونة ونصًا إلى جانب لون الخطر. يتوقف المؤشر الدوار عند تقليل الحركة ويبقى نص قيد التنفيذ ظاهرًا.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <AsyncButtonDemo lang={lang} />;
}

export function Failing({ lang }: ExampleProps) {
  return <AsyncButtonDemo lang={lang} fail />;
}
