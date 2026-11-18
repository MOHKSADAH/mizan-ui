import { ArrowUpIcon, CommandIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/registry/ui/button';
import { Kbd, KbdGroup } from '@/registry/ui/kbd';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Shows a keyboard key or a shortcut. Key names stay in Latin script and read left to right.',
    ar: 'يعرض مفتاح لوحة مفاتيح أو اختصارًا. تبقى أسماء المفاتيح بالحروف اللاتينية وتُقرأ من اليسار إلى اليمين.',
  },
  usage: `import { Kbd, KbdGroup } from "@/components/ui/kbd"

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Group: { en: 'Shortcut group', ar: 'مجموعة اختصار' },
    InText: { en: 'In a sentence and a button', ar: 'داخل جملة وزر' },
  },
  accessibility: [
    { en: 'Renders a native kbd element, which assistive tech reads as keyboard input.', ar: 'يعرض عنصر kbd أصليًا تقرؤه التقنيات المساعدة كمدخل لوحة مفاتيح.' },
    { en: 'A shortcut that triggers an action also needs a visible control and aria-keyshortcuts.', ar: 'الاختصار الذي ينفذ إجراءً يحتاج أيضًا إلى عنصر تحكم ظاهر وaria-keyshortcuts.' },
    { en: 'Wrap shortcuts in dir="ltr" inside Arabic text so the keys do not reorder.', ar: 'لفّ الاختصارات بـ dir="ltr" داخل النص العربي حتى لا يتغير ترتيب المفاتيح.' },
  ],
};

export function Default() {
  return <Kbd>Esc</Kbd>;
}

export function Group({ lang }: ExampleProps) {
  return (
    <div className="flex flex-col items-center gap-3" dir="ltr" lang="en">
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>
          <CommandIcon weight="regular" aria-label={lang === 'ar' ? 'مفتاح الأمر' : 'Command'} />
        </Kbd>
        <Kbd>
          <ArrowUpIcon weight="regular" aria-label={lang === 'ar' ? 'مفتاح Shift' : 'Shift'} />
        </Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </div>
  );
}

export function InText({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        {ar ? 'اضغط ' : 'Press '}
        <bdi dir="ltr">
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </bdi>
        {ar ? ' لفتح البحث.' : ' to open search.'}
      </p>
      <Button variant="outline" aria-keyshortcuts="Control+S">
        {ar ? 'حفظ' : 'Save'}
        <Kbd dir="ltr" data-icon="inline-end">
          Ctrl S
        </Kbd>
      </Button>
    </div>
  );
}
