import { cn } from '@/lib/utils';

interface LifePathHeroCardProps {
  number: number;
  name: string;
  keywords: string[];
  className?: string;
  label?: string;
}

export function LifePathHeroCard({ number, name, keywords, className, label = 'Số chủ đạo của bạn' }: LifePathHeroCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl p-6',
        'bg-gradient-to-br from-surface3 via-[#1e1a40] to-surface',
        'border border-purple/30',
        className
      )}
    >
      {/* Top label */}
      <div className="flex items-center justify-center gap-2 mb-5">
        <span className="text-gold-light">✦</span>
        <span className="text-xs font-medium text-text-muted tracking-widest uppercase">{label}</span>
        <span className="text-gold-light">✦</span>
      </div>

      {/* Number circle */}
      <div className="flex justify-center mb-4">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#2a1a60] to-[#0d0d1a] border-2 border-gold/40 flex items-center justify-center glow-gold">
          <span className="text-6xl font-bold text-gold leading-none">{number}</span>
        </div>
      </div>

      {/* Name & keywords */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-text mb-2">{name}</h2>
        <p className="text-text-muted text-xs text-center tracking-wide">
          {keywords.slice(0, 3).join(' · ')}
        </p>
      </div>
    </div>
  );
}
