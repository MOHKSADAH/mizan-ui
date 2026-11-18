import { Badge } from '@/registry/ui/badge';
import { Price } from '@/registry/ui/price';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/registry/ui/table';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A semantic table with a header, body, footer and caption. Numeric columns align to the inline end.',
    ar: 'جدول دلالي برأس وجسم وتذييل وتسمية توضيحية. الأعمدة الرقمية تُحاذى نحو نهاية السطر.',
  },
  usage: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableCaption>Recent invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead className="text-end">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell className="text-end">SAR 250</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  examples: {
    Default: { en: 'Invoices with footer total', ar: 'فواتير مع إجمالي في التذييل' },
    Status: { en: 'With status badges', ar: 'مع شارات الحالة' },
    Empty: { en: 'Empty state', ar: 'حالة فارغة' },
  },
  accessibility: [
    { en: 'Always add a TableCaption: it names the table for screen readers.', ar: 'أضف دائمًا TableCaption: فهو يسمّي الجدول لقارئات الشاشة.' },
    { en: 'Use text-end on number columns and their header, so the digits align and mirror in RTL.', ar: 'استخدم text-end على الأعمدة الرقمية ورأسها، لتتحاذى الأرقام وتنعكس في RTL.' },
    { en: 'Prices use the Price component, which speaks the amount with the currency name.', ar: 'تستخدم الأسعار المكوّن Price الذي ينطق المبلغ مع اسم العملة.' },
  ],
};

const HEAD = {
  en: { invoice: 'Invoice', status: 'Status', method: 'Method', amount: 'Amount' },
  ar: { invoice: 'الفاتورة', status: 'الحالة', method: 'طريقة الدفع', amount: 'المبلغ' },
};

const INVOICES = [
  { id: 'INV-001', status: 'paid', method: { en: 'Card', ar: 'بطاقة' }, amount: 250 },
  { id: 'INV-002', status: 'pending', method: { en: 'Bank transfer', ar: 'تحويل بنكي' }, amount: 1150 },
  { id: 'INV-003', status: 'overdue', method: { en: 'Cash', ar: 'نقدًا' }, amount: 430 },
] as const;

const STATUS = {
  paid: { en: 'Paid', ar: 'مدفوعة', className: 'bg-success text-success-foreground' },
  pending: { en: 'Pending', ar: 'قيد الانتظار', className: 'bg-warning text-warning-foreground' },
  overdue: { en: 'Overdue', ar: 'متأخرة', className: '' },
} as const;

export function Default({ lang }: ExampleProps) {
  const h = HEAD[lang];
  const total = INVOICES.reduce((sum, i) => sum + i.amount, 0);
  return (
    <div className="w-full max-w-xl">
      <Table>
        <TableCaption>{lang === 'ar' ? 'أحدث فواتير العملاء.' : 'A list of recent customer invoices.'}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{h.invoice}</TableHead>
            <TableHead>{h.method}</TableHead>
            <TableHead className="text-end">{h.amount}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.map((i) => (
            <TableRow key={i.id}>
              <TableCell className="font-medium">
                <bdi dir="ltr">{i.id}</bdi>
              </TableCell>
              <TableCell>{i.method[lang]}</TableCell>
              <TableCell className="text-end">
                <Price amount={i.amount} lang={lang} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>{lang === 'ar' ? 'الإجمالي' : 'Total'}</TableCell>
            <TableCell className="text-end">
              <Price amount={total} lang={lang} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export function Status({ lang }: ExampleProps) {
  const h = HEAD[lang];
  return (
    <div className="w-full max-w-xl">
      <Table>
        <TableCaption>{lang === 'ar' ? 'حالة الفواتير الأخيرة.' : 'Status of recent invoices.'}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{h.invoice}</TableHead>
            <TableHead>{h.status}</TableHead>
            <TableHead className="text-end">{h.amount}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.map((i) => (
            <TableRow key={i.id}>
              <TableCell className="font-medium">
                <bdi dir="ltr">{i.id}</bdi>
              </TableCell>
              <TableCell>
                <Badge variant={i.status === 'overdue' ? 'destructive' : 'default'} className={STATUS[i.status].className}>
                  {STATUS[i.status][lang]}
                </Badge>
              </TableCell>
              <TableCell className="text-end">
                <Price amount={i.amount} currency="AED" lang={lang} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function Empty({ lang }: ExampleProps) {
  const h = HEAD[lang];
  return (
    <div className="w-full max-w-xl">
      <Table>
        <TableCaption>{lang === 'ar' ? 'لا توجد فواتير بعد.' : 'No invoices yet.'}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{h.invoice}</TableHead>
            <TableHead>{h.status}</TableHead>
            <TableHead className="text-end">{h.amount}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
              {lang === 'ar' ? 'لم يتم إنشاء أي فاتورة.' : 'No invoices created.'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
