import { useEffect, useState } from "react";
import { getDecisions, createDecision, updateDecision } from "./api";

const BLANK = { title: "", context: "", decision: "", tradeoffs: "" };

const inputCls =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

function DecisionFields({ value, onChange }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });
  return (
    <div className="space-y-2">
      <input className={inputCls} placeholder="Title" value={value.title} onChange={set("title")} />
      <textarea rows={2} className={inputCls} placeholder="Context" value={value.context ?? ""} onChange={set("context")} />
      <textarea rows={2} className={inputCls} placeholder="Decision" value={value.decision ?? ""} onChange={set("decision")} />
      <textarea rows={2} className={inputCls} placeholder="Tradeoffs" value={value.tradeoffs ?? ""} onChange={set("tradeoffs")} />
    </div>
  );
}

function DecisionRow({ decision, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(decision);
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setDraft(decision);
    setEditing(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const updated = await updateDecision(decision.id, draft);
      onSave(updated);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50/40 p-4 space-y-3">
        <DecisionFields value={draft} onChange={setDraft} />
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
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <header className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-slate-900">{decision.title}</h3>
        <button onClick={startEdit} className="shrink-0 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
          Edit
        </button>
      </header>

      <dl className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        <Field label="Context" value={decision.context} />
        <Field label="Decision" value={decision.decision} />
        <Field label="Tradeoffs" value={decision.tradeoffs} />
      </dl>
    </article>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">{value || "—"}</dd>
    </div>
  );
}

export default function Decisions() {
  const [decisions, setDecisions] = useState([]);
  const [draft, setDraft] = useState(BLANK);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getDecisions().then(setDecisions);
  }, []);

  const upsert = (decision) =>
    setDecisions((curr) => curr.map((d) => (d.id === decision.id ? decision : d)));

  const add = async () => {
    if (!draft.title.trim()) return;
    setCreating(true);
    try {
      const created = await createDecision(draft);
      setDecisions((curr) => [created, ...curr]);
      setDraft(BLANK);
    } finally {
      setCreating(false);
    }
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Architecture decisions</h2>
        <span className="text-sm text-slate-500">{decisions.length} total</span>
      </div>

      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <DecisionFields value={draft} onChange={setDraft} />
        <div className="flex justify-end">
          <button
            onClick={add}
            disabled={creating || !draft.title.trim()}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {creating ? "Adding…" : "Add decision"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {decisions.length === 0 ? (
          <p className="text-sm text-slate-500">No decisions yet.</p>
        ) : (
          decisions.map((d) => <DecisionRow key={d.id} decision={d} onSave={upsert} />)
        )}
      </div>
    </section>
  );
}
