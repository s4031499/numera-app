'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, SlidersHorizontal, Bookmark, MoreHorizontal } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { actionGetSavedReadings, actionDeleteReading } from '@/lib/actions/readings';
import { getInitials, formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { getReading } from '@/data/index';
import { RELATIONSHIP_LABELS } from '@/types/numerology';
import type { SavedReading, Relationship } from '@/types/numerology';

const FILTER_TABS = [
  { key: 'all',      label: 'Tất cả' },
  { key: 'personal', label: 'Cá nhân' },
  { key: 'family',   label: 'Người thân' },
  { key: 'friend',   label: 'Bạn bè' },
] as const;

const AVATAR_COLORS = ['#7c3aed','#f59e0b','#34d399','#f472b6','#60a5fa','#f97316'];

export default function SavedPage() {
  const router = useRouter();
  const [readings, setReadings] = useState<SavedReading[]>([]);
  const [filter, setFilter] = useState<'all' | Relationship>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    actionGetSavedReadings().then(data => {
      setReadings(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'all' ? readings : readings.filter(r => r.relationship === filter);

  const handleDelete = async (id: string) => {
    await actionDeleteReading(id);
    actionGetSavedReadings().then(setReadings);
  };

  if (loading) {
    return (
      <MobileShell withTabBar>
        <MobileHeader title="Lá số đã lưu" showBack={false} />
        <div className="px-4 pt-4 flex flex-col gap-3">
          <Skeleton className="h-16 rounded-2xl" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 flex-1 rounded-full" />)}
          </div>
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
        <BottomTabBar />
      </MobileShell>
    );
  }

  if (readings.length === 0) {
    return (
      <MobileShell withTabBar>
        <MobileHeader
          title="Lá số đã lưu"
          showBack={false}
          action={<MoreHorizontal size={20} className="text-text-muted" />}
        />
        <div className="flex flex-col flex-1 items-center justify-center px-8 text-center gap-6">
          {/* Bookmark orb */}
          <div className="relative flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border border-purple/40 flex items-center justify-center" style={{ boxShadow: '0 0 40px 10px rgba(124,58,237,0.15)' }}>
              <div className="w-24 h-24 rounded-full border border-purple/60 bg-linear-to-br from-purple/20 to-bg flex items-center justify-center">
                <Bookmark size={36} className="text-gold" strokeWidth={1.5} />
              </div>
            </div>
            <span className="absolute top-3 right-4 text-purple-light opacity-60 text-xs">✦</span>
            <span className="absolute bottom-4 left-3 text-gold opacity-40 text-[8px]">✦</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text mb-2">Chưa có lá số nào</h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Lưu lại lá số của bạn và những người thân yêu để dễ dàng tra cứu vận mệnh và năng lượng mỗi ngày
            </p>
          </div>
          <Link
            href="/lookup"
            className="w-full py-4 rounded-2xl bg-gold text-bg font-bold text-base text-center flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Tạo lá số mới
          </Link>
          <Link href="/welcome" className="text-purple-light text-sm">
            Tìm hiểu thêm về thần số học
          </Link>
        </div>
        <BottomTabBar />
      </MobileShell>
    );
  }

  return (
    <MobileShell withTabBar>
      <MobileHeader
        title="Lá số đã lưu"
        showBack={false}
        action={<SlidersHorizontal size={18} className="text-text-muted" />}
      />

      <div className="px-4 pb-6">
        {/* Summary card */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-purple/20 border border-purple/30 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple/30 flex items-center justify-center shrink-0">
            <Bookmark size={18} className="text-purple-light" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-text">{readings.length} lá số đã lưu</p>
            <p className="text-xs text-text-muted">Cập nhật lần cuối hôm nay</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">
          {FILTER_TABS.map(({ key, label }) => {
            const count = key === 'all' ? readings.length : readings.filter(r => r.relationship === key).length;
            return (
              <button
                key={key}
                onClick={() => setFilter(key as typeof filter)}
                className={`shrink-0 px-3 py-2 min-h-11 rounded-full text-xs font-medium transition-colors ${
                  filter === key
                    ? 'bg-gold text-bg'
                    : 'bg-surface border border-numera-border text-text-muted'
                }`}
              >
                {label} {count}
              </button>
            );
          })}
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {filtered.map((r, i) => {
            const initials = getInitials(r.name);
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            return (
              <div
                key={r.id}
                onClick={() => router.push(`/saved/${r.id}`)}
                className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-numera-border cursor-pointer active:bg-surface2 transition-colors"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                  style={{ backgroundColor: color }}
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-text truncate">{r.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple/20 text-purple-light shrink-0">
                      {RELATIONSHIP_LABELS[r.relationship]}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted truncate">
                    {formatDate(r.day, r.month, r.year, '/')}
                    {' · '}{getReading('lifePath', r.numbers.lifePath)?.name ?? ''}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gold leading-none">{r.numbers.lifePath}</p>
                    <p className="text-[10px] text-text-muted">Số chủ đạo</p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(r.id); }}
                    className="w-11 h-11 rounded-full bg-surface2 flex items-center justify-center shrink-0 active:bg-numera-border"
                    aria-label="Xóa lá số"
                  >
                    <Trash2 size={15} className="text-text-muted" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
        <Link
          href="/lookup"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-surface2/90 backdrop-blur border border-numera-border text-text text-sm font-medium shadow-lg"
        >
          <Plus size={16} className="text-gold" /> Tạo lá số mới
        </Link>
      </div>

      <BottomTabBar />
    </MobileShell>
  );
}
