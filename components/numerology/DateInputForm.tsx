'use client';
import { useRef } from 'react';

interface DateInputFormProps {
  name: string;
  day: string;
  month: string;
  year: string;
  onNameChange: (v: string) => void;
  onDayChange: (v: string) => void;
  onMonthChange: (v: string) => void;
  onYearChange: (v: string) => void;
  onSubmit: () => void;
  namePlaceholder?: string;
}

export function DateInputForm({
  name, day, month, year,
  onNameChange, onDayChange, onMonthChange, onYearChange,
  onSubmit,
  namePlaceholder = 'Nguyễn Văn An',
}: DateInputFormProps) {
  const dayRef   = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef  = useRef<HTMLInputElement>(null);

  const dateFields = [
    { value: day,   onChange: onDayChange,   ref: dayRef,   nextRef: monthRef, label: 'Ngày',  placeholder: '12',   max: 2, ariaLabel: 'Ngày sinh' },
    { value: month, onChange: onMonthChange, ref: monthRef, nextRef: yearRef,  label: 'Tháng', placeholder: '08',   max: 2, ariaLabel: 'Tháng sinh' },
    { value: year,  onChange: onYearChange,  ref: yearRef,  nextRef: null,     label: 'Năm',   placeholder: '1995', max: 4, ariaLabel: 'Năm sinh' },
  ];

  return (
    <>
      {/* Name field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">Họ và tên</label>
        <input
          type="text"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          placeholder={namePlaceholder}
          autoComplete="off"
          className="w-full px-4 py-3.5 rounded-2xl bg-surface2 border border-numera-border text-text placeholder:text-text-muted focus:outline-none focus:border-purple/60 transition-colors"
        />
      </div>

      {/* Date fields */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text mb-2">Ngày sinh</label>
        <div className="grid grid-cols-3 gap-3" role="group" aria-label="Ngày sinh">
          {dateFields.map(({ value, onChange, ref, nextRef, label, placeholder, max, ariaLabel }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <input
                ref={ref}
                type="tel"
                inputMode="numeric"
                value={value}
                aria-label={ariaLabel}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, max);
                  onChange(val);
                  if (val.length === max && nextRef?.current) nextRef.current.focus();
                }}
                onKeyDown={e => { if (e.key === 'Enter') onSubmit(); }}
                placeholder={placeholder}
                autoComplete="off"
                className="w-full px-3 py-3.5 rounded-2xl bg-surface2 border border-purple/40 text-text text-center text-lg font-semibold placeholder:text-text-muted/50 focus:outline-none focus:border-purple transition-colors"
              />
              <span className="text-xs text-text-muted text-center" aria-hidden="true">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
