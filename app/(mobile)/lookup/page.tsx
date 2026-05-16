'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { MobileShell } from '@/components/layout/MobileShell';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { DateInputForm } from '@/components/numerology/DateInputForm';

export default function LookupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
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
    const params = new URLSearchParams({
      name: name.trim(),
      day: String(d),
      month: String(m),
      year: String(y),
    });
    router.push(`/result?${params.toString()}`);
  };

  return (
    <MobileShell>
      <MobileHeader title="Tạo lá số mới" />

      <div className="flex flex-col flex-1 px-6 pt-2 pb-10">
        {/* Description */}
        <motion.div className="flex items-start gap-3 p-4 rounded-2xl bg-purple/10 border border-purple/25 mb-8" {...fadeUp(0)}>
          <Users size={18} className="text-purple-light shrink-0 mt-0.5" />
          <p className="text-text-muted text-sm leading-relaxed">
            Nhập thông tin của người bạn muốn tra cứu — bạn bè, người thân hoặc bất kỳ ai
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.08)}>
          <DateInputForm
            name={name} day={day} month={month} year={year}
            onNameChange={setName} onDayChange={setDay}
            onMonthChange={setMonth} onYearChange={setYear}
            onSubmit={handleSubmit}
            namePlaceholder="Nguyễn Thị Hoa"
          />
        </motion.div>

        {error && (
          <motion.p
            className="text-expression text-xs mb-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Submit */}
        <motion.div className="mt-auto" {...fadeUp(0.24)}>
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl bg-gold text-bg font-bold text-base active:scale-95 transition-transform"
          >
            Tra cứu lá số
          </button>
        </motion.div>
      </div>
    </MobileShell>
  );
}
