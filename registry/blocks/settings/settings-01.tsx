"use client"

import * as React from "react"

import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Switch } from "@/registry/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Textarea } from "@/registry/ui/textarea"

export type Settings01Labels = {
  title: string
  description: string
  sectionSelect: string
  tabProfile: string
  tabAccount: string
  tabNotifications: string
  tabSecurity: string
  profileTitle: string
  profileDescription: string
  name: string
  email: string
  bio: string
  bioHint: string
  accountTitle: string
  accountDescription: string
  language: string
  timezone: string
  notificationsTitle: string
  notificationsDescription: string
  notifyOrders: string
  notifyOrdersHint: string
  notifyWhatsapp: string
  notifyWhatsappHint: string
  notifyMarketing: string
  notifyMarketingHint: string
  securityTitle: string
  securityDescription: string
  currentPassword: string
  newPassword: string
  passwordHint: string
  twoFactor: string
  twoFactorHint: string
  save: string
  saved: string
}

export const labelsEn: Settings01Labels = {
  title: "Settings",
  description: "Manage your profile and how the store contacts you.",
  sectionSelect: "Settings section",
  tabProfile: "Profile",
  tabAccount: "Account",
  tabNotifications: "Notifications",
  tabSecurity: "Security",
  profileTitle: "Profile",
  profileDescription: "This is how your name appears to your team.",
  name: "Full name",
  email: "Email",
  bio: "About you",
  bioHint: "A short description, up to 160 characters.",
  accountTitle: "Account",
  accountDescription: "Language and time zone for dates and reports.",
  language: "Language",
  timezone: "Time zone",
  notificationsTitle: "Notifications",
  notificationsDescription: "Choose what you want to hear about.",
  notifyOrders: "New orders",
  notifyOrdersHint: "Get an email each time a customer places an order.",
  notifyWhatsapp: "WhatsApp updates",
  notifyWhatsappHint: "Receive delivery and payment alerts on WhatsApp.",
  notifyMarketing: "Product news",
  notifyMarketingHint: "Occasional news about new features.",
  securityTitle: "Security",
  securityDescription: "Update your password and protect your sign-in.",
  currentPassword: "Current password",
  newPassword: "New password",
  passwordHint: "Use at least 8 characters.",
  twoFactor: "Two-step verification",
  twoFactorHint: "Ask for a code from your phone when you sign in.",
  save: "Save changes",
  saved: "Changes saved.",
}

export const labelsAr: Settings01Labels = {
  title: "الإعدادات",
  description: "أدر ملفك الشخصي وطريقة تواصل المتجر معك.",
  sectionSelect: "قسم الإعدادات",
  tabProfile: "الملف الشخصي",
  tabAccount: "الحساب",
  tabNotifications: "الإشعارات",
  tabSecurity: "الأمان",
  profileTitle: "الملف الشخصي",
  profileDescription: "هكذا يظهر اسمك لفريقك.",
  name: "الاسم الكامل",
  email: "البريد الإلكتروني",
  bio: "نبذة عنك",
  bioHint: "وصف قصير لا يتجاوز 160 حرفًا.",
  accountTitle: "الحساب",
  accountDescription: "اللغة والمنطقة الزمنية للتواريخ والتقارير.",
  language: "اللغة",
  timezone: "المنطقة الزمنية",
  notificationsTitle: "الإشعارات",
  notificationsDescription: "اختر ما تريد أن تصلك أخباره.",
  notifyOrders: "الطلبات الجديدة",
  notifyOrdersHint: "يصلك بريد إلكتروني عند كل طلب جديد.",
  notifyWhatsapp: "تحديثات واتساب",
  notifyWhatsappHint: "تنبيهات الشحن والدفع على واتساب.",
  notifyMarketing: "أخبار المنتج",
  notifyMarketingHint: "أخبار قليلة عن الميزات الجديدة.",
  securityTitle: "الأمان",
  securityDescription: "حدّث كلمة المرور واحمِ تسجيل دخولك.",
  currentPassword: "كلمة المرور الحالية",
  newPassword: "كلمة المرور الجديدة",
  passwordHint: "استخدم 8 أحرف على الأقل.",
  twoFactor: "التحقق بخطوتين",
  twoFactorHint: "اطلب رمزًا من هاتفك عند تسجيل الدخول.",
  save: "حفظ التغييرات",
  saved: "تم حفظ التغييرات.",
}

