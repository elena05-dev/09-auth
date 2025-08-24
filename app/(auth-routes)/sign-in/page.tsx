'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignInPage.module.css';
import type { User } from '@/types/user';

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [error, setError] = useState<string>('');

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data: User) => {
      setUser(data); // теперь типы совпадают
      router.push('/profile'); // редирект после успешного login
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    mutation.mutate({ email, password });
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Logging in...' : 'Log in'}
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
