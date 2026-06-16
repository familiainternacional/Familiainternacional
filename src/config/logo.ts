/** Logo tipográfico — textofamilia.png (800×133 px, fondo transparente). */
export const LOGO_ASPECT_RATIO = 800 / 133;

/** width × height para props de next/image (relación de aspecto correcta). */
export const logoImageSizes = {
  navbar: { width: 433, height: 72 },
  footer: { width: 361, height: 60 },
  admin: { width: 289, height: 48 },
  hero: { width: 505, height: 84 },
} as const;
