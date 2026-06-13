import { getPrismaClient } from '../src/lib/db/prisma';
import { primaryContact } from '../src/config/contact';
import { siteConfig } from '../src/config/site';
import { defaultOfficeAddressMultiline } from '../src/lib/site-contact';

const prisma = getPrismaClient();

const TESTIMONIALS = [
  {
    quoteEs: 'Ordenaron todo rapido. Nos dejaron una estructura clara y sin vueltas.',
    quoteEn: 'They organized everything quickly. Clear structure, no unnecessary turns.',
    author: 'Andres V.',
    roleEs: 'Director Ejecutivo, Tecnologia',
    roleEn: 'CEO, Tech Sector',
  },
  {
    quoteEs: 'Entendieron el negocio al tiro. La asesoria fue precisa y muy practica.',
    quoteEn: 'They understood the business right away. Precise, practical advice.',
    author: 'Carolina M.',
    roleEs: 'Directora de Operaciones, Retail',
    roleEn: 'COO, Retail',
  },
  {
    quoteEs: 'Revisaron contratos con mucho criterio. Hoy firmamos con mas tranquilidad.',
    quoteEn: 'They reviewed contracts with real judgment. We now sign with more confidence.',
    author: 'Fernando R.',
    roleEs: 'Socio Fundador, Inmobiliario',
    roleEn: 'Founding Partner, Real Estate',
  },
  {
    quoteEs: 'Responden rapido y hablan claro. Se siente como tenerlos dentro del equipo.',
    quoteEn: 'Fast answers and clear language. It feels like having them inside the team.',
    author: 'Patricia L.',
    roleEs: 'Gerente General, Logistica',
    roleEn: 'General Manager, Logistics',
  },
];

async function main() {
  console.log('🌱 Starting seed process...');

  // 1. Seed Testimonials
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

  // 2. Seed HomeHeroSettings
  await prisma.homeHeroSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      titleLine1Es: 'Precisión estratégica.',
      titleLine2Es: 'Ejecución implacable.',
      subtitleEs: 'Asesoría jurídica de alto estándar para empresas y empresarios que buscan avanzar con seguridad.',
    },
  });
  console.log('✅ Upserted HomeHeroSettings.');

  // 3. Seed SiteSettings
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
      primaryPhone: '+56 9 9145 2412',
      primaryEmail: 'contacto@familiainternacional.cl',
      officeAddress: 'Av. San Josemaría Escrivá de Balaguer N°13.105, Of. 303\nLo Barnechea\nSantiago, Chile',
      linkedinUrl: siteConfig.contact.social.linkedin,
      instagramUrl: siteConfig.contact.social.instagram,
    },
  });
  console.log('✅ Upserted SiteSettings.');

  console.log('🎉 Seed process finished successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
