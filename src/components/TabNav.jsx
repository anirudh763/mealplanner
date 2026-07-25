const TABS = [
  { id: "planner", label: "Planner" },
  { id: "recipes", label: "Recipes" },
  { id: "grocery", label: "Grocery" },
  { id: "nutrition", label: "Nutrition" },
];

export default function TabNav({ active, onChange }) {
  return (
    <nav className="flex md:flex-col gap-2 md:gap-3 md:pt-6 md:pr-1 overflow-x-auto md:overflow-visible">
      {TABS.map((t) => (
        <button
          key={t.id}
          data-active={active === t.id}
          onClick={() => onChange(t.id)}
          className="ledger-tab shrink-0 transition-colors hover:text-stamp"
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
