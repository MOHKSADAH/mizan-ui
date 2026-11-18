import { ArrowClockwiseIcon, CopyIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react/ssr';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/registry/ui/context-menu';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A menu that opens at the pointer on right click or long press. Same items as the dropdown menu.',
    ar: 'قائمة تُفتح عند المؤشر بالنقر الأيمن أو الضغط المطوّل. العناصر نفسها كما في القائمة المنسدلة.',
  },
  usage: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Back</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    CheckboxesAndRadio: { en: 'Checkboxes and radio', ar: 'اختيار متعدد ومفرد' },
    WithIcons: { en: 'Icons and destructive item', ar: 'أيقونات وعنصر حذف' },
  },
  accessibility: [
    {
      en: 'Opens on right click, long press on touch, or Shift+F10 / the Menu key on a focused trigger.',
      ar: 'تُفتح بالنقر الأيمن أو الضغط المطوّل باللمس أو Shift+F10 / مفتاح القائمة على مشغّل مركّز.',
    },
    {
      en: 'Do not hide an action only in a context menu: offer the same action somewhere visible.',
      ar: 'لا تُخفِ إجراءً داخل قائمة السياق فقط: وفّره أيضًا في مكان ظاهر.',
    },
    {
      en: 'Arrow keys, Enter and Escape work as in the dropdown menu, and submenu arrows swap in RTL.',
      ar: 'تعمل الأسهم وEnter وEscape كما في القائمة المنسدلة، وتتبدل أسهم القائمة الفرعية في RTL.',
    },
  ],
};

const AREA = 'flex h-36 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground';

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex justify-center">
      <ContextMenu>
        <ContextMenuTrigger className={AREA}>{ar ? 'انقر بالزر الأيمن هنا' : 'Right click here'}</ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuItem>
            {ar ? 'رجوع' : 'Back'}
            <ContextMenuShortcut>
              <bdi>Alt ←</bdi>
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            {ar ? 'تقدّم' : 'Forward'}
            <ContextMenuShortcut>
              <bdi>Alt →</bdi>
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            {ar ? 'إعادة التحميل' : 'Reload'}
            <ContextMenuShortcut>
              <bdi>Ctrl R</bdi>
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>{ar ? 'أدوات أخرى' : 'More tools'}</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuItem>{ar ? 'حفظ الصفحة باسم...' : 'Save page as...'}</ContextMenuItem>
              <ContextMenuItem>{ar ? 'إنشاء اختصار' : 'Create shortcut'}</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>{ar ? 'أدوات المطوّر' : 'Developer tools'}</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

export function CheckboxesAndRadio({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex justify-center">
      <ContextMenu>
        <ContextMenuTrigger className={AREA}>{ar ? 'انقر بالزر الأيمن هنا' : 'Right click here'}</ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuGroup>
            <ContextMenuLabel>{ar ? 'العرض' : 'View'}</ContextMenuLabel>
            <ContextMenuCheckboxItem defaultChecked>{ar ? 'إظهار شريط الإشارات' : 'Show bookmarks bar'}</ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem>{ar ? 'إظهار عناوين الصفحات' : 'Show full URLs'}</ContextMenuCheckboxItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel>{ar ? 'الأشخاص' : 'People'}</ContextMenuLabel>
            <ContextMenuRadioGroup defaultValue="sara">
              <ContextMenuRadioItem value="sara">{ar ? 'سارة' : 'Sara'}</ContextMenuRadioItem>
              <ContextMenuRadioItem value="omar">{ar ? 'عمر' : 'Omar'}</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

export function WithIcons({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex justify-center">
      <ContextMenu>
        <ContextMenuTrigger className={AREA}>{ar ? 'انقر بالزر الأيمن على الملف' : 'Right click the file'}</ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem>
            <PencilSimpleIcon weight="regular" />
            {ar ? 'إعادة تسمية' : 'Rename'}
          </ContextMenuItem>
          <ContextMenuItem>
            <CopyIcon weight="regular" />
            {ar ? 'نسخ' : 'Duplicate'}
          </ContextMenuItem>
          <ContextMenuItem>
            <ArrowClockwiseIcon weight="regular" />
            {ar ? 'مزامنة' : 'Sync'}
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <TrashIcon weight="regular" />
            {ar ? 'حذف' : 'Delete'}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
