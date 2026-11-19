import * as React from "react"
import { GlobeIcon, ImageIcon, InstagramLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase } from "@/registry/lib/block-types"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

// Without a src the slot shows a muted placeholder, so consumers can pass real photos later.
type PersonPhoto = { src?: string; alt: string; width?: number; height?: number }

type Network = "linkedin" | "x" | "instagram" | "website"

type Person = {
  id: string
  name: string
  role: string
  bio?: string
  photo: PersonPhoto
  social?: { network: Network; href: string }[]
}

type Team01Labels = {
  linkedin: string
  x: string
  instagram: string
  website: string
  // Contains {network} and {name}.
  profile: string
}

type Team01Props = BlockBase & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  people: Person[]
  labels?: Partial<Team01Labels>
}

const labelsEn: Team01Labels = {
  linkedin: "LinkedIn",
  x: "X",
  instagram: "Instagram",
  website: "Website",
  profile: "{name} on {network}",
}

const labelsAr: Team01Labels = {
  linkedin: "لينكدإن",
  x: "إكس",
  instagram: "إنستغرام",
  website: "الموقع",
  profile: "{name} على {network}",
}

const icons: Record<Network, React.ElementType> = {
  linkedin: LinkedinLogoIcon,
  x: XLogoIcon,
  instagram: InstagramLogoIcon,
  website: GlobeIcon,
}

function Team01({ eyebrow, title, description, people, headingLevel = 2, labels, id, className }: Team01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {people.map(({ id: personId, name, role, bio, photo, social }) => (
            <li key={personId} className="flex flex-col gap-4">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                {photo.src ? (
                  <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" className="size-full object-cover" />
                ) : (
                  <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
                    <ImageIcon aria-hidden="true" weight="duotone" className="size-12" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <ItemHeading className="text-lg font-semibold md:text-xl">{name}</ItemHeading>
                <p className="text-sm font-medium text-muted-foreground">{role}</p>
              </div>
              {bio ? <p className="line-clamp-3 text-base text-muted-foreground">{bio}</p> : null}
              {social?.length ? (
                <ul className="mt-auto flex items-center gap-1">
                  {social.map(({ network, href }) => {
                    const Icon = icons[network]
                    return (
                      <li key={network}>
                        <a
                          href={href}
                          aria-label={t.profile.replace("{name}", name).replace("{network}", t[network])}
                          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          <Icon aria-hidden="true" weight="regular" className="size-5" />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

const photo = (alt: string): PersonPhoto => ({ alt, width: 640, height: 800 })

const demo: { en: Team01Props; ar: Team01Props } = {
  en: {
    eyebrow: "Instructors",
    title: "Learn from people who work in the field",
    description: "Every instructor ships real products in Saudi companies, not just slides.",
    people: [
      { id: "faisal", name: "Faisal Al-Otaibi", role: "Senior software engineer, STC", bio: "Eleven years building payment and telecom platforms. Leads the backend track.", photo: photo("Faisal Al-Otaibi"), social: [{ network: "linkedin", href: "#faisal-linkedin" }, { network: "x", href: "#faisal-x" }] },
      { id: "noura", name: "Noura Al-Harbi", role: "Product designer, Tabby", bio: "Designs checkout flows used by millions across the Gulf. Leads the design track.", photo: photo("Noura Al-Harbi"), social: [{ network: "linkedin", href: "#noura-linkedin" }, { network: "instagram", href: "#noura-instagram" }] },
      { id: "abdullah", name: "Abdullah Bakr", role: "Data scientist, Aramco Digital", bio: "Builds forecasting models for energy demand. Leads the data track.", photo: photo("Abdullah Bakr"), social: [{ network: "linkedin", href: "#abdullah-linkedin" }] },
      { id: "lama", name: "Lama Al-Dosari", role: "Cybersecurity consultant", bio: "Former SOC lead, now audits fintech and government systems.", photo: photo("Lama Al-Dosari"), social: [{ network: "website", href: "#lama-website" }, { network: "linkedin", href: "#lama-linkedin" }] },
    ],
    labels: labelsEn,
  },
  ar: {
    eyebrow: "المدرّبون",
    title: "تعلّم ممن يعملون في الميدان",
    description: "كل مدرّب يطلق منتجات حقيقية في شركات سعودية، وليس شرائح عرض فقط.",
    people: [
      { id: "faisal", name: "فيصل العتيبي", role: "مهندس برمجيات أول، stc", bio: "إحدى عشرة سنة في بناء منصات المدفوعات والاتصالات. يقود مسار الواجهة الخلفية.", photo: photo("فيصل العتيبي"), social: [{ network: "linkedin", href: "#faisal-linkedin" }, { network: "x", href: "#faisal-x" }] },
      { id: "noura", name: "نورة الحربي", role: "مصممة منتجات، تابي", bio: "تصمم مسارات الدفع التي يستخدمها الملايين في الخليج. تقود مسار التصميم.", photo: photo("نورة الحربي"), social: [{ network: "linkedin", href: "#noura-linkedin" }, { network: "instagram", href: "#noura-instagram" }] },
      { id: "abdullah", name: "عبدالله بكر", role: "عالم بيانات، أرامكو الرقمية", bio: "يبني نماذج التنبؤ بالطلب على الطاقة. يقود مسار البيانات.", photo: photo("عبدالله بكر"), social: [{ network: "linkedin", href: "#abdullah-linkedin" }] },
      { id: "lama", name: "لمى الدوسري", role: "استشارية الأمن السيبراني", bio: "قائدة سابقة لمركز العمليات الأمنية، وتدقق الآن أنظمة التقنية المالية والجهات الحكومية.", photo: photo("لمى الدوسري"), social: [{ network: "website", href: "#lama-website" }, { network: "linkedin", href: "#lama-linkedin" }] },
    ],
    labels: labelsAr,
  },
}

export { Team01, labelsEn, labelsAr, demo }
export type { Team01Props, Team01Labels, Person }
export default Team01
