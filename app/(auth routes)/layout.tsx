// app/(auth-routes)/layout.tsx
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
