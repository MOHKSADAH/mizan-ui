import * as React from "react"
import { BriefcaseIcon, ChatsCircleIcon, CodeIcon, ImageIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr"

import { CaseStudy01 } from "@/registry/blocks/case-study/case-study-01"
import { CourseGrid01, labelsAr as courseAr, labelsEn as courseEn } from "@/registry/blocks/course-grid/course-grid-01"
import { Faq02, labelsAr as faqAr, labelsEn as faqEn } from "@/registry/blocks/faq/faq-02"
import { Features04 } from "@/registry/blocks/features/features-04"
import { Footer07, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-07"
import { Hero02 } from "@/registry/blocks/hero/hero-02"
import { HowItWorks01 } from "@/registry/blocks/how-it-works/how-it-works-01"
import { LogoCloud05 } from "@/registry/blocks/logo-cloud/logo-cloud-05"
import { Navbar01, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-01"
import { Team02, labelsAr as teamAr, labelsEn as teamEn } from "@/registry/blocks/team/team-02"
import { cn } from "@/registry/lib/utils"

type EducationPage01Props = {
  navbar: React.ComponentProps<typeof Navbar01>
  hero: React.ComponentProps<typeof Hero02>
  partners: React.ComponentProps<typeof LogoCloud05>
  why: React.ComponentProps<typeof Features04>
  courses: React.ComponentProps<typeof CourseGrid01>
  story: React.ComponentProps<typeof CaseStudy01>
  instructors: React.ComponentProps<typeof Team02>
  steps: React.ComponentProps<typeof HowItWorks01>
  faq: React.ComponentProps<typeof Faq02>
  footer: React.ComponentProps<typeof Footer07>
  className?: string
}

// Layout rhythm: split hero, a partner strip right under it, a split "why us" list, three course cards,
// one success story, a compact instructor list, horizontal steps, split FAQ, a closing call in the footer.
// Section ids match the navbar links.
function EducationPage01(props: EducationPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar01 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero02 {...props.hero} />
        <LogoCloud05 {...props.partners} />
        <Features04 id="why" {...props.why} />
        <CourseGrid01 id="courses" {...props.courses} />
        <CaseStudy01 id="stories" {...props.story} />
        <Team02 id="instructors" {...props.instructors} />
        <HowItWorks01 id="how" {...props.steps} />
        <Faq02 id="faq" {...props.faq} />
      </main>
      <Footer07 id="start" {...props.footer} />
    </div>
  )
}

const placeholder = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const

const whatsapp = "+966 50 555 0176"

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: EducationPage01Props; ar: EducationPage01Props } = {
  ar: {
    navbar: {
      brand: { name: "أكاديمية رمز", href: "#" },
      links: [
        { label: "لماذا رمز", href: "#why", current: true },
        { label: "المسارات", href: "#courses" },
        { label: "قصص الخريجين", href: "#stories" },
        { label: "المدرّبون", href: "#instructors" },
        { label: "الأسئلة الشائعة", href: "#faq" },
      ],
      cta: { label: "سجّل الآن", href: "#courses" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      eyebrow: "أكاديمية البرمجة والتصميم، الرياض وعن بُعد",
      title: "من أول سطر برمجي إلى أول وظيفة، بمشروع حقيقي",
      description:
        "مسارات مكثّفة من 6 إلى 12 أسبوعًا، تنتهي بمشروع منشور لعميل سعودي حقيقي، ومراجعة لسيرتك الذاتية ومقابلات تجريبية قبل أن تتقدّم لأي وظيفة.",
      primaryCta: { label: "استعرض المسارات", href: "#courses" },
      secondaryCta: { label: "شاهد قصص الخريجين", href: "#stories" },
      media: placeholder,
    },
    partners: {
      title: "يعمل خريجو رمز اليوم في أكثر من 60 شركة سعودية",
      brands: [
        { name: "مرفأ للتقنية" },
        { name: "ركيزة للحلول الرقمية" },
        { name: "بيان للتحليلات" },
        { name: "أثر للتسويق" },
        { name: "واحة للتجارة" },
        { name: "سُحُب للاستضافة" },
        { name: "جسور للتمويل" },
        { name: "ألوان للتصميم" },
      ],
    },
    why: {
      eyebrow: "لماذا رمز",
      title: "نتعلّم بالبناء، لا بالمشاهدة",
      description: "كل أسبوع تسلّم عملًا يعمل، ويراجعه مدرّب يعمل في المجال.",
      cta: { label: "استعرض المسارات", href: "#courses" },
      items: [
        {
          icon: CodeIcon,
          title: "مشروع حقيقي في كل مسار",
          description: "تبني مع فريقك تطبيقًا لعميل سعودي حقيقي وتنشره قبل التخرج، ويصير أول عمل في معرض أعمالك.",
        },
        {
          icon: UsersThreeIcon,
          title: "فصول من 16 طالبًا فقط",
          description: "عدد صغير يضمن أن يراجع المدرّب كودك أنت، لا كود الفصل كله.",
        },
        {
          icon: BriefcaseIcon,
          title: "تجهيز للوظيفة",
          description: "مراجعة للسيرة الذاتية، ومقابلتان تجريبيتان، وتعريف بالشركات التي توظّف خريجينا.",
        },
        {
          icon: ChatsCircleIcon,
          title: "مجتمع بعد التخرج",
          description: "قناة خريجين على واتساب ولقاء شهري في الرياض، وتبقى معنا بعد انتهاء الدورة.",
        },
      ],
    },
    courses: {
      lang: "ar",
      eyebrow: "المسارات",
      title: "اختر مسارك وابدأ هذا الشهر",
      description: "حصص مباشرة ثلاث مساءات في الأسبوع، وتسجيل لكل حصة. الأسعار شاملة ضريبة القيمة المضافة.",
      courses: [
        {
          id: "web",
          tag: "برمجة",
          title: "تطوير الويب المتكامل",
          summary: "من HTML إلى تطبيق منشور بقاعدة بيانات، في مشروع لعميل حقيقي.",
          weeks: 12,
          level: "beginner",
          price: 6900,
          startDate: "2026-12-13",
          image: { alt: "طالبة تكتب كودًا على حاسوب محمول" },
          href: "#start",
        },
        {
          id: "ux",
          tag: "تصميم",
          title: "تصميم تجربة المستخدم والواجهات",
          summary: "بحث ونماذج أولية واختبار استخدام على تطبيق سعودي حقيقي.",
          weeks: 8,
          level: "intermediate",
          price: 4900,
          startDate: "2027-01-10",
          image: { alt: "نماذج أولية للواجهات على مكتب" },
          href: "#start",
        },
        {
          id: "workshop",
          tag: "ورشة مجانية",
          title: "مدخل إلى البرمجة",
          summary: "ابنِ أول صفحة لك في أسبوع، وقرّر إن كان المسار يناسبك.",
          weeks: 1,
          level: "beginner",
          price: 0,
          startDate: "2026-11-27",
          image: { alt: "ورشة برمجة في مقر الأكاديمية بالرياض" },
          href: "#start",
        },
      ],
      labels: courseAr,
    },
    story: {
      eyebrow: "قصص الخريجين",
      title: "خريجون غيّروا مسارهم المهني",
      image: { alt: "سلمان الدوسري في مقر عمله الجديد" },
      client: "سلمان الدوسري، خريج دفعة مارس",
      caseTitle: "من مندوب مبيعات إلى مطوّر واجهات في 4 أشهر",
      summary:
        "التحق سلمان بمسار تطوير الويب وهو يعمل في المبيعات بالدمام. بنى مع فريقه تطبيق حجوزات لعيادة أسنان، وبعد المراجعة والمقابلات التجريبية وقّع عقد وظيفة في شركة تقنية بالرياض.",
      results: [
        { value: "4 أشهر", label: "من أول حصة إلى أول وظيفة" },
        { value: "+60%", label: "زيادة في الراتب عن عمله السابق" },
        { value: "3", label: "عروض وظيفية في الشهر الأول" },
      ],
    },
    instructors: {
      eyebrow: "المدرّبون",
      title: "يدرّسك من يعمل في المجال اليوم",
      description: "مدرّبونا مطوّرون ومصمّمون يعملون في شركات سعودية، ويدرّسون بعد الدوام.",
      people: [
        { id: "abdulrahman", name: "م. عبدالرحمن الزهراني", role: "مهندس برمجيات أول في شركة مدفوعات", photo: { alt: "م. عبدالرحمن الزهراني" } },
        { id: "lujain", name: "أ. لجين الحربي", role: "مصممة منتجات أولى", photo: { alt: "أ. لجين الحربي" } },
        { id: "nasser", name: "م. ناصر القحطاني", role: "قائد فريق الواجهات الأمامية", photo: { alt: "م. ناصر القحطاني" } },
        { id: "dana", name: "أ. دانة العنزي", role: "باحثة تجربة مستخدم", photo: { alt: "أ. دانة العنزي" } },
        { id: "yousef", name: "م. يوسف الشمري", role: "مهندس بيانات", photo: { alt: "م. يوسف الشمري" } },
        { id: "shahad", name: "أ. شهد المطيري", role: "مديرة منتج", photo: { alt: "أ. شهد المطيري" } },
      ],
      labels: teamAr,
    },
    steps: {
      lang: "ar",
      eyebrow: "كيف تسير الدورة",
      title: "من التسجيل إلى الوظيفة في أربع محطات",
      steps: [
        {
          title: "مكالمة إرشاد",
          description: "نسمع هدفك ونرشّح لك المسار الأنسب، مجانًا ودون التزام.",
          duration: (
            <>
              <bdi>15</bdi> دقيقة
            </>
          ),
        },
        {
          title: "التعلّم بالمشروع",
          description: "حصص مباشرة ثلاث مساءات في الأسبوع، وتسليم أسبوعي يراجعه مدرّبك.",
          duration: (
            <>
              من <bdi>6</bdi> إلى <bdi>12</bdi> أسبوعًا
            </>
          ),
        },
        {
          title: "مشروع العميل",
          description: "تعمل مع فريقك على مشروع لعميل حقيقي وتنشره.",
          duration: "أسبوعان",
        },
        {
          title: "التوظيف",
          description: "مراجعة السيرة الذاتية، ومقابلات تجريبية، وتعريف بالشركات.",
          duration: "حتى تُوظَّف",
        },
      ],
    },
    faq: {
      title: "أسئلة قبل التسجيل",
      description: "لم تجد إجابتك؟ اكتب لنا على واتساب.",
      items: [
        { id: "experience", question: "هل أحتاج إلى خبرة سابقة؟", answer: "لا. مسار الويب يبدأ من الصفر، ومسار التصميم يناسب من لديه معرفة بسيطة بأدوات التصميم." },
        { id: "missed", question: "ماذا لو فاتتني حصة؟", answer: "تُسجَّل كل حصة وتصلك خلال ساعة، ويجيب المدرّب على أسئلتك في قناة الفصل." },
        { id: "price", question: "كم الرسوم، وهل يوجد تقسيط؟", answer: "يبدأ المسار من 4,900 ريال شاملة الضريبة، ويمكنك الدفع على أربع دفعات بتمارا أو تابي دون فوائد." },
        { id: "job", question: "هل تضمنون وظيفة؟", answer: "لا نضمن وظيفة، ولا يضمنها أحد بأمانة. لكن 8 من كل 10 خريجين وجدوا وظيفة أو بدأوا عملًا حرًا خلال ستة أشهر من التخرج." },
        { id: "attendance", question: "هل الدراسة حضورية؟", answer: "الحصص مباشرة عبر الإنترنت، ولنا مقر في الرياض لأيام المشاريع والمراجعات، والحضور فيه اختياري." },
      ],
      whatsapp: { phone: whatsapp, message: "السلام عليكم، عندي سؤال عن مسارات أكاديمية رمز." },
      labels: faqAr,
    },
    footer: {
      title: "ابدأ أول خطوة هذا الشهر",
      description: "ورشة مجانية يوم 27 نوفمبر، ومكالمة إرشاد دون التزام.",
      primaryCta: { label: "سجّل في الورشة المجانية", href: "#courses" },
      secondaryCta: { label: "تحدث مع مرشد", href: "#faq" },
      brand: { name: "أكاديمية رمز", description: "برمجة وتصميم بمشاريع حقيقية، في الرياض وعن بُعد." },
      columns: [
        {
          title: "المسارات",
          links: [
            { label: "المسارات والورش", href: "#courses" },
            { label: "المدرّبون", href: "#instructors" },
            { label: "قصص الخريجين", href: "#stories" },
          ],
        },
        {
          title: "الأكاديمية",
          links: [
            { label: "لماذا رمز", href: "#why" },
            { label: "كيف تسير الدورة", href: "#how" },
            { label: "الوظائف", href: "#careers" },
          ],
        },
        {
          title: "المساعدة",
          links: [
            { label: "الأسئلة الشائعة", href: "#faq" },
            { label: "تواصل معنا", href: "#start" },
          ],
        },
      ],
      legal: {
        text: "© 2026 أكاديمية رمز للتدريب. جميع الحقوق محفوظة.",
        crNumber: "1010678901",
        vatNumber: "300067890100003",
        links: [
          { label: "الخصوصية", href: "#privacy" },
          { label: "الشروط والأحكام", href: "#terms" },
        ],
      },
      labels: footerAr,
    },
  },
  en: {
    navbar: {
      brand: { name: "Ramz Academy", href: "#" },
      links: [
        { label: "Why Ramz", href: "#why", current: true },
        { label: "Tracks", href: "#courses" },
        { label: "Graduate stories", href: "#stories" },
        { label: "Instructors", href: "#instructors" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: { label: "Enroll now", href: "#courses" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      eyebrow: "A coding and design academy, in Riyadh and online",
      title: "From your first line of code to your first job, on a real project",
      description:
        "Intensive tracks of 6 to 12 weeks that end with a published project for a real Saudi client, a CV review and mock interviews before you apply anywhere.",
      primaryCta: { label: "Browse the tracks", href: "#courses" },
      secondaryCta: { label: "See graduate stories", href: "#stories" },
      media: placeholder,
    },
    partners: {
      title: "Ramz graduates now work at more than 60 Saudi companies",
      brands: [
        { name: "Marfa Tech" },
        { name: "Rakeeza Digital" },
        { name: "Bayan Analytics" },
        { name: "Athar Marketing" },
        { name: "Wahat Trading" },
        { name: "Suhub Hosting" },
        { name: "Jusoor Finance" },
        { name: "Alwan Design" },
      ],
    },
    why: {
      eyebrow: "Why Ramz",
      title: "We learn by building, not by watching",
      description: "Every week you hand in work that runs, and a mentor who works in the field reviews it.",
      cta: { label: "Browse the tracks", href: "#courses" },
      items: [
        {
          icon: CodeIcon,
          title: "A real project in every track",
          description: "With your team you build an app for a real Saudi client and publish it before graduation. It becomes the first piece in your portfolio.",
        },
        {
          icon: UsersThreeIcon,
          title: "Classes of 16 students at most",
          description: "A small class means your mentor reviews your code, not the code of the whole room.",
        },
        {
          icon: BriefcaseIcon,
          title: "Job preparation",
          description: "A CV review, two mock interviews, and introductions to the companies that hire our graduates.",
        },
        {
          icon: ChatsCircleIcon,
          title: "A community after graduation",
          description: "A graduates channel on WhatsApp and a monthly meetup in Riyadh. You stay with us after the course ends.",
        },
      ],
    },
    courses: {
      lang: "en",
      eyebrow: "Tracks",
      title: "Pick your track and start this month",
      description: "Live classes three evenings a week, and a recording of every class. Prices include VAT.",
      courses: [
        {
          id: "web",
          tag: "Coding",
          title: "Full-stack web development",
          summary: "From HTML to a published app with a database, on a project for a real client.",
          weeks: 12,
          level: "beginner",
          price: 6900,
          startDate: "2026-12-13",
          image: { alt: "A student writing code on a laptop" },
          href: "#start",
        },
        {
          id: "ux",
          tag: "Design",
          title: "UX and interface design",
          summary: "Research, prototypes and usability tests on a real Saudi app.",
          weeks: 8,
          level: "intermediate",
          price: 4900,
          startDate: "2027-01-10",
          image: { alt: "Interface prototypes on a desk" },
          href: "#start",
        },
        {
          id: "workshop",
          tag: "Free workshop",
          title: "Introduction to coding",
          summary: "Build your first page in a week, and decide whether the track suits you.",
          weeks: 1,
          level: "beginner",
          price: 0,
          startDate: "2026-11-27",
          image: { alt: "A coding workshop at the academy in Riyadh" },
          href: "#start",
        },
      ],
      labels: courseEn,
    },
    story: {
      eyebrow: "Graduate stories",
      title: "Graduates who changed their career",
      image: { alt: "Salman Al-Dosari at his new workplace" },
      client: "Salman Al-Dosari, March cohort",
      caseTitle: "From sales rep to front-end developer in 4 months",
      summary:
        "Salman joined the web track while working in sales in Dammam. With his team he built a booking app for a dental clinic, and after the review and mock interviews he signed a contract with a tech company in Riyadh.",
      results: [
        { value: "4 months", label: "From the first class to the first job" },
        { value: "+60%", label: "Raise over his previous salary" },
        { value: "3", label: "Job offers in the first month" },
      ],
    },
    instructors: {
      eyebrow: "Instructors",
      title: "Taught by people who work in the field today",
      description: "Our instructors are developers and designers at Saudi companies, and they teach after work.",
      people: [
        { id: "abdulrahman", name: "Abdulrahman Al-Zahrani", role: "Senior software engineer at a payments company", photo: { alt: "Abdulrahman Al-Zahrani" } },
        { id: "lujain", name: "Lujain Al-Harbi", role: "Lead product designer", photo: { alt: "Lujain Al-Harbi" } },
        { id: "nasser", name: "Nasser Al-Qahtani", role: "Front-end team lead", photo: { alt: "Nasser Al-Qahtani" } },
        { id: "dana", name: "Dana Al-Anazi", role: "UX researcher", photo: { alt: "Dana Al-Anazi" } },
        { id: "yousef", name: "Yousef Al-Shammari", role: "Data engineer", photo: { alt: "Yousef Al-Shammari" } },
        { id: "shahad", name: "Shahad Al-Mutairi", role: "Product manager", photo: { alt: "Shahad Al-Mutairi" } },
      ],
      labels: teamEn,
    },
    steps: {
      lang: "en",
      eyebrow: "How the course runs",
      title: "From sign-up to a job in four stops",
      steps: [
        {
          title: "A guidance call",
          description: "We listen to your goal and suggest the right track, free and with no commitment.",
          duration: "15 minutes",
        },
        {
          title: "Learning by project",
          description: "Live classes three evenings a week, and a weekly hand-in that your mentor reviews.",
          duration: "6 to 12 weeks",
        },
        {
          title: "The client project",
          description: "You work with your team on a real client's project and publish it.",
          duration: "2 weeks",
        },
        {
          title: "Getting hired",
          description: "A CV review, mock interviews and introductions to companies.",
          duration: "Until you are hired",
        },
      ],
    },
    faq: {
      title: "Questions before you enroll",
      description: "Did not find your answer? Message us on WhatsApp.",
      items: [
        { id: "experience", question: "Do I need earlier experience?", answer: "No. The web track starts from zero, and the design track suits anyone with a little knowledge of design tools." },
        { id: "missed", question: "What if I miss a class?", answer: "Every class is recorded and reaches you within an hour, and your mentor answers your questions in the class channel." },
        { id: "price", question: "How much does it cost, and can I pay in installments?", answer: "Tracks start at SAR 4,900 including VAT, and you can pay in four installments with Tamara or Tabby, with no interest." },
        { id: "job", question: "Do you guarantee a job?", answer: "We do not guarantee a job, and nobody honestly can. But 8 in 10 graduates found a job or started freelancing within six months of graduating." },
        { id: "attendance", question: "Do I study in person?", answer: "Classes are live online, and we have a base in Riyadh for project days and reviews, which you can attend if you like." },
      ],
      whatsapp: { phone: whatsapp, message: "Hello, I have a question about the Ramz Academy tracks." },
      labels: faqEn,
    },
    footer: {
      title: "Take the first step this month",
      description: "A free workshop on 27 November, and a guidance call with no commitment.",
      primaryCta: { label: "Join the free workshop", href: "#courses" },
      secondaryCta: { label: "Talk to an advisor", href: "#faq" },
      brand: { name: "Ramz Academy", description: "Coding and design on real projects, in Riyadh and online." },
      columns: [
        {
          title: "Tracks",
          links: [
            { label: "Tracks and workshops", href: "#courses" },
            { label: "Instructors", href: "#instructors" },
            { label: "Graduate stories", href: "#stories" },
          ],
        },
        {
          title: "The academy",
          links: [
            { label: "Why Ramz", href: "#why" },
            { label: "How the course runs", href: "#how" },
            { label: "Careers", href: "#careers" },
          ],
        },
        {
          title: "Help",
          links: [
            { label: "FAQ", href: "#faq" },
            { label: "Contact us", href: "#start" },
          ],
        },
      ],
      legal: {
        text: "© 2026 Ramz Training Academy. All rights reserved.",
        crNumber: "1010678901",
        vatNumber: "300067890100003",
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
        ],
      },
      labels: footerEn,
    },
  },
}

export { EducationPage01, demo }
export type { EducationPage01Props }
export default EducationPage01
