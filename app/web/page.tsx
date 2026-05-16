'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, Bell, ChevronRight, Home, LayoutGrid, Heart, BookMarked, User } from 'lucide-react';
import { LifePathHeroCard } from '@/components/numerology/LifePathHeroCard';
import { EnergyTodayCard } from '@/components/numerology/EnergyTodayCard';
import { NumberCard } from '@/components/numerology/NumberCard';
import { useUser } from '@/contexts/UserContext';
import { getReading } from '@/data/index';
import { getInitials } from '@/lib/utils';
import type { ReadingType } from '@/types/numerology';

const NAV_ITEMS = [
  { href: '/web',    label: 'Trang chủ', icon: Home },
  { href: '/saved',  label: 'Con số',    icon: LayoutGrid },
  { href: '/compat', label: 'Tương hợp', icon: Heart },
  { href: '/saved',  label: 'Lá số đã lưu', icon: BookMarked },
];

const ALL_INDICATORS: ReadingType[] = ['soulUrge', 'personality', 'birthday', 'expression'];

export default function WebDashboardPage() {
  const router = useRouter();
  const { profile, numbers } = useUser();

  useEffect(() => {
    if (!profile) router.replace('/welcome');
  }, [profile, router]);

  if (!profile || !numbers) return null;

  const lpReading = getReading('lifePath', numbers.lifePath);
  const pyReading = getReading('personalYear', numbers.personalYear);

  const initials = getInitials(profile.name);
  const today = new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-bg starfield">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 flex items-center gap-2 px-6 py-3.5 border-b border-numera-border bg-bg/80 backdrop-blur overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 mr-8">
          <Eye size={20} className="text-gold" />
          <span className="font-bold text-text tracking-widest text-sm">NUMERA</span>
        </div>
        <div className="flex gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                label === 'Trang chủ'
                  ? 'text-gold font-medium'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              <Icon size={14} /> {label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="w-11 h-11 rounded-full bg-surface border border-numera-border flex items-center justify-center shrink-0" aria-label="Thông báo">
            <Bell size={15} className="text-text-muted" />
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-numera-border">
            <div className="w-6 h-6 rounded-full bg-purple/30 flex items-center justify-center text-[10px] font-bold text-purple-light">
              {initials}
            </div>
            <span className="text-sm text-text max-w-[120px] truncate">{profile.name}</span>
            <User size={12} className="text-text-muted" />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple/30 border border-purple/50 flex items-center justify-center font-bold text-purple-light">
              {initials}
            </div>
            <div>
              <p className="text-text-muted text-xs">Xin chào,</p>
              <p className="font-semibold text-text">{profile.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-text-muted text-sm hidden md:block">{today}</span>
            <button className="w-11 h-11 rounded-full bg-surface border border-numera-border flex items-center justify-center" aria-label="Thông báo">
              <Bell size={16} className="text-text-muted" />
            </button>
          </div>
        </div>

        {/* Life Path Hero */}
        {lpReading && (
          <Link href="/reading/lifePath">
            <LifePathHeroCard
              number={numbers.lifePath}
              name={lpReading.name}
              keywords={lpReading.keywords}
              className="mb-4 md:flex-row"
            />
          </Link>
        )}

        {/* Energy today */}
        {pyReading && (
          <div className="mb-6">
            <EnergyTodayCard
              personalYear={numbers.personalYear}
              yearName={`Số ngày ${numbers.personalYear} - ${pyReading.theme}`}
            />
          </div>
        )}

        {/* Number grid — 4-col on web */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-text">Các con số của bạn</h2>
            <Link href="/saved" className="flex items-center gap-1 text-xs text-purple-light">
              Xem tất cả <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {ALL_INDICATORS.map(type => {
              const val = numbers[type as keyof typeof numbers] as number;
              const reading = getReading(type, val);
              return (
                <NumberCard key={type} type={type} value={val} name={reading?.name} />
              );
            })}
          </div>
        </div>

        {/* Daily advice */}
        {lpReading && (
          <div className="p-5 rounded-2xl bg-surface border border-numera-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-text text-sm">💡 Lời khuyên hôm nay</h3>
              <span className="text-text-muted text-xs">{today}</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed line-clamp-3">{lpReading.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
