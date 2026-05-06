import Dashboard from "./Dashboard";
import Tasks from "./Tasks";
import Decisions from "./Decisions";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Engineering Delivery Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Tasks, decisions, and delivery health at a glance.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-10">
        <Dashboard />
        <Tasks />
        <Decisions />
      </main>
    </div>
  );
}
