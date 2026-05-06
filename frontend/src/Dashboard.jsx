import { useEffect, useState } from "react";
import { getSummary } from "./api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSummary().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Engineering Delivery Dashboard</h2>

      <div>📦 Total Work Items: {data.total_tasks}</div>
      <div>⏱ Estimated Workload: {data.total_estimated_hours}h</div>
      <div>🟡 Open: {data.open_tasks}</div>
      <div>🔵 In Progress: {data.in_progress}</div>
      <div>🔴 High Risk: {data.high_risk}</div>
    </div>
  );
}