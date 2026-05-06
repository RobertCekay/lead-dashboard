const BASE = "http://localhost:3000";

const handle = async (res) => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

const get = (path) => fetch(`${BASE}${path}`).then(handle);

const send = (method, path, body) =>
  fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(handle);

export const getTasks = () => get("/tasks");
export const getDecisions = () => get("/decisions");
export const getSummary = () => get("/summary");

export const createTask = (task) => send("POST", "/tasks", { task });
export const updateTask = (id, task) => send("PATCH", `/tasks/${id}`, { task });

export const createDecision = (decision) => send("POST", "/decisions", { decision });
export const updateDecision = (id, decision) => send("PATCH", `/decisions/${id}`, { decision });
