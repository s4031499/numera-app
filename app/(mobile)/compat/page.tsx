import Link from 'next/link';
import { Heart, Plus } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { BottomTabBar } from '@/components/layout/BottomTabBar';

export default function CompatPage() {
  return (
    <MobileShell withTabBar>
      <MobileHeader title="Tương hợp" showBack={false} />

      <div className="flex flex-col flex-1 items-center justify-center px-8 text-center gap-6">
        {/* Compat orb */}
        <div className="relative flex items-center justify-center">
          <div
            className="w-36 h-36 rounded-full border border-expression/40 flex items-center justify-center"
            style={{ boxShadow: '0 0 40px 10px rgba(244,114,182,0.12)' }}
          >
            <div className="w-24 h-24 rounded-full border border-expression/60 bg-linear-to-br from-expression/20 to-bg flex items-center justify-center">
              <Heart size={36} className="text-expression" strokeWidth={1.5} />
            </div>
          </div>
          <span className="absolute top-3 right-4 text-expression opacity-60 text-xs">✦</span>
          <span className="absolute bottom-4 left-3 text-gold opacity-40 text-[8px]">✦</span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-text mb-2">Kiểm tra tương hợp</h2>
          <p className="text-text-muted text-sm leading-relaxed">
            Khám phá mức độ hòa hợp giữa bạn và người thân yêu qua thần số học. Tính năng đang được phát triển.
          </p>
        </div>

        <Link
          href="/lookup"
          className="w-full py-4 rounded-2xl bg-gold text-bg font-bold text-base text-center flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Tạo lá số để so sánh
        </Link>

        <Link href="/saved" className="text-purple-light text-sm">
          Xem lá số đã lưu
        </Link>
      </div>

      <BottomTabBar />
    </MobileShell>
  );
}
