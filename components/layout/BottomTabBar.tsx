'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/dashboard', label: 'Trang chủ', icon: Home },
  { href: '/saved',     label: 'Con số',    icon: LayoutGrid },
  { href: '/compat',    label: 'Tương hợp', icon: Heart },
  { href: '/profile',   label: 'Cá nhân',   icon: User },
];

// Map exact paths for active detection
const isActive = (href: string, pathname: string) => {
  if (href === '/dashboard') return pathname === '/dashboard';
  if (href === '/saved') return (
    pathname.startsWith('/saved') ||
    pathname.startsWith('/reading') ||
    pathname.startsWith('/lookup') ||
    pathname.startsWith('/result')
  );
  return pathname.startsWith(href);
};

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-107.5 bg-surface border-t border-numera-border safe-bottom z-50"
      aria-label="Điều hướng chính"
    >
      <div className="flex items-center h-15" role="tablist">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href, pathname);
          return (
            <Link
              key={href}
              href={href}
              role="tab"
              aria-selected={active}
              aria-label={label}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors',
                active ? 'text-gold' : 'text-text-muted'
              )}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.5} aria-hidden="true" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
