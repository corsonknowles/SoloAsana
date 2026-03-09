# SoloAsana — Technical Investment Plan

Last updated: 2026-03-08  
Stack: Ruby 4.0.1 · Rails 8.1.2 · React 19 · React Router 7 · Redux Toolkit 2 · Webpack 5 · PostgreSQL

---

## Completed ✅

| Item | Notes |
|---|---|
| `session_token` missing unique index | Migration added; DB-level uniqueness + constant-time lookups |
| `config.load_defaults` 6.1 → 8.0 | SHA-256 sessions, SameSite cookies, open-redirect protection |
| Rubocop CI workflow | `checkout@v4`, reads `.ruby-version`, `bundle exec rubocop` |
| RSpec CI workflow rewrite | `checkout@v4`, `.ruby-version`, Node 22, headless Chrome, CodeClimate `v9.0.0` |
| Remove dead npm packages | `react-dnd`, `react-dnd-html5-backend`, `react-keypress`, `redux-logger`, `thunk`, `babel-core` v6, `babel-preset-react` v6, `webpack-dev-server` |
| Remove redundant webpack `DefinePlugin` | `mode: 'production'` already injects `NODE_ENV` |
| Fix `withRouter` double-wrap | Removed from component export; container is the sole wrapper |
| Remove `newrelic_rpm` | Removed gem + `config/newrelic.yml` |
| Remove `figaro` | Was declared but `config/application.yml` never existed |
| HashRouter → BrowserRouter | Clean `/projects/:id` URLs; Rails catch-all added |
| `TeamsController#update` security fix | Scoped `Team.find` to `current_user.teams.find` |
| React component bug fixes | Duplicate `className`, Redux state mutations, stale `this.currentUser`, dead imports, deprecated lifecycle methods |
| Replace `istanbul-instrumenter-loader` | `babel-plugin-istanbul` integrates with Babel, fully Webpack 5 compatible |
| React 17 → 18 | `ReactDOM.render` → `createRoot`; `Modal.setAppElement` added |
| React Router v4 → v6 | `Switch`→`Routes`, `component=`→`element=`, `Redirect`→`Navigate`; custom `withRouter` HOC for class components |
| Redux → Redux Toolkit | `configureStore`; built-in DevTools, Immer, and thunk |
| Drop jQuery → native `fetch` | Shared `api_util.js`; removed `jquery-rails` gem and `jquery` npm |
| Declare `lodash` or replace | Object spread in all three reducers; `lodash` removed |
| Fix webpack `mode` hardcoding | `mode` and `devtool` conditional on `NODE_ENV` |
| Update `package.json` Node engine | `">=22"` |
| Remove Action Cable boilerplate | `app/channels/` and `spec/channels/` deleted |
| Migrate `secrets.yml` → Rails credentials | `config/credentials.yml.enc` + `config/master.key` |
| Update `annotate` → `annotaterb` | Rails 8 compatible fork; `lib/tasks/auto_annotate_models.rake` removed |
| Fix `tasks.done`/`section` nullable booleans | Migration: `null: false, default: false`; Rubocop suppression removed |
| Fix Cloudinary upload (dead widget + empty cloud_name) | Removed deprecated v1 widget script; fixed `CLOUDINARY_UPLOAD_URL` fallback |
| Fix `PhotoUpload` Redux context in portal | Replaced `PhotoUploadContainer` with direct prop-passing from `Greeting` |
| Fix React 18 `setState` batching regression | `handleImageUpload` passes `newUrl` directly; removed stale `this.state.photo` read |
| Npm audit — 39 vulnerabilities | `npm audit fix`; removed unused `webpack-dev-server` |
| Fix all jQuery usages in system specs | Replaced `page.execute_script %{ $(...) }` with native `dispatchEvent` / `style.display` |
| All 8 failing system specs | Race conditions, auto-project factory trait, re-visit synchronisation, Cloudinary stub |
| `RSpec/AnyInstance` suppressions cleared | Request specs converted to targeted stubs |
| Ruby 100% line + branch coverage | Full suite; SimpleCov `minimum_coverage line: 100, branch: 100` |
| JavaScript 100% line + function coverage | `babel-plugin-istanbul` + nyc; `nyc check-coverage --lines 100 --functions 100` |
| Pre-push git hook | `.githooks/pre-push` runs system specs before every `git push` |
| Rubocop: 23 offenses | All resolved (bulk migration, line length, ExpectInHook, Style/Layout) |
| PostgreSQL 12 → 16 in CI | `rspec.yml` service image updated |
| `sessions_controller#destroy` dead branch | Removed unreachable else; spec updated |
| Feature: `users.latest_project` | Projects save/restore last-viewed project; `_user` partial includes it; system spec for reload |
| Feature: `tasks.task_id` subtask nesting | Model associations, reducer, nested UI; "+" button, Enter/Backspace |
| Delete 5 dead code files | photo_upload_container, projects/tasks jbuilder templates + view specs |
| Replace `superagent` with native `fetch` | FormData + fetch in photo_upload; cloudinary stub intercepts fetch |
| Upgrade `react-dropzone` v3 → v15 | Render-prop API; accept: { 'image/*': [] } |
| React 18 → 19 | Version bump; client-side only |
| React Router v6 → v7 | Future flags already set; minimal breaking changes |
| `babel-loader` v8 → v10, `webpack-cli` v4 → v6 | Build verified |

