import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase URL or Service Role Key in environment variables.');
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const email = process.env.ADMIN_EMAIL || 'contacto@familiainternacional.cl';
  const password = process.env.ADMIN_PASSWORD || '123Password.,';

  console.log(`Checking Supabase Auth for user: ${email}`);

  // Try to find the user first by creating them (if they exist, it will return an error or we can list users)
  // Actually, we can just use admin.createUser. If it exists, it fails.
  const { data: userCreated, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: 'Administrador' },
    app_metadata: { role: 'admin' }
  });

  if (createError) {
    if (createError.message.includes('already exists') || createError.message.includes('unique')) {
      console.log('User already exists in Supabase Auth. Updating their password and claims to ensure admin access...');
      
      // We need to fetch the user by email to get their ID to update them
      const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) throw listError;

      const user = listData.users.find(u => u.email === email);
      if (!user) throw new Error('User exists but could not be found in listUsers.');

      const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
        password,
        app_metadata: { role: 'admin' }
      });

      if (updateError) throw updateError;
      console.log('Supabase admin user successfully updated!');
    } else {
      throw createError;
    }
  } else {
    console.log('Supabase admin user successfully created and authorized!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
