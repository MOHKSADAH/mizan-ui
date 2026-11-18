import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/registry/ui/menubar';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A horizontal bar of menus, as in desktop apps. Arrow keys move between menus while one is open.',
    ar: 'شريط أفقي من القوائم كما في تطبيقات سطح المكتب. تنقلك مفاتيح الأسهم بين القوائم أثناء فتح إحداها.',
  },
  usage: `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New window</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    CheckboxesAndRadio: { en: 'Checkboxes and radio', ar: 'اختيار متعدد ومفرد' },
  },
  accessibility: [
    {
      en: 'Left and Right arrows move between menu triggers and Down opens the focused menu. In RTL the arrows swap with the layout.',
      ar: 'تنقل الأسهم اليسرى واليمنى بين القوائم ويفتح السهم السفلي القائمة المركّزة. في RTL تتبدل الأسهم مع التخطيط.',
    },
    {
      en: 'Home and End jump to the first and last item, and Escape closes the open menu.',
      ar: 'ينتقل Home وEnd إلى أول عنصر وآخره، ويغلق Escape القائمة المفتوحة.',
    },
    {
      en: 'Use a menubar only for application commands. For site navigation use the navigation menu.',
      ar: 'استخدم menubar لأوامر التطبيق فقط. لتنقل الموقع استخدم navigation menu.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex justify-center">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>{ar ? 'ملف' : 'File'}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              {ar ? 'نافذة جديدة' : 'New window'}
              <MenubarShortcut>
                <bdi>Ctrl N</bdi>
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>{ar ? 'نافذة خاصة جديدة' : 'New private window'}</MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>{ar ? 'مشاركة' : 'Share'}</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>{ar ? 'رابط' : 'Link'}</MenubarItem>
                <MenubarItem>{ar ? 'بريد إلكتروني' : 'Email'}</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              {ar ? 'طباعة...' : 'Print...'}
              <MenubarShortcut>
                <bdi>Ctrl P</bdi>
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{ar ? 'تحرير' : 'Edit'}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              {ar ? 'تراجع' : 'Undo'}
              <MenubarShortcut>
                <bdi>Ctrl Z</bdi>
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              {ar ? 'إعادة' : 'Redo'}
              <MenubarShortcut>
                <bdi>Ctrl Y</bdi>
              </MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">{ar ? 'مسح الكل' : 'Clear all'}</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{ar ? 'عرض' : 'View'}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>{ar ? 'تكبير' : 'Zoom in'}</MenubarItem>
            <MenubarItem>{ar ? 'تصغير' : 'Zoom out'}</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export function CheckboxesAndRadio({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex justify-center">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>{ar ? 'عرض' : 'View'}</MenubarTrigger>
          <MenubarContent className="w-52">
            <MenubarGroup>
              <MenubarLabel>{ar ? 'اللوحات' : 'Panels'}</MenubarLabel>
              <MenubarCheckboxItem defaultChecked>{ar ? 'شريط الإشارات' : 'Bookmarks bar'}</MenubarCheckboxItem>
              <MenubarCheckboxItem>{ar ? 'العناوين الكاملة' : 'Full URLs'}</MenubarCheckboxItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel>{ar ? 'الأشخاص' : 'People'}</MenubarLabel>
              <MenubarRadioGroup defaultValue="sara">
                <MenubarRadioItem value="sara">{ar ? 'سارة' : 'Sara'}</MenubarRadioItem>
                <MenubarRadioItem value="omar">{ar ? 'عمر' : 'Omar'}</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>{ar ? 'مساعدة' : 'Help'}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>{ar ? 'التوثيق' : 'Documentation'}</MenubarItem>
            <MenubarItem>{ar ? 'تواصل مع الدعم' : 'Contact support'}</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
