import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface FeaturePillProps {
  icon: LucideIcon;
  label: string;
  className?: string;
}

export function FeaturePill({ icon: Icon, label, className }: FeaturePillProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3.5 rounded-2xl',
        'bg-surface border border-numera-border',
        className
      )}
    >
      <div className="w-8 h-8 rounded-lg bg-purple/20 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-purple-light" />
      </div>
      <span className="text-sm font-medium text-text">{label}</span>
    </div>
  );
}
