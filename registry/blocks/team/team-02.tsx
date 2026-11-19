import * as React from "react"
import { GlobeIcon, ImageIcon, InstagramLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase } from "@/registry/lib/block-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

// Without a src the avatar shows a muted placeholder, so consumers can pass real photos later.
type PersonPhoto = { src?: string; alt: string; width?: number; height?: number }

type Network = "linkedin" | "x" | "instagram" | "website"

type Person = {
  id: string
  name: string
  role: string
  photo: PersonPhoto
  social?: { network: Network; href: string }[]
}

type Team02Labels = {
  linkedin: string
  x: string
  instagram: string
  website: string
  // Contains {network} and {name}.
  profile: string
}

type Team02Props = BlockBase & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  people: Person[]
  labels?: Partial<Team02Labels>
}

const labelsEn: Team02Labels = {
  linkedin: "LinkedIn",
  x: "X",
  instagram: "Instagram",
  website: "Website",
  profile: "{name} on {network}",
}

const labelsAr: Team02Labels = {
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

function Team02({ eyebrow, title, description, people, headingLevel = 2, labels, id, className }: Team02Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ul className="grid gap-x-12 md:grid-cols-2">
          {people.map(({ id: personId, name, role, photo, social }) => (
            <li key={personId} className="flex items-center gap-4 border-t py-5">
              <Avatar className="size-14">
                {photo.src ? <AvatarImage src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} /> : null}
                <AvatarFallback className="bg-muted text-muted-foreground">
                  <ImageIcon aria-hidden="true" weight="duotone" className="size-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <ItemHeading className="text-base font-semibold md:text-lg">{name}</ItemHeading>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>
              {social?.length ? (
                <ul className="flex items-center gap-1">
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

const photo = (alt: string): PersonPhoto => ({ alt, width: 160, height: 160 })

const demo: { en: Team02Props; ar: Team02Props } = {
  en: {
    eyebrow: "Our team",
    title: "The people behind your project",
    description: "Engineers, designers and project managers based in Riyadh and Jeddah.",
    people: [
      { id: "khalid", name: "Khalid Al-Shehri", role: "Managing director", photo: photo("Khalid Al-Shehri"), social: [{ network: "linkedin", href: "#khalid-linkedin" }] },
      { id: "reem", name: "Reem Al-Qahtani", role: "Head of design", photo: photo("Reem Al-Qahtani"), social: [{ network: "linkedin", href: "#reem-linkedin" }, { network: "instagram", href: "#reem-instagram" }] },
      { id: "majed", name: "Majed Al-Zahrani", role: "Lead project manager", photo: photo("Majed Al-Zahrani"), social: [{ network: "linkedin", href: "#majed-linkedin" }] },
      { id: "sarah", name: "Sarah Al-Mutairi", role: "Site engineer, Jeddah", photo: photo("Sarah Al-Mutairi"), social: [{ network: "x", href: "#sarah-x" }] },
      { id: "turki", name: "Turki Al-Ghamdi", role: "Cost and contracts", photo: photo("Turki Al-Ghamdi") },
      { id: "hessa", name: "Hessa Al-Subaie", role: "Client relations", photo: photo("Hessa Al-Subaie"), social: [{ network: "website", href: "#hessa-website" }] },
    ],
    labels: labelsEn,
  },
  ar: {
    eyebrow: "فريقنا",
    title: "الأشخاص خلف مشروعك",
    description: "مهندسون ومصممون ومديرو مشاريع في الرياض وجدة.",
    people: [
      { id: "khalid", name: "خالد الشهري", role: "المدير العام", photo: photo("خالد الشهري"), social: [{ network: "linkedin", href: "#khalid-linkedin" }] },
      { id: "reem", name: "ريم القحطاني", role: "رئيسة التصميم", photo: photo("ريم القحطاني"), social: [{ network: "linkedin", href: "#reem-linkedin" }, { network: "instagram", href: "#reem-instagram" }] },
      { id: "majed", name: "ماجد الزهراني", role: "مدير المشاريع الرئيسي", photo: photo("ماجد الزهراني"), social: [{ network: "linkedin", href: "#majed-linkedin" }] },
      { id: "sarah", name: "سارة المطيري", role: "مهندسة موقع، جدة", photo: photo("سارة المطيري"), social: [{ network: "x", href: "#sarah-x" }] },
      { id: "turki", name: "تركي الغامدي", role: "التكاليف والعقود", photo: photo("تركي الغامدي") },
      { id: "hessa", name: "حصة السبيعي", role: "علاقات العملاء", photo: photo("حصة السبيعي"), social: [{ network: "website", href: "#hessa-website" }] },
    ],
    labels: labelsAr,
  },
}

export { Team02, labelsEn, labelsAr, demo }
export type { Team02Props, Team02Labels, Person }
export default Team02
