'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { MobileShell } from '@/components/layout/MobileShell';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { KeywordChip } from '@/components/numerology/KeywordChip';
import { actionGetSavedReading } from '@/lib/actions/readings';
import { useCountUp } from '@/lib/hooks/useCountUp';
import { Skeleton } from '@/components/ui/Skeleton';
import { getReading } from '@/data/index';
import { INDICATORS } from '@/types/numerology';
import type { SavedReading, ReadingType } from '@/types/numerology';

const TAB_LABELS = ['Ý nghĩa', 'Sự nghiệp', 'Tình yêu'] as const;

export default function SavedReadingTypePage() {
  const params = useParams();
  const router = useRouter();
  const [reading, setReading] = useState<SavedReading | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const prefersReduced = useReducedMotion();

  const type = params.type as ReadingType;
  const meta = INDICATORS.find(i => i.key === type);

  useEffect(() => {
    actionGetSavedReading(params.id as string).then(found => {
      if (!found) { router.replace('/saved'); return; }
      setReading(found);
    });
  }, [params.id, router]);

  const value = (reading && meta)
    ? (reading.numbers[type as keyof typeof reading.numbers] as number)
    : 0;
  const displayCount = useCountUp(value, 600);

  if (!reading || !meta) return (
    <MobileShell>
      <MobileHeader title="..." />
      <div className="px-4 pt-4 flex flex-col gap-4">
        <Skeleton className="mx-0 h-64 rounded-3xl" />
        <Skeleton className="h-12 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    </MobileShell>
  );

  const readingData = getReading(type as any, value) as any;
  if (!readingData) return null;

  const tabContent = [
    readingData.overview ?? readingData.meaning ?? readingData.innerDesire ?? readingData.impression ?? readingData.gift,
    readingData.career,
    readingData.love ?? readingData.fulfilled ?? readingData.attractedTo,
  ];

  return (
    <MobileShell>
      <MobileHeader title={meta.label} />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Hero card */}
        <motion.div
          className="mx-4 mb-4 rounded-3xl overflow-hidden bg-linear-to-br from-surface3 via-[#1e1a40] to-surface border border-purple/30 p-6"
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' as const }}
        >
          <div className="flex justify-center mb-4">
            <div className={`w-28 h-28 rounded-full bg-linear-to-br from-[#2a1a60] to-[#0d0d1a] border-2 border-gold/40 flex items-center justify-center glow-gold`}>
              <span className={`text-6xl font-bold ${meta.textClass} leading-none`}>{displayCount}</span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-text text-center mb-1">{readingData.name}</h2>
          <p className="text-text-muted text-xs text-center mb-4">{reading.name}</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {(readingData.keywords ?? []).slice(0, 3).map((kw: string) => (
              <KeywordChip key={kw} label={kw} />
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <div role="tablist" aria-label="Nội dung lá số" className="flex gap-1 bg-surface rounded-2xl p-1">
            {TAB_LABELS.map((label, i) => (
              <button
                key={label}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`tabpanel-${i}`}
                id={`tab-${i}`}
                onClick={() => setActiveTab(i)}
                onKeyDown={e => {
                  if (e.key === 'ArrowRight') setActiveTab(prev => (prev + 1) % TAB_LABELS.length);
                  if (e.key === 'ArrowLeft') setActiveTab(prev => (prev - 1 + TAB_LABELS.length) % TAB_LABELS.length);
                }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  activeTab === i ? 'bg-gold text-bg' : 'text-text-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="px-4 pb-10" role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {activeTab === 0 && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-surface border border-numera-border">
                <h3 className="text-sm font-semibold text-text mb-2">📖 Bạn là ai?</h3>
                <p className="text-text-muted text-sm leading-relaxed">{tabContent[0]}</p>
              </div>
              {readingData.strengths && (
                <div className="p-4 rounded-2xl bg-surface border border-numera-border">
                  <h3 className="text-sm font-semibold text-text mb-3">✨ Điểm mạnh</h3>
                  <ul className="flex flex-col gap-2">
                    {readingData.strengths.map((s: string) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="text-personality mt-0.5">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {readingData.challenges && (
                <div className="p-4 rounded-2xl bg-surface border border-numera-border">
                  <h3 className="text-sm font-semibold text-text mb-3">🌱 Thách thức</h3>
                  <ul className="flex flex-col gap-2">
                    {readingData.challenges.map((c: string) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="text-expression mt-0.5">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {readingData.advice && (
                <div className="p-4 rounded-2xl bg-purple/10 border border-purple/25">
                  <h3 className="text-sm font-semibold text-purple-light mb-2">💡 Lời khuyên</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{readingData.advice}</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 1 && (
            tabContent[1]
              ? <div className="p-4 rounded-2xl bg-surface border border-numera-border">
                  <h3 className="text-sm font-semibold text-text mb-2">💼 Sự nghiệp</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{tabContent[1]}</p>
                </div>
              : <p className="text-text-muted/50 text-sm text-center py-8">Chưa có dữ liệu cho mục này</p>
          )}
          {activeTab === 2 && (
            tabContent[2]
              ? <div className="p-4 rounded-2xl bg-surface border border-numera-border">
                  <h3 className="text-sm font-semibold text-text mb-2">❤️ Tình yêu</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{tabContent[2]}</p>
                </div>
              : <p className="text-text-muted/50 text-sm text-center py-8">Chưa có dữ liệu cho mục này</p>
          )}
        </div>
      </div>
    </MobileShell>
  );
}
