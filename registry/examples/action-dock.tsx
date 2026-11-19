import {
  ClipboardTextIcon,
  FileTextIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  PlusIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@phosphor-icons/react/ssr';
import { ActionDock } from '@/registry/ui/action-dock';
import { bottomNavLabelsAr } from '@/registry/ui/bottom-nav';
import { Input } from '@/registry/ui/input';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A phone bottom dock, built on the bottom nav, where one item opens a tray right above it (search) or an action list from the inline end (a New button).',
    ar: 'شريط سفلي للهاتف مبني على شريط التنقل السفلي، يفتح فيه عنصر واحد درجًا فوقه مباشرة (البحث) أو قائمة إجراءات من نهاية السطر (زر جديد).',
  },
  usage: `import { ActionDock } from "@/components/ui/action-dock"\n\n<ActionDock\n  value="/"\n  items={[\n    { id: "home", href: "/", icon: <HouseIcon />, label: "Home" },\n    { id: "search", icon: <MagnifyingGlassIcon />, label: "Search", tray: <Input type="search" aria-label="Search" /> },\n    { id: "new", icon: <PlusIcon />, label: "New", actions: [{ id: "order", icon: <ClipboardTextIcon />, label: "New order", onSelect: createOrder }] },\n  ]}\n/>`,
  examples: {
    Default: { en: 'Search tray', ar: 'درج البحث' },
    CreateMenu: { en: 'Create menu', ar: 'قائمة الإنشاء' },
  },
  accessibility: [
    {
      en: 'Tray items are buttons with aria-expanded and aria-controls. The tray is a labelled region and focus moves into it when it opens. Escape, a tap outside or choosing an action closes it and focus returns to the item.',
      ar: 'عناصر الدرج أزرار عليها aria-expanded وaria-controls. الدرج منطقة لها تسمية ينتقل إليها التركيز عند فتحه. يغلقه Escape أو النقر خارجه أو اختيار إجراء ويعود التركيز إلى العنصر.',
    },
    {
      en: 'The action list sits at the inline end, under the New item: the right edge in English and the left edge in Arabic. It is a plain list of buttons, so Tab walks through it. The slide-up is off under reduced motion.',
      ar: 'تقع قائمة الإجراءات عند نهاية السطر، فوق عنصر جديد: الحافة اليمنى في الإنجليزية واليسرى في العربية. هي قائمة أزرار عادية فيتنقل بينها Tab. ينتهي الانزلاق للأعلى عند تقليل الحركة.',
    },
  ],
};

const frame = 'relative h-80 w-full max-w-sm overflow-hidden rounded-xl border bg-background';

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const t = (en: string, arabic: string) => (ar ? arabic : en);
  return (
    <div className={frame}>
      <ActionDock
        className="absolute md:block"
        trayClassName="absolute md:flex"
        lang={lang}
        labels={ar ? bottomNavLabelsAr : undefined}
        value="#home"
        defaultOpen="search"
        items={[
          { id: 'home', href: '#home', icon: <HouseIcon aria-hidden="true" />, label: t('Home', 'الرئيسية') },
          {
            id: 'search',
            icon: <MagnifyingGlassIcon aria-hidden="true" />,
            label: t('Search', 'بحث'),
            tray: <Input type="search" className="h-10" aria-label={t('Search the store', 'ابحث في المتجر')} placeholder={t('Search the store', 'ابحث في المتجر')} />,
          },
          { id: 'cart', href: '#cart', icon: <ShoppingCartIcon aria-hidden="true" />, label: t('Cart', 'السلة'), badge: 2 },
          { id: 'account', href: '#account', icon: <UserIcon aria-hidden="true" />, label: t('Account', 'حسابي') },
        ]}
      />
    </div>
  );
}

export function CreateMenu({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const t = (en: string, arabic: string) => (ar ? arabic : en);
  return (
    <div className={frame}>
      <ActionDock
        className="absolute md:block"
        trayClassName="absolute md:flex"
        lang={lang}
        labels={ar ? bottomNavLabelsAr : undefined}
        value="#home"
        defaultOpen="new"
        items={[
          { id: 'home', href: '#home', icon: <HouseIcon aria-hidden="true" />, label: t('Home', 'الرئيسية') },
          { id: 'orders', href: '#orders', icon: <PackageIcon aria-hidden="true" />, label: t('Orders', 'الطلبات') },
          {
            id: 'new',
            icon: (
              <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
                <PlusIcon aria-hidden="true" weight="bold" className="size-4" />
              </span>
            ),
            label: t('New', 'جديد'),
            actions: [
              { id: 'order', icon: <ClipboardTextIcon aria-hidden="true" />, label: t('New order', 'طلب جديد'), href: '#new-order' },
              { id: 'invoice', icon: <FileTextIcon aria-hidden="true" />, label: t('Tax invoice', 'فاتورة ضريبية'), href: '#new-invoice' },
              { id: 'product', icon: <PackageIcon aria-hidden="true" />, label: t('New product', 'منتج جديد'), href: '#new-product' },
            ],
          },
          { id: 'account', href: '#account', icon: <UserIcon aria-hidden="true" />, label: t('Account', 'حسابي') },
        ]}
      />
    </div>
  );
}
