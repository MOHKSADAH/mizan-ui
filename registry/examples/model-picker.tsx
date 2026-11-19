import { ModelPickerDemo } from '@/registry/examples/model-picker.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A searchable model list in a popover. Each row shows the model name, the provider, the context size and the price per million tokens. The trigger is small enough for the prompt input toolbar.',
    ar: 'قائمة نماذج قابلة للبحث في نافذة منبثقة. يعرض كل صف اسم النموذج والمزوّد وحجم السياق والسعر لكل مليون رمز. الزر صغير ليناسب شريط أدوات مربع الإدخال.',
  },
  usage: `import { ModelPicker } from "@/components/ui/model-picker"

<ModelPicker models={models} value={id} onValueChange={setId} currency="USD" />`,
  examples: { Default: { en: 'Default', ar: 'افتراضي' } },
  accessibility: [
    { en: 'The list is a Command (cmdk): type to filter, use the arrows to move, Enter to choose. Escape closes it.', ar: 'القائمة مكوّن Command ‏(cmdk): اكتب للتصفية واستخدم الأسهم للتنقل وEnter للاختيار. يغلقها Escape.' },
    { en: 'The trigger is named "Model: Mizan Pro". Names and prices stay left to right inside Arabic text.', ar: 'اسم الزر "النموذج: Mizan Pro". تبقى الأسماء والأسعار من اليسار إلى اليمين داخل النص العربي.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <ModelPickerDemo lang={lang} />;
}
