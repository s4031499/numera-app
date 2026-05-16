import Link from 'next/link';
import { cn } from '@/lib/utils';
import { INDICATORS } from '@/types/numerology';
import type { ReadingType } from '@/types/numerology';

interface NumberCardProps {
  type: ReadingType;
  value: number;
  name?: string;
  className?: string;
}

export function NumberCard({ type, value, name, className }: NumberCardProps) {
  const meta = INDICATORS.find(i => i.key === type)!;

  return (
    <Link
      href={`/reading/${type}`}
      className={cn(
        'flex flex-col gap-1 p-4 rounded-2xl bg-surface border border-numera-border',
        'active:scale-95 transition-transform',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn('text-xs font-medium', meta.textClass)}>{meta.shortLabel}</span>
        <span
          className={cn('text-2xl font-bold', meta.textClass)}
          style={{ color: meta.color }}
        >
          {value}
        </span>
      </div>
      {name && (
        <p className="text-text-muted text-xs leading-snug mt-0.5 line-clamp-2">{name}</p>
      )}
    </Link>
  );
}
