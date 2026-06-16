/** Logos locales de medios donde aparece el estudio (Wikimedia Commons). */
export type PressOutletLogo = {
  name: string;
  src: string;
  href: string;
  width: number;
  height: number;
};

export const pressOutletLogos: PressOutletLogo[] = [
  {
    name: 'Las Últimas Noticias',
    src: '/media/logos/lun.svg',
    href: '/prensa/lun-mane-swett-convenio-la-haya',
    width: 200,
    height: 26,
  },
  {
    name: 'T13',
    src: '/media/logos/t13.svg',
    href: '/prensa',
    width: 72,
    height: 72,
  },
  {
    name: 'YouTube',
    src: '/media/logos/youtube.svg',
    href: '/prensa',
    width: 128,
    height: 28,
  },
];
