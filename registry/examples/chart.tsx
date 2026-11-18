import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/registry/ui/chart';
import { Bar, BarChart, CartesianGrid, CompactYAxis, Line, LineChart, XAxis } from '@/registry/examples/chart.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Recharts wrapped in a themed container. Series colors come from the --series-1 to --series-5 tokens.',
    ar: 'Recharts داخل حاوية مرتبطة بالثيم. ألوان السلاسل من الرموز --series-1 إلى --series-5.',
  },
  usage: `import { Bar, BarChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const config = { sales: { label: "Sales", color: "var(--series-1)" } }

<ChartContainer config={config} className="h-64 w-full">
  <BarChart data={data}>
    <XAxis dataKey="month" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
  </BarChart>
</ChartContainer>`,
  examples: {
    Default: { en: 'Bar chart', ar: 'مخطط أعمدة' },
    Lines: { en: 'Line chart', ar: 'مخطط خطي' },
    Multiple: { en: 'Two series with legend', ar: 'سلسلتان مع مفتاح' },
  },
  accessibility: [
    { en: 'A chart is a picture: put the key figures in text or a table next to it.', ar: 'المخطط صورة: ضع الأرقام الرئيسية في نص أو جدول بجانبه.' },
    { en: 'Series differ by color and by the legend label, never by color alone in the tooltip.', ar: 'تتميز السلاسل باللون وبتسمية المفتاح، ولا يعتمد التلميح على اللون وحده.' },
    { en: 'In RTL the x axis runs right to left and the y axis sits on the right.', ar: 'في RTL يمتد المحور السيني من اليمين إلى اليسار ويقع المحور الصادي على اليمين.' },
  ],
};

const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
};
const SALES = [18600, 30500, 23700, 7300, 20900, 21400];
const EXPENSES = [12400, 9800, 15200, 6100, 11800, 14300];

const rows = (lang: 'en' | 'ar') =>
  MONTHS[lang].map((month, i) => ({ month, sales: SALES[i], expenses: EXPENSES[i] }));

const configFor = (lang: 'en' | 'ar'): ChartConfig => ({
  sales: { label: lang === 'ar' ? 'المبيعات' : 'Sales', color: 'var(--series-1)' },
  expenses: { label: lang === 'ar' ? 'المصروفات' : 'Expenses', color: 'var(--series-2)' },
});

export function Default({ lang }: ExampleProps) {
  return (
    <ChartContainer config={configFor(lang)} className="aspect-auto h-64 w-full max-w-xl">
      <BarChart data={rows(lang)}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" reversed={lang === 'ar'} tickLine={false} axisLine={false} tickMargin={8} />
        <CompactYAxis lang={lang} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export function Lines({ lang }: ExampleProps) {
  return (
    <ChartContainer config={configFor(lang)} className="aspect-auto h-64 w-full max-w-xl">
      <LineChart data={rows(lang)}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" reversed={lang === 'ar'} tickLine={false} axisLine={false} tickMargin={8} />
        <CompactYAxis lang={lang} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="sales" type="monotone" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
        <Line dataKey="expenses" type="monotone" stroke="var(--color-expenses)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}

export function Multiple({ lang }: ExampleProps) {
  return (
    <ChartContainer config={configFor(lang)} className="aspect-auto h-72 w-full max-w-xl">
      <BarChart data={rows(lang)}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" reversed={lang === 'ar'} tickLine={false} axisLine={false} tickMargin={8} />
        <CompactYAxis lang={lang} />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
