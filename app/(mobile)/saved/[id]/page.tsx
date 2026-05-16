'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Trash2, CalendarDays } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { actionGetSavedReading, actionDeleteReading } from '@/lib/actions/readings';
import { getInitials, formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { getReading } from '@/data/index';
import { RELATIONSHIP_LABELS } from '@/types/numerology';
import { NumbersGrid } from '@/components/numerology/NumbersGrid';
import type { SavedReading } from '@/types/numerology';

export default function SavedDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [reading, setReading] = useState<SavedReading | null>(null);

  useEffect(() => {
    actionGetSavedReading(params.id as string).then(found => {
      if (!found) { router.replace('/saved'); return; }
      setReading(found);
    });
  }, [params.id, router]);

  if (!reading) return (
    <MobileShell withTabBar>
      <MobileHeader title="..." />
      <div className="px-4 pt-4 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-3 py-6">
          <Skeleton className="w-20 h-20 rounded-full" />
          <Skeleton className="h-5 w-40 rounded-lg" />
          <Skeleton className="h-4 w-32 rounded-lg" />
        </div>
        <Skeleton className="h-52 rounded-2xl" />
        <Skeleton className="h-36 rounded-2xl" />
      </div>
      <BottomTabBar />
    </MobileShell>
  );

  const initials = getInitials(reading.name);
  const lpReading = getReading('lifePath', reading.numbers.lifePath);

  const handleDelete = async () => {
    await actionDeleteReading(reading.id);
    router.replace('/saved');
  };

  return (
    <MobileShell withTabBar>
      <MobileHeader
        title={reading.name}
        action={
          <button
            onClick={handleDelete}
            className="w-11 h-11 flex items-center justify-center rounded-full active:bg-surface2"
            aria-label="Xóa lá số này"
          >
            <Trash2 size={18} className="text-text-muted" />
          </button>
        }
      />

      <div className="px-4 pb-6 flex flex-col gap-4">
        {/* Hero */}
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-2xl bg-purple">
            {initials}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-text">{reading.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <CalendarDays size={12} className="text-text-muted" />
              <p className="text-text-muted text-xs">
                {formatDate(reading.day, reading.month, reading.year)}
              </p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple/20 text-purple-light">
                {RELATIONSHIP_LABELS[reading.relationship]}
              </span>
            </div>
            {lpReading && (
              <p className="text-gold text-sm font-medium mt-1">{lpReading.name}</p>
            )}
          </div>
        </div>

        {/* Numbers grid — mỗi ô click được để xem chi tiết */}
        <div className="p-4 rounded-2xl bg-surface border border-numera-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text">Các con số</h3>
            <span className="text-[10px] text-text-muted">Nhấn để xem chi tiết</span>
          </div>
          <NumbersGrid numbers={reading.numbers} linkPrefix={`/saved/${reading.id}`} />
        </div>

        {/* Life path detail */}
        {lpReading && (
          <div className="p-4 rounded-2xl bg-surface border border-numera-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-gold">{reading.numbers.lifePath}</span>
              <div>
                <p className="text-sm font-semibold text-text">{lpReading.name}</p>
                <p className="text-xs text-text-muted">Số Đường Đời</p>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed line-clamp-4">
              {(lpReading as any).overview || (lpReading as any).meaning}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {lpReading.keywords.slice(0, 3).map(kw => (
                <span key={kw} className="text-xs px-2.5 py-1 rounded-full bg-purple/15 text-purple-light border border-purple/25">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="w-full py-3.5 rounded-2xl border border-numera-border text-text-muted text-sm font-medium flex items-center justify-center gap-2 active:bg-surface2 mt-2"
        >
          <Trash2 size={15} />
          Xóa lá số này
        </button>
      </div>

      <BottomTabBar />
    </MobileShell>
  );
}