export type SettingsValues = {
  name: string
  email: string
  bio: string
  language: "ar" | "en"
  timezone: string
  notifyOrders: boolean
  notifyWhatsapp: boolean
  notifyMarketing: boolean
  twoFactor: boolean
}

export type Settings01Props = {
  lang?: Lang
  labels?: Partial<Settings01Labels>
  className?: string
  values: SettingsValues
  timezones: { value: string; label: string }[]
  onSave?: (section: string, values: Record<string, FormDataEntryValue>) => void
}

const SECTIONS = ["profile", "account", "notifications", "security"] as const
type Section = (typeof SECTIONS)[number]

const LANGUAGES = [
  { value: "ar", label: "العربية" },
  { value: "en", label: "English" },
]

export function Settings01({ lang = "en", labels, className, values, timezones, onSave }: Settings01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const id = React.useId()
  const [section, setSection] = React.useState<Section>("profile")
  const [saved, setSaved] = React.useState<Section | null>(null)

  const names: Record<Section, string> = {
    profile: t.tabProfile,
    account: t.tabAccount,
    notifications: t.tabNotifications,
    security: t.tabSecurity,
  }

  const submit = (name: Section) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave?.(name, Object.fromEntries(new FormData(event.currentTarget)))
    setSaved(name)
  }

  const footer = (name: Section) => (
    <div className="flex items-center gap-3">
      <Button type="submit">{t.save}</Button>
      <p role="status" className="text-sm text-muted-foreground">
        {saved === name ? t.saved : null}
      </p>
    </div>
  )

  const panel = (name: Section, title: string, description: string, fields: React.ReactNode) => (
    <TabsContent value={name}>
      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-level={2}>
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form aria-label={title} onSubmit={submit(name)}>
            <FieldGroup>
              {fields}
              {footer(name)}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  )

  return (
    <Container size="narrow" dir={dir} className={cn("flex flex-col gap-6 py-6 md:py-8", className)}>
      <div>
        <h1 className="text-2xl font-semibold">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.description}</p>
      </div>

      <Select
        value={section}
        onValueChange={(value) => setSection(value as Section)}
        items={SECTIONS.map((s) => ({ value: s, label: names[s] }))}
      >
        <SelectTrigger aria-label={t.sectionSelect} className="w-full md:hidden">
          <SelectValue />
        </SelectTrigger>
        <SelectContent dir={dir} alignItemWithTrigger={false}>
          {SECTIONS.map((s) => (
            <SelectItem key={s} value={s}>
              {names[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Tabs
        orientation="vertical"
        value={section}
        onValueChange={(value) => setSection(value as Section)}
        className="flex-col gap-6 md:flex-row md:gap-8"
      >
        <TabsList variant="line" aria-label={t.sectionSelect} className="hidden w-56 shrink-0 items-stretch md:flex">
          {SECTIONS.map((s) => (
            <TabsTrigger key={s} value={s} className="h-9 px-3">
              {names[s]}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="min-w-0 flex-1">
          {panel(
            "profile",
            t.profileTitle,
            t.profileDescription,
            <>
              <Field>
                <FieldLabel htmlFor={`${id}-name`}>{t.name}</FieldLabel>
                <Input id={`${id}-name`} name="name" required autoComplete="name" defaultValue={values.name} />
              </Field>
              <Field>
                <FieldLabel htmlFor={`${id}-email`}>{t.email}</FieldLabel>
                <Input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  required
                  dir="ltr"
                  autoComplete="email"
                  defaultValue={values.email}
                  className="rtl:text-end"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={`${id}-bio`}>{t.bio}</FieldLabel>
                <Textarea id={`${id}-bio`} name="bio" maxLength={160} rows={3} defaultValue={values.bio} />
                <FieldDescription>{t.bioHint}</FieldDescription>
              </Field>
            </>
          )}
          {panel(
            "account",
            t.accountTitle,
            t.accountDescription,
            <>
              <Field>
                <FieldLabel htmlFor={`${id}-language`}>{t.language}</FieldLabel>
                <Select name="language" defaultValue={values.language} items={LANGUAGES}>
                  <SelectTrigger id={`${id}-language`} className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent dir={dir} alignItemWithTrigger={false}>
                    {LANGUAGES.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor={`${id}-timezone`}>{t.timezone}</FieldLabel>
                <Select name="timezone" defaultValue={values.timezone} items={timezones}>
                  <SelectTrigger id={`${id}-timezone`} className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent dir={dir} alignItemWithTrigger={false}>
                    {timezones.map((zone) => (
                      <SelectItem key={zone.value} value={zone.value}>
                        {zone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </>
          )}
          {panel(
            "notifications",
            t.notificationsTitle,
            t.notificationsDescription,
            <>
              {(
                [
                  ["notifyOrders", t.notifyOrders, t.notifyOrdersHint, values.notifyOrders],
                  ["notifyWhatsapp", t.notifyWhatsapp, t.notifyWhatsappHint, values.notifyWhatsapp],
                  ["notifyMarketing", t.notifyMarketing, t.notifyMarketingHint, values.notifyMarketing],
                ] as const
              ).map(([key, label, hint, checked]) => (
                <Field key={key} orientation="horizontal">
                  <FieldContent>
                    <FieldLabel htmlFor={`${id}-${key}`}>{label}</FieldLabel>
                    <FieldDescription>{hint}</FieldDescription>
                  </FieldContent>
                  <Switch id={`${id}-${key}`} name={key} defaultChecked={checked} />
                </Field>
              ))}
            </>
          )}
          {panel(
            "security",
            t.securityTitle,
            t.securityDescription,
            <>
              <Field>
                <FieldLabel htmlFor={`${id}-current`}>{t.currentPassword}</FieldLabel>
                <Input id={`${id}-current`} name="currentPassword" type="password" autoComplete="current-password" />
              </Field>
              <Field>
                <FieldLabel htmlFor={`${id}-new`}>{t.newPassword}</FieldLabel>
                <Input id={`${id}-new`} name="newPassword" type="password" minLength={8} autoComplete="new-password" />
                <FieldDescription>{t.passwordHint}</FieldDescription>
              </Field>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldLabel htmlFor={`${id}-2fa`}>{t.twoFactor}</FieldLabel>
                  <FieldDescription>{t.twoFactorHint}</FieldDescription>
                </FieldContent>
                <Switch id={`${id}-2fa`} name="twoFactor" defaultChecked={values.twoFactor} />
              </Field>
            </>
          )}
        </div>
      </Tabs>
    </Container>
  )
}

export default Settings01

export const demo: { en: Settings01Props; ar: Settings01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    values: {
      name: "Sara Al-Otaibi",
      email: "sara@mizan-store.sa",
      bio: "Owner of Mizan Store in Riyadh.",
      language: "en",
      timezone: "Asia/Riyadh",
      notifyOrders: true,
      notifyWhatsapp: true,
      notifyMarketing: false,
      twoFactor: false,
    },
    timezones: [
      { value: "Asia/Riyadh", label: "Riyadh (GMT+3)" },
      { value: "Asia/Dubai", label: "Dubai (GMT+4)" },
      { value: "Asia/Kuwait", label: "Kuwait (GMT+3)" },
    ],
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    values: {
      name: "سارة العتيبي",
      email: "sara@mizan-store.sa",
      bio: "مالكة متجر ميزان في الرياض.",
      language: "ar",
      timezone: "Asia/Riyadh",
      notifyOrders: true,
      notifyWhatsapp: true,
      notifyMarketing: false,
      twoFactor: false,
    },
    timezones: [
      { value: "Asia/Riyadh", label: "الرياض (GMT+3)" },
      { value: "Asia/Dubai", label: "دبي (GMT+4)" },
      { value: "Asia/Kuwait", label: "الكويت (GMT+3)" },
    ],
  },
}
