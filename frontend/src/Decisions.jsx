import { useEffect, useState } from "react";
import { getDecisions } from "./api";

export default function Decisions() {
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    getDecisions().then(setDecisions);
  }, []);

  return (
    <div>
      <h2>Architecture Decisions</h2>

      {decisions.map(d => (
        <div key={d.id}>
          <h3>{d.title}</h3>
          <p>{d.context}</p>
          <p>{d.decision}</p>
          <p>{d.tradeoffs}</p>
        </div>
      ))}
    </div>
  );
}