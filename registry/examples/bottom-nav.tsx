import { HouseIcon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@phosphor-icons/react/ssr';
import { BottomNav, bottomNavLabelsAr } from '@/registry/ui/bottom-nav';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A tab bar fixed to the bottom of the screen on phones, with icons, labels and a badge count. It clears the device safe area.',
    ar: 'شريط تبويب ثابت أسفل الشاشة في الهواتف، بأيقونات وتسميات وعداد شارة. يتجنب المنطقة الآمنة في الجهاز.',
  },
  usage: `import { BottomNav } from "@/components/ui/bottom-nav"\n\n<BottomNav value="/cart" items={[{ href: "/", icon: <HouseIcon />, label: "Home" }, { href: "/cart", icon: <ShoppingCartIcon />, label: "Cart", badge: 2 }]} />`,
  examples: { Default: { en: 'Default (visible below 768px)', ar: 'افتراضي (يظهر تحت 768 بكسل)' } },
  accessibility: [
    {
      en: 'A nav landmark with a label. The current page has aria-current="page" and a bold label with a top bar, not color alone.',
      ar: 'معلم تنقل له تسمية. الصفحة الحالية عليها aria-current="page" وتسمية غليظة وخط علوي وليس اللون وحده.',
    },
    {
      en: 'The badge count is read as words, such as "3 new items", with Arabic plural forms. Items follow the reading direction.',
      ar: 'يُقرأ عداد الشارة كلمات مثل "3 عناصر جديدة" بصيغ الجمع العربية. وتتبع العناصر اتجاه القراءة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const t = (en: string, arabic: string) => (ar ? arabic : en);
  return (
    <div className="relative h-24 w-full max-w-sm overflow-hidden rounded-xl border">
      <BottomNav
        className="absolute md:block"
        lang={lang}
        labels={ar ? bottomNavLabelsAr : undefined}
        value="#home"
        items={[
          { href: '#home', icon: <HouseIcon aria-hidden="true" />, label: t('Home', 'الرئيسية') },
          { href: '#search', icon: <MagnifyingGlassIcon aria-hidden="true" />, label: t('Search', 'بحث') },
          { href: '#cart', icon: <ShoppingCartIcon aria-hidden="true" />, label: t('Cart', 'السلة'), badge: 3 },
          { href: '#account', icon: <UserIcon aria-hidden="true" />, label: t('Account', 'حسابي') },
        ]}
      />
    </div>
  );
}
