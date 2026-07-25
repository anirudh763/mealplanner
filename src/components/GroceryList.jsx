import { useMemo } from "react";
import { addDays, toKey, weekLabel } from "../lib/dates";
import { AISLES } from "../data/sampleRecipes";

export default function GroceryList({ weekStart, recipes, plan, checked, setChecked }) {
  const weekEnd = addDays(weekStart, 6);
  const weekDays = Array.from({ length: 7 }, (_, i) => toKey(addDays(weekStart, i)));

  const grouped = useMemo(() => {
    const totals = {};
    for (const slotKey of Object.keys(plan)) {
      const [dateKey] = slotKey.split("_");
      if (!weekDays.includes(dateKey)) continue;
      const recipe = recipes.find((r) => r.id === plan[slotKey]);
      if (!recipe) continue;
      for (const ing of recipe.ingredients) {
        const itemKey = `${ing.name}__${ing.unit}`;
        if (!totals[itemKey]) {
          totals[itemKey] = { name: ing.name, unit: ing.unit, qty: 0, aisle: ing.aisle || "Other" };
        }
        totals[itemKey].qty += ing.qty;
      }
    }
    const byAisle = {};
    for (const item of Object.values(totals)) {
      if (!byAisle[item.aisle]) byAisle[item.aisle] = [];
      byAisle[item.aisle].push(item);
    }
    for (const aisle in byAisle) {
      byAisle[aisle].sort((a, b) => a.name.localeCompare(b.name));
    }
    return byAisle;
  }, [plan, recipes, weekDays]);

  const allItems = Object.values(grouped).flat();
  const checkedCount = allItems.filter((i) => checked[`${i.name}__${i.unit}`]).length;

  const toggle = (itemKey) => {
    setChecked((prev) => ({ ...prev, [itemKey]: !prev[itemKey] }));
  };

  const formatQty = (qty) => (Number.isInteger(qty) ? qty : Math.round(qty * 100) / 100);

  return (
    <div className="ledger-card max-w-md mx-auto overflow-hidden">
      <div className="perforated h-3" />
      <div className="p-6">
        <div className="text-center border-b border-dashed border-line pb-4 mb-3">
          <h2 className="font-display text-xl">Grocery Receipt</h2>
          <p className="font-mono text-[11px] text-ink2 mt-1">{weekLabel(weekStart, weekEnd)}</p>
          <p className="font-mono text-[11px] text-ink2">
            {checkedCount}/{allItems.length} items collected
          </p>
        </div>

        {allItems.length === 0 && (
          <p className="font-mono text-sm text-ink2 text-center py-8">
            No meals planned this week yet. Add meals in the Planner tab and
            they'll itemize here.
          </p>
        )}

        {AISLES.filter((a) => grouped[a]?.length).map((aisle) => (
          <div key={aisle} className="mb-4">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-stamp mb-1">
              {aisle}
            </p>
            {grouped[aisle].map((item) => {
              const itemKey = `${item.name}__${item.unit}`;
              const isChecked = !!checked[itemKey];
              return (
                <label key={itemKey} className="receipt-line cursor-pointer select-none">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(itemKey)}
                      className="accent-stamp"
                    />
                    <span className={isChecked ? "line-through text-ink2" : ""}>{item.name}</span>
                  </span>
                  <span className={isChecked ? "line-through text-ink2" : ""}>
                    {formatQty(item.qty)} {item.unit}
                  </span>
                </label>
              );
            })}
          </div>
        ))}

        {allItems.length > 0 && (
          <div className="border-t border-dashed border-line pt-3 mt-2 flex justify-between font-mono text-xs text-ink2">
            <span>ITEMS</span>
            <span>{allItems.length}</span>
          </div>
        )}
      </div>
      <div className="perforated h-3" />
    </div>
  );
}
