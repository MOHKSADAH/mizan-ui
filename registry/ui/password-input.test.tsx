import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { PasswordInput, defaultRules, passwordInputLabels, passwordStrength } from './password-input';

const rules = defaultRules(passwordInputLabels, 8);

describe('password-input', () => {
  test('strength is 0 below the minimum length and grows with the rules met', () => {
    expect(passwordStrength('', rules)).toBe(0);
    expect(passwordStrength('Ab1!', rules)).toBe(0);
    expect(passwordStrength('abcdefgh', rules)).toBe(2);
    expect(passwordStrength('Abcdefgh1', rules)).toBe(3);
    expect(passwordStrength('Abcdefgh1!', rules)).toBe(4);
  });

  test('rules count Arabic letters and digits as letters and numbers', () => {
    expect(rules.find((r) => r.id === 'number')!.test('٣')).toBe(true);
    expect(rules.find((r) => r.id === 'symbol')!.test('كلمة')).toBe(false);
  });

  test('renders the toggle, meter and checklist in en and ar', () => {
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(<PasswordInput lang={lang} showStrength defaultValue="Abcdefgh1" aria-label="Password" />);
      expect(html).toContain('type="password"');
      expect(html).toContain('aria-pressed="false"');
      expect(html).toContain('role="meter"');
      expect(html).toContain(lang === 'ar' ? 'إظهار كلمة المرور' : 'Show password');
      expect(html).toContain(lang === 'ar' ? 'جيدة' : 'Good');
    }
  });

  test('renders without the meter by default', () => {
    expect(renderToString(<PasswordInput aria-label="Password" />)).not.toContain('role="meter"');
  });
});
