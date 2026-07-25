import { weekLabel, addDays } from "../lib/dates";

export default function WeekNav({ weekStart, onPrev, onNext, onToday }) {
  const weekEnd = addDays(weekStart, 6);
  return (
    <div className="flex items-center justify-between border-b border-line pb-3 mb-5">
      <div>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink2">Week of</p>
        <h2 className="font-display text-2xl">{weekLabel(weekStart, weekEnd)}</h2>
      </div>
      <div className="flex items-center gap-2 font-mono text-xs">
        <button onClick={onPrev} className="stamp hover:bg-ink hover:text-paper transition-colors">
          ← Prev
        </button>
        <button onClick={onToday} className="stamp hover:bg-ink hover:text-paper transition-colors">
          This Week
        </button>
        <button onClick={onNext} className="stamp hover:bg-ink hover:text-paper transition-colors">
          Next →
        </button>
      </div>
    </div>
  );
}
