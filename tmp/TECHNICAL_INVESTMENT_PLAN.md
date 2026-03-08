# SoloAsana — Technical Investment Plan

Last updated: 2026-03-08 (P2s complete)

---

## Completed ✅

| Item | Notes |
|---|---|
| `session_token` missing unique index | Migration added; constant-time auth lookups, DB-level uniqueness |
| `config.load_defaults` 6.1 → 8.0 | SHA-256 sessions, SameSite cookies, open-redirect protection, etc. |
| Rubocop CI workflow rewrite | `checkout@v4`, reads `.ruby-version`, `bundle exec rubocop` |
| RSpec CI workflow rewrite | `checkout@v4`, `.ruby-version`, Node 22, removed Xvfb + chromedriver setup, CodeClimate `v9.0.0` |
| Remove dead npm packages | `react-dnd`, `react-dnd-html5-backend`, `react-keypress`, `redux-logger`, `thunk`, `babel-core` v6, `babel-preset-react` v6 |
| Remove redundant webpack `DefinePlugin` | `mode: 'production'` already injects `NODE_ENV` |
| Fix `withRouter` double-wrap in Projects | Removed from component export; container is the sole wrapper |
| Remove `newrelic_rpm` | Removed gem + `config/newrelic.yml` |
| Remove `figaro` | Was declared but `config/application.yml` never existed — complete no-op |
| HashRouter → BrowserRouter | Clean `/projects/:id` URLs; Rails catch-all added |
| `TeamsController#update` security fix | Scoped `Team.find` to `current_user.teams.find` |
| React component bug fixes | Duplicate `className`, Redux state mutations, stale `this.currentUser`, dead imports, dead component state, deprecated lifecycle methods |
| Replace `istanbul-instrumenter-loader` | Replaced with `babel-plugin-istanbul`; integrates with Babel, fully Webpack 5 compatible |
| React 17 → 18 | `ReactDOM.render` → `createRoot`; one-line change in `index.jsx` |
| React Router v4 → v6 | `Switch`→`Routes`, `component=`→`element=`, `Redirect`→`Navigate`; custom `withRouter` HOC preserves class-component `match.params` API |
| Redux → Redux Toolkit | `configureStore` from RTK replaces `createStore + composeWithDevTools + applyMiddleware`; built-in DevTools and thunk middleware |
| Drop jQuery → native `fetch` | Shared `api_util.js` wrapper handles CSRF, JSON, and error mapping; removed `jquery-rails` gem and `jquery` npm |

---

## P0 · Correctness & Data Integrity

### `tasks.done` and `tasks.section` are nullable booleans

Both boolean columns were created without `null: false, default: false`, giving
PostgreSQL a three-valued type (`true / false / NULL`). Queries like
`WHERE done = false` silently miss `NULL` rows. The Rubocop cop
`Rails/ThreeStateBooleanColumn` already flagged this; it is currently suppressed
in `.rubocop_todo.yml`.

**Fix:** migration backfilling `false` then adding the constraint, then remove the
Rubocop suppression from `.rubocop_todo.yml`.

```ruby
def up
  Task.where(done: nil).update_all(done: false)
  Task.where(section: nil).update_all(section: false)
  change_column_null :tasks, :done, false, false
  change_column_null :tasks, :section, false, false
  change_column_default :tasks, :done, from: nil, to: false
  change_column_default :tasks, :section, from: nil, to: false
end
```

---

## P1 · High Priority

### Feature: Navigate to last-viewed project on login (`users.latest_project`)

The schema column already exists. The intended behaviour: on login (or page
reload) navigate directly to the project the user last had open, rather than
always defaulting to the first one alphabetically.

**To implement:** write `latest_project` whenever the user selects a project
(via `updateUser`), then read it in `Projects#componentDidMount` to seed the
initial navigation instead of the current `project0` auto-click.

---

### Feature: Subtask nesting (`tasks.task_id`)