---

## P1 · High Priority

**P1 complete.** All items addressed. Remaining work is P2 and below.

---

## P2 · Medium Priority

### Class components → Functional components with hooks

All five React components (`Greeting`, `PhotoUpload`, `Projects`, `SessionForm`,
`Tasks`) are class-based. The custom `withRouter` HOC in `route_util.jsx` exists
solely to bridge these class components with React Router v6's hook-only API.

Converting to hooks:
- Eliminates the `withRouter` bridge
- Removes all five `constructor` + `bind` boilerplate blocks
- Replaces `componentDidMount`/`componentDidUpdate`/`componentWillUnmount` with
  `useEffect`
- Replaces `this.props.` with `useSelector`/`useDispatch`

RTK's `useSelector` and `useDispatch` are already available; `useNavigate`,
`useParams`, and `useLocation` from React Router v6 are already in the codebase
(used by `withRouter`).

**Natural order:** `SessionForm` → `Projects` → `Tasks` → `PhotoUpload` → `Greeting`
(simplest first; each is self-contained).

**Effort:** L

---

## P3 · Low Priority

### `npm run test` → invoke RSpec

`package.json` has `"test": "echo \"Error: no test specified\" && exit 1"`. This
exits 1 on `npm test`. The canonical test command is `bundle exec rspec`. The script
should either delegate or at minimum print the correct command.

```json
"test": "bundle exec rspec"
```

**Effort:** XS

---

### Extract duplicate `customStyles` object

`greeting.jsx` and `photo_upload.jsx` each define an identical `customStyles`
constant for `react-modal`. Should be extracted to
`frontend/util/modal_styles.js` and imported in both.

**Effort:** XS

---

### Remove dead `afterOpenModal()` methods

Both `greeting.jsx` and `photo_upload.jsx` contain:

```js
afterOpenModal() {
  // references are now sync'd and can be accessed.
}
```

The callback is registered (`onAfterOpen={this.afterOpenModal}`) but the body is
empty. Remove the method and the `onAfterOpen` prop.

**Effort:** XS

---

### Add DB `NOT NULL` constraint to `users.session_token`

`session_token` has a unique index but no `NOT NULL` column constraint. The
`ensure_session_token` callback prevents NULLs in practice, but a DB-level
constraint is cheaper than an application-level guard and more reliable.

```ruby
change_column_null :users, :session_token, false
```

**Effort:** XS

---

### Merge duplicate `project_params` / `update_params`

`Api::ProjectsController` defines two private methods with identical permit lists:

