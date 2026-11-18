import { formatNumber } from '@/registry/lib/format';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationLabelsAr,
} from '@/registry/ui/pagination';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Page navigation with previous, next and numbered links. The arrows flip in RTL.',
    ar: 'تنقل بين الصفحات بروابط السابق والتالي وأرقام الصفحات. تنعكس الأسهم في RTL.',
  },
  usage: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Simple: { en: 'Previous and next only', ar: 'السابق والتالي فقط' },
    Compact: { en: 'Compact', ar: 'مضغوط' },
  },
  accessibility: [
    {
      en: 'Renders a nav with aria-label. Pass paginationLabelsAr to the labels prop so the label and the arrow links are read in Arabic.',
      ar: 'يعرض nav مع aria-label. مرّر paginationLabelsAr إلى الخاصية labels لتُقرأ التسمية وروابط الأسهم بالعربية.',
    },
    {
      en: 'The active page uses aria-current="page". The ellipsis is hidden from assistive tech but has screen-reader text.',
      ar: 'تستخدم الصفحة النشطة aria-current="page". علامة الحذف مخفية عن التقنيات المساعدة وفيها نص لقارئات الشاشة.',
    },
    {
      en: 'Previous and next carry rtl:rotate-180, so previous always points toward the reading start.',
      ar: 'يحمل السابق والتالي rtl:rotate-180، فيشير السابق دائمًا نحو بداية القراءة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const labels = ar ? paginationLabelsAr : undefined;
  return (
    <Pagination labels={labels}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" labels={labels} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{formatNumber(1, { lang })}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {formatNumber(2, { lang })}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{formatNumber(3, { lang })}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis labels={labels} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" labels={labels} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function Simple({ lang }: ExampleProps) {
  const labels = lang === 'ar' ? paginationLabelsAr : undefined;
  return (
    <Pagination labels={labels}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" labels={labels} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" labels={labels} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function Compact({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const labels = ar ? paginationLabelsAr : undefined;
  return (
    <Pagination labels={labels}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text="" labels={labels} className="px-2!" />
        </PaginationItem>
        <PaginationItem>
          <span className="px-2 text-sm text-muted-foreground">
            {ar ? `الصفحة ${formatNumber(2, { lang })} من ${formatNumber(10, { lang })}` : 'Page 2 of 10'}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" text="" labels={labels} className="px-2!" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
