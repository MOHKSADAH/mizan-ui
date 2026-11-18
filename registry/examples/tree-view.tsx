import { TreeView } from '@/registry/ui/tree-view';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A tree of nested items that opens and closes, with one tab stop and full arrow-key navigation.',
    ar: 'شجرة من العناصر المتداخلة تُفتح وتُغلق، بنقطة Tab واحدة وتنقل كامل بمفاتيح الأسهم.',
  },
  usage: `import { TreeView } from "@/components/ui/tree-view"\n\n<TreeView label="Files" nodes={[{ id: "src", label: "src", children: [{ id: "ui", label: "ui" }] }]} defaultExpanded={["src"]} />`,
  examples: { Default: { en: 'Default', ar: 'افتراضي' } },
  accessibility: [
    {
      en: 'Follows the APG tree pattern. Up and Down move, Right opens a closed folder or enters an open one, Left closes it or goes to the parent, Home and End jump to the ends, Enter and Space select.',
      ar: 'يتبع نمط الشجرة في APG. ينقل السهمان لأعلى وأسفل التركيز، ويفتح اليمين المجلد المغلق أو يدخل المفتوح، ويغلقه اليسار أو ينتقل إلى الأب، وتقفز Home وEnd إلى الطرفين، ويحدد Enter وSpace.',
    },
    {
      en: 'In RTL the Right and Left keys swap, and the arrow icon flips.',
      ar: 'في RTL يتبادل مفتاحا اليمين واليسار وينقلب رمز السهم.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const t = (en: string, arabic: string) => (ar ? arabic : en);
  return (
    <TreeView
      className="w-64"
      label={t('Project files', 'ملفات المشروع')}
      defaultExpanded={['app']}
      defaultSelected="page"
      nodes={[
        {
          id: 'app',
          label: t('app', 'التطبيق'),
          children: [
            { id: 'page', label: t('page.tsx', 'الصفحة') },
            { id: 'layout', label: t('layout.tsx', 'التخطيط') },
            { id: 'api', label: t('api', 'الواجهة'), children: [{ id: 'route', label: t('route.ts', 'المسار') }] },
          ],
        },
        { id: 'public', label: t('public', 'العام'), children: [{ id: 'logo', label: t('logo.svg', 'الشعار') }] },
        { id: 'readme', label: t('README.md', 'اقرأني') },
      ]}
    />
  );
}
