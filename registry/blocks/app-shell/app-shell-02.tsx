"use client"

import * as React from "react"
import {
  ChartBarIcon,
  GearIcon,
  HouseIcon,
  MegaphoneIcon,
  PackageIcon,
  ShoppingBagIcon,
  SignOutIcon,
  UserIcon,
  UsersIcon,
  type Icon,
} from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { type Lang } from "@/registry/lib/format"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/ui/breadcrumb"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Input } from "@/registry/ui/input"
import { Price } from "@/registry/ui/price"
import { Separator } from "@/registry/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/ui/sidebar"

export type AppShell02Labels = {
  skipToContent: string
  mainNav: string
  sidebarDescription: string
  toggleSidebar: string
  breadcrumb: string
  search: string
  userMenu: string
}

export const labelsEn: AppShell02Labels = {
  skipToContent: "Skip to content",
  mainNav: "Main navigation",
  sidebarDescription: "Main navigation links.",
  toggleSidebar: "Toggle sidebar",
  breadcrumb: "Breadcrumb",
  search: "Search",
  userMenu: "Account menu",
}

export const labelsAr: AppShell02Labels = {
  skipToContent: "تخطي إلى المحتوى",
  mainNav: "التنقل الرئيسي",
  sidebarDescription: "روابط التنقل الرئيسية.",
  toggleSidebar: "تبديل الشريط الجانبي",
  breadcrumb: "مسار التنقل",
  search: "بحث",
  userMenu: "قائمة الحساب",
}

export type ShellNavItem = { id: string; label: string; href: string; icon: Icon; badge?: string }
export type ShellNavGroup = { label?: string; items: ShellNavItem[] }
export type ShellMenuItem = { label: string; href?: string; icon?: Icon; destructive?: boolean; onSelect?: () => void }

export type AppShell02Props = {
  lang?: Lang
  labels?: Partial<AppShell02Labels>
  className?: string
  brand: { name: string; plan?: string }
  nav: ShellNavGroup[]
  activeId: string
  user: { name: string; email: string; menu: ShellMenuItem[] }
  breadcrumbs: { label: string; href?: string }[]
  defaultCollapsed?: boolean
  children?: React.ReactNode
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => [...word][0])
    .join("")

