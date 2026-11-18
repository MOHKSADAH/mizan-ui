import { CookieConsent, cookieConsentCategoriesAr, cookieConsentLabelsAr } from '@/registry/ui/cookie-consent';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A cookie banner with Accept, Reject and Customize, and a preferences dialog with one switch per category. It stores nothing: save the choice from the onConsent callback.',
    ar: 'شريط ملفات تعريف الارتباط بأزرار القبول والرفض والتخصيص، وحوار تفضيلات بمفتاح لكل فئة. لا يخزن شيئا: احفظ الاختيار من الدالة onConsent.',
  },
  usage: `import { CookieConsent } from "@/components/ui/cookie-consent"\n\n<CookieConsent\n  open={!stored}\n  value={stored}\n  policyHref="/cookies"\n  onConsent={(value, choice) => save(value)}\n/>`,
  examples: { Default: { en: 'Default', ar: 'افتراضي' } },
  accessibility: [
    {
      en: 'The banner is a labelled region, so screen readers list it with the page landmarks. It does not take focus on load and does not trap Tab. The preferences dialog is modal and traps focus; closed without a choice, it returns focus to the Customize button.',
      ar: 'الشريط منطقة لها تسمية، فتعرضه قارئات الشاشة مع معالم الصفحة. لا يأخذ التركيز عند التحميل ولا يحبس Tab. أما حوار التفضيلات فمقيِّد ويحبس التركيز، وإذا أُغلق دون اختيار يعيد التركيز إلى زر التخصيص.',
    },
    {
      en: 'Accept and Reject have the same weight. The wording is generic: get it reviewed for the rules that apply to your product, including Saudi PDPL, before you ship.',
      ar: 'للقبول والرفض الوزن نفسه. الصياغة عامة: اجعلها تُراجع وفق الأنظمة المطبقة على منتجك، ومنها نظام حماية البيانات الشخصية السعودي، قبل الإطلاق.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl border">
      <CookieConsent
        className="absolute"
        policyHref="#"
        categories={ar ? cookieConsentCategoriesAr : undefined}
        labels={ar ? cookieConsentLabelsAr : undefined}
      />
    </div>
  );
}
