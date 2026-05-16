'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { MobileShell } from '@/components/layout/MobileShell';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { DateInputForm } from '@/components/numerology/DateInputForm';
import { useUser } from '@/contexts/UserContext';

export default function InputPage() {
  const router = useRouter();
  const { profile, setProfile } = useUser();
  const isUpdate = !!profile;
  const [name, setName] = useState(profile?.name ?? '');
  const [day, setDay] = useState(profile?.day ? String(profile.day) : '');
  const [month, setMonth] = useState(profile?.month ? String(profile.month) : '');
  const [year, setYear] = useState(profile?.year ? String(profile.year) : '');
  const [error, setError] = useState('');
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay, ease: 'easeOut' as const },
        };

  const handleSubmit = () => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (!name.trim()) return setError('Vui lòng nhập họ và tên.');
    if (!d || d < 1 || d > 31) return setError('Ngày không hợp lệ (1–31).');
    if (!m || m < 1 || m > 12) return setError('Tháng không hợp lệ (1–12).');
    if (!y || y < 1900 || y > new Date().getFullYear()) return setError('Năm không hợp lệ.');
    setError('');
    setProfile({ name: name.trim(), day: d, month: m, year: y });
    router.push('/dashboard');
  };

  return (
    <MobileShell>
      <MobileHeader title={isUpdate ? 'Cập nhật thông tin' : 'Thông tin của bạn'} />

      <LazyMotion features={domAnimation}>
      <div className="flex flex-col flex-1 px-6 pt-2 pb-10">
        <m.p className="text-text-muted text-sm mb-8 leading-relaxed" {...fadeUp(0)}>
          Để tính chính xác con số chủ đạo, hãy nhập đầy đủ họ tên và ngày sinh của bạn
        </m.p>

        <m.div {...fadeUp(0.1)}>
          <DateInputForm
            name={name} day={day} month={month} year={year}
            onNameChange={setName} onDayChange={setDay}
            onMonthChange={setMonth} onYearChange={setYear}
            onSubmit={handleSubmit}
          />
        </m.div>

        {/* Error */}
        {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

        {/* Security note */}
        <m.div className="flex items-center gap-2 mt-2 mb-8" {...fadeUp(0.26)}>
          <ShieldCheck size={15} className="text-text-muted shrink-0" />
          <p className="text-text-muted text-xs">Thông tin của bạn được mã hóa và bảo mật</p>
        </m.div>

        {/* Submit */}
        <m.div className="mt-auto" {...fadeUp(0.32)}>
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl bg-gold text-bg font-bold text-base active:scale-95 transition-transform"
          >
            {isUpdate ? 'Lưu thay đổi' : 'Tính con số chủ đạo'}
          </button>
        </m.div>
      </div>
      </LazyMotion>
    </MobileShell>
  );
}
