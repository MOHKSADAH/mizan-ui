import { PasswordInputDemo } from '@/registry/examples/password-input.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A password field with a show and hide toggle and an optional strength meter with a checklist of requirements.',
    ar: 'حقل كلمة مرور بزر إظهار وإخفاء، مع مقياس قوة اختياري وقائمة بالمتطلبات.',
  },
  usage: `import { PasswordInput } from "@/components/ui/password-input"\n\n<PasswordInput showStrength minLength={8} aria-label="Password" />`,
  examples: {
    Default: { en: 'Show and hide toggle', ar: 'زر الإظهار والإخفاء' },
    Strength: { en: 'With strength meter and requirements', ar: 'مع مقياس القوة والمتطلبات' },
  },
  accessibility: [
    {
      en: 'The toggle is a button with a fixed label and aria-pressed, so the state is announced without the label changing.',
      ar: 'الزر عنصر button بتسمية ثابتة وخاصية aria-pressed، فتُعلن الحالة دون تغيّر التسمية.',
    },
    {
      en: 'Strength shows as a meter, a text level (for example Good) in a polite live region, and a checklist where each rule has an icon and sr-only text. Color is never the only signal.',
      ar: 'تظهر القوة كمقياس meter ومستوى نصي (مثل جيدة) في منطقة حية مهذبة وقائمة تحقق لكل قاعدة فيها أيقونة ونص للقارئات فقط. اللون ليس الإشارة الوحيدة.',
    },
    {
      en: 'The value is always left to right, since passwords mix scripts.',
      ar: 'القيمة دائمًا من اليسار إلى اليمين لأن كلمات المرور تخلط الأنظمة الكتابية.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <PasswordInputDemo lang={lang} aria-label={lang === 'ar' ? 'كلمة المرور' : 'Password'} />;
}

export function Strength({ lang }: ExampleProps) {
  return <PasswordInputDemo lang={lang} showStrength aria-label={lang === 'ar' ? 'كلمة المرور' : 'Password'} />;
}
