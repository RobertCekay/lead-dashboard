import { useEffect, useState } from "react";
import { getTasks } from "./api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map(t => (
        <div key={t.id}>
          <h3>{t.title}</h3>
          <p>{t.description}</p>
          <p>{t.estimate_hours}h</p>
          <p>{t.risk_level}</p>
          <p>{t.status}</p>
        </div>
      ))}
    </div>
  );
}