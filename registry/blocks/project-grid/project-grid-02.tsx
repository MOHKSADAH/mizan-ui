"use client"

import * as React from "react"
import { BuildingsIcon, ImageIcon, MapPinIcon } from "@phosphor-icons/react"

import type { BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { plural } from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

// Without a src the slot shows a muted placeholder, so consumers can pass real photos later.
type ProjectImage = { src?: string; alt: string; width?: number; height?: number }

type Project = {
  id: string
  name: string
  city: string
  type: string
  // The status badge on the image, for example "Under construction".
  status: string
  units?: number
  image: ProjectImage
  href?: string
}

type ProjectGrid02Labels = {
  filters: string
  city: string
  type: string
  all: string
  units: Plural
  results: Plural
  empty: string
}

type ProjectGrid02Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  projects: Project[]
  labels?: Partial<ProjectGrid02Labels>
}

const labelsEn: ProjectGrid02Labels = {
  filters: "Project filters",
  city: "City",
  type: "Type",
  all: "All",
  units: (n) => plural(n, { one: "{n} unit", other: "{n} units" }, { lang: "en" }),
  results: (n) => plural(n, { one: "{n} project", other: "{n} projects" }, { lang: "en" }),
  empty: "No projects match this choice.",
}

const labelsAr: ProjectGrid02Labels = {
  filters: "تصفية المشاريع",
  city: "المدينة",
  type: "النوع",
  all: "الكل",
  units: (n) => plural(n, { one: "وحدة واحدة", two: "وحدتان", few: "{n} وحدات", many: "{n} وحدة", other: "{n} وحدة" }, { lang: "ar" }),
  results: (n) => plural(n, { zero: "لا توجد مشاريع", one: "مشروع واحد", two: "مشروعان", few: "{n} مشاريع", many: "{n} مشروعًا", other: "{n} مشروع" }, { lang: "ar" }),
  empty: "لا توجد مشاريع تطابق هذا الاختيار.",
}

const pill = "h-9 rounded-full px-4 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/90"
const ALL = "all"

const unique = (values: string[]) => [...new Set(values)]

