import { Badge } from '@/registry/ui/badge';
import { Button } from '@/registry/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/ui/card';
import { Input } from '@/registry/ui/input';
import { Label } from '@/registry/ui/label';
import { Price } from '@/registry/ui/price';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A surface that groups a header, content and footer. Two sizes and an optional header action.',
    ar: 'سطح يجمع رأسًا ومحتوى وتذييلًا. مقاسان وإجراء اختياري في الرأس.',
  },
  usage: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithAction: { en: 'With header action', ar: 'مع إجراء في الرأس' },
    Small: { en: 'Small size', ar: 'المقاس الصغير' },
  },
  accessibility: [
    { en: 'CardTitle renders a div: wrap it in a heading element when the card starts a section.', ar: 'يعرض CardTitle عنصر div: لفّه بعنصر عنوان عندما تبدأ البطاقة قسمًا.' },
    { en: 'Keep one primary action per card and put it in the footer.', ar: 'اجعل لكل بطاقة إجراءً رئيسيًا واحدًا وضعه في التذييل.' },
    { en: 'Header action and footer follow the inline direction, so they mirror in RTL.', ar: 'إجراء الرأس والتذييل يتبعان اتجاه السطر، فينعكسان في RTL.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{ar ? 'تسجيل الدخول' : 'Sign in'}</CardTitle>
        <CardDescription>{ar ? 'أدخل بريدك الإلكتروني للمتابعة.' : 'Enter your email to continue.'}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Label htmlFor="card-email">{ar ? 'البريد الإلكتروني' : 'Email'}</Label>
        <Input id="card-email" type="email" dir="ltr" placeholder="name@example.com" />
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">{ar ? 'إلغاء' : 'Cancel'}</Button>
        <Button>{ar ? 'متابعة' : 'Continue'}</Button>
      </CardFooter>
    </Card>
  );
}

export function WithAction({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{ar ? 'الاشتراك الشهري' : 'Monthly plan'}</CardTitle>
        <CardDescription>
          {ar ? 'يتجدد في ' : 'Renews on '}
          <bdi>{ar ? '١ يونيو' : 'Jun 1'}</bdi>
        </CardDescription>
        <CardAction>
          <Badge className="bg-success text-success-foreground">{ar ? 'نشط' : 'Active'}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-baseline gap-1">
        <Price amount={149} currency="SAR" lang={lang} className="text-2xl font-semibold" />
        <span className="text-muted-foreground">{ar ? '/ شهريًا' : '/ month'}</span>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          {ar ? 'إدارة الاشتراك' : 'Manage plan'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function Small({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const stats = [
    { label: ar ? 'المبيعات' : 'Sales', amount: 48250 },
    { label: ar ? 'المصروفات' : 'Expenses', amount: 12900 },
  ];
  return (
    <div className="grid w-full max-w-md gap-3 sm:grid-cols-2">
      {stats.map((s) => (
        <Card key={s.label} size="sm">
          <CardHeader>
            <CardDescription>{s.label}</CardDescription>
            <CardTitle className="text-xl">
              <Price amount={s.amount} currency="SAR" lang={lang} />
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
