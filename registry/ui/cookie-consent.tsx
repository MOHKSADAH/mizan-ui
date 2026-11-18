"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/registry/ui/dialog"
import { Switch } from "@/registry/ui/switch"

type CookieConsentLabels = {
  title: string
  description: string
  policy: string
  accept: string
  reject: string
  customize: string
  preferencesTitle: string
  preferencesDescription: string
  save: string
  acceptAll: string
  alwaysOn: string
  close: string
}

// Generic wording. Have it reviewed against the rules that apply to your product before you ship it.
const defaultLabels: CookieConsentLabels = {
  title: "Cookies",
  description: "We use cookies to run the site and, with your permission, to measure and improve it.",
  policy: "Read the cookie policy",
  accept: "Accept all",
  reject: "Reject optional",
  customize: "Customize",
  preferencesTitle: "Cookie preferences",
  preferencesDescription: "Choose which cookies you allow. You can change this later.",
  save: "Save preferences",
  acceptAll: "Accept all",
  alwaysOn: "Always on",
  close: "Close",
}

const cookieConsentLabelsAr: CookieConsentLabels = {
  title: "ملفات تعريف الارتباط",
  description: "نستخدم ملفات تعريف الارتباط لتشغيل الموقع، ومع موافقتك لقياس أدائه وتحسينه.",
  policy: "اقرأ سياسة ملفات تعريف الارتباط",
  accept: "قبول الكل",
  reject: "رفض الاختيارية",
  customize: "تخصيص",
  preferencesTitle: "تفضيلات ملفات تعريف الارتباط",
  preferencesDescription: "اختر ملفات تعريف الارتباط التي تسمح بها. يمكنك تغيير ذلك لاحقا.",
  save: "حفظ التفضيلات",
  acceptAll: "قبول الكل",
  alwaysOn: "مفعلة دائما",
  close: "إغلاق",
}

type ConsentCategory = {
  id: string
  label: string
  description: string
  // Required categories are on and cannot be turned off.
  required?: boolean
}

const cookieConsentCategories: ConsentCategory[] = [
  { id: "necessary", label: "Necessary", description: "Keep the site working: sign-in, cart and security.", required: true },
  { id: "analytics", label: "Analytics", description: "Show us how the site is used so we can improve it." },
  { id: "marketing", label: "Marketing", description: "Measure campaigns and show relevant offers." },
]

const cookieConsentCategoriesAr: ConsentCategory[] = [
  { id: "necessary", label: "الضرورية", description: "تُبقي الموقع يعمل: تسجيل الدخول والسلة والأمان.", required: true },
  { id: "analytics", label: "التحليلات", description: "تُظهر لنا كيف يُستخدم الموقع لنحسّنه." },
  { id: "marketing", label: "التسويق", description: "تقيس الحملات وتعرض عروضا مناسبة." },
]

type ConsentValue = Record<string, boolean>
type ConsentChoice = "accept" | "reject" | "custom"

const decide = (categories: ConsentCategory[], on: boolean): ConsentValue =>
  Object.fromEntries(categories.map((c) => [c.id, c.required || on]))

type CookiePreferencesProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories?: ConsentCategory[]
  // The stored choice, to start the switches from.
  value?: ConsentValue
  onSave: (value: ConsentValue, choice: ConsentChoice) => void
  labels?: Partial<CookieConsentLabels>
}

