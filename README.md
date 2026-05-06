# Lead Dashboard

A small full-stack app a technical lead might use day-to-day: track tasks with risk and effort estimates, log architectural decisions, and see delivery health at a glance.

- **Backend**: Ruby on Rails 8 (API only) + PostgreSQL
- **Frontend**: React 19 + Vite + Tailwind v4
- **Testing**: Minitest + SimpleCov (backend), Vitest + React Testing Library (frontend)
- **Tooling**: Docker Compose for one-command local setup

---

## Quick start (Docker)

The fastest way to run the app. Requires only Docker Desktop.

```bash
git clone <this-repo>
cd lead-dashboard
docker compose up
```

Then open:

- **App** — http://localhost:5173
- **API** — http://localhost:3000/tasks

The first run takes a couple of minutes (image builds + `bundle install` + `npm install`). Subsequent runs are fast. Source code is bind-mounted, so edits hot-reload without rebuilding.

```bash
docker compose down       # stop the stack
docker compose down -v    # stop and wipe the database volume
docker compose up --build # rebuild after Gemfile / package.json changes
```

---

## Running without Docker

Useful if you want to run the test suites or work on a single service.

### Prerequisites

- Ruby 3.4.3 (see [`backend/.ruby-version`](backend/.ruby-version))
- Node 20+
- PostgreSQL 14+ running locally

### Backend

```bash
cd backend
bundle install
bin/rails db:prepare
bin/rails server                  # http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                       # http://localhost:5173
```

The frontend points at `http://localhost:3000` for the API; both servers must be running.

---

## Architecture

```
lead-dashboard/
├── backend/                    Rails 8 API
│   ├── app/controllers/        TasksController, DecisionsController
│   ├── app/models/             Task, Decision
│   ├── config/routes.rb        RESTful routes + /summary
│   └── test/controllers/       Integration tests
├── frontend/                   React + Vite SPA
│   └── src/
│       ├── App.jsx             Layout shell
│       ├── Dashboard.jsx       KPI cards (reads /summary)
│       ├── Tasks.jsx           List + add + inline edit
│       ├── Decisions.jsx       List + add + inline edit
│       └── api.js              Thin fetch wrapper
└── docker-compose.yml          Postgres + backend + frontend
```

### API

| Method      | Path              | Purpose                                    |
| ----------- | ----------------- | ------------------------------------------ |
| `GET`       | `/tasks`          | List tasks (newest first)                  |
| `POST`      | `/tasks`          | Create a task                              |
| `PATCH/PUT` | `/tasks/:id`      | Update a task                              |
| `GET`       | `/decisions`      | List decisions (newest first)              |
| `POST`      | `/decisions`      | Create a decision                          |
| `PATCH/PUT` | `/decisions/:id`  | Update a decision                          |
| `GET`       | `/summary`        | Aggregate counts and hours for the dashboard |

CORS is open to all origins in development ([`backend/config/initializers/cors.rb`](backend/config/initializers/cors.rb)).

---

## Testing

Tests are the load-bearing part of this project — both for catching regressions and for showing how I'd expect the team to work.

### Backend (Minitest + SimpleCov)

```bash
cd backend
bin/rails test                                  # full suite
bin/rails test test/controllers                 # controller tests only
bin/rails test test/controllers/tasks_controller_test.rb:42   # one test
open coverage/index.html                        # HTML coverage report
```

Covers every controller action: index, create, update, summary aggregation, and the 400 path on missing params. Coverage merges across parallel workers so the report stays accurate as the suite grows.

### Frontend (Vitest + React Testing Library)

```bash
cd frontend
npm test                                        # one-shot run
npm run test:watch                              # watch mode
npx vitest run -t "edits an existing task"      # by name pattern
```

Each component has its own `*.test.jsx`. The API module is mocked per test, so the suite never hits the network.

| Component   | What's covered                                                     |
| ----------- | ------------------------------------------------------------------ |
| `App`       | Header + child sections render                                     |
| `Dashboard` | Loading placeholder + cards populate from `/summary`               |
| `Tasks`     | Empty state, list rendering, add-button gating, create + edit flows |
| `Decisions` | Empty state, list rendering, create + edit flows                    |

---

## Engineering choices

A few decisions worth calling out, and why:

- **Inline edit, not modals.** Editing happens in place: a row swaps to a form with Save/Cancel. Lower friction for a small dataset, no router-level state to manage.
- **Tailwind v4 via the Vite plugin.** Zero PostCSS config, JIT by default, tree-shaken to ~15 kB CSS in production. Ships with sensible defaults so I didn't have to write a design system for a small app.
- **`DATABASE_URL` over editing `database.yml`.** Compose injects a connection string; Rails picks it up. Keeps the YAML untouched and avoids per-environment forks.
- **Bind-mounted source in Docker.** Hot reload works for both Rails and Vite without rebuilding images. Dependency changes (Gemfile, package.json) still need `docker compose up --build`.

---

## What I'd add next

Roughly in priority order, treating this like a real project I'd hand a team:

1. **CI** — GitHub Actions running `bin/rails test` + `npm test` + linters on every PR, with a coverage badge.
2. **TypeScript** on the frontend — strict mode, typed API layer.
3. **ADRs** in `docs/adr/` — capture the decisions above (and future ones) in version-controlled markdown.
4. **Auth** — Devise or a JWT layer; the app currently treats every visitor as the same user.
5. **Loading and error states** — the React components render nothing if a request fails. A real production app needs error boundaries + retry UX.
6. **Production frontend image** — multi-stage Vite build served by nginx, paired with the existing Rails production Dockerfile.
7. **Observability** — structured request logs, basic OpenTelemetry instrumentation, a `/health` endpoint.
