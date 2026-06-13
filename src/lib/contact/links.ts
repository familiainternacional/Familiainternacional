/** Dígitos de teléfono/WhatsApp para enlaces wa.me / tel: */
export function digitsOnly(value: string) {
  return value.replace(/\D/g, '');
}

const WHATSAPP_MESSAGE_ES =
  'Hola, necesito asesoria juridica y quiero evaluar mi caso con Ruiz Leiva Abogados.';
const WHATSAPP_MESSAGE_EN =
  'Hello, I need legal advice and would like to evaluate my case with Ruiz Leiva Abogados.';

export function buildWhatsAppHref(number: string, fallback = '#') {
  const digits = digitsOnly(number);
  return digits ? `https://wa.me/${digits}` : fallback;
}

export function buildWhatsAppWidgetHref(
  number: string,
  locale: 'es' | 'en',
  fallback = '/evalua-tu-caso',
) {
  const digits = digitsOnly(number);
  if (!digits) return fallback;

  const message = locale === 'es' ? WHATSAPP_MESSAGE_ES : WHATSAPP_MESSAGE_EN;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildTelHref(phone: string, fallback = '#') {
  const digits = digitsOnly(phone);
  if (!digits) return fallback;
  return `tel:+${digits}`;
}
