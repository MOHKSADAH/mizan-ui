import * as React from "react"
import { CalendarBlankIcon, ClockIcon, GaugeIcon, ImageIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Currency, Lang, Plural } from "@/registry/lib/block-types"
import { formatDate, formatMoneySymbol, plural } from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

// Without a src the slot shows a muted placeholder, so consumers can pass real photos later.
type CourseImage = { src?: string; alt: string; width?: number; height?: number }

type Level = "beginner" | "intermediate" | "advanced"

type Course = {
  id: string
  tag: string
  title: string
  summary?: string
  weeks: number
  level: Level
  // In the block currency. 0 shows the free label.
  price: number
  // ISO date, formatted with the lang prop.
  startDate: string
  image: CourseImage
  href?: string
}

type CourseGrid01Labels = {
  weeks: Plural
  beginner: string
  intermediate: string
  advanced: string
  free: string
  // Contains {date}.
  starts: string
}

type CourseGrid01Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  courses: Course[]
  currency?: Currency
  labels?: Partial<CourseGrid01Labels>
}

const labelsEn: CourseGrid01Labels = {
  weeks: (n) => plural(n, { one: "{n} week", other: "{n} weeks" }, { lang: "en" }),
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  free: "Free",
  starts: "Starts {date}",
}

const labelsAr: CourseGrid01Labels = {
  weeks: (n) => plural(n, { one: "أسبوع واحد", two: "أسبوعان", few: "{n} أسابيع", many: "{n} أسبوعًا", other: "{n} أسبوع" }, { lang: "ar" }),
  beginner: "مبتدئ",
  intermediate: "متوسط",
  advanced: "متقدم",
  free: "مجاني",
  starts: "يبدأ {date}",
}

function CourseGrid01({ lang = "en", eyebrow, title, description, courses, currency = "SAR", headingLevel = 2, labels, id, className }: CourseGrid01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.id}>
              <Card className="relative h-full gap-0 py-0">
                <article className="flex h-full flex-col">
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    {course.image.src ? (
                      <img src={course.image.src} alt={course.image.alt} width={course.image.width} height={course.image.height} loading="lazy" className="size-full object-cover" />
                    ) : (
                      <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
                        <ImageIcon aria-hidden="true" weight="duotone" className="size-12" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col items-start gap-3 p-(--card-spacing)">
                    <Badge variant="secondary">{course.tag}</Badge>
                    <ItemHeading className="text-lg font-semibold md:text-xl">
                      <a href={course.href ?? `#${course.id}`} className="after:absolute after:inset-0 hover:underline focus-visible:outline-2 focus-visible:outline-ring">
                        {course.title}
                      </a>
                    </ItemHeading>
                    {course.summary ? <p className="line-clamp-2 text-base text-muted-foreground">{course.summary}</p> : null}
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-1.5">
                        <ClockIcon aria-hidden="true" weight="regular" className="size-4" />
                        <bdi>{t.weeks(course.weeks)}</bdi>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <GaugeIcon aria-hidden="true" weight="regular" className="size-4" />
                        {t[course.level]}
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CalendarBlankIcon aria-hidden="true" weight="regular" className="size-4" />
                        <bdi>{t.starts.replace("{date}", formatDate(new Date(course.startDate), { lang }))}</bdi>
                      </li>
                    </ul>
                    <p className="mt-auto w-full border-t pt-4 text-lg font-semibold">
                      {course.price > 0 ? <bdi>{formatMoneySymbol(course.price, { lang }, { currency })}</bdi> : t.free}
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

const photo = (alt: string): CourseImage => ({ alt, width: 800, height: 450 })

const demo: { en: CourseGrid01Props; ar: CourseGrid01Props } = {
  en: {
    lang: "en",
    eyebrow: "Courses",
    title: "Start a new skill this month",
    description: "Live classes in the evening, recordings for every session.",
    courses: [
      { id: "web-bootcamp", tag: "Bootcamp", title: "Full-stack web development", summary: "From HTML to a deployed app with a database, in one portfolio project.", weeks: 12, level: "beginner", price: 4900, startDate: "2026-12-06", image: photo("Code editor on a laptop") },
      { id: "ux-fundamentals", tag: "Design", title: "UX design fundamentals", summary: "Research, wireframes and usability tests on a real Saudi product brief.", weeks: 6, level: "intermediate", price: 1800, startDate: "2026-12-13", image: photo("Wireframes on a desk") },
      { id: "data-intro", tag: "Free workshop", title: "Introduction to data analysis", summary: "Clean a dataset and build your first dashboard in one week.", weeks: 1, level: "beginner", price: 0, startDate: "2026-11-27", image: photo("Dashboard on a screen") },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "الدورات",
    title: "ابدأ مهارة جديدة هذا الشهر",
    description: "حصص مباشرة في المساء، وتسجيل لكل جلسة.",
    courses: [
      { id: "web-bootcamp", tag: "معسكر تدريبي", title: "تطوير مواقع الويب المتكامل", summary: "من HTML إلى تطبيق منشور بقاعدة بيانات، في مشروع واحد لمعرض أعمالك.", weeks: 12, level: "beginner", price: 4900, startDate: "2026-12-06", image: photo("محرر أكواد على حاسوب محمول") },
      { id: "ux-fundamentals", tag: "التصميم", title: "أساسيات تصميم تجربة المستخدم", summary: "بحث ومخططات أولية واختبارات استخدام على مشروع سعودي حقيقي.", weeks: 6, level: "intermediate", price: 1800, startDate: "2026-12-13", image: photo("مخططات أولية على مكتب") },
      { id: "data-intro", tag: "ورشة مجانية", title: "مدخل إلى تحليل البيانات", summary: "نظّف مجموعة بيانات وابنِ أول لوحة معلومات لك في أسبوع واحد.", weeks: 1, level: "beginner", price: 0, startDate: "2026-11-27", image: photo("لوحة معلومات على شاشة") },
    ],
    labels: labelsAr,
  },
}

export { CourseGrid01, labelsEn, labelsAr, demo }
export type { CourseGrid01Props, CourseGrid01Labels, Course, Level }
export default CourseGrid01
