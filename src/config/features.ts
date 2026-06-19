/** Chat Cliengo en la tab bar móvil (sheet a pantalla completa). Desactivado: launcher flotante pequeño. */
export const MOBILE_TAB_BAR_CHAT_ENABLED = false;

/** reCAPTCHA v3 en formularios. Activar con NEXT_PUBLIC_RECAPTCHA_ENABLED=true */
export function isRecaptchaFeatureEnabled() {
  const raw = process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED?.trim().toLowerCase();
  return raw === 'true' || raw === '1' || raw === 'yes';
}