function FilterRow({ label, all, value, options, onChange }: { label: string; all: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-16 shrink-0 text-sm text-muted-foreground">{label}</span>
      <div className="-me-4 overflow-x-auto pe-4 [scrollbar-width:none] sm:me-0 sm:pe-0 [&::-webkit-scrollbar]:hidden">
        <ToggleGroup variant="outline" size="lg" className="w-max" aria-label={label} value={[value]} onValueChange={(v) => v[0] && onChange(v[0])}>
          {[ALL, ...options].map((option) => (
            <ToggleGroupItem key={option} value={option} className={pill}>
              {option === ALL ? all : option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  )
}

function ProjectGrid02({ lang = "en", eyebrow, title, description, projects, headingLevel = 2, labels, id, className }: ProjectGrid02Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  const [city, setCity] = React.useState(ALL)
  const [type, setType] = React.useState(ALL)
  const matches = projects.filter((p) => (city === ALL || p.city === city) && (type === ALL || p.type === type))
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <div role="group" aria-label={t.filters} className="mb-8 flex flex-col gap-3">
          <FilterRow label={t.city} all={t.all} value={city} options={unique(projects.map((p) => p.city))} onChange={setCity} />
          <FilterRow label={t.type} all={t.all} value={type} options={unique(projects.map((p) => p.type))} onChange={setType} />
          <p aria-live="polite" className="text-sm text-muted-foreground">
            <bdi>{t.results(matches.length)}</bdi>
          </p>
        </div>
        {matches.length ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((project) => (
              <li key={project.id}>
                <Card className="relative h-full gap-0 py-0">
                  <article className="flex h-full flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {project.image.src ? (
                        <img src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} loading="lazy" className="size-full object-cover" />
                      ) : (
                        <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
                          <ImageIcon aria-hidden="true" weight="duotone" className="size-12" />
                        </div>
                      )}
                      <Badge variant="outline" className="absolute start-3 top-3 bg-background">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-(--card-spacing)">
                      <p className="text-sm text-muted-foreground">{project.type}</p>
                      <ItemHeading className="text-lg font-semibold md:text-xl">
                        <a href={project.href ?? `#${project.id}`} className="after:absolute after:inset-0 hover:underline focus-visible:outline-2 focus-visible:outline-ring">
                          {project.name}
                        </a>
                      </ItemHeading>
                      <p className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPinIcon aria-hidden="true" weight="regular" className="size-4" />
                          {project.city}
                        </span>
                        {project.units ? (
                          <span className="flex items-center gap-1.5">
                            <BuildingsIcon aria-hidden="true" weight="regular" className="size-4" />
                            <bdi>{t.units(project.units)}</bdi>
                          </span>
                        ) : null}
                      </p>
                    </div>
                  </article>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border py-12 text-center text-base text-muted-foreground">{t.empty}</p>
        )}
      </Container>
    </Section>
  )
}

const photo = (alt: string): ProjectImage => ({ alt, width: 800, height: 600 })

const demo: { en: ProjectGrid02Props; ar: ProjectGrid02Props } = {
  en: {
    lang: "en",
    eyebrow: "Our projects",
    title: "Find a development in your city",
    description: "Filter by city and type to see what is available now.",
    projects: [
      { id: "diriyah-oasis", name: "Diriyah Oasis", city: "Diriyah", type: "Residential", status: "Under construction", units: 120, image: photo("Diriyah Oasis villas") },
      { id: "corniche-towers", name: "Corniche Towers", city: "Jeddah", type: "Offices", status: "Ready to move in", units: 48, image: photo("Corniche Towers facade") },
      { id: "khobar-marina", name: "Khobar Marina", city: "Al Khobar", type: "Residential", status: "Off-plan sales", units: 210, image: photo("Khobar Marina apartments") },
      { id: "yasmin-residence", name: "Yasmin Residence", city: "Riyadh", type: "Residential", status: "Under construction", units: 86, image: photo("Yasmin Residence building") },
      { id: "abhur-front", name: "Abhur Front", city: "Jeddah", type: "Hospitality", status: "Under construction", units: 64, image: photo("Abhur Front hotel apartments") },
      { id: "olaya-plaza", name: "Olaya Plaza", city: "Riyadh", type: "Offices", status: "Ready to move in", units: 32, image: photo("Olaya Plaza tower") },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "مشاريعنا",
    title: "اعثر على مشروعك في مدينتك",
    description: "صفِّ حسب المدينة والنوع لترى المتاح الآن.",
    projects: [
      { id: "diriyah-oasis", name: "واحة الدرعية", city: "الدرعية", type: "سكني", status: "قيد الإنشاء", units: 120, image: photo("فلل واحة الدرعية") },
      { id: "corniche-towers", name: "أبراج الكورنيش", city: "جدة", type: "مكاتب", status: "جاهز للتسليم", units: 48, image: photo("واجهة أبراج الكورنيش") },
      { id: "khobar-marina", name: "مرافئ الخبر", city: "الخبر", type: "سكني", status: "بيع على الخارطة", units: 210, image: photo("شقق مرافئ الخبر") },
      { id: "yasmin-residence", name: "ياسمين ريزيدنس", city: "الرياض", type: "سكني", status: "قيد الإنشاء", units: 86, image: photo("مبنى ياسمين ريزيدنس") },
      { id: "abhur-front", name: "واجهة أبحر", city: "جدة", type: "ضيافة", status: "قيد الإنشاء", units: 64, image: photo("شقق واجهة أبحر الفندقية") },
      { id: "olaya-plaza", name: "بلازا العليا", city: "الرياض", type: "مكاتب", status: "جاهز للتسليم", units: 32, image: photo("برج بلازا العليا") },
    ],
    labels: labelsAr,
  },
}

export { ProjectGrid02, labelsEn, labelsAr, demo }
export type { ProjectGrid02Props, ProjectGrid02Labels, Project }
export default ProjectGrid02
