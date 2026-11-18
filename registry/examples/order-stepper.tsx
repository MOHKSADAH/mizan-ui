import { OrderStepper, orderStepperLabelsAr } from '@/registry/ui/order-stepper';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'The steps of a checkout: cart, address, payment and review. Completed steps show a check. Below the sm breakpoint only the current label shows.',
    ar: 'خطوات إتمام الشراء: السلة والعنوان والدفع والمراجعة. تعرض الخطوات المكتملة علامة صح. تحت نقطة sm تظهر تسمية الخطوة الحالية فقط.',
  },
  usage: `import { OrderStepper } from "@/components/ui/order-stepper"\n\n<OrderStepper steps={steps} current="payment" />`,
  examples: {
    Default: { en: 'Payment step', ar: 'خطوة الدفع' },
    Compact: { en: 'Compact', ar: 'مضغوط' },
  },
  accessibility: [
    {
      en: 'An ordered list, so the position is announced. The current step has aria-current="step", and completed steps add "Completed" for screen readers.',
      ar: 'قائمة مرتبة فيُعلن الموضع. للخطوة الحالية aria-current="step" وتضيف الخطوات المكتملة "مكتملة" لقارئات الشاشة.',
    },
    {
      en: 'Hidden labels in compact mode stay readable by screen readers. The order mirrors in RTL.',
      ar: 'تبقى التسميات المخفية في الوضع المضغوط مقروءة لقارئات الشاشة. يتبدّل الترتيب في RTL.',
    },
  ],
};

const steps = (lang: ExampleProps['lang']) =>
  lang === 'ar'
    ? [
        { id: 'cart', label: 'السلة' },
        { id: 'address', label: 'العنوان' },
        { id: 'payment', label: 'الدفع' },
        { id: 'review', label: 'المراجعة' },
      ]
    : [
        { id: 'cart', label: 'Cart' },
        { id: 'address', label: 'Address' },
        { id: 'payment', label: 'Payment' },
        { id: 'review', label: 'Review' },
      ];

export function Default({ lang }: ExampleProps) {
  return (
    <OrderStepper steps={steps(lang)} current="payment" lang={lang} labels={lang === 'ar' ? orderStepperLabelsAr : undefined} />
  );
}

export function Compact({ lang }: ExampleProps) {
  return (
    <div className="w-full max-w-xs">
      <OrderStepper
        steps={steps(lang)}
        current="address"
        compact
        lang={lang}
        labels={lang === 'ar' ? orderStepperLabelsAr : undefined}
      />
    </div>
  );
}
