async function loadEnv() {
  try {
    const dotenv = await import('dotenv');
    dotenv.config({ path: '.env.local' });
    dotenv.config({ path: '.env' });
  } catch {
    // dotenv is optional when variables are already provided by the shell.
  }
}

async function main() {
  await loadEnv();

  const { createClient } = await import('@supabase/supabase-js');
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase URL or Service Role Key');
    process.exitCode = 1;
    return;
  }

  if (!email || !password) {
    console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD');
    process.exitCode = 1;
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log(`Creating user: ${email}...`);

  const { data: user, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: email.split('@')[0] },
    app_metadata: { role: 'admin' },
  });

  if (error) {
    if (!error.message.includes('already registered')) {
      console.error('Error creating user:', error);
      process.exitCode = 1;
      return;
    }

    console.log('User already exists, updating role to admin...');
    const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
      console.error('Error listing users:', listError);
      process.exitCode = 1;
      return;
    }

    const existingUser = usersData.users.find((candidate) => candidate.email === email);

    if (!existingUser) {
      console.error('User exists but could not be found in admin list.');
      process.exitCode = 1;
      return;
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      { app_metadata: { role: 'admin' }, password },
    );

    if (updateError) {
      console.error('Error updating user:', updateError);
      process.exitCode = 1;
      return;
    }

    console.log('Successfully updated existing user to admin.');
    return;
  }

  console.log('Admin user created successfully.');
  console.log('ID:', user.user?.id);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
