const BASE = "http://localhost:3000";

export const getTasks = async () => {
  const res = await fetch(`${BASE}/tasks`);
  return res.json();
};

export const getDecisions = async () => {
  const res = await fetch(`${BASE}/decisions`);
  return res.json();
};

export const getSummary = async () => {
  const res = await fetch(`${BASE}/summary`);
  return res.json();
};