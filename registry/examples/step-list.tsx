import { StepList, type Step } from '@/registry/ui/step-list';
import { runStatusLabelsAr } from '@/registry/ui/run-status';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A vertical checklist of steps. Each step has a status icon joined to the next by a line, a title and a short value at the end side.',
    ar: 'قائمة خطوات رأسية. لكل خطوة أيقونة حالة يصلها خط بالخطوة التالية، وعنوان، وقيمة قصيرة في جهة النهاية.',
  },
  usage: `import { StepList } from "@/components/ui/step-list"\n\n<StepList steps={[{ id: "read", title: "Read orders", status: "done", meta: "42" }]} />`,
  examples: { Default: { en: 'Done, running and queued steps', ar: 'خطوات مكتملة وجارية ومنتظرة' } },
  accessibility: [
    {
      en: 'The list is an ordered list and each status is read before the step title.',
      ar: 'القائمة مرتبة، وتُقرأ حالة كل خطوة قبل عنوانها.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const steps: Step[] = ar
    ? [
        { id: 'read', title: 'قراءة الطلبات من زد', status: 'done', meta: '42' },
        { id: 'match', title: 'مطابقة الأصناف', status: 'running', meta: '18 / 40' },
        { id: 'send', title: 'إرسال الفواتير', status: 'queued' },
      ]
    : [
        { id: 'read', title: 'Read orders from Zid', status: 'done', meta: '42' },
        { id: 'match', title: 'Match items', status: 'running', meta: '18 / 40' },
        { id: 'send', title: 'Send invoices', status: 'queued' },
      ];
  return <StepList steps={steps} labels={ar ? runStatusLabelsAr : undefined} className="w-72" />;
}
