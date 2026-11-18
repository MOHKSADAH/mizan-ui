import {
  CreditCardIcon,
  EnvelopeIcon,
  GearIcon,
  KeyboardIcon,
  LifebuoyIcon,
  SignOutIcon,
  UserIcon,
  UsersIcon,
} from '@phosphor-icons/react/ssr';
import { Avatar, AvatarFallback } from '@/registry/ui/avatar';
import { Button } from '@/registry/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A menu of actions opened from a button. Supports groups, shortcuts, submenus, checkboxes and radio items.',
    ar: 'قائمة إجراءات تُفتح من زر. تدعم المجموعات والاختصارات والقوائم الفرعية وعناصر الاختيار المتعدد والمفرد.',
  },
  usage: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Checkboxes: { en: 'Checkboxes', ar: 'مربعات الاختيار' },
    RadioGroup: { en: 'Radio group', ar: 'مجموعة اختيار مفرد' },
    AvatarTrigger: { en: 'Avatar trigger', ar: 'زر بصورة شخصية' },
  },
  accessibility: [
    {
      en: 'Arrow keys move through items, Enter or Space selects, Escape closes, and typing jumps to a matching item.',
      ar: 'تتنقل مفاتيح الأسهم بين العناصر، ويحدد Enter أو Space، ويغلق Escape، والكتابة تنتقل إلى عنصر مطابق.',
    },
    {
      en: 'In Arabic the submenu opens toward the start and the arrow keys swap: ArrowLeft opens it, ArrowRight closes it.',
      ar: 'في العربية تُفتح القائمة الفرعية نحو البداية وتتبدل الأسهم: يفتحها السهم الأيسر ويغلقها السهم الأيمن.',
    },
    {
      en: 'Labels must sit inside a DropdownMenuGroup so assistive tech reads them as the group name.',
      ar: 'يجب أن توضع التسميات داخل DropdownMenuGroup لتقرأها التقنيات المساعدة كاسم للمجموعة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>{ar ? 'فتح القائمة' : 'Open menu'}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{ar ? 'حسابي' : 'My account'}</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon weight="regular" />
            {ar ? 'الملف الشخصي' : 'Profile'}
            <DropdownMenuShortcut>
              <bdi>Ctrl P</bdi>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon weight="regular" />
            {ar ? 'الفواتير' : 'Billing'}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GearIcon weight="regular" />
            {ar ? 'الإعدادات' : 'Settings'}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <KeyboardIcon weight="regular" />
            {ar ? 'اختصارات لوحة المفاتيح' : 'Keyboard shortcuts'}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UsersIcon weight="regular" />
            {ar ? 'الفريق' : 'Team'}
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <EnvelopeIcon weight="regular" />
              {ar ? 'دعوة مستخدمين' : 'Invite users'}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>{ar ? 'البريد الإلكتروني' : 'Email'}</DropdownMenuItem>
              <DropdownMenuItem>{ar ? 'رسالة' : 'Message'}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{ar ? 'المزيد...' : 'More...'}</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifebuoyIcon weight="regular" />
          {ar ? 'الدعم' : 'Support'}
        </DropdownMenuItem>
        <DropdownMenuItem disabled>{ar ? 'الواجهة البرمجية (غير متاحة)' : 'API (unavailable)'}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <SignOutIcon weight="regular" className="rtl:rotate-180" />
          {ar ? 'تسجيل الخروج' : 'Log out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Checkboxes({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>{ar ? 'خيارات العرض' : 'View options'}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{ar ? 'المظهر' : 'Appearance'}</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>{ar ? 'شريط الحالة' : 'Status bar'}</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>{ar ? 'شريط النشاط' : 'Activity bar'}</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem disabled>{ar ? 'اللوحة (غير متاحة)' : 'Panel (unavailable)'}</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RadioGroup({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>{ar ? 'موضع اللوحة' : 'Panel position'}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{ar ? 'موضع اللوحة' : 'Panel position'}</DropdownMenuLabel>
          <DropdownMenuRadioGroup defaultValue="bottom">
            <DropdownMenuRadioItem value="top">{ar ? 'أعلى' : 'Top'}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">{ar ? 'أسفل' : 'Bottom'}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="start">{ar ? 'البداية' : 'Start'}</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AvatarTrigger({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" className="rounded-full" aria-label={ar ? 'قائمة الحساب' : 'Account menu'} />}
      >
        <Avatar>
          <AvatarFallback>{ar ? 'سا' : 'SA'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{ar ? 'سارة العتيبي' : 'Sara Alotaibi'}</DropdownMenuLabel>
          <DropdownMenuItem>{ar ? 'الملف الشخصي' : 'Profile'}</DropdownMenuItem>
          <DropdownMenuItem>{ar ? 'الإعدادات' : 'Settings'}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">{ar ? 'تسجيل الخروج' : 'Log out'}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
