import { SonnerAction, SonnerDefault, SonnerPromise, SonnerTypes } from '@/registry/examples/sonner.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'An opinionated toast stack built on Sonner. Mount one Toaster, then call toast() from anywhere.',
    ar: 'مجموعة إشعارات جاهزة مبنية على Sonner. ركّب Toaster واحدًا ثم استدعِ toast() من أي مكان.',
  },
  usage: `// app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

<Toaster />

// anywhere in a client component
import { toast } from "sonner"

toast("Order created", { description: "Tuesday, November 17, 2026" })`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Types: { en: 'Types', ar: 'الأنواع' },
    Action: { en: 'With action', ar: 'مع إجراء' },
    Loading: { en: 'Promise', ar: 'وعد' },
  },
  accessibility: [
    { en: 'Toasts sit in a live region, so screen readers announce them without moving focus.', ar: 'تظهر الإشعارات في منطقة حية، فيعلنها قارئ الشاشة دون نقل التركيز.' },
    { en: 'Toasts with an action stay until dismissed. Never put the only way to finish a task in a toast that fades.', ar: 'الإشعارات ذات الإجراء تبقى حتى تُغلق. لا تجعل الطريقة الوحيدة لإنهاء مهمة في إشعار يختفي.' },
    { en: 'Each type has an icon as well as a color, so the meaning does not rely on color.', ar: 'لكل نوع أيقونة إضافة إلى اللون، فلا يعتمد المعنى على اللون.' },
    { en: 'Pass dir and position to the Toaster so it mirrors in RTL.', ar: 'مرّر dir وposition إلى Toaster لينعكس في RTL.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <SonnerDefault lang={lang} />;
}

export function Types({ lang }: ExampleProps) {
  return <SonnerTypes lang={lang} />;
}

export function Action({ lang }: ExampleProps) {
  return <SonnerAction lang={lang} />;
}

export function Loading({ lang }: ExampleProps) {
  return <SonnerPromise lang={lang} />;
}
