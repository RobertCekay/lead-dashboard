import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask } from "./api";

const STATUSES = ["open", "in_progress", "done"];
const RISKS = ["low", "medium", "high"];

const BLANK = {
  title: "",
  description: "",
  estimate_hours: "",
  risk_level: "low",
  status: "open",
};

const riskClass = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

const statusClass = {
  open: "bg-slate-100 text-slate-700",
  in_progress: "bg-blue-100 text-blue-700",
  done: "bg-emerald-100 text-emerald-700",
};

const inputCls =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

function TaskFields({ value, onChange }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
      <input className={`md:col-span-2 ${inputCls}`} placeholder="Title" value={value.title} onChange={set("title")} />
      <input className={`md:col-span-2 ${inputCls}`} placeholder="Description" value={value.description ?? ""} onChange={set("description")} />
      <input type="number" min="0" className={inputCls} placeholder="Hours" value={value.estimate_hours ?? ""} onChange={set("estimate_hours")} />
      <select className={inputCls} value={value.risk_level} onChange={set("risk_level")}>
        {RISKS.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
      <select className={`md:col-span-2 ${inputCls}`} value={value.status} onChange={set("status")}>
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  );
}

function TaskRow({ task, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task);
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setDraft(task);
    setEditing(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const updated = await updateTask(task.id, {
        title: draft.title,
        description: draft.description,
        estimate_hours: Number(draft.estimate_hours) || 0,
        risk_level: draft.risk_level,
        status: draft.status,
      });
      onSave(updated);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50/40 p-4 space-y-3">
        <TaskFields value={draft} onChange={setDraft} />
        <div className="flex justify-end gap-2">
          <button onClick={() => setEditing(false)} className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button onClick={save} disabled={saving} className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[task.status] ?? "bg-slate-100 text-slate-700"}`}>
            {task.status}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${riskClass[task.risk_level] ?? "bg-slate-100 text-slate-700"}`}>
            {task.risk_level} risk
          </span>
          <span className="text-xs text-slate-500">{task.estimate_hours}h</span>
        </div>
        {task.description && (
          <p className="mt-1 text-sm text-slate-600">{task.description}</p>
        )}
      </div>
      <button onClick={startEdit} className="shrink-0 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
        Edit
      </button>
    </div>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [draft, setDraft] = useState(BLANK);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const upsert = (task) =>
    setTasks((curr) => curr.map((t) => (t.id === task.id ? task : t)));

  const add = async () => {
    if (!draft.title.trim()) return;
    setCreating(true);
    try {
      const created = await createTask({
        ...draft,
        estimate_hours: Number(draft.estimate_hours) || 0,
      });
      setTasks((curr) => [created, ...curr]);
      setDraft(BLANK);
    } finally {
      setCreating(false);
    }
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <span className="text-sm text-slate-500">{tasks.length} total</span>
      </div>

      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <TaskFields value={draft} onChange={setDraft} />
        <div className="flex justify-end">
          <button
            onClick={add}
            disabled={creating || !draft.title.trim()}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {creating ? "Adding…" : "Add task"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-slate-500">No tasks yet.</p>
        ) : (
          tasks.map((t) => <TaskRow key={t.id} task={t} onSave={upsert} />)
        )}
      </div>
    </section>
  );
}
