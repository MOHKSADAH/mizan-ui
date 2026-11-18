import { Button } from '@/registry/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog';
import { Input } from '@/registry/ui/input';
import { Label } from '@/registry/ui/label';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A modal window that interrupts the page to ask for input or show focused content. Built on Base UI Dialog.',
    ar: 'نافذة منبثقة تقاطع الصفحة لطلب إدخال أو عرض محتوى مركّز. مبنية على Dialog من Base UI.',
  },
  usage: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    CloseInFooter: { en: 'Close button in the footer', ar: 'زر الإغلاق في التذييل' },
    Scrollable: { en: 'Scrollable content', ar: 'محتوى قابل للتمرير' },
  },
  accessibility: [
    {
      en: 'Focus moves into the dialog on open, stays trapped inside, and returns to the trigger on close.',
      ar: 'ينتقل التركيز إلى النافذة عند الفتح، ويبقى محصورًا داخلها، ثم يعود إلى الزر عند الإغلاق.',
    },
    { en: 'Escape closes the dialog.', ar: 'يغلق مفتاح Escape النافذة.' },
    {
      en: 'Always render a DialogTitle: it names the dialog for screen readers.',
      ar: 'اعرض DialogTitle دائمًا: فهو يسمّي النافذة لقارئات الشاشة.',
    },
    {
      en: 'Pass labels to translate the screen-reader text of the close button.',
      ar: 'مرّر labels لترجمة نص زر الإغلاق المخصص لقارئات الشاشة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>{ar ? 'تعديل الملف الشخصي' : 'Edit profile'}</DialogTrigger>
      <DialogContent labels={ar ? { close: 'إغلاق' } : undefined}>
        <DialogHeader>
          <DialogTitle>{ar ? 'تعديل الملف الشخصي' : 'Edit profile'}</DialogTitle>
          <DialogDescription>
            {ar ? 'حدّث بياناتك ثم اضغط حفظ.' : 'Update your details, then press save.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="dialog-name">{ar ? 'الاسم' : 'Name'}</Label>
            <Input id="dialog-name" defaultValue={ar ? 'سارة العتيبي' : 'Sara Alotaibi'} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="dialog-handle">{ar ? 'اسم المستخدم' : 'Username'}</Label>
            <Input id="dialog-handle" dir="ltr" defaultValue="@sara" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>{ar ? 'إلغاء' : 'Cancel'}</DialogClose>
          <DialogClose render={<Button />}>{ar ? 'حفظ' : 'Save changes'}</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CloseInFooter({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const labels = ar ? { close: 'إغلاق' } : undefined;
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>{ar ? 'مشاركة' : 'Share'}</DialogTrigger>
      <DialogContent showCloseButton={false} labels={labels}>
        <DialogHeader>
          <DialogTitle>{ar ? 'مشاركة الرابط' : 'Share link'}</DialogTitle>
          <DialogDescription>
            {ar ? 'يمكن لأي شخص لديه هذا الرابط أن يعرض الملف.' : 'Anyone with this link can view the file.'}
          </DialogDescription>
        </DialogHeader>
        <Input readOnly dir="ltr" aria-label={ar ? 'الرابط' : 'Link'} defaultValue="https://mizan.example/f/8f3k2" />
        <DialogFooter showCloseButton labels={labels} />
      </DialogContent>
    </Dialog>
  );
}

export function Scrollable({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>{ar ? 'الشروط والأحكام' : 'Terms of service'}</DialogTrigger>
      <DialogContent labels={ar ? { close: 'إغلاق' } : undefined}>
        <DialogHeader>
          <DialogTitle>{ar ? 'الشروط والأحكام' : 'Terms of service'}</DialogTitle>
          <DialogDescription>{ar ? 'اقرأ الشروط حتى النهاية.' : 'Read the terms to the end.'}</DialogDescription>
        </DialogHeader>
        <div className="grid max-h-56 gap-3 overflow-y-auto pe-2 text-muted-foreground" tabIndex={0}>
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i}>
              {ar
                ? 'يوافق المستخدم على استخدام الخدمة وفق السياسات المعلنة، ويتحمل مسؤولية بياناته وحسابه.'
                : 'The user agrees to use the service under the published policies and is responsible for their data and account.'}
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button />}>{ar ? 'أوافق' : 'I agree'}</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
