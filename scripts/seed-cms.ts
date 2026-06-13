import { getPrismaClient } from '../src/lib/db/prisma';
import { primaryContact } from '../src/config/contact';
import { siteConfig } from '../src/config/site';
import { defaultOfficeAddressMultiline } from '../src/lib/site-contact';

const prisma = getPrismaClient();

const TESTIMONIALS = [
  {
    quoteEs:
      'Excelente servicio y muy profesionales. Me acompañaron en todo mi proceso de divorcio internacional desde España.',
    quoteEn:
      'Excellent service and very professional. They supported me through my entire international divorce process from Spain.',
    author: 'Andrea F.',
    roleEs: 'Cliente — Divorcio internacional',
    roleEn: 'Client — International divorce',
  },
  {
    quoteEs:
      'Resolvieron un tema de pensión de alimentos que llevaba meses estancado. Su experiencia en el Convenio de Nueva York fue fundamental.',
    quoteEn:
      'They resolved a child support matter stalled for months. Their experience with the New York Convention was essential.',
    author: 'Carlos M.',
    roleEs: 'Cliente — Alimentos internacionales',
    roleEn: 'Client — International child support',
  },
  {
    quoteEs:
      'Muy agradecida por la gestión de nuestro cuidado personal internacional. Siempre estuvieron disponibles y nos explicaron cada paso.',
    quoteEn:
      'Very grateful for the handling of our international custody case. They were always available and explained every step.',
    author: 'Javiera S.',
    roleEs: 'Cliente — Cuidado personal internacional',
    roleEn: 'Client — International custody',
  },
];

async function main() {
  console.log('🌱 Starting seed process...');

  for (let i = 0; i < TESTIMONIALS.length; i++) {
    const t = TESTIMONIALS[i];
    await prisma.testimonial.create({
      data: {
        ...t,
        sortOrder: i,
        published: true,
      },
    });
  }
  console.log(`✅ Inserted ${TESTIMONIALS.length} testimonials.`);

  await prisma.homeHeroSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      titleLine1Es: 'Familias',
      titleLine2Es: 'Sin Fronteras.',
      subtitleEs:
        'Primer estudio jurídico en Chile dedicado exclusivamente al Derecho Internacional de Familia.',
    },
  });
  console.log('✅ Upserted HomeHeroSettings.');

  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {
      whatsappNumber: '56991452412',
      primaryPhone: primaryContact.displayPhone,
      primaryEmail: primaryContact.email,
      officeAddress: defaultOfficeAddressMultiline,
      linkedinUrl: siteConfig.contact.social.linkedin,
      instagramUrl: siteConfig.contact.social.instagram,
    },
    create: {
      id: 'main',
      whatsappNumber: '56991452412',
      primaryPhone: primaryContact.displayPhone,
      primaryEmail: primaryContact.email,
      officeAddress: defaultOfficeAddressMultiline,
      linkedinUrl: siteConfig.contact.social.linkedin,
      instagramUrl: siteConfig.contact.social.instagram,
    },
  });
  console.log('✅ Upserted SiteSettings.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
