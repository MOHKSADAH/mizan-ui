import { TrashIcon, WarningIcon } from '@phosphor-icons/react/ssr';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/registry/ui/alert-dialog';
import { Button } from '@/registry/ui/button';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A modal that interrupts the user to confirm an important or destructive action. It cannot be dismissed by clicking outside.',
    ar: 'نافذة تقاطع المستخدم لتأكيد إجراء مهم أو لا رجعة فيه. لا يمكن إغلاقها بالنقر خارجها.',
  },
  usage: `import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogCancel variant="destructive">Delete</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithMedia: { en: 'With icon', ar: 'مع أيقونة' },
    Small: { en: 'Small size', ar: 'مقاس صغير' },
  },
  accessibility: [
    {
      en: 'Uses role="alertdialog": screen readers announce the title and description when it opens.',
      ar: 'يستخدم role="alertdialog": تعلن قارئات الشاشة العنوان والوصف عند الفتح.',
    },
    {
      en: 'Focus starts inside the dialog and is trapped there until it closes.',
      ar: 'يبدأ التركيز داخل النافذة ويبقى محصورًا فيها حتى تُغلق.',
    },
    {
      en: 'Escape and the Cancel button close it. Keep the Cancel action as the safe default.',
      ar: 'يغلقها Escape وزر الإلغاء. اجعل الإلغاء هو الخيار الآمن الافتراضي.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>{ar ? 'حذف الحساب' : 'Delete account'}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ar ? 'هل أنت متأكد تمامًا؟' : 'Are you absolutely sure?'}</AlertDialogTitle>
          <AlertDialogDescription>
            {ar
              ? 'لا يمكن التراجع عن هذا الإجراء. سيُحذف حسابك وتُزال بياناتك من خوادمنا نهائيًا.'
              : 'This action cannot be undone. It permanently deletes your account and removes your data from our servers.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{ar ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
          <AlertDialogCancel variant="destructive">{ar ? 'نعم، احذف' : 'Yes, delete'}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function WithMedia({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        <TrashIcon weight="regular" data-icon="inline-start" />
        {ar ? 'حذف المشروع' : 'Delete project'}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <WarningIcon weight="regular" />
          </AlertDialogMedia>
          <AlertDialogTitle>{ar ? 'حذف المشروع؟' : 'Delete this project?'}</AlertDialogTitle>
          <AlertDialogDescription>
            {ar
              ? 'ستُحذف جميع الملفات والإعدادات المرتبطة بالمشروع ولا يمكن استعادتها.'
              : 'All files and settings tied to the project are removed and cannot be restored.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{ar ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
          <AlertDialogCancel variant="destructive">{ar ? 'حذف' : 'Delete'}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function Small({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>{ar ? 'إيقاف الإشعارات' : 'Mute notifications'}</AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{ar ? 'إيقاف الإشعارات؟' : 'Mute notifications?'}</AlertDialogTitle>
          <AlertDialogDescription>
            {ar ? 'لن تصلك أي تنبيهات حتى تعيد تفعيلها.' : 'You will get no alerts until you turn them on again.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{ar ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
          <AlertDialogCancel variant="default">{ar ? 'إيقاف' : 'Mute'}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