// The sidebar collapses to an icon rail. The shell is a bounded frame so the fixed sidebar stays inside it. For a full page pass className="h-svh rounded-none border-0".
export function AppShell02({
  lang = "en",
  labels,
  className,
  brand,
  nav,
  activeId,
  user,
  breadcrumbs,
  defaultCollapsed,
  children,
}: AppShell02Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  return (
    <div
      dir={dir}
      className={cn("relative h-[44rem] max-h-svh transform-gpu overflow-hidden rounded-xl border bg-background", className)}
    >
      <a
        href="#main-content"
        className="sr-only z-20 rounded-md bg-background px-3 py-2 text-sm focus:not-sr-only focus:absolute focus:start-2 focus:top-2"
      >
        {t.skipToContent}
      </a>
      <SidebarProvider defaultOpen={!defaultCollapsed} className="h-full min-h-0">
        <Sidebar
          dir={dir}
          side={dir === "rtl" ? "right" : "left"}
          collapsible="icon"
          className="h-full"
          labels={{ title: brand.name, description: t.sidebarDescription }}
        >
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground"
              >
                {[...brand.name][0]}
              </span>
              <div className="grid min-w-0 text-start leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-medium">{brand.name}</span>
                {brand.plan ? <span className="truncate text-xs text-sidebar-foreground/70">{brand.plan}</span> : null}
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent role="navigation" aria-label={t.mainNav}>
            {nav.map((group, index) => (
              <SidebarGroup key={group.label ?? index}>
                {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={item.id === activeId}
                          aria-current={item.id === activeId ? "page" : undefined}
                          tooltip={{ children: item.label, side: dir === "rtl" ? "left" : "right" }}
                          render={<a href={item.href} />}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                        {item.badge ? (
                          <>
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                            <span className="pointer-events-none absolute end-1 top-1 hidden size-2 rounded-full bg-primary group-data-[collapsible=icon]:block">
                              <span className="sr-only">{item.badge}</span>
                            </span>
                          </>
                        ) : null}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="h-full min-h-0 min-w-0">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger labels={{ toggle: t.toggleSidebar }} />
            <Separator orientation="vertical" className="h-4" />
            <Breadcrumb labels={{ label: t.breadcrumb }} className="min-w-0">
              <BreadcrumbList className="flex-nowrap">
                {breadcrumbs.map((crumb, index) => {
                  const last = index === breadcrumbs.length - 1
                  return (
                    <React.Fragment key={crumb.label}>
                      <BreadcrumbItem className={cn("min-w-0", !last && "hidden sm:inline-flex")}>
                        {last ? (
                          <BreadcrumbPage className="truncate">{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink render={<a href={crumb.href ?? "#"} />}>{crumb.label}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {last ? null : <BreadcrumbSeparator className="hidden sm:flex" />}
                    </React.Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ms-auto flex items-center gap-2">
              <Input type="search" aria-label={t.search} placeholder={t.search} className="hidden w-52 md:block" />
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={t.userMenu} />}>
                  <Avatar size="sm">
                    <AvatarFallback>{initials(user.name)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" dir={dir} className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="grid text-start font-normal">
                      <span className="text-sm font-medium text-foreground">{user.name}</span>
                      <bdi dir="ltr" className="truncate text-start">
                        {user.email}
                      </bdi>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  {user.menu.map((entry) => (
                    <DropdownMenuItem
                      key={entry.label}
                      variant={entry.destructive ? "destructive" : "default"}
                      onClick={entry.onSelect}
                      render={entry.href ? <a href={entry.href} /> : undefined}
                    >
                      {entry.icon ? <entry.icon /> : null}
                      {entry.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          {/* Pages are blocks and bring their own Container, so the shell adds no padding of its own. */}
          <div id="main-content" tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto outline-none">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default AppShell02

type SampleProps = {
  lang: Lang
  title: string
  description: string
  stats: { label: string; value: number }[]
  list: { title: string; rows: { primary: string; secondary: string }[] }
}

function Sample({ lang, title, description, stats, list }: SampleProps) {
  return (
    <Container size="wide" className="flex flex-col gap-6 py-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <CardHeader>
              <CardTitle className="text-muted-foreground">{stat.label}</CardTitle>
              <p className="text-2xl font-semibold tabular-nums">
                <Price amount={stat.value} lang={lang} />
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{list.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid divide-y">
          {list.rows.map((row) => (
            <div key={row.primary} className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
              <span className="truncate font-medium">{row.primary}</span>
              <span className="shrink-0 text-muted-foreground">{row.secondary}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </Container>
  )
}

export const demo: { en: AppShell02Props; ar: AppShell02Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    brand: { name: "Mizan Store", plan: "Pro plan" },
    nav: [
      {
        label: "Main",
        items: [
          { id: "overview", label: "Overview", href: "#overview", icon: HouseIcon },
          { id: "orders", label: "Orders", href: "#orders", icon: ShoppingBagIcon, badge: "12" },
          { id: "products", label: "Products", href: "#products", icon: PackageIcon },
          { id: "customers", label: "Customers", href: "#customers", icon: UsersIcon },
        ],
      },
      {
        label: "Manage",
        items: [
          { id: "analytics", label: "Analytics", href: "#analytics", icon: ChartBarIcon },
          { id: "marketing", label: "Marketing", href: "#marketing", icon: MegaphoneIcon },
          { id: "settings", label: "Settings", href: "#settings", icon: GearIcon },
        ],
      },
    ],
    activeId: "orders",
    defaultCollapsed: true,
    user: {
      name: "Sara Al-Otaibi",
      email: "sara@mizan-store.sa",
      menu: [
        { label: "Profile", href: "#profile", icon: UserIcon },
        { label: "Settings", href: "#settings", icon: GearIcon },
        { label: "Sign out", icon: SignOutIcon, destructive: true },
      ],
    },
    breadcrumbs: [{ label: "Dashboard", href: "#overview" }, { label: "Orders" }],
    children: (
      <Sample
        lang="en"
        title="Orders"
        description="Track and fulfil the orders placed in your store."
        stats={[
          { label: "Today", value: 12480 },
          { label: "This week", value: 68210 },
          { label: "This month", value: 241900 },
        ]}
        list={{
          title: "Latest orders",
          rows: [
            { primary: "Abdullah Al-Qahtani", secondary: "Riyadh" },
            { primary: "Noura Al-Harbi", secondary: "Jeddah" },
            { primary: "Faisal Al-Dosari", secondary: "Dammam" },
            { primary: "Reem Al-Ghamdi", secondary: "Madinah" },
          ],
        }}
      />
    ),
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    brand: { name: "متجر ميزان", plan: "الباقة الاحترافية" },
    nav: [
      {
        label: "الرئيسية",
        items: [
          { id: "overview", label: "نظرة عامة", href: "#overview", icon: HouseIcon },
          { id: "orders", label: "الطلبات", href: "#orders", icon: ShoppingBagIcon, badge: "12" },
          { id: "products", label: "المنتجات", href: "#products", icon: PackageIcon },
          { id: "customers", label: "العملاء", href: "#customers", icon: UsersIcon },
        ],
      },
      {
        label: "الإدارة",
        items: [
          { id: "analytics", label: "التحليلات", href: "#analytics", icon: ChartBarIcon },
          { id: "marketing", label: "التسويق", href: "#marketing", icon: MegaphoneIcon },
          { id: "settings", label: "الإعدادات", href: "#settings", icon: GearIcon },
        ],
      },
    ],
    activeId: "orders",
    defaultCollapsed: true,
    user: {
      name: "سارة العتيبي",
      email: "sara@mizan-store.sa",
      menu: [
        { label: "الملف الشخصي", href: "#profile", icon: UserIcon },
        { label: "الإعدادات", href: "#settings", icon: GearIcon },
        { label: "تسجيل الخروج", icon: SignOutIcon, destructive: true },
      ],
    },
    breadcrumbs: [{ label: "لوحة التحكم", href: "#overview" }, { label: "الطلبات" }],
    children: (
      <Sample
        lang="ar"
        title="الطلبات"
        description="تابع الطلبات الواردة إلى متجرك وجهّزها للشحن."
        stats={[
          { label: "اليوم", value: 12480 },
          { label: "هذا الأسبوع", value: 68210 },
          { label: "هذا الشهر", value: 241900 },
        ]}
        list={{
          title: "أحدث الطلبات",
          rows: [
            { primary: "عبدالله القحطاني", secondary: "الرياض" },
            { primary: "نورة الحربي", secondary: "جدة" },
            { primary: "فيصل الدوسري", secondary: "الدمام" },
            { primary: "ريم الغامدي", secondary: "المدينة المنورة" },
          ],
        }}
      />
    ),
  },
}
