// `phone` must be international (country code first). Local formats such as 05x are not converted.
export function whatsappUrl(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, '').replace(/^00/, '');
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
