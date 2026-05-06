import { useEffect, useState } from "react";
import { getSummary } from "./api";

const cards = [
  { key: "total_tasks", label: "Total work items", accent: "text-slate-900" },
  { key: "total_estimated_hours", label: "Estimated hours", suffix: "h", accent: "text-slate-900" },
  { key: "open_tasks", label: "Open", accent: "text-amber-600" },
  { key: "in_progress", label: "In progress", accent: "text-blue-600" },
  { key: "high_risk", label: "High risk", accent: "text-rose-600" },
];

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSummary().then(setData);
  }, []);

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Delivery summary</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {cards.map((c) => (
          <div
            key={c.key}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {c.label}
            </div>
            <div className={`mt-2 text-2xl font-semibold ${c.accent}`}>
              {data ? `${data[c.key] ?? 0}${c.suffix ?? ""}` : "—"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