The schema column, index, and param whitelist already exist. The
self-referential `Task` association and any frontend rendering have not been
built yet.

**To implement:** add `has_many :subtasks, class_name: "Task", foreign_key:
:task_id` (and `belongs_to :parent_task`) to the `Task` model, expose subtasks
through the serialiser, and build collapsible nesting in the task list UI.

---

### Fix the RSpec CI workflow (`rspec.yml`)

The Rubocop workflow was fixed; `rspec.yml` still has multiple problems:

| Problem | Current | Fix |
|---|---|---|
| `actions/checkout` | `@v2` | `@v4` |
| `actions/setup-node` | `@v2` | `@v4` |
| Node version in matrix | `'16'` (EOL Sep 2023) | `'22'` |
| Ruby version in matrix | `"4.0"` (wrong) | `ruby-version: .ruby-version` |
| Chromedriver action | `nanasess/setup-chromedriver@master` (pinned to master) | versioned tag or `browser-tools` action |
| Xvfb setup | manual `sudo Xvfb` | not needed — headless Chrome (`--headless=new`) has no display dependency |
| Stale triggers | `page_build`, `release: created` | remove |
| `paambaati/codeclimate-action` | `v3.0.0` | check for newer tag |

---

### Declare `lodash` or replace with spread in reducers

`import merge from 'lodash/merge'` appears in three reducer files
(`project_reducer.js`, `session_reducer.js`, `task_reducer.js`), but `lodash` is
not listed in `package.json`. It only exists as a transitive dependency; if any
upstream package drops it the import silently breaks.

All three usages are shallow merges that can be replaced with native object spread,
removing the dependency entirely:

```js
// before
newState = merge({}, state, { [action.project.id]: action.project });

// after
newState = { ...state, [action.project.id]: action.project };
```

---

### Fix webpack `mode` hardcoding

`webpack.config.js` has `mode: 'production'` unconditionally. Every development
rebuild runs a full minification pass, making iteration slow and stack traces
unreadable.

```js
mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
```

---

### Update `package.json` Node engine field

`"engines": { "node": "16.13" }` — Node 16 reached End of Life in September 2023.
Produces a warning on every npm command. Update to `">=22"` to match LTS.

---

## P2 · Medium Priority

### React Router v4 → v6

Current: `react-router@4.3.1`, `react-router-dom@4.3.1`. v4 is unmaintained.

Required changes:
- `Switch` → `Routes`
- `<Route component={Foo}>` → `<Route element={<Foo />}>`
- `Redirect` → `Navigate`
- `withRouter` HOC (already used only in the container) → `useNavigate` + `useParams` hooks
- `route_util.jsx` Auth/Protected components → hook-based equivalents
- `react-router` (bare) import in `projects_container.js` → `react-router-dom` only

Effort: **M** — touches App.jsx, route_util.jsx, and all four container files.

---

### Redux → Redux Toolkit

| Package | Current | Current stable |
|---|---|---|
| `redux` | 3.7.2 | 5.0.1 |
| `react-redux` | 5.1.2 | 9.2.0 |
| `redux-devtools-extension` | 2.13.2 | deprecated |
| `redux-thunk` | 2.4.1 | 3.1.0 |

Redux Toolkit (RTK) bundles Immer for immutable updates (eliminating all `lodash/merge`
usage), ships `createSlice` to remove action-type constant boilerplate, and includes
`createAsyncThunk` for the async patterns currently written by hand. `configureStore`
replaces `createStore` + `composeWithDevTools` + `applyMiddleware`.

Natural to do **after** the React Router upgrade since both touch the same files.

Effort: **L**

---

### React 17 → 18

React 17.0.2 is two major versions behind. React 18 requires migrating the entry
point from the deprecated `ReactDOM.render` to `createRoot`:

```js
// index.jsx — current (deprecated in React 18)
ReactDOM.render(<Root store={store} />, root);

// React 18
import { createRoot } from 'react-dom/client';
createRoot(root).render(<Root store={store} />);
```

