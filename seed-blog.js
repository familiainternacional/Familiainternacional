async function main() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  try {
    await prisma.blogPost.createMany({
      data: [
        {
          slug: 'nueva-ley-de-quiebras-2026',
          titleEs: 'Nueva Ley de Quiebras: Lo que toda empresa debe saber antes del Q3',
          excerptEs:
            'Analizamos los cambios fundamentales en la reorganizacion financiera y como las empresas pueden adelantarse a la nueva normativa.',
          contentEs: 'Contenido completo del articulo...',
          coverImage: '/images/santiago-skyline.jpg',
          published: true,
          publishedAt: new Date(),
          authorName: 'Sebastian Leiva',
        },
        {
          slug: 'compliance-penal-empresarial',
          titleEs: 'El rol del Compliance en la prevencion de delitos economicos corporativos',
          excerptEs:
            'Una mirada profunda a la responsabilidad penal de las personas juridicas y las defensas corporativas efectivas.',
          contentEs: 'Contenido completo del articulo...',
          coverImage: '/services/corporate_law.png',
          published: true,
          publishedAt: new Date(Date.now() - 86400000 * 2),
          authorName: 'Christian Ruiz',
        },
        {
          slug: 'litigios-civiles-complejos',
          titleEs: 'Estrategias de negociacion en litigios civiles de alta complejidad',
          excerptEs:
            'Como el timing procesal y la presion negociadora pueden definir el resultado de un juicio antes de llegar a la corte.',
          contentEs: 'Contenido completo del articulo...',
          coverImage: '/services/civil_litigation.png',
          published: true,
          publishedAt: new Date(Date.now() - 86400000 * 5),
          authorName: 'Ruiz Leiva Abogados',
        },
        {
          slug: 'derecho-administrativo-sancionatorio',
          titleEs: 'Defensa ante multas y sumarios de la Superintendencia',
          excerptEs:
            'Pasos clave para enfrentar procesos sancionatorios administrativos sin comprometer la operatividad de la empresa.',
          contentEs: 'Contenido completo del articulo...',
          coverImage: '/services/administrative_law.png',
          published: true,
          publishedAt: new Date(Date.now() - 86400000 * 10),
          authorName: 'Ruiz Leiva Abogados',
        },
      ],
      skipDuplicates: true,
    });
    console.log('Seeded blog posts');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
