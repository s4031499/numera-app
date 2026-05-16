'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Share2, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { MobileShell } from '@/components/layout/MobileShell';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { KeywordChip } from '@/components/numerology/KeywordChip';
import { useUser } from '@/contexts/UserContext';
import { getReading } from '@/data/index';
import { actionSaveReading, actionIsAlreadySaved } from '@/lib/actions/readings';
import { useCountUp } from '@/lib/hooks/useCountUp';
import { formatDate } from '@/lib/utils';
import { INDICATORS } from '@/types/numerology';
import type { ReadingType, ReadingRecord } from '@/types/numerology';

const TAB_LABELS = ['Ý nghĩa', 'Sự nghiệp', 'Tình yêu'] as const;

export default function ReadingPage() {
  const router = useRouter();
  const params = useParams();
  const { profile, numbers } = useUser();
  const [activeTab, setActiveTab] = useState(0);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const prefersReduced = useReducedMotion();

  const type = params.type as ReadingType;
  const meta = INDICATORS.find(i => i.key === type);

  // Derived values (safe to compute before early returns — no hooks)
  const value = (numbers && meta) ? (numbers[type as keyof typeof numbers] as number) : 0;

  // All hooks must be called unconditionally before any early return
  const displayCount = useCountUp(value, 600);

  useEffect(() => {
    if (!profile || !numbers) router.replace('/welcome');
  }, [profile, numbers, router]);

  useEffect(() => {
    if (profile) {
      actionIsAlreadySaved(profile.name, profile.day, profile.month, profile.year).then(setSaved);
    }
  }, [profile]);

  if (!profile || !numbers || !meta) return null;

  const reading = getReading(type, value) as ReadingRecord | null;
  if (!reading) return null;

  const handleSave = async () => {
    setSaveError(false);
    const result = await actionSaveReading(
      profile.name, profile.day, profile.month, profile.year, 'personal', numbers,
    );
    if (result) {
      setSaved(true);
    } else {
      setSaveError(true);
    }
  };

  const tabContent = [
    reading.overview || reading.meaning || reading.innerDesire || reading.impression || reading.gift || reading.overview,
    reading.career,
    reading.love || reading.fulfilled || reading.attractedTo,
  ];

  const displayDate = `Sinh ngày ${formatDate(profile.day, profile.month, profile.year)}`;

  return (
    <MobileShell>
      <MobileHeader
        title={meta.label}
        action={
          <button
            aria-label="Chia sẻ lá số"
            className="w-11 h-11 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Share2 size={18} className="text-text-muted" aria-hidden="true" />
          </button>
        }
      />

      <LazyMotion features={domAnimation}>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Hero card — fade in */}
        <m.div
          className="mx-4 mb-4 rounded-3xl overflow-hidden bg-linear-to-br from-surface3 via-[#1e1a40] to-surface border border-purple/30 p-6"
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' as const }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-28 h-28 rounded-full bg-linear-to-br from-[#2a1a60] to-[#0d0d1a] border-2 border-gold/40 flex items-center justify-center glow-gold">
              <span className="text-6xl font-bold text-gold leading-none">{displayCount}</span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-text text-center mb-1">{reading.name}</h2>
          <p className="text-text-muted text-xs text-center mb-4">{displayDate}</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {(reading.keywords || []).slice(0, 3).map((kw: string) => (
              <KeywordChip key={kw} label={kw} />
            ))}
          </div>
        </m.div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <div
            role="tablist"
            aria-label="Nội dung lá số"
            className="flex gap-1 bg-surface rounded-2xl p-1"
          >
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
                  activeTab === i
                    ? 'bg-gold text-bg'
                    : 'text-text-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="px-4 pb-32" role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {activeTab === 0 && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-surface border border-numera-border">
                <h3 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
                  📖 Bạn là ai?
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{tabContent[0]}</p>
              </div>
              {reading.strengths && (
                <div className="p-4 rounded-2xl bg-surface border border-numera-border">
                  <h3 className="text-sm font-semibold text-text mb-3">✨ Điểm mạnh</h3>
                  <ul className="flex flex-col gap-2">
                    {reading.strengths.map((s: string) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="text-personality mt-0.5">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {reading.challenges && (
                <div className="p-4 rounded-2xl bg-surface border border-numera-border">
                  <h3 className="text-sm font-semibold text-text mb-3">🌱 Thách thức</h3>
                  <ul className="flex flex-col gap-2">
                    {reading.challenges.map((c: string) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="text-expression mt-0.5">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {reading.advice && (
                <div className="p-4 rounded-2xl bg-purple/10 border border-purple/25">
                  <h3 className="text-sm font-semibold text-purple-light mb-2">💡 Lời khuyên</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{reading.advice}</p>
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

      {/* Save button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-107.5 px-4 pb-8 pt-4 bg-linear-to-t from-bg via-bg/90 to-transparent">
        {saveError && (
          <p className="text-center text-xs text-expression mb-2">
            Lưu thất bại — vui lòng thử lại
          </p>
        )}
        <button
          onClick={handleSave}
          disabled={saved}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
            saved
              ? 'bg-gold/20 text-gold/70 border border-gold/30'
              : saveError
                ? 'bg-expression/20 text-expression border border-expression/40 active:bg-expression/30'
                : 'bg-gold text-bg active:bg-gold/90'
          }`}
        >
          {saved ? <BookmarkCheck size={20} /> : <BookmarkPlus size={20} />}
          {saved ? 'Đã lưu lá số' : saveError ? 'Thử lại' : 'Lưu lá số của tôi'}
        </button>
      </div>
      </LazyMotion>
    </MobileShell>
  );
}
