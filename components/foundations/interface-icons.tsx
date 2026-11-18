'use client';

import {
  ArrowRightIcon,
  BellIcon,
  CameraIcon,
  ChartBarIcon,
  ChartLineUpIcon,
  CheckIcon,
  CreditCardIcon,
  GearIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  ReceiptIcon,
  ShoppingCartIcon,
  StarIcon,
  StorefrontIcon,
  TableIcon,
  TagIcon,
  TruckIcon,
  UserIcon,
  WalletIcon,
  DeviceMobileIcon,
  XIcon,
  type Icon,
  type IconWeight,
} from '@phosphor-icons/react';
import { CH, type Lang } from '@/lib/strings';
import { useSettings } from '@/components/settings';
import { cn } from '@/registry/lib/utils';

const ICONS: [string, Icon][] = [
  ['shopping-cart', ShoppingCartIcon], ['heart', HeartIcon], ['magnifying-glass', MagnifyingGlassIcon], ['user', UserIcon],
  ['bell', BellIcon], ['package', PackageIcon], ['credit-card', CreditCardIcon], ['truck', TruckIcon],
  ['tag', TagIcon], ['storefront', StorefrontIcon], ['receipt', ReceiptIcon], ['gear', GearIcon],
  ['star', StarIcon], ['camera', CameraIcon], ['wallet', WalletIcon], ['device-mobile', DeviceMobileIcon],
  ['chart-bar', ChartBarIcon], ['chart-line-up', ChartLineUpIcon], ['table', TableIcon], ['check', CheckIcon],
  ['plus', PlusIcon], ['minus', MinusIcon], ['x', XIcon], ['arrow-right', ArrowRightIcon],
];

const STYLES: IconWeight[] = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'];
const STRIP: [string, Icon][] = ICONS.filter(([k]) => ['shopping-cart', 'heart', 'bell'].includes(k));

function Cell({ name, children, active }: { name: string; children: React.ReactNode; active?: boolean }) {
  return (
    <li className={cn('grid justify-items-center gap-2 rounded-lg border p-3', active && 'border-foreground')}>
      {children}
      <span dir="ltr" className="max-w-full truncate text-xs text-muted-foreground">
        {name}
      </span>
    </li>
  );
}

export function InterfaceIcons({ lang, stylesLabel }: { lang: Lang; stylesLabel: string }) {
  const { iconWeight } = useSettings();
  const labels = CH[lang].weights as Record<string, string>;
  return (
    <div className="grid gap-8">
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {ICONS.map(([name, Glyph]) => (
          <Cell key={name} name={name}>
            <Glyph size={24} weight={iconWeight} className={cn(name === 'arrow-right' && 'rtl:rotate-180')} aria-hidden="true" />
          </Cell>
        ))}
      </ul>
      <section aria-labelledby="icon-styles" className="grid gap-3">
        <h3 id="icon-styles" className="text-sm font-medium">
          {stylesLabel}
        </h3>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STYLES.map((w) => (
            <Cell key={w} name={labels[w] ?? w} active={w === iconWeight}>
              <div className="flex gap-3">
                {STRIP.map(([name, Glyph]) => (
                  <Glyph key={name} size={24} weight={w} aria-hidden="true" />
                ))}
              </div>
            </Cell>
          ))}
        </ul>
      </section>
    </div>
  );
}
