import { RunStatus, runStatusLabelsAr, type RunState } from '@/registry/ui/run-status';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'The state of an agent run or task: running, done, idle, queued, failed or needs you. Only "needs you" is a solid pill, so it is the one that gets noticed.',
    ar: 'حالة تشغيل الوكيل أو مهمته: قيد التشغيل أو اكتمل أو خامل أو في الانتظار أو فشل أو يحتاج إليك. حالة "يحتاج إليك" وحدها بشارة ممتلئة، فهي التي تلفت النظر.',
  },
  usage: `import { RunStatus } from "@/components/ui/run-status"\n\n<RunStatus state="needs-you" />`,
  examples: { Default: { en: 'All states', ar: 'كل الحالات' } },
  accessibility: [
    {
      en: 'The state is always text. The icon is decorative and color only adds emphasis.',
      ar: 'الحالة نص دائمًا. الأيقونة زخرفية واللون يضيف التأكيد فقط.',
    },
    {
      en: 'The spinner stops under prefers-reduced-motion and turns the other way in RTL.',
      ar: 'يتوقف الدوران عند تفعيل تقليل الحركة، ويعكس اتجاهه في RTL.',
    },
  ],
};

const states: RunState[] = ['running', 'done', 'queued', 'idle', 'needs-you', 'failed'];

export function Default({ lang }: ExampleProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {states.map((state) => (
        <RunStatus key={state} state={state} labels={lang === 'ar' ? runStatusLabelsAr : undefined} />
      ))}
    </div>
  );
}
