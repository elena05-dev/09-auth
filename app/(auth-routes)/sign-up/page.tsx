'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi'; // функция для вызова /api/auth/register
import css from './SignUpPage.module.css';

interface RegisterError {
  message: string;
}

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await register({ email, password }); // отправка запроса через clientApi
      router.push('/profile'); // редирект на профиль после успешной регистрации
    } catch (err: unknown) {
      const registerError = err as RegisterError;
      setError(registerError.message || 'Failed to register');
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={css.input}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={css.input}
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