Class components continue to work in React 18; this upgrade does not require
rewriting components first. Natural to do **before** the hooks migration.

Effort: **S**

---

### Drop jQuery → native `fetch`

`jquery-rails` (gem) and `jquery` (npm) are both present. All API calls use `$.ajax`.
The `fetch` API is available natively in every supported browser.

- Removes ~87 KB from the asset bundle
- Eliminates the dual-dependency (Sprockets + npm)
- `$.ajax({...})` → `fetch(url, options)` is a mechanical substitution; each call
  returns a native Promise

Effort: **M**

---

### Replace `istanbul-instrumenter-loader`

`istanbul-instrumenter-loader` is a Webpack 4-era package that hasn't been updated
since 2019. It has a known peer-dependency conflict with Webpack 5 (currently worked
around with `--legacy-peer-deps`).

Replace with `babel-plugin-istanbul`, which integrates with the Babel transform step
and works correctly with Webpack 5:

```js
// webpack.config.js — replace the istanbul rule block with a Babel option
// (conditionally added when COVERAGE=true)
```

Effort: **S**

---

## P3 · Low Priority

### Class components → Functional components with hooks

All five React components (`Greeting`, `PhotoUpload`, `Projects`, `Tasks`,
`SessionForm`) are class-based. Converting to hooks (`useState`, `useEffect`,
`useCallback`, `useRef`, `useSelector`, `useDispatch`) typically reduces component
code by 30–40% and makes logic easier to test in isolation.

Natural to do **after** Redux Toolkit (so hooks like `useSelector`/`useDispatch`
are available) and **after** React Router v6 (`useNavigate`, `useParams`).

Effort: **L**

---

### `tasks.due` column type

`due` is stored as an `integer` (Unix timestamp or day offset). A proper `date` or
`datetime` column would give the column semantic meaning and enable database-level
date arithmetic.

---

### Remove Action Cable boilerplate

`app/channels/application_cable/channel.rb` and `connection.rb` are empty Rails
generator stubs. No channels are implemented. Safe to delete along with
`spec/channels/`.

---

### Migrate `config/secrets.yml` → Rails credentials

`config/secrets.yml` is the Rails 4.1-era secrets file. Development and test have
hardcoded `secret_key_base` values committed in plaintext. Rails 5.2+ ships
encrypted credentials (`config/credentials.yml.enc`) as the standard replacement.

---

### Update `annotate` gem

Pinned at 2.6.5, three major versions behind 3.2.0.

---

## Summary Table

| Priority | Item | Effort | Status |
|---|---|---|---|
| P0 | `tasks.done`/`section` nullable booleans | S | ⬜ todo |
| P1 | Feature: last-viewed project (`users.latest_project`) | S | ⬜ todo |
| P1 | Feature: subtask nesting (`tasks.task_id`) | M | ⬜ todo |
| P1 | Fix `rspec.yml` CI workflow | S | ✅ done |
| P1 | Declare `lodash` or replace with spread | XS | ✅ done |
| P1 | Fix webpack `mode` hardcoding | XS | ✅ done |
| P1 | Update `package.json` Node engine | XS | ✅ done |
| P2 | React Router v4 → v6 | M | ✅ done |
| P2 | Redux → Redux Toolkit | L | ✅ done |
| P2 | React 17 → 18 (`createRoot`) | S | ✅ done |
| P2 | Drop jQuery → native `fetch` | M | ✅ done |
| P2 | Replace `istanbul-instrumenter-loader` | S | ✅ done |
| P3 | Class components → hooks | L | ⬜ todo |
| P3 | `tasks.due` integer → date column | S | ⬜ todo |
| P3 | Remove Action Cable boilerplate | XS | ⬜ todo |
| P3 | Migrate `secrets.yml` → Rails credentials | S | ⬜ todo |
| P3 | Update `annotate` gem | XS | ⬜ todo |
