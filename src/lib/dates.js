export function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // ISO week starts Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function toKey(date) {
  return date.toISOString().slice(0, 10);
}

export function formatDay(date) {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function weekLabel(start, end) {
  return `${formatDate(start)} – ${formatDate(end)}`;
}
