import Link from 'next/link';
import { Eye, Star, Calendar, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { EyeLogo } from '@/components/numerology/EyeLogo';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg starfield">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-numera-border/50 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Eye size={24} className="text-gold" />
          <span className="text-lg font-bold text-text tracking-widest">NUMERA</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-text-muted">
          <a href="#" className="hover:text-text transition-colors">Khám phá</a>
          <a href="#" className="hover:text-text transition-colors">Tính năng</a>
          <a href="#" className="hover:text-text transition-colors">Giá cả</a>
          <a href="#" className="hover:text-text transition-colors">Blog</a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/welcome"
            className="px-4 py-2 rounded-xl bg-gold text-bg text-sm font-semibold hover:bg-gold-light transition-colors"
          >
            Đăng nhập
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple/20 border border-purple/30 text-purple-light text-xs font-medium mb-6">
              <Star size={12} />
              Thần số học cá nhân
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight mb-6">
              Khám phá con số định mệnh của bạn
            </h1>

            <p className="text-text-muted text-base leading-relaxed mb-8">
              Hé lộ vận mệnh, tính cách và con đường cuộc đời thông qua thần số học. Cá nhân hóa chuyên sâu từ ngày sinh và tên của bạn.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {[
                { icon: Star,     label: 'Số chủ đạo' },
                { icon: Calendar, label: 'Vận mệnh năm' },
                { icon: Heart,    label: 'Tương hợp' },
              ].map(({ label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-text-muted">
                  <CheckCircle size={16} className="text-personality shrink-0" />
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/welcome"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gold text-bg font-bold hover:bg-gold-light transition-colors"
              >
                Bắt đầu hành trình <ArrowRight size={18} />
              </Link>
              <Link
                href="/web"
                className="flex items-center justify-center px-6 py-3.5 rounded-2xl border border-numera-border text-text font-medium hover:bg-surface transition-colors"
              >
                Xem demo
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-text-muted">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <span>4.0 — 10,000+ người dùng</span>
            </div>
          </div>

          {/* Right — Phone mockup (hidden on very small screens) */}
          <div className="hidden sm:flex justify-center">
            <div className="relative w-72 h-[580px]">
              {/* Phone frame */}
              <div className="absolute inset-0 rounded-[3rem] bg-surface border-2 border-numera-border shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 pb-2">
                  <span className="text-xs text-text-muted">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 rounded-sm bg-text-muted/50" />
                    <div className="w-2 h-2 rounded-full bg-text-muted/50" />
                  </div>
                </div>

                {/* App content preview */}
                <div className="px-4 py-4 flex flex-col gap-4">
                  {/* Mini life path card */}
                  <div className="rounded-2xl bg-surface3 border border-purple/30 p-4 text-center">
                    <p className="text-[10px] text-text-muted mb-2 tracking-wider">SỐ CHỦ ĐẠO</p>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2a1a60] to-[#0d0d1a] border-2 border-gold/40 flex items-center justify-center mx-auto mb-2">
                      <span className="text-3xl font-bold text-gold">7</span>
                    </div>
                    <p className="text-xs font-semibold text-text">Người tìm kiếm chân lý</p>
                  </div>

                  {/* Mini grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Linh hồn', value: 5, color: '#a78bfa' },
                      { label: 'Sứ mệnh', value: 9, color: '#f472b6' },
                      { label: 'Ngày sinh', value: 12, color: '#60a5fa' },
                    ].map(item => (
                      <div key={item.label} className="rounded-xl bg-surface p-2 text-center border border-numera-border">
                        <p style={{ color: item.color }} className="text-lg font-bold">{item.value}</p>
                        <p className="text-[9px] text-text-muted">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="text-center py-2">
                    <button className="px-6 py-2 rounded-xl bg-gold text-bg text-xs font-bold">
                      Xem lá số đầy đủ
                    </button>
                  </div>
                </div>

                {/* Eye logo */}
                <div className="flex justify-center mt-2">
                  <EyeLogo size={100} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
