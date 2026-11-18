import { Button } from '@/registry/ui/button';
import { Input } from '@/registry/ui/input';
import { Label } from '@/registry/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/registry/ui/sheet';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A panel that slides in from a screen edge to show supplementary content. It is a Dialog with a side.',
    ar: 'لوحة تنزلق من حافة الشاشة لعرض محتوى إضافي. هي Dialog بجانب محدد.',
  },
  usage: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Sides: { en: 'Sides', ar: 'الجوانب' },
    NoCloseButton: { en: 'Without the close button', ar: 'بدون زر الإغلاق' },
  },
  accessibility: [
    {
      en: 'Behaves as a modal dialog: focus is trapped, Escape closes it, and focus returns to the trigger.',
      ar: 'تعمل كنافذة مشروطة: يُحصر التركيز، ويغلقها Escape، ويعود التركيز إلى الزر.',
    },
    {
      en: 'Always include a SheetTitle so the panel has an accessible name.',
      ar: 'ضمّن SheetTitle دائمًا ليكون للوحة اسم متاح للقارئات.',
    },
    {
      en: 'side is physical (left or right). In Arabic, swap them so the panel opens from the reading start.',
      ar: 'قيمة side فعلية (left أو right). في العربية بدّلهما لتفتح اللوحة من بداية القراءة.',
    },
  ],
};

const SIDES = [
  { en: 'Top', ar: 'أعلى', side: { en: 'top', ar: 'top' } },
  { en: 'Start', ar: 'البداية', side: { en: 'left', ar: 'right' } },
  { en: 'End', ar: 'النهاية', side: { en: 'right', ar: 'left' } },
  { en: 'Bottom', ar: 'أسفل', side: { en: 'bottom', ar: 'bottom' } },
] as const;

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>{ar ? 'تعديل الملف الشخصي' : 'Edit profile'}</SheetTrigger>
      <SheetContent side={ar ? 'left' : 'right'} labels={ar ? { close: 'إغلاق' } : undefined}>
        <SheetHeader>
          <SheetTitle>{ar ? 'تعديل الملف الشخصي' : 'Edit profile'}</SheetTitle>
          <SheetDescription>
            {ar ? 'حدّث بياناتك ثم اضغط حفظ.' : 'Update your details, then press save.'}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 px-4">
          <div className="grid gap-1.5">
            <Label htmlFor="sheet-name">{ar ? 'الاسم' : 'Name'}</Label>
            <Input id="sheet-name" defaultValue={ar ? 'سارة العتيبي' : 'Sara Alotaibi'} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="sheet-handle">{ar ? 'اسم المستخدم' : 'Username'}</Label>
            <Input id="sheet-handle" dir="ltr" defaultValue="@sara" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button />}>{ar ? 'حفظ' : 'Save changes'}</SheetClose>
          <SheetClose render={<Button variant="outline" />}>{ar ? 'إغلاق' : 'Close'}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function Sides({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SIDES.map((s) => (
        <Sheet key={s.en}>
          <SheetTrigger render={<Button variant="outline" />}>{s[lang]}</SheetTrigger>
          <SheetContent side={s.side[lang]} labels={ar ? { close: 'إغلاق' } : undefined}>
            <SheetHeader>
              <SheetTitle>{ar ? 'الإعدادات' : 'Settings'}</SheetTitle>
              <SheetDescription>
                {ar ? `تنزلق هذه اللوحة من جهة: ${s.ar}.` : `This panel slides in from the ${s.en.toLowerCase()}.`}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

export function NoCloseButton({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>{ar ? 'عرض الفلاتر' : 'Show filters'}</SheetTrigger>
      <SheetContent side={ar ? 'left' : 'right'} showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>{ar ? 'الفلاتر' : 'Filters'}</SheetTitle>
          <SheetDescription>
            {ar ? 'اختر ما تريد ثم أغلق اللوحة.' : 'Pick what you need, then close the panel.'}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button />}>{ar ? 'تطبيق' : 'Apply'}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
