/** Paleta oficial — extraída de logoabogados_VERSIONES-04.png */
export const brandColors = {
  /** Fondo del logo oficial */
  primary: '#07234c',
  primaryDark: '#051830',
  primaryMid: '#0d3566',
  primaryAccent: '#2d5070',
  primaryBright: '#6b849c',
  primaryLight: '#e8eef4',
  primarySoft: 'rgba(7, 35, 76, 0.14)',
  white: '#ffffff',
  surfaceDark: '#0d3566',
  textMuted: '#a0b0c0',
  error: '#c0392b',
} as const;

export type BrandColorKey = keyof typeof brandColors;
