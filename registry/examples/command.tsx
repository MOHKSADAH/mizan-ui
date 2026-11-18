import { CalculatorIcon, CalendarBlankIcon, GearIcon, SmileyIcon, UserIcon } from '@phosphor-icons/react/ssr';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/registry/ui/command';
import { CommandDialogDemo } from '@/registry/examples/command.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A searchable list of commands or options, built on cmdk. Use it inline or inside a dialog as a command palette.',
    ar: 'قائمة أوامر أو خيارات قابلة للبحث، مبنية على cmdk. استخدمها داخل الصفحة أو في نافذة كلوحة أوامر.',
  },
  usage: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Dialog: { en: 'Command palette dialog', ar: 'نافذة لوحة الأوامر' },
    SimpleList: { en: 'Simple list', ar: 'قائمة بسيطة' },
  },
  accessibility: [
    {
      en: 'The input is a combobox: Arrow keys move through items, Enter runs the selected one.',
      ar: 'حقل الإدخال هو combobox: تتنقل مفاتيح الأسهم بين العناصر ويشغّل Enter العنصر المحدد.',
    },
    {
      en: 'In the dialog, pass the labels (commandLabelsAr) so the hidden title and description are translated.',
      ar: 'في النافذة، مرّر التسميات (commandLabelsAr) لتُترجم العنوان والوصف المخفيان.',
    },
    {
      en: 'Keyboard shortcuts are shown in LTR (wrapped in bdi) even inside Arabic text.',
      ar: 'تُعرض اختصارات لوحة المفاتيح من اليسار إلى اليمين (داخل bdi) حتى ضمن النص العربي.',
    },
  ],
};

function Items({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <>
      <CommandInput placeholder={ar ? 'اكتب أمرًا أو ابحث...' : 'Type a command or search...'} />
      <CommandList>
        <CommandEmpty>{ar ? 'لا توجد نتائج.' : 'No results found.'}</CommandEmpty>
        <CommandGroup heading={ar ? 'اقتراحات' : 'Suggestions'}>
          <CommandItem>
            <CalendarBlankIcon weight="regular" />
            {ar ? 'التقويم' : 'Calendar'}
          </CommandItem>
          <CommandItem>
            <SmileyIcon weight="regular" />
            {ar ? 'البحث عن رمز تعبيري' : 'Search emoji'}
          </CommandItem>
          <CommandItem disabled>
            <CalculatorIcon weight="regular" />
            {ar ? 'الآلة الحاسبة' : 'Calculator'}
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={ar ? 'الإعدادات' : 'Settings'}>
          <CommandItem>
            <UserIcon weight="regular" />
            {ar ? 'الملف الشخصي' : 'Profile'}
            <CommandShortcut>
              <bdi>Ctrl P</bdi>
            </CommandShortcut>
          </CommandItem>
          <CommandItem>
            <GearIcon weight="regular" />
            {ar ? 'الإعدادات' : 'Settings'}
            <CommandShortcut>
              <bdi>Ctrl S</bdi>
            </CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}

export function Default({ lang }: ExampleProps) {
  return (
    <Command className="mx-auto max-w-sm rounded-lg border">
      <Items lang={lang} />
    </Command>
  );
}

export function Dialog({ lang }: ExampleProps) {
  return (
    <CommandDialogDemo lang={lang}>
      <Items lang={lang} />
    </CommandDialogDemo>
  );
}

const FRAMEWORKS = ['Next.js', 'SvelteKit', 'Nuxt', 'Remix', 'Astro'];

export function SimpleList({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Command className="mx-auto max-w-xs rounded-lg border">
      <CommandInput placeholder={ar ? 'ابحث عن إطار عمل...' : 'Search framework...'} />
      <CommandList>
        <CommandEmpty>{ar ? 'لا توجد نتائج.' : 'No results found.'}</CommandEmpty>
        <CommandGroup>
          {FRAMEWORKS.map((f) => (
            <CommandItem key={f} value={f}>
              <bdi lang="en">{f}</bdi>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
