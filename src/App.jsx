import { useState } from "react";
import TabNav from "./components/TabNav";
import WeekNav from "./components/WeekNav";
import Planner from "./components/Planner";
import Recipes from "./components/Recipes";
import GroceryList from "./components/GroceryList";
import Nutrition from "./components/Nutrition";
import { sampleRecipes } from "./data/sampleRecipes";
import { usePersistentState } from "./lib/storage";
import { startOfWeek, addDays, toKey } from "./lib/dates";

export default function App() {
  const [tab, setTab] = useState("planner");
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [recipes, setRecipes] = usePersistentState("kl.recipes", sampleRecipes);
  const [plan, setPlan] = usePersistentState("kl.plan", {});
  const [checked, setChecked] = usePersistentState(`kl.checked.${toKey(weekStart)}`, {});

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-paper2">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl">The Kitchen Ledger</h1>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink2">
              weekly meal planning, itemized
            </p>
          </div>
          <span className="stamp text-stamp hidden sm:inline-block">Est. this week</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8 grid md:grid-cols-[130px_1fr] gap-6">
        <TabNav active={tab} onChange={setTab} />

        <div>
          {(tab === "planner" || tab === "grocery" || tab === "nutrition") && (
            <WeekNav
              weekStart={weekStart}
              onPrev={() => setWeekStart((w) => addDays(w, -7))}
              onNext={() => setWeekStart((w) => addDays(w, 7))}
              onToday={() => setWeekStart(startOfWeek(new Date()))}
            />
          )}

          {tab === "planner" && (
            <Planner weekStart={weekStart} recipes={recipes} plan={plan} setPlan={setPlan} />
          )}
          {tab === "recipes" && <Recipes recipes={recipes} setRecipes={setRecipes} />}
          {tab === "grocery" && (
            <GroceryList
              weekStart={weekStart}
              recipes={recipes}
              plan={plan}
              checked={checked}
              setChecked={setChecked}
            />
          )}
          {tab === "nutrition" && (
            <Nutrition weekStart={weekStart} recipes={recipes} plan={plan} />
          )}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 md:px-8 pb-8 pt-2">
        <p className="font-mono text-[10px] text-ink2 tracking-wide">
          Data is stored locally in your browser — nothing leaves this device.
        </p>
      </footer>
    </div>
  );
}
