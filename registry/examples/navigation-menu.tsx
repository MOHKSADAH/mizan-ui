import { BookOpenIcon, CodeIcon, LayoutIcon } from '@phosphor-icons/react/ssr';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/registry/ui/navigation-menu';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A set of site navigation links with optional flyout panels. Built on Base UI Navigation Menu.',
    ar: 'مجموعة روابط تنقل للموقع مع لوحات منسدلة اختيارية. مبنية على Navigation Menu من Base UI.',
  },
  usage: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink render={<a href="/docs" />}>Introduction</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    WithIcons: { en: 'Links with icons', ar: 'روابط مع أيقونات' },
    LinksOnly: { en: 'Links only', ar: 'روابط فقط' },
  },
  accessibility: [
    {
      en: 'Renders a nav landmark. Triggers are buttons: Enter or Space opens the panel and Escape closes it.',
      ar: 'يعرض معلم nav. المشغّلات أزرار: يفتح Enter أو Space اللوحة ويغلقها Escape.',
    },
    {
      en: 'Left and Right arrows move between top-level items and swap in RTL, so the order follows the reading direction.',
      ar: 'تنقل الأسهم اليسرى واليمنى بين العناصر العليا وتتبدل في RTL ليتبع الترتيب اتجاه القراءة.',
    },
    {
      en: 'Use real links (render an anchor) so navigation works without JavaScript.',
      ar: 'استخدم روابط حقيقية (اعرض anchor) ليعمل التنقل دون JavaScript.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const base = ar ? '/ar' : '';
  return (
    <div className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{ar ? 'البدء' : 'Getting started'}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-72 gap-1">
                <li>
                  <NavigationMenuLink render={<a href={`${base}/docs`} className="flex-col items-start gap-0.5" />}>
                    <span className="font-medium">{ar ? 'المقدمة' : 'Introduction'}</span>
                    <span className="text-muted-foreground">
                      {ar ? 'مكوّنات قابلة لإعادة الاستخدام ومتوافقة مع RTL.' : 'Reusable, RTL-ready components.'}
                    </span>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink render={<a href={`${base}/docs/installation`} className="flex-col items-start gap-0.5" />}>
                    <span className="font-medium">{ar ? 'التثبيت' : 'Installation'}</span>
                    <span className="text-muted-foreground">
                      {ar ? 'أضف المكوّنات إلى مشروعك بأمر واحد.' : 'Add components to your project with one command.'}
                    </span>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{ar ? 'المكوّنات' : 'Components'}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-72 gap-1">
                <li>
                  <NavigationMenuLink render={<a href={`${base}/docs/components/dialog`} />}>{ar ? 'نافذة حوار' : 'Dialog'}</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink render={<a href={`${base}/docs/components/tabs`} />}>{ar ? 'تبويبات' : 'Tabs'}</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink render={<a href={`${base}/docs/components/tooltip`} />}>{ar ? 'تلميح' : 'Tooltip'}</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<a href={`${base}/docs`} />}>
              {ar ? 'التوثيق' : 'Docs'}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export function WithIcons({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const base = ar ? '/ar' : '';
  return (
    <div className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{ar ? 'الموارد' : 'Resources'}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-56 gap-1">
                <li>
                  <NavigationMenuLink render={<a href={`${base}/docs`} />}>
                    <BookOpenIcon weight="regular" />
                    {ar ? 'التوثيق' : 'Documentation'}
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink render={<a href={`${base}/docs/components`} />}>
                    <LayoutIcon weight="regular" />
                    {ar ? 'المكوّنات' : 'Components'}
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink render={<a href={`${base}/docs/blocks`} />}>
                    <CodeIcon weight="regular" />
                    {ar ? 'القوالب' : 'Blocks'}
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export function LinksOnly({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const base = ar ? '/ar' : '';
  return (
    <div className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          {[
            { href: '/docs', en: 'Docs', ar: 'التوثيق' },
            { href: '/docs/components', en: 'Components', ar: 'المكوّنات' },
            { href: '/docs/themes', en: 'Themes', ar: 'الثيمات' },
          ].map((l) => (
            <NavigationMenuItem key={l.href}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<a href={`${base}${l.href}`} />}>
                {l[lang]}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
