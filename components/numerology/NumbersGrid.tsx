import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getReading } from '@/data/index';
import { INDICATORS } from '@/types/numerology';
import type { NumerologyNumbers } from '@/types/numerology';

interface NumbersGridProps {
  numbers: NumerologyNumbers;
  /** Nếu có, mỗi ô sẽ là link đến route này/{key} */
  linkPrefix?: string;
}

export function NumbersGrid({ numbers, linkPrefix }: NumbersGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {INDICATORS.map(ind => {
        const val = numbers[ind.key as keyof NumerologyNumbers] as number;
        const r   = getReading(ind.key, val);
        const content = (
          <>
            {linkPrefix && (
              <ChevronRight size={10} className="absolute top-2 right-2 text-text-muted/40" />
            )}
            <span className={`text-2xl font-bold ${ind.textClass}`}>{val}</span>
            <span className="text-[10px] text-text-muted text-center leading-tight">{ind.shortLabel}</span>
            {r?.name && (
              <span className="text-[9px] text-text-muted/70 text-center leading-tight line-clamp-1">{r.name}</span>
            )}
          </>
        );

        const cls = 'relative flex flex-col items-center gap-1 p-3 rounded-xl bg-surface2';

        return linkPrefix ? (
          <Link
            key={ind.key}
            href={`${linkPrefix}/${ind.key}`}
            className={`${cls} active:bg-surface3 transition-colors`}
          >
            {content}
          </Link>
        ) : (
          <div key={ind.key} className={cls}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
