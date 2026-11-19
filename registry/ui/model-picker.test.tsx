import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { ModelPicker, modelPickerLabelsAr } from './model-picker';

const models = [
  { id: 'lite', name: 'Mizan Lite', provider: 'ميزان', context: 128000, price: { input: 0.15, output: 0.6 } },
  { id: 'pro', name: 'Mizan Pro', provider: 'ميزان', context: 200000, price: { input: 3, output: 15 } },
];

test('the trigger shows the chosen model and is named after it', () => {
  const html = renderToString(<ModelPicker models={models} defaultValue="pro" />);
  expect(html).toContain('aria-label="Model: Mizan Pro"');
  expect(html).toContain('Mizan Pro');
  expect(html).toContain('aria-haspopup="dialog"');
});

test('the first model is the default and Arabic labels apply', () => {
  const html = renderToString(<ModelPicker models={models} lang="ar" labels={modelPickerLabelsAr} />);
  expect(html).toContain('aria-label="النموذج: Mizan Lite"');
});

test('the context label wraps the compact size', () => {
  expect(modelPickerLabelsAr.context('200 ألف')).toBe('سياق 200 ألف');
});
