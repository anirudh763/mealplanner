import { useMemo, useState } from "react";
import { AISLES } from "../data/sampleRecipes";

const MEALS = ["Breakfast", "Lunch", "Dinner"];

function emptyForm() {
  return {
    name: "",
    meal: "Dinner",
    time: "",
    servings: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    ingredients: "",
  };
}

export default function Recipes({ recipes, setRecipes }) {
  const [query, setQuery] = useState("");
  const [mealFilter, setMealFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase());
      const matchesMeal = mealFilter === "All" || r.meal === mealFilter;
      return matchesQuery && matchesMeal;
    });
  }, [recipes, query, mealFilter]);

  const addRecipe = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const ingredients = form.ingredients
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s, i) => ({ name: s, qty: 1, unit: "pc", aisle: AISLES[i % AISLES.length] }));

    const newRecipe = {
      id: `custom-${Date.now()}`,
      name: form.name.trim(),
      meal: form.meal,
      time: Number(form.time) || 0,
      servings: Number(form.servings) || 1,
      tags: ["Custom"],
      macros: {
        calories: Number(form.calories) || 0,
        protein: Number(form.protein) || 0,
        carbs: Number(form.carbs) || 0,
        fat: Number(form.fat) || 0,
      },
      ingredients,
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    setForm(emptyForm());
    setShowForm(false);
  };

  const removeRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes…"
          className="font-mono text-sm bg-card border border-line rounded-sm px-3 py-2 flex-1 min-w-[180px] focus:outline-none focus:border-stamp"
        />
        <select
          value={mealFilter}
          onChange={(e) => setMealFilter(e.target.value)}
          className="font-mono text-sm bg-card border border-line rounded-sm px-3 py-2 focus:outline-none focus:border-stamp"
        >
          <option>All</option>
          {MEALS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="stamp bg-ink text-paper hover:bg-stamp transition-colors"
        >
          {showForm ? "Cancel" : "+ New Recipe"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addRecipe} className="ledger-card p-5 mb-6 grid gap-3 md:grid-cols-2">
          <input
            required
            placeholder="Recipe name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="font-display text-lg bg-transparent border-b border-line px-1 py-1 focus:outline-none focus:border-stamp md:col-span-2"
          />
          <select
            value={form.meal}
            onChange={(e) => setForm({ ...form, meal: e.target.value })}
            className="font-mono text-sm bg-transparent border border-line rounded-sm px-2 py-1.5"
          >
            {MEALS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <input
            placeholder="Servings"
            type="number"
            value={form.servings}
            onChange={(e) => setForm({ ...form, servings: e.target.value })}
            className="font-mono text-sm bg-transparent border border-line rounded-sm px-2 py-1.5"
          />
          <input
            placeholder="Minutes"
            type="number"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="font-mono text-sm bg-transparent border border-line rounded-sm px-2 py-1.5"
          />
          <input
            placeholder="Calories / serving"
            type="number"
            value={form.calories}
            onChange={(e) => setForm({ ...form, calories: e.target.value })}
            className="font-mono text-sm bg-transparent border border-line rounded-sm px-2 py-1.5"
          />
          <input
            placeholder="Protein (g)"
            type="number"
            value={form.protein}
            onChange={(e) => setForm({ ...form, protein: e.target.value })}
            className="font-mono text-sm bg-transparent border border-line rounded-sm px-2 py-1.5"
          />
          <input
            placeholder="Carbs (g)"
            type="number"
            value={form.carbs}
            onChange={(e) => setForm({ ...form, carbs: e.target.value })}
            className="font-mono text-sm bg-transparent border border-line rounded-sm px-2 py-1.5"
          />
          <input
            placeholder="Fat (g)"
            type="number"
            value={form.fat}
            onChange={(e) => setForm({ ...form, fat: e.target.value })}
            className="font-mono text-sm bg-transparent border border-line rounded-sm px-2 py-1.5"
          />
          <input
            placeholder="Ingredients, comma separated"
            value={form.ingredients}
            onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
            className="font-mono text-sm bg-transparent border border-line rounded-sm px-2 py-1.5 md:col-span-2"
          />
          <button type="submit" className="stamp bg-stamp text-paper w-fit md:col-span-2">
            Save Recipe
          </button>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <article key={r.id} className="ledger-card p-4 flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-lg leading-tight">{r.name}</h3>
              {r.id.startsWith("custom-") && (
                <button
                  onClick={() => removeRecipe(r.id)}
                  className="font-mono text-[10px] text-ink2 hover:text-stamp"
                  aria-label={`Remove ${r.name}`}
                >
                  ✕
                </button>
              )}
            </div>
            <p className="font-mono text-[11px] text-ink2 mt-1">
              {r.meal} · {r.time} min · serves {r.servings}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {r.tags.map((t) => (
                <span key={t} className="stamp text-ink2">
                  {t}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1 mt-3 font-mono text-[11px] text-center border-t border-line pt-2">
              <div>
                <p className="text-ink2">kcal</p>
                <p className="text-stamp">{r.macros.calories}</p>
              </div>
              <div>
                <p className="text-ink2">prot</p>
                <p>{r.macros.protein}g</p>
              </div>
              <div>
                <p className="text-ink2">carb</p>
                <p>{r.macros.carbs}g</p>
              </div>
              <div>
                <p className="text-ink2">fat</p>
                <p>{r.macros.fat}g</p>
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="font-mono text-sm text-ink2 col-span-full py-8 text-center">
            No recipes match — try a different search, or add one.
          </p>
        )}
      </div>
    </div>
  );
}
