import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { PromptInput, promptInputLabelsAr } from './prompt-input';

test('prompt input renders a textarea that follows the typed direction, with a send button', () => {
  const html = renderToString(<PromptInput />);
  expect(html).toContain('dir="auto"');
  expect(html).toContain('aria-label="Send"');
  expect(html).toContain('rtl:-scale-x-100');
  expect(html).toContain('aria-disabled="true"');
});

test('prompt input in Arabic uses Arabic labels', () => {
  const html = renderToString(<PromptInput labels={promptInputLabelsAr} defaultValue="لخّص مبيعات الأسبوع" />);
  expect(html).toContain('aria-label="إرسال"');
  expect(html).toContain('placeholder="اسأل أي شيء"');
  expect(html).toContain('aria-disabled="false"');
});

test('a streaming status turns send into stop', () => {
  const html = renderToString(<PromptInput status="streaming" labels={promptInputLabelsAr} />);
  expect(html).toContain('aria-label="إيقاف التوليد"');
  expect(html).not.toContain('aria-label="إرسال"');
});

test('attachments render with a remove button named after the file', () => {
  const html = renderToString(
    <PromptInput
      attachments={[{ id: 'a', name: 'طلبات.csv', description: '48 KB', state: 'uploading' }]}
      onRemoveAttachment={() => {}}
      labels={promptInputLabelsAr}
    />,
  );
  expect(html).toContain('طلبات.csv');
  expect(html).toContain('data-state="uploading"');
  expect(html).toContain('aria-label="إزالة طلبات.csv"');
});

test('tools and model slots render', () => {
  const html = renderToString(<PromptInput tools={<i data-tools />} model={<i data-model />} />);
  expect(html).toContain('data-tools');
  expect(html).toContain('data-model');
});
