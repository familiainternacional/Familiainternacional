import { ReactNode } from 'react';
import { requireAdminSession } from '@/lib/supabase/auth';

export const metadata = {
  title: 'Demo IA | Familia Internacional',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DemoIALayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === 'production') {
    await requireAdminSession();
  }

  return children;
}
