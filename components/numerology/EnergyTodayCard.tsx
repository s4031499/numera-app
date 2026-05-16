import { Sun } from 'lucide-react';

interface EnergyTodayCardProps {
  personalYear: number;
  yearName: string;
}

export function EnergyTodayCard({ personalYear, yearName }: EnergyTodayCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-numera-border">
      <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
        <Sun size={20} className="text-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-muted mb-0.5">Năng lượng hôm nay</p>
        <p className="text-sm font-medium text-text line-clamp-2 leading-snug">{yearName}</p>
      </div>
      <div className="w-9 h-9 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center shrink-0">
        <span className="text-lg font-bold text-purple-light">{personalYear}</span>
      </div>
    </div>
  );
}
