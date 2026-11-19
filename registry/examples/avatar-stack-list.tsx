import { AvatarStackList, avatarStackListLabelsAr } from '@/registry/ui/avatar-stack-list';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Overlapping avatars on a button. Press it to open a popover with a searchable member list and a role badge on each row. It reuses the avatar group, the popover and the command list.',
    ar: 'صور رمزية متداخلة على زر. اضغطه لفتح نافذة بقائمة أعضاء قابلة للبحث وشارة دور على كل صف. تعيد استخدام مجموعة الصور الرمزية والنافذة المنبثقة وقائمة الأوامر.',
  },
  usage: `import { AvatarStackList } from "@/components/ui/avatar-stack-list"\n\n<AvatarStackList max={4} members={[{ id: "1", name: "Noura Al-Otaibi", role: "Owner" }]} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Large: { en: 'Large, with fewer avatars', ar: 'كبير، بصور أقل' },
  },
  accessibility: [
    {
      en: 'The trigger is a button named "View 7 members". The list is a listbox: type to filter, Arrow keys move, Escape closes and returns focus to the button.',
      ar: 'المحفز زر باسم "عرض 7 أعضاء". القائمة مربع قائمة: اكتب للتصفية، وتحرك مفاتيح الأسهم، ويغلق Escape ويعيد التركيز إلى الزر.',
    },
    {
      en: 'The role is text in a badge, so it never relies on color. The overlap mirrors in RTL.',
      ar: 'الدور نص داخل شارة فلا يعتمد على اللون. ينعكس التداخل في RTL.',
    },
  ],
};

const members = {
  en: [
    { id: '1', name: 'Noura Al-Otaibi', role: 'Owner' },
    { id: '2', name: 'Faisal Al-Qahtani', role: 'Admin' },
    { id: '3', name: 'Huda Al-Ghamdi', role: 'Editor' },
    { id: '4', name: 'Abdullah Al-Harbi', role: 'Editor' },
    { id: '5', name: 'Reem Al-Dosari', role: 'Viewer' },
    { id: '6', name: 'Turki Al-Shehri', role: 'Viewer' },
    { id: '7', name: 'Lama Al-Mutairi', role: 'Viewer' },
  ],
  ar: [
    { id: '1', name: 'نورة العتيبي', role: 'مالك' },
    { id: '2', name: 'فيصل القحطاني', role: 'مدير' },
    { id: '3', name: 'هدى الغامدي', role: 'محرر' },
    { id: '4', name: 'عبدالله الحربي', role: 'محرر' },
    { id: '5', name: 'ريم الدوسري', role: 'مشاهد' },
    { id: '6', name: 'تركي الشهري', role: 'مشاهد' },
    { id: '7', name: 'لمى المطيري', role: 'مشاهد' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <AvatarStackList lang={lang} members={members[lang]} labels={lang === 'ar' ? avatarStackListLabelsAr : undefined} />;
}

export function Large({ lang }: ExampleProps) {
  return (
    <AvatarStackList lang={lang} size="lg" max={3} members={members[lang]} labels={lang === 'ar' ? avatarStackListLabelsAr : undefined} />
  );
}
