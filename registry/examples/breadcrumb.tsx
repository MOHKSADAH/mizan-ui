import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  breadcrumbLabelsAr,
} from '@/registry/ui/breadcrumb';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/registry/ui/dropdown-menu';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'The path to the current page, as a list of links. The default separator flips in RTL.',
    ar: 'مسار الصفحة الحالية على شكل قائمة روابط. ينعكس الفاصل الافتراضي في RTL.',
  },
  usage: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<a href="/" />}>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    CustomSeparator: { en: 'Custom separator', ar: 'فاصل مخصص' },
    Collapsed: { en: 'Collapsed with a menu', ar: 'مطوي مع قائمة' },
  },
  accessibility: [
    {
      en: 'Renders a nav with aria-label and an ordered list. Pass breadcrumbLabelsAr to the labels prop in Arabic.',
      ar: 'يعرض nav مع aria-label وقائمة مرتبة. مرّر breadcrumbLabelsAr إلى الخاصية labels في العربية.',
    },
    {
      en: 'The current page uses aria-current="page" and is not a link.',
      ar: 'تستخدم الصفحة الحالية aria-current="page" وليست رابطًا.',
    },
    {
      en: 'Separators are decorative (aria-hidden). Chevron separators carry rtl:rotate-180; a slash does not need it.',
      ar: 'الفواصل زخرفية (aria-hidden). تحمل فواصل السهم rtl:rotate-180 أما الشرطة المائلة فلا تحتاجها.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const base = ar ? '/ar' : '';
  return (
    <Breadcrumb labels={ar ? breadcrumbLabelsAr : undefined}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href={`${base}/`} />}>{ar ? 'الرئيسية' : 'Home'}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href={`${base}/docs/components`} />}>{ar ? 'المكوّنات' : 'Components'}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{ar ? 'مسار التنقل' : 'Breadcrumb'}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function CustomSeparator({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const base = ar ? '/ar' : '';
  return (
    <Breadcrumb labels={ar ? breadcrumbLabelsAr : undefined}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href={`${base}/`} />}>{ar ? 'الرئيسية' : 'Home'}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href={`${base}/docs/components`} />}>{ar ? 'المكوّنات' : 'Components'}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{ar ? 'مسار التنقل' : 'Breadcrumb'}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function Collapsed({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const base = ar ? '/ar' : '';
  return (
    <Breadcrumb labels={ar ? breadcrumbLabelsAr : undefined}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href={`${base}/`} />}>{ar ? 'الرئيسية' : 'Home'}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-1 rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label={ar ? breadcrumbLabelsAr.more : 'More'}
            >
              <BreadcrumbEllipsis labels={ar ? breadcrumbLabelsAr : undefined} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem>{ar ? 'التوثيق' : 'Documentation'}</DropdownMenuItem>
              <DropdownMenuItem>{ar ? 'الأمثلة' : 'Examples'}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href={`${base}/docs/components`} />}>{ar ? 'المكوّنات' : 'Components'}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{ar ? 'مسار التنقل' : 'Breadcrumb'}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
