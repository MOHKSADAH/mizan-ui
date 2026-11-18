import { StockIndicator, stockIndicatorLabelsAr } from '@/registry/ui/stock-indicator';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A stock status line: in stock, low stock with the remaining count, or out of stock. Each state has an icon and text. Pass real stock only.',
    ar: 'سطر حالة المخزون: متوفر، أو كمية محدودة مع العدد المتبقي، أو غير متوفر. لكل حالة أيقونة ونص. مرّر المخزون الفعلي فقط.',
  },
  usage: `import { StockIndicator } from "@/components/ui/stock-indicator"\n\n<StockIndicator status="low" count={3} />`,
  examples: { Default: { en: 'All states', ar: 'كل الحالات' } },
  accessibility: [
    {
      en: 'The state is text, and the icon is decorative. The line is a polite status region, so a change after choosing a variant is announced.',
      ar: 'الحالة نص والأيقونة زخرفية. السطر منطقة حالة مهذبة فيُعلن التغيير بعد اختيار نوع.',
    },
    {
      en: 'The remaining count uses the plural rules of the language, including the six Arabic forms.',
      ar: 'يستخدم العدد المتبقي قواعد الجمع في اللغة، ومنها صيغ العربية الست.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const labels = lang === 'ar' ? stockIndicatorLabelsAr : undefined;
  return (
    <div className="flex flex-col gap-2">
      <StockIndicator status="in" lang={lang} labels={labels} />
      <StockIndicator status="low" count={3} lang={lang} labels={labels} />
      <StockIndicator status="out" lang={lang} labels={labels} />
    </div>
  );
}
