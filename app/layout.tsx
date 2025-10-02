import React from 'react';
import { Roboto } from 'next/font/google';
import { Agbalumo } from 'next/font/google';
import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Metadata } from 'next';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const agbalumo = Agbalumo({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-agbalumo',
});

export const metadata: Metadata = {
  title: '09-auth',
  description:
    'An application for storing, creating, deleting, and searching notes',
  openGraph: {
    title: '09-auth',
    description:
      'An application for storing, creating, deleting, and searching notes',
    url: `https://09-auth-azure-eight.vercel.app/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${agbalumo.variable}`}>
        {/* SVG sprite с иконками */}
        <svg
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          <defs>
            <symbol id="icon-box" viewBox="0 0 20 20">
              <path d="M0 2c0-1.1 0.9-2 2-2h16c1.105 0 2 0.895 2 2v0 2h-20v-2zM1 5h18v13c0 1.105-0.895 2-2 2v0h-14c-1.105 0-2-0.895-2-2v0-13zM7 7v2h6v-2h-6z"></path>
            </symbol>
          </defs>
        </svg>

        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main style={{ flex: '1 0 auto', position: 'relative' }}>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
