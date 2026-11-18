import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { TimePicker, formatTime, from12, parseTime, timePickerLabelsAr, to12 } from './time-picker';

const ar = (lang: 'en' | 'ar') => (lang === 'ar' ? timePickerLabelsAr : undefined);

describe('time-picker', () => {
  test('parseTime accepts HH:mm and rejects the rest', () => {
    expect(parseTime('09:05')).toEqual({ h: 9, m: 5 });
    expect(parseTime('23:59')).toEqual({ h: 23, m: 59 });
    expect(parseTime('24:00')).toBeNull();
    expect(parseTime('12:60')).toBeNull();
    expect(parseTime('')).toBeNull();
    expect(formatTime({ h: 7, m: 3 })).toBe('07:03');
  });

  test('12 hour conversion round trips', () => {
    for (let h = 0; h < 24; h++) expect(from12(to12(h), h >= 12)).toBe(h);
    expect(to12(0)).toBe(12);
    expect(to12(12)).toBe(12);
    expect(from12(12, false)).toBe(0);
    expect(from12(12, true)).toBe(12);
  });

  test('segments render in en and ar, 24h and 12h', () => {
    for (const lang of ['en', 'ar'] as const) {
      const h24 = renderToString(<TimePicker labels={ar(lang)} defaultValue="14:30" aria-label="Time" />);
      expect(h24).toContain('role="spinbutton"');
      expect(h24).toContain('14');
      const h12 = renderToString(<TimePicker labels={ar(lang)} hourCycle={12} defaultValue="14:30" aria-label="Time" />);
      expect(h12).toContain(lang === 'ar' ? 'م<' : 'PM<');
      expect(h12).toContain('>02<');
    }
  });

  test('empty value shows placeholders and Arabic-Indic digits are optional', () => {
    expect(renderToString(<TimePicker aria-label="Time" />)).toContain('--');
    expect(renderToString(<TimePicker digits="arab" defaultValue="09:45" aria-label="t" />)).toContain('٠٩');
    expect(renderToString(<TimePicker labels={timePickerLabelsAr} hourCycle={12} defaultValue="06:00" aria-label="t" />)).toContain('ص<');
  });

  test('list variant renders the trigger with the value and a hidden input', () => {
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(<TimePicker variant="list" labels={ar(lang)} hourCycle={12} defaultValue="09:15" name="t" />);
      expect(html).toContain('data-slot="time-picker"');
      expect(html).toContain('name="t"');
      expect(html).toContain('09:15');
    }
  });
});
