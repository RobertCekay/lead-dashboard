[
  {
    title: "Design task estimation system",
    description: "Engineers must estimate and flag risk per task",
    estimate_hours: 6,
    risk_level: "low",
    status: "in_progress"
  },
  {
    title: "Build deployment pipeline",
    description: "CI/CD setup for staging + production",
    estimate_hours: 10,
    risk_level: "high",
    status: "open"
  },
  {
    title: "Implement API structure",
    description: "Define REST endpoints for core resources",
    estimate_hours: 4,
    risk_level: "medium",
    status: "done"
  }
].each do |attrs|
  Task.find_or_create_by!(title: attrs[:title]) do |task|
    task.assign_attributes(attrs)
  end
end

Decision.find_or_create_by!(title: "Backend framework choice") do |decision|
  decision.context = "Need fast iteration and strong conventions"
  decision.decision = "Use Rails API mode"
  decision.tradeoffs = "Less flexibility than Node microservices but higher velocity"
end
