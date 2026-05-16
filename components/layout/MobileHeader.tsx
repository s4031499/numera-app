'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  action?: ReactNode;
  className?: string;
}

export function MobileHeader({ title, showBack = true, action, className }: MobileHeaderProps) {
  const router = useRouter();

  return (
    <header className={cn('flex items-center gap-3 px-5 pt-14 pb-4', className)}>
      {showBack && (
        <button
          onClick={() => router.back()}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-surface2 border border-numera-border shrink-0"
          aria-label="Quay lại"
        >
          <ArrowLeft size={18} className="text-text" />
        </button>
      )}
      <h1 className={cn('flex-1 font-semibold text-text text-lg', showBack ? 'text-center' : '')}>
        {title}
      </h1>
      {action ? (
        <div className="w-11 h-11 flex items-center justify-center">{action}</div>
      ) : (
        showBack && <div className="w-11" />
      )}
    </header>
  );
}
