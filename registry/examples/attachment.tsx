import { FilePdfIcon, FileTextIcon, ImageIcon, SpinnerIcon, UploadSimpleIcon, WarningCircleIcon, XIcon } from '@phosphor-icons/react/ssr';
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from '@/registry/ui/attachment';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A file chip for chats and forms with five states, three sizes, a vertical tile and a scrolling group.',
    ar: 'شريحة ملف للمحادثات والنماذج بخمس حالات وثلاثة مقاسات وبطاقة عمودية ومجموعة قابلة للتمرير.',
  },
  usage: `import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

<Attachment>
  <AttachmentMedia><FileIcon /></AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>invoice.pdf</AttachmentTitle>
    <AttachmentDescription>240 KB</AttachmentDescription>
  </AttachmentContent>
</Attachment>`,
  examples: {
    Default: { en: 'Default with remove action', ar: 'افتراضي مع إجراء الإزالة' },
    States: { en: 'States', ar: 'الحالات' },
    Sizes: { en: 'Sizes', ar: 'المقاسات' },
    Group: { en: 'Vertical tiles in a group', ar: 'بطاقات عمودية في مجموعة' },
  },
  accessibility: [
    { en: 'The state is a data attribute only: also write it in the description, for example "Uploading" or "Failed".', ar: 'الحالة سمة data فقط: اكتبها أيضًا في الوصف، مثل "جارٍ الرفع" أو "فشل".' },
    { en: 'Icon-only AttachmentAction buttons need an aria-label.', ar: 'أزرار AttachmentAction التي تحتوي أيقونة فقط تحتاج aria-label.' },
    { en: 'AttachmentTrigger stretches a button or link over the whole chip; the actions stay clickable above it.', ar: 'يمدّ AttachmentTrigger زرًا أو رابطًا على الشريحة كلها؛ وتبقى الإجراءات قابلة للنقر فوقه.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Attachment>
      <AttachmentMedia>
        <FilePdfIcon weight="regular" aria-hidden />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>
          <bdi dir="ltr">invoice-1042.pdf</bdi>
        </AttachmentTitle>
        <AttachmentDescription>
          PDF · <bdi>240 {ar ? 'ك.ب' : 'KB'}</bdi>
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label={ar ? 'إزالة المرفق' : 'Remove attachment'}>
          <XIcon weight="regular" />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}

export function States({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const states = [
    { state: 'idle', label: ar ? 'بانتظار الرفع' : 'Waiting to upload', icon: <UploadSimpleIcon weight="regular" /> },
    { state: 'uploading', label: ar ? 'جارٍ الرفع' : 'Uploading', icon: <SpinnerIcon className="animate-spin motion-reduce:animate-none" /> },
    { state: 'processing', label: ar ? 'جارٍ المعالجة' : 'Processing', icon: <SpinnerIcon className="animate-spin motion-reduce:animate-none" /> },
    { state: 'error', label: ar ? 'فشل الرفع' : 'Upload failed', icon: <WarningCircleIcon weight="regular" /> },
    { state: 'done', label: ar ? 'تم الرفع' : 'Uploaded', icon: <FileTextIcon weight="regular" /> },
  ] as const;
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-2">
      {states.map(({ state, label, icon }) => (
        <Attachment key={state} state={state}>
          <AttachmentMedia aria-hidden>{icon}</AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>
              <bdi dir="ltr">report.docx</bdi>
            </AttachmentTitle>
            <AttachmentDescription>{label}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  );
}

export function Sizes({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-2">
      {(['default', 'sm', 'xs'] as const).map((size) => (
        <Attachment key={size} size={size}>
          <AttachmentMedia aria-hidden>
            <FileTextIcon weight="regular" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>
              <bdi dir="ltr">notes.txt</bdi>
            </AttachmentTitle>
            <AttachmentDescription>
              <bdi>12 {ar ? 'ك.ب' : 'KB'}</bdi>
            </AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  );
}

export function Group({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const files = ['photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg', 'photo-4.jpg', 'photo-5.jpg'];
  return (
    <AttachmentGroup className="w-full max-w-sm [contain:inline-size]" role="list" aria-label={ar ? 'الصور المرفقة' : 'Attached photos'}>
      {files.map((name) => (
        <Attachment key={name} orientation="vertical" role="listitem">
          <AttachmentMedia variant="icon">
            <ImageIcon weight="regular" aria-hidden />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>
              <bdi dir="ltr">{name}</bdi>
            </AttachmentTitle>
          </AttachmentContent>
          <AttachmentTrigger aria-label={(ar ? 'فتح ' : 'Open ') + name} />
        </Attachment>
      ))}
    </AttachmentGroup>
  );
}
