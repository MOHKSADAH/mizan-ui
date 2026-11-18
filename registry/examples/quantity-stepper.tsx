import { QuantityStepper, quantityStepperLabelsAr } from '@/registry/ui/quantity-stepper';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';
import { RemovableDemo } from '@/registry/examples/quantity-stepper.client';

export const doc: ExampleDoc = {
  description: {
    en: 'A minus, number and plus control for cart quantities. Built on the Base UI number field, with min, max and an optional remove action at the minimum.',
    ar: 'عنصر تحكم بالإنقاص والرقم والزيادة لكميات السلة. مبني على حقل الأرقام من Base UI، مع حد أدنى وأقصى وإجراء إزالة اختياري عند الحد الأدنى.',
  },
  usage: `import { QuantityStepper } from "@/components/ui/quantity-stepper"\n\n<QuantityStepper defaultValue={1} max={10} onValueChange={setQty} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithMax: { en: 'Minimum and maximum', ar: 'حد أدنى وأقصى' },
    Removable: { en: 'Remove at the minimum', ar: 'إزالة عند الحد الأدنى' },
  },
  accessibility: [
    {
      en: 'The buttons have text names. The input keeps the spinbutton role with arrow, Home and End keys. Every change is announced in a polite live region.',
      ar: 'للأزرار أسماء نصية. يحتفظ الحقل بدور spinbutton مع مفاتيح الأسهم وHome وEnd. يُعلن كل تغيير في منطقة حية مهذبة.',
    },
    {
      en: 'The order mirrors in RTL: decrease sits at the start, increase at the end.',
      ar: 'يتبدّل الترتيب في RTL: الإنقاص عند البداية والزيادة عند النهاية.',
    },
  ],
};

const labels = (lang: ExampleProps['lang']) => (lang === 'ar' ? quantityStepperLabelsAr : undefined);

export function Default({ lang }: ExampleProps) {
  return <QuantityStepper lang={lang} labels={labels(lang)} />;
}

export function WithMax({ lang }: ExampleProps) {
  return <QuantityStepper lang={lang} labels={labels(lang)} defaultValue={3} min={1} max={5} />;
}

export function Removable({ lang }: ExampleProps) {
  return <RemovableDemo lang={lang} />;
}
