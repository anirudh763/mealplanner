import { Fragment } from "react";
import { addDays, toKey, formatDay, formatDate } from "../lib/dates";

const MEALS = ["Breakfast", "Lunch", "Dinner"];

export default function Planner({ weekStart, recipes, plan, setPlan }) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const todayKey = toKey(new Date());

  const setSlot = (dateKey, meal, recipeId) => {
    const slotKey = `${dateKey}_${meal}`;
    setPlan((prev) => {
      const next = { ...prev };
      if (!recipeId) delete next[slotKey];
      else next[slotKey] = recipeId;
      return next;
    });
  };

  return (
    <div className="ledger-card p-4 md:p-6 overflow-x-auto">
      <div className="grid grid-cols-[90px_repeat(7,minmax(140px,1fr))] gap-px bg-line min-w-[900px]">
        <div className="bg-paper2" />
        {days.map((d) => {
          const key = toKey(d);
          return (
            <div
              key={key}
              className={`bg-paper2 px-2 py-3 text-center ${key === todayKey ? "text-stamp" : ""}`}
            >
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase">{formatDay(d)}</p>
              <p className="font-display text-lg">{formatDate(d)}</p>
              {key === todayKey && <span className="stamp inline-block mt-1">Today</span>}
            </div>
          );
        })}

        {MEALS.map((meal) => (
          <Fragment key={meal}>
            <div className="bg-paper2 flex items-center px-3">
              <span className="font-mono text-xs tracking-widest uppercase text-ink2">{meal}</span>
            </div>
            {days.map((d) => {
              const dateKey = toKey(d);
              const slotKey = `${dateKey}_${meal}`;
              const recipeId = plan[slotKey] || "";
              const recipe = recipes.find((r) => r.id === recipeId);
              return (
                <div key={slotKey} className="bg-card p-2 min-h-[86px] flex flex-col gap-1">
                  <select
                    value={recipeId}
                    onChange={(e) => setSlot(dateKey, meal, e.target.value)}
                    className="font-mono text-[11px] bg-transparent border border-line rounded-sm px-1 py-1 text-ink2 focus:outline-none focus:border-stamp"
                  >
                    <option value="">— add —</option>
                    {recipes
                      .filter((r) => r.meal === meal)
                      .map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    <option value="__any__" disabled>
                      ── other ──
                    </option>
                    {recipes
                      .filter((r) => r.meal !== meal)
                      .map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                  </select>
                  {recipe && (
                    <div className="mt-auto">
                      <p className="font-display text-sm leading-tight">{recipe.name}</p>
                      <p className="font-mono text-[10px] text-ink2">{recipe.macros.calories} kcal</p>
                    </div>
                  )}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
