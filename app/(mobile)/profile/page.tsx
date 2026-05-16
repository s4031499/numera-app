'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, Edit3, ChevronRight, Star } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { useUser } from '@/contexts/UserContext';
import { getInitials, formatDate } from '@/lib/utils';
import { NumbersGrid } from '@/components/numerology/NumbersGrid';
import { getReading } from '@/data/index';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, numbers, signOut } = useUser();

  const handleLogout = async () => {
    await signOut();
    router.replace('/welcome');
  };

  if (!profile || !numbers) {
    return (
      <MobileShell withTabBar>
        <MobileHeader title="Cá nhân" showBack={false} />
        <div className="flex flex-col flex-1 items-center justify-center px-8 text-center gap-6">
          <p className="text-text-muted text-sm">Bạn chưa tạo lá số.</p>
          <Link
            href="/input"
            className="w-full py-4 rounded-2xl bg-gold text-bg font-bold text-base text-center"
          >
            Tạo lá số ngay
          </Link>
        </div>
        <BottomTabBar />
      </MobileShell>
    );
  }

  const initials = getInitials(profile.name);
  const lpReading = getReading('lifePath', numbers.lifePath);
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const email = user?.email;

  return (
    <MobileShell withTabBar>
      <MobileHeader
        title="Cá nhân"
        showBack={false}
        action={
          <Link href="/input" aria-label="Chỉnh sửa thông tin">
            <Edit3 size={18} className="text-text-muted" />
          </Link>
        }
      />

      <div className="px-4 pb-6 flex flex-col gap-4">
        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 py-6">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={profile.name}
              width={80}
              height={80}
              className="rounded-full border-2 border-purple/50"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-purple/30 border-2 border-purple/50 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-light">{initials}</span>
            </div>
          )}
          <div className="text-center">
            <h2 className="text-lg font-bold text-text">{profile.name}</h2>
            <p className="text-text-muted text-xs mt-0.5">
              {formatDate(profile.day, profile.month, profile.year)}
            </p>
            {email && (
              <p className="text-text-muted/60 text-xs mt-0.5">{email}</p>
            )}
            {lpReading && (
              <p className="text-purple-light text-xs mt-1">{lpReading.name}</p>
            )}
          </div>
        </div>

        {/* Numbers overview */}
        <div className="p-4 rounded-2xl bg-surface border border-numera-border">
          <div className="flex items-center gap-2 mb-3">
            <Star size={14} className="text-gold" />
            <h3 className="text-sm font-semibold text-text">Lá số của bạn</h3>
          </div>
          <NumbersGrid numbers={numbers} linkPrefix="/reading" />
        </div>

        {/* Menu items */}
        <div className="rounded-2xl bg-surface border border-numera-border overflow-hidden">
          <Link
            href="/input"
            className="flex items-center justify-between px-4 py-4 border-b border-numera-border active:bg-surface2"
          >
            <span className="text-sm text-text">Cập nhật thông tin</span>
            <ChevronRight size={16} className="text-text-muted" />
          </Link>
          <Link
            href="/saved"
            className="flex items-center justify-between px-4 py-4 border-b border-numera-border active:bg-surface2"
          >
            <span className="text-sm text-text">Lá số đã lưu</span>
            <ChevronRight size={16} className="text-text-muted" />
          </Link>
          <Link
            href="/reading/lifePath"
            className="flex items-center justify-between px-4 py-4 active:bg-surface2"
          >
            <span className="text-sm text-text">Về thần số học</span>
            <ChevronRight size={16} className="text-text-muted" />
          </Link>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-4 rounded-2xl border border-numera-border text-text-muted text-sm font-medium flex items-center justify-center gap-2 active:bg-surface2"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>
      </div>

      <BottomTabBar />
    </MobileShell>
  );
}
