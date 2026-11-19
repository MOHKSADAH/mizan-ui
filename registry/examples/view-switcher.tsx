import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';
import { ViewSwitcherDemo } from './view-switcher.client';

export const doc: ExampleDoc = {
  description: {
    en: 'A list, grid and compact toggle built on the segmented control, plus ViewItems to render your items in the chosen layout. The change glides with a view transition where the browser has one.',
    ar: 'مبدّل بين القائمة والشبكة والعرض المضغوط مبني على التحكم المقسّم، مع ViewItems لعرض عناصرك بالتخطيط المختار. ينساب التغيير بانتقال العرض حيث يدعمه المتصفح.',
  },
  usage: `import { ViewItems, ViewSwitcher } from "@/components/ui/view-switcher"\n\nconst [view, setView] = useState<ViewMode>("list")\n\n<ViewSwitcher value={view} onValueChange={setView} />\n<ViewItems view={view} items={products} getKey={(p) => p.id}>\n  {(p, view) => (view === "grid" ? <ProductCard {...p} /> : <ProductRow {...p} />)}\n</ViewItems>`,
  examples: {
    Default: { en: 'List, grid and compact', ar: 'قائمة وشبكة ومضغوط' },
    Grid: { en: 'Starting on the grid', ar: 'البدء بالشبكة' },
  },
  accessibility: [
    {
      en: 'The buttons form a labelled group and each is a toggle button with a text name (the icon is decorative). Left and Right move between them, and the chosen one has aria-pressed.',
      ar: 'تشكّل الأزرار مجموعة لها تسمية، وكل زر منها زر تبديل باسم نصي (الأيقونة للزينة). ينتقل اليسار واليمين بينها، وعلى الزر المختار aria-pressed.',
    },
    {
      en: 'View transitions are used only where document.startViewTransition exists and reduced motion is off. Otherwise the layout changes at once. The items keep the same order in every layout.',
      ar: 'تُستخدم انتقالات العرض فقط حيث يوجد document.startViewTransition وحين لا يكون تقليل الحركة مفعّلًا، وإلا يتغير التخطيط فورًا. تحافظ العناصر على الترتيب نفسه في كل تخطيط.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <ViewSwitcherDemo lang={lang} />;
}

export function Grid({ lang }: ExampleProps) {
  return <ViewSwitcherDemo lang={lang} defaultView="grid" />;
}
