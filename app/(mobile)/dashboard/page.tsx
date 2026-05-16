'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, ChevronRight } from 'lucide-react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { MobileShell } from '@/components/layout/MobileShell';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { LifePathHeroCard } from '@/components/numerology/LifePathHeroCard';
import { EnergyTodayCard } from '@/components/numerology/EnergyTodayCard';
import { NumberCard } from '@/components/numerology/NumberCard';
import { useUser } from '@/contexts/UserContext';
import { getReading } from '@/data/index';
import { getInitials } from '@/lib/utils';
import type { ReadingType } from '@/types/numerology';

const GRID_INDICATORS: ReadingType[] = ['soulUrge', 'personality', 'birthday', 'expression'];

export default function DashboardPage() {
  const router = useRouter();
  const { profile, numbers } = useUser();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!profile) router.replace('/input');
  }, [profile, router]);

  if (!profile || !numbers) return null;

  const lpReading = getReading('lifePath', numbers.lifePath);
  const pyReading = getReading('personalYear', numbers.personalYear);

  const initials = getInitials(profile.name);

  return (
    <MobileShell withTabBar>
      <LazyMotion features={domAnimation}>
      <div className="flex flex-col gap-4 px-4 pt-14 pb-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple/30 border border-purple/50 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-purple-light">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-text-muted text-xs">Xin chào,</p>
            <p className="text-text font-semibold text-sm truncate">{profile.name}</p>
          </div>
          <button className="w-11 h-11 rounded-full bg-surface border border-numera-border flex items-center justify-center" aria-label="Thông báo">
            <Bell size={18} className="text-text-muted" />
          </button>
        </div>

        {/* Life Path Hero */}
        {lpReading && (
          <Link href="/reading/lifePath">
            <LifePathHeroCard
              number={numbers.lifePath}
              name={lpReading.name}
              keywords={lpReading.keywords}
            />
          </Link>
        )}

        {/* Energy today */}
        {pyReading && (
          <EnergyTodayCard
            personalYear={numbers.personalYear}
            yearName={`Số ngày ${numbers.personalYear} - ${pyReading.theme}`}
          />
        )}

        {/* Number grid — stagger reveal */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-text">Các con số của bạn</h2>
            <Link href="/profile" className="flex items-center gap-1 text-xs text-purple-light">
              Xem tất cả <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {GRID_INDICATORS.map((type, i) => {
              const val = numbers[type as keyof typeof numbers] as number;
              const reading = getReading(type, val);
              return (
                <m.div
                  key={type}
                  initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.08, ease: 'easeOut' as const }}
                >
                  <NumberCard
                    type={type}
                    value={val}
                    name={reading?.name}
                  />
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
      </LazyMotion>
      <BottomTabBar />
    </MobileShell>
  );
}
