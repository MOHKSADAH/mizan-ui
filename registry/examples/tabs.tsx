import { ChartBarIcon, GearIcon } from '@phosphor-icons/react/ssr';
import { Input } from '@/registry/ui/input';
import { Label } from '@/registry/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Layered sections of content, one visible at a time. Switch with a click or the arrow keys.',
    ar: 'أقسام محتوى متعاقبة يظهر واحد منها في كل مرة. بدّل بالنقر أو بمفاتيح الأسهم.',
  },
  usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings.</TabsContent>
  <TabsContent value="password">Password settings.</TabsContent>
</Tabs>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Line: { en: 'Line variant', ar: 'النمط الخطي' },
    Vertical: { en: 'Vertical', ar: 'عمودي' },
    WithIcons: { en: 'With icons and a disabled tab', ar: 'مع أيقونات وتبويب معطّل' },
  },
  accessibility: [
    {
      en: 'Uses the tablist, tab and tabpanel roles. Left and Right arrows move between tabs (Up and Down when vertical).',
      ar: 'يستخدم أدوار tablist وtab وtabpanel. تنقل الأسهم اليسرى واليمنى بين التبويبات (والعليا والسفلى عند العمودي).',
    },
    {
      en: 'In RTL the arrow keys follow the layout: Right moves to the previous tab.',
      ar: 'في RTL تتبع الأسهم التخطيط: ينقل السهم الأيمن إلى التبويب السابق.',
    },
    {
      en: 'Tab order starts on the active tab and then goes into the panel.',
      ar: 'يبدأ ترتيب Tab من التبويب النشط ثم ينتقل إلى اللوحة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Tabs defaultValue="account" className="mx-auto w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="account">{ar ? 'الحساب' : 'Account'}</TabsTrigger>
        <TabsTrigger value="password">{ar ? 'كلمة المرور' : 'Password'}</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="grid gap-3 rounded-lg border p-4">
        <div className="grid gap-1.5">
          <Label htmlFor="tabs-name">{ar ? 'الاسم' : 'Name'}</Label>
          <Input id="tabs-name" defaultValue={ar ? 'سارة العتيبي' : 'Sara Alotaibi'} />
        </div>
      </TabsContent>
      <TabsContent value="password" className="grid gap-3 rounded-lg border p-4">
        <div className="grid gap-1.5">
          <Label htmlFor="tabs-password">{ar ? 'كلمة المرور الجديدة' : 'New password'}</Label>
          <Input id="tabs-password" type="password" dir="ltr" />
        </div>
      </TabsContent>
    </Tabs>
  );
}

export function Line({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Tabs defaultValue="overview" className="mx-auto w-full max-w-sm">
      <TabsList variant="line">
        <TabsTrigger value="overview">{ar ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
        <TabsTrigger value="analytics">{ar ? 'التحليلات' : 'Analytics'}</TabsTrigger>
        <TabsTrigger value="reports">{ar ? 'التقارير' : 'Reports'}</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-muted-foreground">
        {ar ? 'ملخص أداء المتجر هذا الأسبوع.' : 'A summary of store performance this week.'}
      </TabsContent>
      <TabsContent value="analytics" className="text-muted-foreground">
        {ar ? 'الزيارات والتحويلات حسب القناة.' : 'Visits and conversions by channel.'}
      </TabsContent>
      <TabsContent value="reports" className="text-muted-foreground">
        {ar ? 'تقارير جاهزة للتنزيل.' : 'Reports ready to download.'}
      </TabsContent>
    </Tabs>
  );
}

export function Vertical({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Tabs defaultValue="general" orientation="vertical" className="mx-auto w-full max-w-md items-start">
      <TabsList>
        <TabsTrigger value="general">{ar ? 'عام' : 'General'}</TabsTrigger>
        <TabsTrigger value="security">{ar ? 'الأمان' : 'Security'}</TabsTrigger>
        <TabsTrigger value="billing">{ar ? 'الفوترة' : 'Billing'}</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="text-muted-foreground">
        {ar ? 'الإعدادات العامة للحساب.' : 'General account settings.'}
      </TabsContent>
      <TabsContent value="security" className="text-muted-foreground">
        {ar ? 'كلمة المرور والمصادقة الثنائية.' : 'Password and two-factor authentication.'}
      </TabsContent>
      <TabsContent value="billing" className="text-muted-foreground">
        {ar ? 'الفواتير وطرق الدفع.' : 'Invoices and payment methods.'}
      </TabsContent>
    </Tabs>
  );
}

export function WithIcons({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Tabs defaultValue="chart" className="mx-auto w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="chart">
          <ChartBarIcon weight="regular" />
          {ar ? 'الرسم' : 'Chart'}
        </TabsTrigger>
        <TabsTrigger value="settings">
          <GearIcon weight="regular" />
          {ar ? 'الإعدادات' : 'Settings'}
        </TabsTrigger>
        <TabsTrigger value="archive" disabled>
          {ar ? 'الأرشيف' : 'Archive'}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="chart" className="text-muted-foreground">
        {ar ? 'عرض المبيعات الشهرية.' : 'Monthly sales view.'}
      </TabsContent>
      <TabsContent value="settings" className="text-muted-foreground">
        {ar ? 'خيارات الرسم البياني.' : 'Chart options.'}
      </TabsContent>
    </Tabs>
  );
}
