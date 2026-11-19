import { FormWizardDemo } from '@/registry/examples/form-wizard.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A multi-step form in a card. The header shows the steps, the body follows the height of the current step, and Back and Next sit in the footer. A step can block Next with a validate function. After the last step the card shows a completion state.',
    ar: 'نموذج متعدد الخطوات داخل بطاقة. يعرض الرأس الخطوات، ويتبع الجسم ارتفاع الخطوة الحالية، ويقع السابق والتالي في التذييل. يمكن لخطوة أن تمنع التالي بدالة validate. بعد الخطوة الأخيرة تعرض البطاقة حالة الإكمال.',
  },
  usage: `import { FormWizard } from "@/components/ui/form-wizard"\n\n<FormWizard\n  steps={[\n    { id: "store", label: "Store details", content: <StoreFields />, validate: () => name !== "" },\n    { id: "review", label: "Review", content: <Summary /> },\n  ]}\n  onComplete={save}\n/>`,
  examples: {
    Default: { en: 'Numbered steps', ar: 'خطوات مرقمة' },
    Dots: { en: 'Dots', ar: 'نقاط' },
  },
  accessibility: [
    {
      en: 'The numbered header is an ordered list with aria-current on the current step. Each step is a group named by its title. After Back or Next focus moves to the new title, so screen readers read it.',
      ar: 'الرأس المرقم قائمة مرتبة وللخطوة الحالية aria-current. كل خطوة مجموعة باسم عنوانها. بعد السابق أو التالي ينتقل التركيز إلى العنوان الجديد فتقرؤه قارئات الشاشة.',
    },
    {
      en: 'A failed validation keeps the step and shows a message in a role="alert" region. Steps slide from the end side and mirror in RTL. Under reduced motion they appear without sliding.',
      ar: 'يُبقي فشل التحقق الخطوة ويعرض رسالة في منطقة role="alert". تنزلق الخطوات من جهة النهاية وتنعكس في RTL. عند تقليل الحركة تظهر دون انزلاق.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <FormWizardDemo lang={lang} />;
}

export function Dots({ lang }: ExampleProps) {
  return <FormWizardDemo lang={lang} indicator="dots" />;
}
