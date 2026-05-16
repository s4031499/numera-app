import { MobileShell } from '@/components/layout/MobileShell';

export default function MobileLoading() {
  return (
    <MobileShell>
      <div className="flex flex-col gap-4 px-4 pt-14 pb-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface2" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-3 w-20 rounded bg-surface2" />
            <div className="h-3 w-32 rounded bg-surface2" />
          </div>
          <div className="w-11 h-11 rounded-full bg-surface2" />
        </div>

        <div className="h-44 rounded-[var(--radius-lg)] bg-surface2" />
        <div className="h-24 rounded-[var(--radius)] bg-surface2" />

        <div className="space-y-3">
          <div className="h-4 w-40 rounded bg-surface2" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-28 rounded-[var(--radius)] bg-surface2" />
            <div className="h-28 rounded-[var(--radius)] bg-surface2" />
            <div className="h-28 rounded-[var(--radius)] bg-surface2" />
            <div className="h-28 rounded-[var(--radius)] bg-surface2" />
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
