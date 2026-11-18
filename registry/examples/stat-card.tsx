import { StatCard, statCardLabelsAr } from '@/registry/ui/stat-card';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A KPI card with a formatted value, a signed delta with an icon, an optional sparkline and a loading state.',
    ar: 'بطاقة مؤشر أداء بقيمة منسقة وتغير بإشارة وأيقونة وخط اتجاه اختياري وحالة تحميل.',
  },
  usage: `import { StatCard } from "@/components/ui/stat-card"\n\n<StatCard label="Revenue" value={12400} delta={12.4} showPrevious spark={[3, 5, 4, 8, 9]} />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Tones: { en: 'Positive, negative and zero delta', ar: 'تغير موجب وسالب وصفري' },
    Loading: { en: 'Loading', ar: 'جار التحميل' },
  },
  accessibility: [
    {
      en: 'The delta is read as words ("Increase of 12.4%"), not only shown by color and arrow. A zero delta reads "No change".',
      ar: 'يُقرأ التغير كلمات ("زيادة بمقدار 12.4%") وليس باللون والسهم فقط. والتغير الصفري يُقرأ "بدون تغيير".',
    },
    {
      en: 'Numbers sit in an LTR island. The sparkline mirrors in RTL so time runs from right to left.',
      ar: 'الأرقام داخل جزيرة LTR. ويُعكس خط الاتجاه في RTL ليسير الزمن من اليمين إلى اليسار.',
    },
  ],
};

const spark = [3, 5, 4, 8, 7, 9, 12];

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="w-64">
      <StatCard
        lang={lang}
        label={ar ? 'الإيرادات' : 'Revenue'}
        value={124800}
        delta={12.4}
        showPrevious
        spark={spark}
        labels={ar ? statCardLabelsAr : undefined}
      />
    </div>
  );
}

export function Tones({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const labels = ar ? statCardLabelsAr : undefined;
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
      <StatCard lang={lang} labels={labels} label={ar ? 'الطلبات' : 'Orders'} value={1320} delta={8} />
      <StatCard lang={lang} labels={labels} label={ar ? 'المرتجعات' : 'Returns'} value={42} delta={-5.5} />
      <StatCard lang={lang} labels={labels} label={ar ? 'الزوار' : 'Visitors'} value={9800} delta={0} compact />
    </div>
  );
}

export function Loading({ lang }: ExampleProps) {
  return (
    <div className="w-64">
      <StatCard lang={lang} label="" value={0} loading />
    </div>
  );
}
