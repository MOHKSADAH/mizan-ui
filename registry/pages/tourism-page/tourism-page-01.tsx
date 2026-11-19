import * as React from "react"
import { ImageIcon, InstagramLogoIcon, XLogoIcon } from "@phosphor-icons/react/ssr"

import { Banner01, labelsAr as bannerAr, labelsEn as bannerEn } from "@/registry/blocks/banner/banner-01"
import {
  CourseGrid01,
  labelsAr as experiencesAr,
  labelsEn as experiencesEn,
} from "@/registry/blocks/course-grid/course-grid-01"
import { Features02 } from "@/registry/blocks/features/features-02"
import { Footer01, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-01"
import { Gallery02, labelsAr as galleryAr, labelsEn as galleryEn } from "@/registry/blocks/gallery/gallery-02"
import { Hero11 } from "@/registry/blocks/hero/hero-11"
import { Location01, labelsAr as locationAr, labelsEn as locationEn } from "@/registry/blocks/location/location-01"
import { Navbar04, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-04"
import { Newsletter01, labelsAr as newsletterAr, labelsEn as newsletterEn } from "@/registry/blocks/newsletter/newsletter-01"
import { Testimonials05, labelsAr as guestsAr, labelsEn as guestsEn } from "@/registry/blocks/testimonials/testimonials-05"
import { Video01, labelsAr as videoAr, labelsEn as videoEn } from "@/registry/blocks/video/video-01"
import { plural } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { whatsappUrl } from "@/registry/lib/whatsapp"

type TourismPage01Props = {
  banner: React.ComponentProps<typeof Banner01>
  navbar: React.ComponentProps<typeof Navbar04>
  hero: React.ComponentProps<typeof Hero11>
  stay: React.ComponentProps<typeof Features02>
  experiences: React.ComponentProps<typeof CourseGrid01>
  video: React.ComponentProps<typeof Video01>
  gallery: React.ComponentProps<typeof Gallery02>
  guests: React.ComponentProps<typeof Testimonials05>
  location: React.ComponentProps<typeof Location01>
  newsletter: React.ComponentProps<typeof Newsletter01>
  footer: React.ComponentProps<typeof Footer01>
  className?: string
}

// Layout rhythm: offer strip, image-first hero, three alternating stay rows, three experience cards, a video band,
// a tabbed photo gallery, one guest quote, a map split, the newsletter, footer. Section ids match the navbar links.
function TourismPage01(props: TourismPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Banner01 {...props.banner} />
      <Navbar04 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero11 {...props.hero} />
        <Features02 id="stay" {...props.stay} />
        <CourseGrid01 id="experiences" {...props.experiences} />
        <Video01 id="video" {...props.video} />
        <Gallery02 id="gallery" {...props.gallery} />
        <Testimonials05 id="guests" {...props.guests} />
        <Location01 id="location" {...props.location} />
        <Newsletter01 id="newsletter" {...props.newsletter} />
      </main>
      <Footer01 {...props.footer} />
    </div>
  )
}

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const

const placeholder = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const photo = (alt: string, width = 800, height = 600) => ({ alt, width, height })
const shot = (alt: string, category: string) => ({ alt, width: 800, height: 800, category })

// The experience cards reuse the course card: the duration is in hours, the level is the effort, the date is the next departure.
const hours = {
  en: (n: number) => plural(n, { one: "{n} hour", other: "{n} hours" }, { lang: "en" }),
  ar: (n: number) =>
    plural(n, { one: "ساعة واحدة", two: "ساعتان", few: "{n} ساعات", many: "{n} ساعة", other: "{n} ساعة" }, { lang: "ar" }),
}

// The reception is open every day from 7 AM to midnight.
const reception = { week: Array.from({ length: 7 }, () => [{ open: "07:00", close: "24:00" }]) }

const phone = "+966 14 555 0318"
const whatsapp = "+966 50 555 0318"

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: TourismPage01Props; ar: TourismPage01Props } = {
  ar: {
    banner: {
      message: "الليلة الثالثة هدية في ديسمبر ويناير",
      action: { label: "احجز الآن", href: whatsappUrl(whatsapp, "السلام عليكم، أرغب في حجز إقامة في ديرة العُلا."), external: true },
      dismissible: true,
      labels: bannerAr,
    },
    navbar: {
      brand: { name: "ديرة", href: "#" },
      links: [
        { label: "الإقامة", href: "#stay", current: true },
        { label: "التجارب", href: "#experiences" },
        { label: "المعرض", href: "#gallery" },
        { label: "كيف تصل", href: "#location" },
        { label: "النشرة", href: "#newsletter" },
      ],
      utility: { phone, whatsapp: { phone: whatsapp, message: "السلام عليكم، أرغب في حجز إقامة في ديرة العُلا." } },
      cta: { label: "احجز إقامتك", href: "#location" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      eyebrow: "نزل ديرة · العُلا",
      title: "نم في بيت طيني، واستيقظ على واحة العُلا",
      description: "ثمانية عشر بيتًا من الطين والنخيل رمّمتها عائلات من أهل العُلا، على بُعد عشرين دقيقة من الحِجر.",
      primaryCta: { label: "اطّلع على التجارب", href: "#experiences" },
      secondaryCta: { label: "احجز عبر واتساب", href: whatsappUrl(whatsapp, "السلام عليكم، أرغب في حجز إقامة في ديرة العُلا."), external: true },
      media: { alt: "بيوت ديرة الطينية بين نخيل واحة العُلا", width: 1600, height: 900 },
      facts: ["العُلا، منطقة المدينة المنورة", <><bdi>18</bdi> بيتًا</>, <>من <bdi>1,150</bdi> ريال لليلة</>],
    },
    stay: {
      eyebrow: "الإقامة",
      title: "ثمانية عشر بيتًا، ولا سيارات في الممرات",
      description: "رمّمتها عائلات من أهل العُلا بالطين والنخيل، وأضفنا إليها ما يحتاجه الضيف من تكييف وماء ساخن.",
      items: [
        {
          title: "بيوت من الطين والنخيل",
          description: "جدران سمكها 60 سم تُبقي البيت باردًا في الصيف ودافئًا في الشتاء، وأسقف من جذوع النخل المحلي.",
          media: placeholder,
        },
        {
          title: "عشاء من مزرعة الواحة",
          description: "نطبخ على الحطب مما تزرعه عائلة الحمدان في المزرعة المجاورة: تمر وليمون ودجاج بلدي.",
          media: placeholder,
        },
        {
          title: "هدوء مقصود",
          description: "لا نستقبل أكثر من 36 ضيفًا في الليلة، وتُطفأ الأنوار الخارجية عند العاشرة لترى النجوم.",
          media: placeholder,
        },
      ],
    },
    experiences: {
      lang: "ar",
      eyebrow: "التجارب",
      title: "ثلاث تجارب يقودها أهل العُلا",
      description: "مجموعات لا تزيد على ثمانية أشخاص، والسعر للشخص الواحد.",
      courses: [
        { id: "sunset-coffee", tag: "غروب", title: "قهوة الغروب عند جبل الفيل", summary: "نصعد قبل المغيب بساعة، ونصب القهوة على الصخر، ونعود بعد أن تظهر النجوم.", weeks: 3, level: "beginner", price: 180, startDate: "2026-11-27", image: photo("قهوة على صخرة عند جبل الفيل") },
        { id: "dawn-walk", tag: "مشي", title: "مشي الفجر بين مزارع الواحة", summary: "مسار بين النخيل والسواقي القديمة مع مرشد من أهل المنطقة، وفطور في مزرعة.", weeks: 4, level: "intermediate", price: 220, startDate: "2026-11-28", image: photo("ممشى بين نخيل الواحة") },
        { id: "rock-climb", tag: "مغامرة", title: "تسلّق صخري مع مرشد معتمد", summary: "معدات كاملة وتدريب قبل الصعود، ومسارات تناسب المبتدئين ومن سبق لهم التسلق.", weeks: 5, level: "advanced", price: 480, startDate: "2026-12-05", image: photo("متسلق على جدار صخري") },
      ],
      labels: {
        ...experiencesAr,
        weeks: hours.ar,
        beginner: "مناسبة للجميع",
        intermediate: "جهد متوسط",
        advanced: "جهد عالٍ",
        starts: "أقرب موعد {date}",
      },
    },
    video: {
      eyebrow: "شاهد المكان",
      title: "دقيقتان داخل بيت الطين",
      description: "امشِ معنا من بوابة النزل إلى المزرعة، وشاهد كيف يبدو الصباح في الواحة.",
      videoTitle: "جولة في نزل ديرة",
      video: <video controls preload="none" aria-label="جولة في نزل ديرة" />,
      captionsNote: "الترجمة العربية والإنجليزية متاحة داخل المشغّل.",
      labels: videoAr,
    },
    gallery: {
      lang: "ar",
      eyebrow: "المعرض",
      title: "صور من ضيوفنا ومن واحتنا",
      description: "تصفّح البيوت والواحة والمائدة.",
      categories: [
        { id: "houses", label: "البيوت" },
        { id: "oasis", label: "الواحة" },
        { id: "food", label: "المائدة" },
      ],
      photos: [
        shot("فناء بيت الطين وقت الظهيرة", "houses"),
        shot("غرفة نوم بسقف من جذوع النخل", "houses"),
        shot("مجلس العائلة في بيت النخيل", "houses"),
        shot("سواقي المزرعة في الصباح", "oasis"),
        shot("نخيل الواحة عند الغروب", "oasis"),
        shot("قهوة ودلة على الحطب", "food"),
        shot("مائدة العشاء من مزرعة الحمدان", "food"),
        shot("تمر طازج في سلة من الخوص", "food"),
      ],
      labels: galleryAr,
    },
    guests: {
      eyebrow: "ضيوفنا",
      title: "قالوا بعد ثلاث ليالٍ",
      item: {
        quote: "ما توقعت أن أنام في بيت جدرانه من الطين وأصحو على صوت الديك. الأولاد ما سألوا عن الجوال طوال ثلاثة أيام.",
        name: "العنود المطيري",
        role: "ضيفة، ثلاث ليالٍ",
        company: "بيت النخيل",
        city: "الرياض",
      },
      others: [
        { name: "فهد الزهراني", company: "بيت الطين", city: "جدة" },
        { name: "منيرة السبيعي", company: "بيت العائلة", city: "الدمام" },
        { name: "عمر باشراحيل", company: "بيت الطين", city: "مكة المكرمة" },
        { name: "هند الرويلي", company: "بيت النخيل", city: "تبوك" },
      ],
      labels: guestsAr,
    },
    location: {
      lang: "ar",
      eyebrow: "كيف تصل",
      title: "في قلب الواحة القديمة",
      description: "25 دقيقة بالسيارة من مطار العلا الدولي، و20 دقيقة من الحِجر. نرسل لك موقع الدخول قبل وصولك بيوم.",
      name: "نزل ديرة العُلا",
      address: "طريق الواحة القديمة، البلدة القديمة، العُلا 43543",
      phone,
      whatsapp: { phone: whatsapp, message: "السلام عليكم، أرغب في حجز إقامة في ديرة العُلا." },
      directions: { label: "احصل على الاتجاهات", href: "https://maps.google.com/?q=AlUla+Old+Town", external: true },
      hours: reception,
      labels: locationAr,
    },
    newsletter: {
      lang: "ar",
      eyebrow: "رسالة الواحة",
      title: "رسالة شهرية من العُلا: موسم التمر وليالي القمر وعروض لضيوفنا أولًا",
      description: "بلا إعلانات، وتلغي اشتراكك متى شئت.",
      readers: 6200,
      issues: [
        { number: 14, title: "ما الذي تحمله معك في ليالي العُلا الباردة", date: "2026-11-10", href: "#issue-14" },
        { number: 13, title: "موسم الحصاد: نخيل الواحة في أكتوبر", date: "2026-10-10", href: "#issue-13" },
        { number: 12, title: "ثلاثة مسارات مشي لا يعرفها إلا أهل الواحة", date: "2026-09-10", href: "#issue-12" },
      ],
      policyHref: "#privacy",
      labels: newsletterAr,
    },
    footer: {
      brand: { name: "ديرة", description: "نُزُل تراثي من الطين والنخيل في واحة العُلا القديمة." },
      columns: [
        {
          title: "الإقامة",
          links: [
            { label: "بيت الطين", href: "#stay" },
            { label: "بيت العائلة", href: "#stay" },
            { label: "بيت النخيل", href: "#stay" },
          ],
        },
        {
          title: "التجارب",
          links: [
            { label: "قهوة الغروب", href: "#experiences" },
            { label: "مشي الفجر", href: "#experiences" },
            { label: "التسلق", href: "#experiences" },
          ],
        },
        {
          title: "معلومات",
          links: [
            { label: "كيف تصل", href: "#location" },
            { label: "سياسة الإلغاء", href: "#cancellation" },
            { label: "النشرة", href: "#newsletter" },
          ],
        },
      ],
      contact: { phone, email: "stay@deerah.example", address: "طريق الواحة القديمة، العُلا 43543" },
      social: [
        { label: "إكس", href: "#x", icon: XLogoIcon },
        { label: "إنستغرام", href: "#instagram", icon: InstagramLogoIcon },
      ],
      legal: {
        text: "© 2026 شركة ديرة للضيافة. مرخّص من وزارة السياحة برقم 7001234567.",
        links: [
          { label: "الخصوصية", href: "#privacy" },
          { label: "الشروط والأحكام", href: "#terms" },
        ],
      },
      labels: footerAr,
    },
  },
  en: {
    banner: {
      message: "The third night is on us in December and January",
      action: { label: "Book now", href: whatsappUrl(whatsapp, "Hello, I would like to book a stay at Deerah AlUla."), external: true },
      dismissible: true,
      labels: bannerEn,
    },
    navbar: {
      brand: { name: "Deerah", href: "#" },
      links: [
        { label: "Stay", href: "#stay", current: true },
        { label: "Experiences", href: "#experiences" },
        { label: "Gallery", href: "#gallery" },
        { label: "Getting here", href: "#location" },
        { label: "Newsletter", href: "#newsletter" },
      ],
      utility: { phone, whatsapp: { phone: whatsapp, message: "Hello, I would like to book a stay at Deerah AlUla." } },
      cta: { label: "Book your stay", href: "#location" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      eyebrow: "Deerah Stay · AlUla",
      title: "Sleep in a mud-brick house, wake up in the AlUla oasis",
      description: "Eighteen houses of mud and palm, restored by AlUla families, twenty minutes from Hegra.",
      primaryCta: { label: "See the experiences", href: "#experiences" },
      secondaryCta: { label: "Book on WhatsApp", href: whatsappUrl(whatsapp, "Hello, I would like to book a stay at Deerah AlUla."), external: true },
      media: { alt: "Deerah mud-brick houses among the AlUla palms", width: 1600, height: 900 },
      facts: ["AlUla, Madinah region", <><bdi>18</bdi> houses</>, <>From <bdi>1,150</bdi> SAR a night</>],
    },
    stay: {
      eyebrow: "The stay",
      title: "Eighteen houses, and no cars in the lanes",
      description: "AlUla families restored them in mud and palm, and we added what a guest needs: air conditioning and hot water.",
      items: [
        {
          title: "Houses of mud and palm",
          description: "Walls 60 cm thick keep the house cool in summer and warm in winter, under roofs of local palm trunks.",
          media: placeholder,
        },
        {
          title: "Dinner from the oasis farm",
          description: "We cook on wood from what the Al-Hamdan family grows next door: dates, lemons and free-range chicken.",
          media: placeholder,
        },
        {
          title: "Quiet on purpose",
          description: "We host no more than 36 guests a night, and the outdoor lights go off at ten so you can see the stars.",
          media: placeholder,
        },
      ],
    },
    experiences: {
      lang: "en",
      eyebrow: "Experiences",
      title: "Three experiences led by people from AlUla",
      description: "Groups of eight at most, priced per person.",
      courses: [
        { id: "sunset-coffee", tag: "Sunset", title: "Sunset coffee at Elephant Rock", summary: "We climb an hour before sundown, pour coffee on the rock and come back after the stars appear.", weeks: 3, level: "beginner", price: 180, startDate: "2026-11-27", image: photo("Coffee on a rock at Elephant Rock") },
        { id: "dawn-walk", tag: "Walk", title: "Dawn walk through the oasis farms", summary: "A trail between palms and old irrigation channels with a local guide, and breakfast on a farm.", weeks: 4, level: "intermediate", price: 220, startDate: "2026-11-28", image: photo("A path between oasis palms") },
        { id: "rock-climb", tag: "Adventure", title: "Rock climbing with a certified guide", summary: "Full gear and a briefing before you climb, with routes for beginners and for people who have climbed before.", weeks: 5, level: "advanced", price: 480, startDate: "2026-12-05", image: photo("A climber on a rock wall") },
      ],
      labels: {
        ...experiencesEn,
        weeks: hours.en,
        beginner: "For everyone",
        intermediate: "Moderate effort",
        advanced: "Demanding",
        starts: "Next date {date}",
      },
    },
    video: {
      eyebrow: "See the place",
      title: "Two minutes inside a mud-brick house",
      description: "Walk with us from the gate to the farm and see what morning looks like in the oasis.",
      videoTitle: "A tour of Deerah Stay",
      video: <video controls preload="none" aria-label="A tour of Deerah Stay" />,
      captionsNote: "Arabic and English captions are available in the player.",
      labels: videoEn,
    },
    gallery: {
      lang: "en",
      eyebrow: "Gallery",
      title: "Photos from our guests and our oasis",
      description: "Browse the houses, the oasis and the table.",
      categories: [
        { id: "houses", label: "Houses" },
        { id: "oasis", label: "Oasis" },
        { id: "food", label: "Table" },
      ],
      photos: [
        shot("A mud-brick courtyard at noon", "houses"),
        shot("A bedroom under a palm-trunk ceiling", "houses"),
        shot("The family majlis in the Palm House", "houses"),
        shot("Farm irrigation channels in the morning", "oasis"),
        shot("Oasis palms at sunset", "oasis"),
        shot("Coffee and a pot on the wood fire", "food"),
        shot("Dinner table with food from the Al-Hamdan farm", "food"),
        shot("Fresh dates in a palm-leaf basket", "food"),
      ],
      labels: galleryEn,
    },
    guests: {
      eyebrow: "Our guests",
      title: "What they said after three nights",
      item: {
        quote: "I never thought I would sleep in a house with mud walls and wake to a rooster. The kids did not ask for their phones for three days.",
        name: "Alanoud Al-Mutairi",
        role: "Guest, three nights",
        company: "Palm House",
        city: "Riyadh",
      },
      others: [
        { name: "Fahad Al-Zahrani", company: "Mud House", city: "Jeddah" },
        { name: "Munirah Al-Subaie", company: "Family House", city: "Dammam" },
        { name: "Omar Bashrahil", company: "Mud House", city: "Makkah" },
        { name: "Hind Al-Ruwaili", company: "Palm House", city: "Tabuk" },
      ],
      labels: guestsEn,
    },
    location: {
      lang: "en",
      eyebrow: "Getting here",
      title: "In the heart of the old oasis",
      description: "25 minutes by car from AlUla International Airport and 20 minutes from Hegra. We send you the entrance pin the day before you arrive.",
      name: "Deerah Stay AlUla",
      address: "Old Oasis Road, Old Town, AlUla 43543",
      phone,
      whatsapp: { phone: whatsapp, message: "Hello, I would like to book a stay at Deerah AlUla." },
      directions: { label: "Get directions", href: "https://maps.google.com/?q=AlUla+Old+Town", external: true },
      hours: reception,
      labels: locationEn,
    },
    newsletter: {
      lang: "en",
      eyebrow: "Oasis letter",
      title: "A monthly letter from AlUla: date season, moonlit nights and offers for our guests first",
      description: "No ads, and you can leave whenever you like.",
      readers: 6200,
      issues: [
        { number: 14, title: "What to bring for the cold nights in AlUla", date: "2026-11-10", href: "#issue-14" },
        { number: 13, title: "Harvest season: the oasis palms in October", date: "2026-10-10", href: "#issue-13" },
        { number: 12, title: "Three walking trails only the oasis people know", date: "2026-09-10", href: "#issue-12" },
      ],
      policyHref: "#privacy",
      labels: newsletterEn,
    },
    footer: {
      brand: { name: "Deerah", description: "A heritage stay of mud and palm in the old AlUla oasis." },
      columns: [
        {
          title: "Stay",
          links: [
            { label: "Mud House", href: "#stay" },
            { label: "Family House", href: "#stay" },
            { label: "Palm House", href: "#stay" },
          ],
        },
        {
          title: "Experiences",
          links: [
            { label: "Sunset coffee", href: "#experiences" },
            { label: "Dawn walk", href: "#experiences" },
            { label: "Climbing", href: "#experiences" },
          ],
        },
        {
          title: "Information",
          links: [
            { label: "Getting here", href: "#location" },
            { label: "Cancellation policy", href: "#cancellation" },
            { label: "Newsletter", href: "#newsletter" },
          ],
        },
      ],
      contact: { phone, email: "stay@deerah.example", address: "Old Oasis Road, AlUla 43543" },
      social: [
        { label: "X", href: "#x", icon: XLogoIcon },
        { label: "Instagram", href: "#instagram", icon: InstagramLogoIcon },
      ],
      legal: {
        text: "© 2026 Deerah Hospitality Co. Licensed by the Ministry of Tourism, number 7001234567.",
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
        ],
      },
      labels: footerEn,
    },
  },
}

export { TourismPage01, demo }
export type { TourismPage01Props }
export default TourismPage01
