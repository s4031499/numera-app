import type { ReactNode } from 'react';
import { UserProvider } from '@/contexts/UserContext';

export default function WebLayout({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
