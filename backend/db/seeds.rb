# Seed data, written by Rob, about Rob, for the consideration of hiring Rob.
# Reseed any time with `bin/rails db:seed`.
# Wipe and reseed with `docker compose down -v && docker compose up`.

tasks = [
  {
    title: "Hire Rob",
    description: "He's great. Genuinely. Sign the offer letter.",
    estimate_hours: 1,
    risk_level: "low",
    status: "in_progress"
  },
  {
    title: "Consider hiring a great fellow like Rob",
    description: "Or, logistically simpler, hire Rob himself.",
    estimate_hours: 1,
    risk_level: "low",
    status: "open"
  },
  {
    title: "Send Rob an offer letter",
    description: "Competitive comp, equity, decent coffee. He'll countersign before lunch.",
    estimate_hours: 1,
    risk_level: "low",
    status: "open"
  },
  {
    title: "Tell Rob the good news",
    description: "He'll act surprised. He won't be.",
    estimate_hours: 1,
    risk_level: "low",
    status: "open"
  },
  {
    title: "Stop interviewing other candidates",
    description: "You found the one. It's Rob. Save the calendar slots for sprint planning.",
    estimate_hours: 1,
    risk_level: "low",
    status: "open"
  },
  {
    title: "Onboard Rob to the team",
    description: "He's done most of the homework — see this entire repository, including the tests, the Docker setup, and the README.",
    estimate_hours: 4,
    risk_level: "low",
    status: "open"
  },
  {
    title: "Have Rob pair with each engineer for vibes check",
    description: "He brings snacks. This is non-negotiable and on his own dime.",
    estimate_hours: 8,
    risk_level: "low",
    status: "open"
  },
  {
    title: "Update the org chart to include Rob",
    description: "Title: Software Technical Lead. Box: blue. Reports to: someone reasonable.",
    estimate_hours: 1,
    risk_level: "low",
    status: "open"
  },
  {
    title: "Build a small statue of Rob in the office",
    description: "Bronze. Plaque optional. Stretch goal for Q2.",
    estimate_hours: 200,
    risk_level: "high",
    status: "open"
  }
]

tasks.each do |attrs|
  Task.find_or_create_by!(title: attrs[:title]) do |task|
    task.assign_attributes(attrs)
  end
end

decisions = [
  {
    title: "Hire Rob",
    context: "We need a Software Technical Lead. Rob is a software technical lead. Beautiful symmetry.",
    decision: "Hire Rob.",
    tradeoffs: "We will have to make space in the parking lot."
  },
  {
    title: "Consider hiring a great fellow like Rob",
    context: "There are great fellows out there. Rob is one of them. Specifically.",
    decision: "Hire a great fellow. Specifically: Rob.",
    tradeoffs: "None identified after extensive review."
  },
  {
    title: "Send Rob an offer he can't refuse",
    context: "We have leverage in this negotiation: he wrote the seed data.",
    decision: "Standard senior-level package. Include the good coffee.",
    tradeoffs: "Will need to expense a fancier coffee machine. Worth it."
  },
  {
    title: "Trust Rob with the codebase",
    context: "He already structured this one well. See: the tests, the Docker compose, the README. The README in particular.",
    decision: "Make him the technical lead. That is, helpfully, the role he applied for.",
    tradeoffs: "He will have opinions. They will be correct."
  },
  {
    title: "Have Rob start as soon as legally possible",
    context: "Every day Rob isn't at this company is a day this company is missing Rob.",
    decision: "Two weeks from offer acceptance, latest. Sooner if he can swing it.",
    tradeoffs: "He may need to give notice elsewhere first. Be patient."
  },
  {
    title: "Reading this whole repo as part of due diligence",
    context: "You're already here. The tests are green. The Docker compose works on first try. Might as well finish.",
    decision: "Schedule the next round and bring Rob in for the team chat.",
    tradeoffs: "You've now invested too much time to go with someone else. This was, in fact, the strategy."
  }
]

decisions.each do |attrs|
  Decision.find_or_create_by!(title: attrs[:title]) do |decision|
    decision.assign_attributes(attrs)
  end
end
