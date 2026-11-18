import { DirectionProvider } from '@/registry/ui/direction';
import { DirectionValue } from '@/registry/examples/direction.client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Tells Base UI components which way text reads, so keyboard navigation and popup placement follow it.',
    ar: 'يخبر مكوّنات Base UI باتجاه قراءة النص، فيتبعه التنقل بلوحة المفاتيح ومواضع النوافذ المنبثقة.',
  },
  usage: `import { DirectionProvider } from "@/components/ui/direction"

<DirectionProvider direction="rtl">
  <div dir="rtl">{children}</div>
</DirectionProvider>`,
  examples: {
    Default: { en: 'RTL and LTR side by side', ar: 'RTL وLTR جنبًا إلى جنب' },
    UseDirection: { en: 'Reading the direction', ar: 'قراءة الاتجاه' },
  },
  accessibility: [
    {
      en: 'DirectionProvider changes behavior (arrow keys, popup side), not layout. Always set the dir attribute on the wrapping element too.',
      ar: 'يغيّر DirectionProvider السلوك (الأسهم وجانب النافذة المنبثقة) وليس التخطيط. اضبط سمة dir على العنصر المحيط أيضًا دائمًا.',
    },
    {
      en: 'Set it once near the root, from the page language. Nest another provider only for a region in a different direction.',
      ar: 'اضبطه مرة واحدة قرب الجذر من لغة الصفحة. أضف مزودًا متداخلًا فقط لمنطقة باتجاه مختلف.',
    },
  ],
};

const SAMPLES = [
  {
    dir: 'ltr',
    title: { en: 'Left to right', ar: 'من اليسار إلى اليمين' },
    tabs: ['Account', 'Password'],
    hint: 'Press Right Arrow to go to the next tab.',
  },
  {
    dir: 'rtl',
    title: { en: 'Right to left', ar: 'من اليمين إلى اليسار' },
    tabs: ['الحساب', 'كلمة المرور'],
    hint: 'اضغط السهم الأيسر للانتقال إلى التبويب التالي.',
  },
] as const;

export function Default({ lang }: ExampleProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SAMPLES.map((s) => (
        <DirectionProvider key={s.dir} direction={s.dir}>
          <div dir={s.dir} className="grid gap-3 rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">{s.title[lang]}</p>
            <Tabs defaultValue="first">
              <TabsList>
                <TabsTrigger value="first">{s.tabs[0]}</TabsTrigger>
                <TabsTrigger value="second">{s.tabs[1]}</TabsTrigger>
              </TabsList>
              <TabsContent value="first" className="text-muted-foreground">
                {s.hint}
              </TabsContent>
              <TabsContent value="second" className="text-muted-foreground">
                {s.hint}
              </TabsContent>
            </Tabs>
          </div>
        </DirectionProvider>
      ))}
    </div>
  );
}

export function UseDirection({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid gap-2 text-sm">
      <DirectionProvider direction="rtl">
        <p>
          {ar ? 'الاتجاه داخل المزوّد: ' : 'Direction inside the provider: '}
          <DirectionValue />
        </p>
      </DirectionProvider>
      <p>
        {ar ? 'الاتجاه من الصفحة: ' : 'Direction from the page: '}
        <DirectionValue />
      </p>
    </div>
  );
}
