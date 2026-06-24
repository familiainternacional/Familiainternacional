import { getPrismaClient } from '../src/lib/db/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const prisma = getPrismaClient();
  const email = process.env.ADMIN_EMAIL || 'contacto@familiainternacional.cl';
  const password = process.env.ADMIN_PASSWORD || '123Password.,';

  console.log(`Checking admin user: ${email}`);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('Admin user already exists!');
  } else {
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Administrador',
        role: 'ADMIN',
      },
    });
    console.log('Admin user successfully created!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    const prisma = getPrismaClient();
    await prisma.$disconnect();
  });
