import { useMemo } from "react";
import { addDays, toKey, formatDay, formatDate } from "../lib/dates";

export default function Nutrition({ weekStart, recipes, plan }) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const dayTotals = useMemo(() => {
    return days.map((d) => {
      const dateKey = toKey(d);
      const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, meals: 0 };
      ["Breakfast", "Lunch", "Dinner"].forEach((meal) => {
        const recipe = recipes.find((r) => r.id === plan[`${dateKey}_${meal}`]);
        if (recipe) {
          totals.calories += recipe.macros.calories;
          totals.protein += recipe.macros.protein;
          totals.carbs += recipe.macros.carbs;
          totals.fat += recipe.macros.fat;
          totals.meals += 1;
        }
      });
      return { date: d, ...totals };
    });
  }, [days, recipes, plan]);

  const activeDays = dayTotals.filter((d) => d.meals > 0);
  const weekAvg = activeDays.length
    ? {
        calories: Math.round(activeDays.reduce((s, d) => s + d.calories, 0) / activeDays.length),
        protein: Math.round(activeDays.reduce((s, d) => s + d.protein, 0) / activeDays.length),
        carbs: Math.round(activeDays.reduce((s, d) => s + d.carbs, 0) / activeDays.length),
        fat: Math.round(activeDays.reduce((s, d) => s + d.fat, 0) / activeDays.length),
      }
    : null;

  const maxCalories = Math.max(...dayTotals.map((d) => d.calories), 1);

  return (
    <div className="ledger-card p-5 md:p-6">
      <div className="flex items-baseline justify-between border-b border-line pb-3 mb-4">
        <h2 className="font-display text-xl">Weekly Nutrition Ledger</h2>
        {weekAvg && (
          <p className="font-mono text-[11px] text-ink2">
            Daily avg: {weekAvg.calories} kcal · {weekAvg.protein}g P · {weekAvg.carbs}g C ·{" "}
            {weekAvg.fat}g F
          </p>
        )}
      </div>

      <div className="space-y-3">
        {dayTotals.map((d) => {
          const key = toKey(d.date);
          const barWidth = d.calories === 0 ? 0 : Math.max(6, (d.calories / maxCalories) * 100);
          return (
            <div key={key} className="grid grid-cols-[70px_1fr_auto] items-center gap-3">
              <div>
                <p className="font-mono text-[11px] uppercase text-ink2">{formatDay(d.date)}</p>
                <p className="font-display text-sm">{formatDate(d.date)}</p>
              </div>
              <div className="h-5 bg-paper2 rounded-sm overflow-hidden border border-line">
                {d.calories > 0 && (
                  <div
                    className="h-full bg-mustard flex items-center justify-end pr-2"
                    style={{ width: `${barWidth}%` }}
                  >
                    <span className="font-mono text-[10px] text-ink">{d.calories}</span>
                  </div>
                )}
              </div>
              <div className="font-mono text-[11px] text-ink2 text-right w-32">
                {d.meals > 0 ? `${d.protein}g P · ${d.carbs}g C · ${d.fat}g F` : "no meals planned"}
              </div>
            </div>
          );
        })}
      </div>

      {!weekAvg && (
        <p className="font-mono text-sm text-ink2 text-center py-6 mt-2 border-t border-dashed border-line">
          Plan some meals this week to see your nutrition totals.
        </p>
      )}
    </div>
  );
}
