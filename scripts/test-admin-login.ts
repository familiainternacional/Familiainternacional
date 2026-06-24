import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) {
    throw new Error('Missing Supabase URL or Publishable Key.');
  }

  const supabase = createClient(supabaseUrl, publishableKey);

  const email = process.env.ADMIN_EMAIL || 'contacto@familiainternacional.cl';
  const password = process.env.ADMIN_PASSWORD || '123Password.,';

  console.log(`\n🔐 Intentando iniciar sesión con: ${email}`);

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('❌ LOGIN FALLIDO:', error.message);
    process.exit(1);
  }

  console.log('✅ LOGIN EXITOSO!');
  console.log(`   Usuario ID: ${data.user?.id}`);
  console.log(`   Email:      ${data.user?.email}`);
  console.log(`   Rol:        ${data.user?.app_metadata?.role}`);

  const adminRole = data.user?.app_metadata?.role === 'admin';
  if (adminRole) {
    console.log('✅ CLAIMS DE ADMINISTRADOR: Verificados correctamente');
  } else {
    console.error('❌ ERROR: El usuario no tiene claim de administrador.');
    process.exit(1);
  }

  await supabase.auth.signOut();
  console.log('\n🚀 El panel de administración está listo para usarse.\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
