import { ArrowUpRightIcon, FolderOpenIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/registry/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/registry/ui/empty';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'The state of a list or page with nothing to show yet. Say what is missing and what to do next.',
    ar: 'حالة قائمة أو صفحة لا تحتوي شيئًا بعد. اذكر ما هو مفقود وما الخطوة التالية.',
  },
  usage: `import { FolderOpenIcon } from "@phosphor-icons/react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <FolderOpenIcon />
    </EmptyMedia>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>Create a project to get started.</EmptyDescription>
  </EmptyHeader>
</Empty>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Outline: { en: 'Outline', ar: 'بإطار' },
    NoResults: { en: 'No results', ar: 'لا نتائج' },
    Cart: { en: 'Empty cart', ar: 'سلة فارغة' },
  },
  accessibility: [
    { en: 'The icon is decorative: the title and description carry the meaning.', ar: 'الأيقونة زخرفية: العنوان والوصف ينقلان المعنى.' },
    { en: 'Always offer a next step, such as a button or a link.', ar: 'قدّم دائمًا خطوة تالية، مثل زر أو رابط.' },
    { en: 'Use a heading element inside EmptyTitle when the empty state fills a page section.', ar: 'استخدم عنصر عنوان داخل EmptyTitle عندما تملأ الحالة الفارغة قسمًا في الصفحة.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon weight="regular" aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{ar ? 'لا توجد منتجات بعد' : 'No products yet'}</EmptyTitle>
        <EmptyDescription>{ar ? 'أضف أول منتج لمتجرك ليبدأ العملاء بالتسوق.' : 'Add your first product so customers can start shopping.'}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>{ar ? 'إضافة منتج' : 'Add product'}</Button>
          <Button variant="outline">{ar ? 'استيراد' : 'Import'}</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}

export function Outline({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Empty className="max-w-md border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon weight="regular" aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{ar ? 'لا توجد ملفات' : 'No files'}</EmptyTitle>
        <EmptyDescription>{ar ? 'اسحب الملفات إلى هنا أو اخترها من جهازك.' : 'Drag files here or choose them from your device.'}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          {ar ? 'رفع ملف' : 'Upload file'}
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export function NoResults({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MagnifyingGlassIcon weight="regular" aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{ar ? 'لا توجد نتائج' : 'No results found'}</EmptyTitle>
        <EmptyDescription>{ar ? 'جرّب كلمات بحث أخرى أو أزل عوامل التصفية.' : 'Try different keywords or remove some filters.'}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          {ar ? 'مسح عوامل التصفية' : 'Clear filters'}
        </Button>
        <Button variant="link" size="sm" render={<a href="#" />}>
          {ar ? 'تعرّف على البحث' : 'Learn about search'}
          <ArrowUpRightIcon weight="regular" data-icon="inline-end" className="rtl:-scale-x-100" />
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export function Cart({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Empty className="max-w-md border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCartIcon weight="regular" aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{ar ? 'سلتك فارغة' : 'Your cart is empty'}</EmptyTitle>
        <EmptyDescription>{ar ? 'أضف منتجات إلى السلة وستظهر هنا.' : 'Add products to your cart and they appear here.'}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">{ar ? 'تصفّح المنتجات' : 'Browse products'}</Button>
      </EmptyContent>
    </Empty>
  );
}
