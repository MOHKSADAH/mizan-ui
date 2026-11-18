// Source: curated by hand, 3 to 6 main cities per region. Not a complete city list.
// Region codes follow ISO 3166-2:SA. The homaily/Saudi-Arabia-Regions-Cities-and-Districts dataset
// is GPL-2.0, so it is not used or copied here.

export type SaudiCity = { nameEn: string; nameAr: string }

export type SaudiRegion = {
  code: string
  nameEn: string
  nameAr: string
  cities: SaudiCity[]
}

const c = (nameEn: string, nameAr: string): SaudiCity => ({ nameEn, nameAr })

export const saudiRegions: SaudiRegion[] = [
  {
    code: "SA-01",
    nameEn: "Riyadh",
    nameAr: "الرياض",
    cities: [
      c("Riyadh", "الرياض"),
      c("Al Kharj", "الخرج"),
      c("Al Majmaah", "المجمعة"),
      c("Ad Diriyah", "الدرعية"),
      c("Wadi ad-Dawasir", "وادي الدواسر"),
      c("Az Zulfi", "الزلفي"),
    ],
  },
  {
    code: "SA-02",
    nameEn: "Makkah",
    nameAr: "مكة المكرمة",
    cities: [
      c("Makkah", "مكة المكرمة"),
      c("Jeddah", "جدة"),
      c("Taif", "الطائف"),
      c("Rabigh", "رابغ"),
      c("Al Qunfudhah", "القنفذة"),
    ],
  },
  {
    code: "SA-03",
    nameEn: "Madinah",
    nameAr: "المدينة المنورة",
    cities: [c("Madinah", "المدينة المنورة"), c("Yanbu", "ينبع"), c("Al Ula", "العلا"), c("Badr", "بدر")],
  },
  {
    code: "SA-04",
    nameEn: "Eastern Province",
    nameAr: "المنطقة الشرقية",
    cities: [
      c("Dammam", "الدمام"),
      c("Al Khobar", "الخبر"),
      c("Dhahran", "الظهران"),
      c("Al Hofuf", "الهفوف"),
      c("Jubail", "الجبيل"),
      c("Qatif", "القطيف"),
    ],
  },
  {
    code: "SA-05",
    nameEn: "Qassim",
    nameAr: "القصيم",
    cities: [c("Buraydah", "بريدة"), c("Unaizah", "عنيزة"), c("Ar Rass", "الرس")],
  },
  {
    code: "SA-06",
    nameEn: "Hail",
    nameAr: "حائل",
    cities: [c("Hail", "حائل"), c("Baqaa", "بقعاء"), c("Al Ghazalah", "الغزالة")],
  },
  {
    code: "SA-07",
    nameEn: "Tabuk",
    nameAr: "تبوك",
    cities: [c("Tabuk", "تبوك"), c("Duba", "ضباء"), c("Al Wajh", "الوجه"), c("Tayma", "تيماء")],
  },
  {
    code: "SA-08",
    nameEn: "Northern Borders",
    nameAr: "الحدود الشمالية",
    cities: [c("Arar", "عرعر"), c("Rafha", "رفحاء"), c("Turaif", "طريف")],
  },
  {
    code: "SA-09",
    nameEn: "Jazan",
    nameAr: "جازان",
    cities: [c("Jazan", "جازان"), c("Sabya", "صبيا"), c("Abu Arish", "أبو عريش"), c("Samtah", "صامطة")],
  },
  {
    code: "SA-10",
    nameEn: "Najran",
    nameAr: "نجران",
    cities: [c("Najran", "نجران"), c("Sharurah", "شرورة"), c("Habuna", "حبونا")],
  },
  {
    code: "SA-11",
    nameEn: "Al Bahah",
    nameAr: "الباحة",
    cities: [c("Al Bahah", "الباحة"), c("Baljurashi", "بلجرشي"), c("Al Mandaq", "المندق")],
  },
  {
    code: "SA-12",
    nameEn: "Al Jawf",
    nameAr: "الجوف",
    cities: [c("Sakaka", "سكاكا"), c("Dumat al-Jandal", "دومة الجندل"), c("Al Qurayyat", "القريات")],
  },
  {
    code: "SA-14",
    nameEn: "Asir",
    nameAr: "عسير",
    cities: [c("Abha", "أبها"), c("Khamis Mushait", "خميس مشيط"), c("Muhayil", "محايل"), c("Bisha", "بيشة")],
  },
]
