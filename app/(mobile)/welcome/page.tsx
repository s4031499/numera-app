'use client';
import { Star, Calendar, Heart } from 'lucide-react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { MobileShell } from '@/components/layout/MobileShell';
import { EyeLogo } from '@/components/numerology/EyeLogo';
import { FeaturePill } from '@/components/numerology/FeaturePill';
import { useUser } from '@/contexts/UserContext';

const PILLS = [
  { icon: Star,     label: 'Số chủ đạo' },
  { icon: Calendar, label: 'Vận mệnh năm' },
  { icon: Heart,    label: 'Tương hợp' },
];

export default function WelcomePage() {
  const { signInWithGoogle } = useUser();
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay, ease: 'easeOut' as const },
        };

  return (
    <MobileShell>
      <LazyMotion features={domAnimation}>
      <div className="flex flex-col flex-1 px-6 pt-16 pb-10">
        {/* Logo */}
        <m.div className="flex justify-center mb-8" {...fadeUp(0)}>
          <EyeLogo size={180} />
        </m.div>

        {/* Headline */}
        <m.div className="text-center mb-8" {...fadeUp(0.15)}>
          <h1 className="text-3xl font-bold text-text leading-tight mb-3">
            Khám phá con số định mệnh
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Thần số học cá nhân — hé lộ vận mệnh, tính cách,
            và con đường cuộc đời của bạn
          </p>
        </m.div>

        {/* Feature pills — stagger */}
        <div className="flex flex-col gap-3 mb-10">
          {PILLS.map(({ icon, label }, i) => (
            <m.div key={label} {...fadeUp(0.25 + i * 0.08)}>
              <FeaturePill icon={icon} label={label} />
            </m.div>
          ))}
        </div>

        {/* CTA */}
        <m.div className="mt-auto flex flex-col items-center gap-4" {...fadeUp(0.5)}>
          <button
            onClick={signInWithGoogle}
            className="w-full py-4 rounded-2xl bg-gold text-bg font-bold text-base flex items-center justify-center gap-3 active:scale-95 transition-transform"
          >
            {/* Google icon */}
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.1 6.7 29.3 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c11 0 19.5-8.5 19.5-19.5 0-1.2-.1-2.4-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.8 19 13 24 13c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.1 6.7 29.3 4.5 24 4.5c-7.7 0-14.3 4.3-17.7 10.2z"/>
              <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.1-11.3-7.5l-6.5 5C9.7 39.3 16.4 43.5 24 43.5z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.4 4.2-4.4 5.5l6.2 5.2C36.9 39.5 43.5 34 43.5 24c0-1.2-.1-2.4-.4-3.5z"/>
            </svg>
            Tiếp tục với Google
          </button>
          <p className="text-text-muted text-xs text-center leading-relaxed">
            Bằng cách tiếp tục, bạn đồng ý với Điều khoản dịch vụ
          </p>
        </m.div>
      </div>
      </LazyMotion>
    </MobileShell>
  );
}
