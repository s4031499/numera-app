'use client';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BookmarkPlus, BookmarkCheck, CalendarDays, Loader2 } from 'lucide-react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { MobileShell } from '@/components/layout/MobileShell';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { calcAll } from '@/lib/numerology';
import { getInitials, formatDate } from '@/lib/utils';
import { getReading } from '@/data/index';
import { actionSaveReading, actionIsAlreadySaved } from '@/lib/actions/readings';
import { RELATIONSHIP_LABELS } from '@/types/numerology';
import { NumbersGrid } from '@/components/numerology/NumbersGrid';
import type { Relationship } from '@/types/numerology';

const RELATIONSHIPS = Object.entries(RELATIONSHIP_LABELS).map(
  ([key, label]) => ({ key: key as Relationship, label }),
);

const AVATAR_BG = ['bg-purple','bg-gold','bg-personality','bg-expression','bg-birthday','bg-pyear'];

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReduced = useReducedMotion();

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [relationship, setRelationship] = useState<Relationship>('personal');

  const name  = searchParams.get('name') ?? '';
  const day   = parseInt(searchParams.get('day')   ?? '0');
  const month = parseInt(searchParams.get('month') ?? '0');
  const year  = parseInt(searchParams.get('year')  ?? '0');

  useEffect(() => {
    if (!name || !day || !month || !year) router.replace('/lookup');
  }, [name, day, month, year, router]);

  useEffect(() => {
    if (name && day && month && year) {
      actionIsAlreadySaved(name, day, month, year).then(setSaved);
    }
  }, [name, day, month, year]);

  const numbers = useMemo(() => {
    if (!name || !day || !month || !year) return null;
    return calcAll(name, day, month, year);
  }, [name, day, month, year]);

  if (!numbers || !name) return null;

  const lpReading  = getReading('lifePath', numbers.lifePath);
  const initials   = getInitials(name);
  const avatarClass = AVATAR_BG[name.charCodeAt(0) % AVATAR_BG.length];

  const handleSave = async () => {
    if (saving || saved) return;
    setSaving(true);
    setSaveError('');
    const result = await actionSaveReading(name, day, month, year, relationship, numbers);
    setSaving(false);
    if (result) {
      setSaved(true);
      // Ngắn delay để user thấy trạng thái "Đã lưu" rồi chuyển trang
      setTimeout(() => router.push('/saved'), 800);
    } else {
      setSaveError('Lưu thất bại — vui lòng thử lại');
    }
  };

  return (
    <MobileShell withTabBar>
      <MobileHeader title="Lá số" />

      <LazyMotion features={domAnimation}>
      <div className="px-4 pb-44 flex flex-col gap-4">
        {/* Hero */}
        <m.div
          className="flex flex-col items-center gap-3 py-6"
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className={`w-20 h-20 rounded-full ${avatarClass} flex items-center justify-center text-white font-bold text-2xl`}>
            {initials}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-text">{name}</h2>
            <div className="flex items-center justify-center gap-1.5 mt-1 text-text-muted text-xs">
              <CalendarDays size={12} aria-hidden />
              <span>{formatDate(day, month, year)}</span>
            </div>
            {lpReading && (
              <p className="text-gold text-sm font-medium mt-1.5">{lpReading.name}</p>
            )}
          </div>
        </m.div>

        {/* Numbers grid */}
        <div className="p-4 rounded-2xl bg-surface border border-numera-border">
          <h3 className="text-sm font-semibold text-text mb-3">Các con số</h3>
          <NumbersGrid numbers={numbers} />
        </div>

        {/* Life path detail */}
        {lpReading && (
          <div className="p-4 rounded-2xl bg-surface border border-numera-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-gold">{numbers.lifePath}</span>
              <div>
                <p className="text-sm font-semibold text-text">{lpReading.name}</p>
                <p className="text-xs text-text-muted">Số Đường Đời</p>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed line-clamp-4">
              {lpReading.overview}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(lpReading.keywords ?? []).slice(0, 3).map((kw: string) => (
                <span key={kw} className="text-xs px-2.5 py-1 rounded-full bg-purple/15 text-purple-light border border-purple/25">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Relationship picker — ẩn khi đã lưu */}
        {!saved && (
          <div className="p-4 rounded-2xl bg-surface border border-numera-border">
            <p className="text-sm font-semibold text-text mb-3">Quan hệ với bạn</p>
            <div className="grid grid-cols-2 gap-2">
              {RELATIONSHIPS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setRelationship(key)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                    relationship === key
                      ? 'bg-purple/20 border-purple/50 text-purple-light'
                      : 'bg-surface2 border-numera-border text-text-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed save button — above tab bar */}
      <div className="fixed bottom-15 left-1/2 -translate-x-1/2 w-full max-w-107.5 px-4 pb-3 pt-4 bg-linear-to-t from-bg via-bg/95 to-transparent z-40">
        {saveError && (
          <p className="text-center text-xs text-expression mb-2">{saveError}</p>
        )}
        <button
          onClick={handleSave}
          disabled={saved || saving}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
            saved
              ? 'bg-gold/20 text-gold border border-gold/40'
              : saving
                ? 'bg-gold/60 text-bg cursor-wait'
                : saveError
                  ? 'bg-expression/20 text-expression border border-expression/40'
                  : 'bg-gold text-bg active:scale-[0.98]'
          }`}
        >
          {saving ? (
            <Loader2 size={20} className="animate-spin" />
          ) : saved ? (
            <BookmarkCheck size={20} />
          ) : (
            <BookmarkPlus size={20} />
          )}
          {saving ? 'Đang lưu...' : saved ? 'Đã lưu — chuyển trang...' : saveError ? 'Thử lại' : 'Lưu lá số này'}
        </button>
      </div>
      </LazyMotion>

      <BottomTabBar />
    </MobileShell>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}
