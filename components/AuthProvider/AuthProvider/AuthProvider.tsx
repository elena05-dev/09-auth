'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { fetchCurrentUser } from '@/lib/api/clientApi';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setAuth, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function verifyAuth() {
      try {
        const user = await fetchCurrentUser();

        if (user) {
          setAuth(user);

          if (
            pathname.startsWith('/sign-in') ||
            pathname.startsWith('/sign-up')
          ) {
            router.replace('/profile');
          }
        } else {
          clearAuth();

          if (pathname.startsWith('/profile')) router.replace('/sign-in');
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        clearAuth();
        if (pathname.startsWith('/profile')) router.replace('/sign-in');
      } finally {
        setLoading(false);
      }
    }

    verifyAuth();
  }, [pathname, router, setAuth, clearAuth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