```ruby
def project_params  = params.expect(project: %i[name team_id user_id])
def update_params   = params.expect(project: %i[name team_id user_id])
```

Collapse to one. (Once the `team_id: 1` hardcoding is fixed in P0, these param
lists will also need to be revisited.)

**Effort:** XS

---

### `UsersController#show` route is never called

`resources :users, only: %i[create update show]` registers a `GET /api/users/:id`
route. The frontend never calls it — user data arrives via `window.currentUser`
(HTML injection) or as part of the login/signup JSON response. Remove `:show` from
the route constraints and delete the action.

**Effort:** XS

---

### ~~`app/controllers/test_helpers/` location~~ ✅ done

~~The `TestHelpers::CloudinaryUploadController` is in `app/controllers/` which means
it is eager-loaded in all environments. The route guard (`if Rails.env.test?`) keeps
it unreachable in production, but the class still loads. Move to `spec/support/` or
guard the file itself with `if Rails.env.test?` so it is never loaded outside tests.~~

Controller moved to `spec/support/test_helpers/cloudinary_upload_controller.rb` so it is only loaded when running specs.

**Effort:** XS

---

## Summary Table

| Priority | Item | Effort | Status |
|---|---|---|---|
| P1 | Clean 23 Rubocop offenses | S | ✅ done |
| P1 | Feature: `users.latest_project` — navigate to last-viewed project | S | ✅ done |
| P1 | Feature: `tasks.task_id` — subtask nesting | M | ✅ done |
| P1 | PostgreSQL 12 → 16 in CI | XS | ✅ done |
| P1 | `sessions_controller#destroy` unreachable else branch | XS | ✅ done |
| P2 | Delete 5 dead code files (orphaned container + dead jbuilder templates) | XS | ✅ done |
| P2 | `superagent` → native `fetch` for Cloudinary upload | S | ✅ done |
| P2 | `react-dropzone` v3 → v15 | S | ✅ done |
| P2 | Class components → functional components + hooks | L | ⬜ todo |
| P2 | React Router v6 → v7 | S | ✅ done |
| P2 | React 18 → 19 | XS | ✅ done |
| P2 | `babel-loader` v8 → v10; `webpack-cli` v4 → v6 | XS | ✅ done |
| P3 | Remove `spring` gem | XS | ✅ done |
| P3 | `npm run test` → `bundle exec rspec` | XS | ✅ done |
| P3 | `tasks.due` integer → `date` column | S | ✅ done |
| P3 | Extract duplicate `customStyles` to shared constant | XS | ✅ done |
| P3 | Remove dead `afterOpenModal()` methods | XS | ✅ done |
| P3 | `users.session_token` DB `NOT NULL` constraint | XS | ✅ done |
| P3 | Merge duplicate `project_params` / `update_params` | XS | ✅ done |
| P3 | Remove `UsersController#show` route (never called) | XS | ✅ done |
| P3 | Guard `test_helpers/` controller (ensure_test_env) | XS | ✅ done |

---

## Pending Features (tracked separately from tech debt)

These items are planned product features, not debt. The schema columns and backend
infrastructure are already in place; the work is frontend UX and wiring.

### Teams — full UI feature (`team_id: 1` hardcoding + `TeamsController`)

`projects.jsx:39` and `tasks.jsx:40` hardcode `team_id: 1`. The Teams API
(`Api::TeamsController`, 5 REST endpoints) is fully implemented on the backend but
has no frontend consumer. The schema has `teams`, `projects.team_id`, and
`tasks.team_id` columns.

**Intended scope (XL):** Build the Teams UI end-to-end:

1. Team selector/creator in the sidebar or settings modal
2. `ProjectsContainer` and `TaskContainer` pass the selected `team_id` instead of
   the hardcoded `1`
3. The `TeamsController` routes serve the new UI
4. Team membership and project/task scoping by team

**Near-term interim (XS):** Remove `team_id` from the create payloads entirely
(the columns are `optional: true` in both models; `nil` is valid and honest).
This unblocks clean data while the full feature is planned.

