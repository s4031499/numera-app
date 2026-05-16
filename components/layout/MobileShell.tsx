import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileShellProps {
  children: ReactNode;
  className?: string;
  withTabBar?: boolean;
}

export function MobileShell({ children, className, withTabBar = false }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-bg flex justify-center">
      <div
        className={cn(
          'relative w-full max-w-107.5 min-h-screen bg-bg flex flex-col overflow-x-hidden',
          'starfield',
          withTabBar && 'pb-20',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
