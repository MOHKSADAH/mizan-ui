import * as React from "react"
import { ArrowRightIcon, BuildingsIcon, ImageIcon, MapPinIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { plural } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { buttonVariants } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

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

type ProjectGrid01Labels = {
  units: Plural
}

type ProjectGrid01Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: Action
  projects: Project[]
  labels?: Partial<ProjectGrid01Labels>
}

const labelsEn: ProjectGrid01Labels = {
  units: (n) => plural(n, { one: "{n} unit", other: "{n} units" }, { lang: "en" }),
}

const labelsAr: ProjectGrid01Labels = {
  units: (n) => plural(n, { one: "وحدة واحدة", two: "وحدتان", few: "{n} وحدات", many: "{n} وحدة", other: "{n} وحدة" }, { lang: "ar" }),
}

function ProjectGrid01({
  lang = "en",
  eyebrow,
  title,
  description,
  action,
  projects,
  headingLevel = 2,
  labels,
  id,
  className,
}: ProjectGrid01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          actions={
            action ? (
              <a href={action.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}>
                {action.label}
                <ArrowRightIcon aria-hidden="true" weight="bold" className="rtl:rotate-180" />
              </a>
            ) : null
          }
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
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
      </Container>
    </Section>
  )
}

const photo = (alt: string): ProjectImage => ({ alt, width: 800, height: 600 })

const demo: { en: ProjectGrid01Props; ar: ProjectGrid01Props } = {
  en: {
    lang: "en",
    eyebrow: "Our projects",
    title: "Developments built to last",
    description: "From Diriyah to Al Khobar, every project is delivered on the agreed date.",
    action: { label: "All projects", href: "#projects" },
    projects: [
      { id: "diriyah-oasis", name: "Diriyah Oasis", city: "Diriyah", type: "Residential villas", status: "Under construction", units: 120, image: photo("Diriyah Oasis villas") },
      { id: "corniche-towers", name: "Corniche Towers", city: "Jeddah", type: "Offices", status: "Ready to move in", units: 48, image: photo("Corniche Towers facade") },
      { id: "khobar-marina", name: "Khobar Marina", city: "Al Khobar", type: "Waterfront apartments", status: "Off-plan sales", units: 210, image: photo("Khobar Marina apartments") },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "مشاريعنا",
    title: "مشاريع تُبنى لتدوم",
    description: "من الدرعية إلى الخبر، نسلّم كل مشروع في موعده المتفق عليه.",
    action: { label: "كل المشاريع", href: "#projects" },
    projects: [
      { id: "diriyah-oasis", name: "واحة الدرعية", city: "الدرعية", type: "فلل سكنية", status: "قيد الإنشاء", units: 120, image: photo("فلل واحة الدرعية") },
      { id: "corniche-towers", name: "أبراج الكورنيش", city: "جدة", type: "مكاتب إدارية", status: "جاهز للتسليم", units: 48, image: photo("واجهة أبراج الكورنيش") },
      { id: "khobar-marina", name: "مرافئ الخبر", city: "الخبر", type: "شقق على الواجهة البحرية", status: "بيع على الخارطة", units: 210, image: photo("شقق مرافئ الخبر") },
    ],
    labels: labelsAr,
  },
}

export { ProjectGrid01, labelsEn, labelsAr, demo }
export type { ProjectGrid01Props, ProjectGrid01Labels, Project }
export default ProjectGrid01