function PreferencesForm({
  categories,
  value,
  onSave,
  l,
}: Required<Pick<CookiePreferencesProps, "categories">> &
  Pick<CookiePreferencesProps, "value" | "onSave"> & { l: CookieConsentLabels }) {
  const [draft, setDraft] = React.useState<ConsentValue>(() =>
    Object.fromEntries(categories.map((c) => [c.id, c.required || !!value?.[c.id]]))
  )
  const id = React.useId()
  return (
    <>
      <ul className="flex flex-col gap-4">
        {categories.map((c) => (
          <li key={c.id} className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span id={`${id}-${c.id}`} className="font-medium">
                {c.label}
              </span>
              <span id={`${id}-${c.id}-d`} className="text-muted-foreground">
                {c.required ? `${c.description} (${l.alwaysOn})` : c.description}
              </span>
            </div>
            <Switch
              checked={c.required || !!draft[c.id]}
              disabled={c.required}
              aria-labelledby={`${id}-${c.id}`}
              aria-describedby={`${id}-${c.id}-d`}
              onCheckedChange={(checked) => setDraft((d) => ({ ...d, [c.id]: checked }))}
            />
          </li>
        ))}
      </ul>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onSave(decide(categories, true), "accept")}>
          {l.acceptAll}
        </Button>
        <Button type="button" onClick={() => onSave(draft, "custom")}>
          {l.save}
        </Button>
      </DialogFooter>
    </>
  )
}

function CookiePreferences({
  open,
  onOpenChange,
  categories = cookieConsentCategories,
  value,
  onSave,
  labels,
}: CookiePreferencesProps) {
  const l = { ...defaultLabels, ...labels }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent labels={{ close: l.close }}>
        <DialogHeader>
          <DialogTitle>{l.preferencesTitle}</DialogTitle>
          <DialogDescription>{l.preferencesDescription}</DialogDescription>
        </DialogHeader>
        <PreferencesForm categories={categories} value={value} onSave={onSave} l={l} />
      </DialogContent>
    </Dialog>
  )
}

type CookieConsentProps = Omit<React.ComponentProps<"section">, "children" | "onChange"> & {
  categories?: ConsentCategory[]
  // Shows the banner. Leave it out to show until a choice is made. Set it from your stored consent.
  open?: boolean
  value?: ConsentValue
  // Called with every category on or off. Store the result yourself: the component stores nothing.
  onConsent?: (value: ConsentValue, choice: ConsentChoice) => void
  policyHref?: string
  labels?: Partial<CookieConsentLabels>
}

function CookieConsent({
  categories = cookieConsentCategories,
  open,
  value,
  onConsent,
  policyHref,
  labels,
  className,
  ...props
}: CookieConsentProps) {
  const l = { ...defaultLabels, ...labels }
  const [done, setDone] = React.useState(false)
  const [preferences, setPreferences] = React.useState(false)
  const titleId = React.useId()
  const choose = (v: ConsentValue, choice: ConsentChoice) => {
    setDone(true)
    setPreferences(false)
    onConsent?.(v, choice)
  }
  return (
    <>
      {(open ?? !done) && (
        // A labelled region, not a dialog: it does not take focus, so screen readers find it as a landmark.
        <section
          data-slot="cookie-consent"
          aria-labelledby={titleId}
          className={cn(
            "fixed inset-x-4 bottom-4 z-50 flex max-w-md flex-col gap-3 rounded-xl bg-card p-4 text-sm text-card-foreground shadow-md ring-1 ring-foreground/10 sm:start-4 sm:end-auto",
            className
          )}
          {...props}
        >
          <p id={titleId} className="font-medium">
            {l.title}
          </p>
          <p className="text-muted-foreground">
            {l.description}{" "}
            {policyHref && (
              <a href={policyHref} className="text-foreground underline underline-offset-3">
                {l.policy}
              </a>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => choose(decide(categories, true), "accept")}>
              {l.accept}
            </Button>
            <Button type="button" variant="outline" onClick={() => choose(decide(categories, false), "reject")}>
              {l.reject}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setPreferences(true)}>
              {l.customize}
            </Button>
          </div>
        </section>
      )}
      <CookiePreferences
        open={preferences}
        onOpenChange={setPreferences}
        categories={categories}
        value={value}
        onSave={choose}
        labels={labels}
      />
    </>
  )
}

export {
  CookieConsent,
  CookiePreferences,
  cookieConsentCategories,
  cookieConsentCategoriesAr,
  cookieConsentLabelsAr,
}
export type { ConsentCategory, ConsentChoice, ConsentValue, CookieConsentLabels }
