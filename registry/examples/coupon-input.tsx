import { CouponInputDemo } from '@/registry/examples/coupon-input.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A coupon code field with apply and remove. The status (idle, pending, success, error) comes from your cart, and the accepted code shows as a chip.',
    ar: 'حقل رمز قسيمة مع تطبيق وإزالة. تأتي الحالة (خامل أو قيد الانتظار أو نجاح أو خطأ) من سلتك، ويظهر الرمز المقبول كشريحة.',
  },
  usage: `import { CouponInput } from "@/components/ui/coupon-input"\n\n<CouponInput status={status} appliedCode={code} onApply={apply} onRemove={remove} />`,
  examples: { Default: { en: 'Try the code RAMADAN20', ar: 'جرّب الرمز RAMADAN20' } },
  accessibility: [
    {
      en: 'Every state change is written to one polite live region. Errors also show an icon and set aria-invalid, so they never rely on color.',
      ar: 'تُكتب كل حالة في منطقة حية مهذبة واحدة. تعرض الأخطاء أيضًا أيقونة وتضبط aria-invalid فلا تعتمد على اللون.',
    },
    {
      en: 'The code is always left to right, in both languages. Enter applies the code.',
      ar: 'الرمز من اليسار إلى اليمين دائمًا في اللغتين. يطبّق Enter الرمز.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <CouponInputDemo lang={lang} />;
}
