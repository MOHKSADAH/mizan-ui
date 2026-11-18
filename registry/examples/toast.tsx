import { ToastAction, ToastDefault, ToastLoading, ToastTypes } from '@/registry/examples/toast.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A toast stack built on Base UI Toast. Wrap your app in Toaster, then call toast.add() with the shared manager.',
    ar: 'مجموعة إشعارات مبنية على Toast من Base UI. غلّف تطبيقك بـ Toaster ثم استدعِ toast.add() عبر المدير المشترك.',
  },
  usage: `// app/layout.tsx
import { Toaster } from "@/components/ui/toast"

<Toaster>{children}</Toaster>

// anywhere in a client component
import { toast } from "@/components/ui/toast"

toast.add({ title: "Order created", description: "Tuesday, November 17, 2026" })`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Types: { en: 'Types', ar: 'الأنواع' },
    Action: { en: 'With action', ar: 'مع إجراء' },
    Loading: { en: 'Promise', ar: 'وعد' },
  },
  accessibility: [
    { en: 'Toasts are announced politely. Set priority "high" for errors so they are announced at once.', ar: 'تُعلن الإشعارات بهدوء. اضبط priority على "high" للأخطاء لتُعلن فورًا.' },
    { en: 'Hovering or focusing the stack pauses the timers. F6 moves focus to the viewport.', ar: 'يوقف المرور بالمؤشر أو التركيز على المجموعة المؤقتات. ينقل F6 التركيز إلى منطقة العرض.' },
    { en: 'Use timeout 0 for toasts with an action, so users have time to reach it.', ar: 'استخدم timeout بقيمة 0 للإشعارات ذات الإجراء ليتوفر للمستخدم وقت للوصول إليه.' },
    { en: 'Each type has an icon as well as a color, so the meaning does not rely on color.', ar: 'لكل نوع أيقونة إضافة إلى اللون، فلا يعتمد المعنى على اللون.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <ToastDefault lang={lang} />;
}

export function Types({ lang }: ExampleProps) {
  return <ToastTypes lang={lang} />;
}

export function Action({ lang }: ExampleProps) {
  return <ToastAction lang={lang} />;
}

export function Loading({ lang }: ExampleProps) {
  return <ToastLoading lang={lang} />;
}
