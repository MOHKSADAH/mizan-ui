import { CalendarBlankIcon, GearIcon, HouseIcon, TrayIcon } from '@phosphor-icons/react/ssr';
import type { ReactNode } from 'react';
import { formatNumber } from '@/registry/lib/format';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/registry/ui/sidebar';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A composable sidebar that collapses to icons, slides off-canvas, or becomes a sheet on mobile.',
    ar: 'شريط جانبي قابل للتركيب يطوى إلى أيقونات أو ينزلق خارج الشاشة أو يصبح ورقة منزلقة على الجوال.',
  },
  usage: `import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Home">Home</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
  </SidebarInset>
</SidebarProvider>`,
  examples: {
    Default: { en: 'Collapses to icons', ar: 'يطوى إلى أيقونات' },
    Static: { en: 'Fixed with a submenu and badge', ar: 'ثابت مع قائمة فرعية وشارة' },
    Floating: { en: 'Floating, off-canvas', ar: 'عائم، خارج الشاشة' },
  },
  accessibility: [
    {
      en: 'The toggle is a button with a screen-reader label. Press Ctrl or Cmd with B to toggle the sidebar.',
      ar: 'زر التبديل له تسمية لقارئات الشاشة. اضغط Ctrl أو Cmd مع B لتبديل الشريط الجانبي.',
    },
    {
      en: 'Below 768px the sidebar becomes a sheet with a title and description. Pass labels to translate them.',
      ar: 'تحت 768 بكسل يصبح الشريط الجانبي ورقة منزلقة بعنوان ووصف. مرّر labels لترجمتهما.',
    },
    {
      en: 'side is physical (left or right). In Arabic use side="right" so the sidebar sits at the reading start.',
      ar: 'قيمة side فعلية (left أو right). في العربية استخدم side="right" ليقع الشريط عند بداية القراءة.',
    },
    {
      en: 'In icon mode every menu button needs a tooltip so its name stays available when the text is hidden.',
      ar: 'في وضع الأيقونات يحتاج كل زر قائمة إلى tooltip ليبقى اسمه متاحًا عند إخفاء النص.',
    },
  ],
};

const NAV = [
  { en: 'Home', ar: 'الرئيسية', Icon: HouseIcon },
  { en: 'Inbox', ar: 'الوارد', Icon: TrayIcon },
  { en: 'Calendar', ar: 'التقويم', Icon: CalendarBlankIcon },
  { en: 'Settings', ar: 'الإعدادات', Icon: GearIcon },
];

// Contained demo: the sidebar is absolutely positioned inside a fixed-height box instead of the viewport.
function Frame({ children }: { children: ReactNode }) {
  return <div className="relative isolate h-80 w-full min-w-0 overflow-hidden rounded-lg border">{children}</div>;
}

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Frame>
      <SidebarProvider className="h-full min-h-0">
        <Sidebar
          collapsible="icon"
          side={ar ? 'right' : 'left'}
          className="absolute h-full"
          labels={ar ? { title: 'الشريط الجانبي', description: 'يعرض الشريط الجانبي للجوال.' } : undefined}
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{ar ? 'التطبيق' : 'Application'}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV.map(({ en, ar: arLabel, Icon }, i) => (
                    <SidebarMenuItem key={en}>
                      <SidebarMenuButton isActive={i === 0} tooltip={{ children: ar ? arLabel : en, side: ar ? 'left' : 'right' }}>
                        <Icon weight="regular" />
                        <span>{ar ? arLabel : en}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail labels={ar ? { toggle: 'تبديل الشريط الجانبي' } : undefined} />
        </Sidebar>
        <SidebarInset className="min-h-0">
          <header className="flex h-12 items-center gap-2 border-b px-3">
            <SidebarTrigger labels={ar ? { toggle: 'تبديل الشريط الجانبي' } : undefined} />
            <span className="text-sm font-medium">{ar ? 'لوحة التحكم' : 'Dashboard'}</span>
          </header>
          <p className="p-4 text-sm text-muted-foreground">
            {ar ? 'اضغط الزر لطي الشريط الجانبي إلى أيقونات.' : 'Press the button to collapse the sidebar to icons.'}
          </p>
        </SidebarInset>
      </SidebarProvider>
    </Frame>
  );
}

export function Static({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Frame>
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="none" className="w-44 border-e sm:w-(--sidebar-width)">
          <SidebarHeader>
            <p className="px-2 text-sm font-semibold">{ar ? 'ميزان' : 'Mizan'}</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{ar ? 'التنقل' : 'Navigate'}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <TrayIcon weight="regular" />
                      <span>{ar ? 'الوارد' : 'Inbox'}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{formatNumber(12, { lang })}</SidebarMenuBadge>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton render={<button type="button" />}>
                          <span>{ar ? 'غير مقروء' : 'Unread'}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton render={<button type="button" />}>
                          <span>{ar ? 'مميّز بنجمة' : 'Starred'}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <CalendarBlankIcon weight="regular" />
                      <span>{ar ? 'التقويم' : 'Calendar'}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <GearIcon weight="regular" />
                  <span>{ar ? 'الإعدادات' : 'Settings'}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="min-h-0">
          <p className="p-4 text-sm text-muted-foreground">
            {ar ? 'شريط جانبي ثابت يتبع اتجاه الصفحة.' : 'A fixed sidebar that follows the page direction.'}
          </p>
        </SidebarInset>
      </SidebarProvider>
    </Frame>
  );
}

export function Floating({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Frame>
      <SidebarProvider className="h-full min-h-0">
        <Sidebar variant="floating" side={ar ? 'right' : 'left'} className="absolute h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV.map(({ en, ar: arLabel, Icon }) => (
                    <SidebarMenuItem key={en}>
                      <SidebarMenuButton>
                        <Icon weight="regular" />
                        <span>{ar ? arLabel : en}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="min-h-0">
          <header className="flex h-12 items-center gap-2 border-b px-3">
            <SidebarTrigger labels={ar ? { toggle: 'تبديل الشريط الجانبي' } : undefined} />
            <span className="text-sm font-medium">{ar ? 'عائم' : 'Floating'}</span>
          </header>
          <p className="p-4 text-sm text-muted-foreground">
            {ar ? 'يخرج هذا الشريط خارج الشاشة عند الطي.' : 'This sidebar slides off-canvas when collapsed.'}
          </p>
        </SidebarInset>
      </SidebarProvider>
    </Frame>
  );
}
