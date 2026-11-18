import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from '@/registry/ui/status-badge';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'An order status badge: pending, paid, shipped, delivered, cancelled or refunded. Each one pairs an icon with text and a status token color.',
    ar: 'شارة حالة الطلب: قيد الانتظار أو مدفوع أو تم الشحن أو تم التسليم أو ملغي أو مسترد. تجمع كل حالة أيقونة ونصًا ولون رمز الحالة.',
  },
  usage: `import { StatusBadge } from "@/components/ui/status-badge"\n\n<StatusBadge status="shipped" />`,
  examples: { Default: { en: 'All statuses', ar: 'كل الحالات' } },
  accessibility: [
    {
      en: 'The status is always text. The icon is decorative and color only adds emphasis.',
      ar: 'الحالة نص دائمًا. الأيقونة زخرفية واللون يضيف التأكيد فقط.',
    },
    {
      en: 'The truck and return icons flip in RTL.',
      ar: 'تنعكس أيقونتا الشاحنة والإرجاع في RTL.',
    },
  ],
};

const statuses: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'];

export function Default({ lang }: ExampleProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <StatusBadge key={status} status={status} labels={lang === 'ar' ? statusBadgeLabelsAr : undefined} />
      ))}
    </div>
  );
}
