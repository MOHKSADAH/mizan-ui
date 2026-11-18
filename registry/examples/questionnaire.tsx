import { WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { LocalizedProgress, QuestionnaireForm } from '@/registry/examples/questionnaire.client';
import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/registry/ui/questionnaire';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A one-question-at-a-time form with progress, validation, skip and keyboard shortcuts.',
    ar: 'نموذج يعرض سؤالًا واحدًا في كل مرة مع التقدم والتحقق والتخطي واختصارات لوحة المفاتيح.',
  },
  usage: `import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

<Questionnaire shortcuts="numbers" onSubmit={(e) => e.preventDefault()}>
  <QuestionnaireItem name="plan" required>
    <QuestionnaireTitle>Pick a plan</QuestionnaireTitle>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="free">Free</QuestionnaireChoice>
      <QuestionnaireChoice value="pro">Pro</QuestionnaireChoice>
    </QuestionnaireChoices>
  </QuestionnaireItem>
  <QuestionnaireActions>
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>`,
  examples: {
    Default: { en: 'Single choice with skip', ar: 'اختيار واحد مع تخطٍّ' },
    Multiple: { en: 'Multiple choice', ar: 'اختيار متعدد' },
    TextInput: { en: 'Text answers', ar: 'إجابات نصية' },
  },
  accessibility: [
    { en: 'Each question is a fieldset with a legend. Only the active question is visible and focusable.', ar: 'كل سؤال عنصر fieldset بعنوان legend. السؤال النشط وحده ظاهر ويقبل التركيز.' },
    { en: 'The progress element has role="progressbar" and a text value, so the position is announced.', ar: 'لعنصر التقدم role="progressbar" وقيمة نصية، فيُعلن الموضع.' },
    { en: 'A missing required answer shows error text with role="alert" and an icon, and focus moves to the question.', ar: 'عند غياب إجابة مطلوبة يظهر نص خطأ بـ role="alert" مع أيقونة، وينتقل التركيز إلى السؤال.' },
    { en: 'Keyboard: arrow keys move between answers, Enter goes next, and number keys pick an answer when shortcuts="numbers".', ar: 'لوحة المفاتيح: الأسهم تتنقل بين الإجابات، وEnter ينتقل للتالي، ومفاتيح الأرقام تختار إجابة عند shortcuts="numbers".' },
  ],
};

function Nav({ ar }: { ar: boolean }) {
  return (
    <QuestionnaireActions>
      <QuestionnairePrevious>{ar ? 'السابق' : 'Back'}</QuestionnairePrevious>
      <QuestionnaireSkip>{ar ? 'تخطٍّ' : 'Skip'}</QuestionnaireSkip>
      <QuestionnaireNext>{ar ? 'التالي' : 'Next'}</QuestionnaireNext>
      <QuestionnaireSubmit>{ar ? 'إرسال' : 'Submit'}</QuestionnaireSubmit>
    </QuestionnaireActions>
  );
}

function RequiredError({ ar }: { ar: boolean }) {
  return (
    <QuestionnaireError>
      <span className="inline-flex items-center gap-1.5">
        <WarningCircleIcon weight="regular" className="size-4 shrink-0" aria-hidden="true" />
        {ar ? 'اختر إجابة للمتابعة.' : 'Choose an answer to continue.'}
      </span>
    </QuestionnaireError>
  );
}

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <QuestionnaireForm shortcuts="numbers" className="max-w-md rounded-lg border p-4">
      <LocalizedProgress lang={lang} />
      <QuestionnaireItem name="store" required>
        <QuestionnaireTitle>{ar ? 'ما نوع متجرك؟' : 'What kind of store do you run?'}</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="fashion">{ar ? 'أزياء' : 'Fashion'}</QuestionnaireChoice>
          <QuestionnaireChoice value="electronics">{ar ? 'إلكترونيات' : 'Electronics'}</QuestionnaireChoice>
          <QuestionnaireChoice value="food">{ar ? 'أغذية' : 'Food'}</QuestionnaireChoice>
        </QuestionnaireChoices>
        <RequiredError ar={ar} />
      </QuestionnaireItem>
      <QuestionnaireItem name="volume">
        <QuestionnaireTitle>{ar ? 'كم طلبًا تشحن شهريًا؟' : 'How many orders do you ship each month?'}</QuestionnaireTitle>
        <QuestionnaireDescription>{ar ? 'يمكنك تخطي هذا السؤال.' : 'You can skip this question.'}</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="low">{ar ? 'أقل من 100' : 'Under 100'}</QuestionnaireChoice>
          <QuestionnaireChoice value="mid">{ar ? 'من 100 إلى 1000' : '100 to 1,000'}</QuestionnaireChoice>
          <QuestionnaireChoice value="high">{ar ? 'أكثر من 1000' : 'Over 1,000'}</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="contact" required>
        <QuestionnaireTitle>{ar ? 'كيف نتواصل معك؟' : 'How should we contact you?'}</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="email">
            {ar ? 'البريد الإلكتروني' : 'Email'}
            <QuestionnaireChoiceDescription>{ar ? 'ملخص أسبوعي.' : 'A weekly summary.'}</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="sms">
            {ar ? 'رسالة نصية' : 'SMS'}
            <QuestionnaireChoiceDescription>{ar ? 'تنبيهات الطلبات الجديدة فقط.' : 'New order alerts only.'}</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <RequiredError ar={ar} />
      </QuestionnaireItem>
      <Nav ar={ar} />
    </QuestionnaireForm>
  );
}

export function Multiple({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <QuestionnaireForm className="max-w-md rounded-lg border p-4">
      <QuestionnaireItem name="channels" multiple required>
        <QuestionnaireTitle>{ar ? 'أين تبيع منتجاتك؟' : 'Where do you sell your products?'}</QuestionnaireTitle>
        <QuestionnaireDescription>{ar ? 'اختر كل ما ينطبق.' : 'Select all that apply.'}</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="web">{ar ? 'الموقع الإلكتروني' : 'Website'}</QuestionnaireChoice>
          <QuestionnaireChoice value="social">{ar ? 'وسائل التواصل الاجتماعي' : 'Social media'}</QuestionnaireChoice>
          <QuestionnaireChoice value="store">{ar ? 'متجر فعلي' : 'Physical store'}</QuestionnaireChoice>
        </QuestionnaireChoices>
        <RequiredError ar={ar} />
      </QuestionnaireItem>
      <Nav ar={ar} />
    </QuestionnaireForm>
  );
}

export function TextInput({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <QuestionnaireForm className="max-w-md rounded-lg border p-4">
      <LocalizedProgress lang={lang} />
      <QuestionnaireItem name="storeName" required>
        <QuestionnaireTitle>{ar ? 'ما اسم متجرك؟' : 'What is your store name?'}</QuestionnaireTitle>
        <QuestionnaireInput required placeholder={ar ? 'مثال: متجر الندى' : 'For example: Nada Store'} aria-label={ar ? 'اسم المتجر' : 'Store name'} />
        <RequiredError ar={ar} />
      </QuestionnaireItem>
      <QuestionnaireItem name="email" required>
        <QuestionnaireTitle>{ar ? 'ما بريدك الإلكتروني؟' : 'What is your email?'}</QuestionnaireTitle>
        <QuestionnaireInput type="email" required placeholder="name@example.com" aria-label={ar ? 'البريد الإلكتروني' : 'Email'} />
        <RequiredError ar={ar} />
      </QuestionnaireItem>
      <Nav ar={ar} />
    </QuestionnaireForm>
  );
}
