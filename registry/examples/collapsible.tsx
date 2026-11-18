import { CaretUpDownIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/registry/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/registry/ui/collapsible';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'An interactive component that expands and collapses a panel.',
    ar: 'مكوّن تفاعلي يوسّع لوحة ويطويها.',
  },
  usage: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger render={<Button variant="ghost" />}>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    DefaultOpen: { en: 'Open by default', ar: 'مفتوح افتراضيًا' },
    Disabled: { en: 'Disabled', ar: 'معطّل' },
  },
  accessibility: [
    {
      en: 'The trigger is a button with aria-expanded and aria-controls. Enter or Space toggles the panel.',
      ar: 'المشغّل زر مع aria-expanded وaria-controls. يبدّل Enter أو Space اللوحة.',
    },
    {
      en: 'Icon-only triggers need an aria-label that says what they expand.',
      ar: 'المشغّلات التي تحتوي أيقونة فقط تحتاج aria-label يوضح ما الذي توسّعه.',
    },
  ],
};

const REPOS = ['@mizan/button', '@mizan/dialog', '@mizan/tabs'];

function RepoList() {
  return (
    <>
      {REPOS.map((repo) => (
        <div key={repo} dir="ltr" className="rounded-md border px-3 py-2 font-mono text-sm">
          {repo}
        </div>
      ))}
    </>
  );
}

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Collapsible className="mx-auto grid w-full max-w-sm gap-2">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold">
          {ar ? 'المكوّنات المحفوظة: ' : 'Starred components: '}
          <bdi>3</bdi>
        </h4>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label={ar ? 'عرض الكل' : 'Toggle list'} />}>
          <CaretUpDownIcon weight="regular" />
        </CollapsibleTrigger>
      </div>
      <div dir="ltr" className="rounded-md border px-3 py-2 font-mono text-sm">
        @mizan/accordion
      </div>
      <CollapsibleContent className="grid gap-2">
        <RepoList />
      </CollapsibleContent>
    </Collapsible>
  );
}

export function DefaultOpen({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Collapsible defaultOpen className="mx-auto grid w-full max-w-sm gap-2">
      <CollapsibleTrigger render={<Button variant="outline" className="justify-between" />}>
        {ar ? 'تفاصيل الطلب' : 'Order details'}
        <CaretUpDownIcon weight="regular" data-icon="inline-end" />
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border p-3 text-sm text-muted-foreground">
        {ar ? 'تم تأكيد طلبك وسيصل خلال 2 إلى 4 أيام عمل.' : 'Your order is confirmed and arrives in 2 to 4 working days.'}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Disabled({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Collapsible disabled className="mx-auto grid w-full max-w-sm gap-2">
      <CollapsibleTrigger render={<Button variant="outline" className="justify-between" />}>
        {ar ? 'خيارات متقدمة' : 'Advanced options'}
        <CaretUpDownIcon weight="regular" data-icon="inline-end" />
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border p-3 text-sm text-muted-foreground">
        {ar ? 'لا يظهر هذا المحتوى.' : 'This content never shows.'}
      </CollapsibleContent>
    </Collapsible>
  );
}
