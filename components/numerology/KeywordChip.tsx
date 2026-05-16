import { cn } from '@/lib/utils';

interface KeywordChipProps {
  label: string;
  className?: string;
}

export function KeywordChip({ label, className }: KeywordChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        'bg-purple/15 text-purple-light border border-purple/25',
        className
      )}
    >
      {label}
    </span>
  );
}
