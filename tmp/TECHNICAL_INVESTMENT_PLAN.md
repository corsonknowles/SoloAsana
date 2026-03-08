# SoloAsana — Technical Investment Plan

Last updated: 2026-03-08  
Stack: Ruby 4.0.1 · Rails 8.1.2 · React 18.3.1 · React Router 6 · Redux Toolkit 2 · Webpack 5 · PostgreSQL

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
| Ruby 100% line + branch coverage | Full suite: 141 examples, 0 failures |
| JavaScript 100% line + function coverage | `babel-plugin-istanbul` + nyc; fetch-mock spec closes final gap |
| Pre-push git hook | `.githooks/pre-push` runs system specs before every `git push` |

---

## P1 · High Priority

### Rubocop: 23 remaining offenses (17 auto-correctable)

```
app/controllers/test_helpers/cloudinary_upload_controller.rb
  Style/ClassAndModuleChildren (nested → compact notation)
  Layout/HashAlignment (hash keys out of alignment)

app/models/{project,task,team,user}.rb
spec/models/{project,task,team,user}_spec.rb
spec/factories/{projects,teams,users}.rb
  Layout/EmptyLineAfterMagicComment (auto-correctable)

db/migrate/20260308131225_fix_task_boolean_nullability.rb
  Rails/BulkChangeTable (wrap in change_table bulk: true)

lib/tasks/annotate_rb.rake
  Style/FrozenStringLiteralComment (auto-correctable)

spec/system/react_projects_spec.rb
  RSpec/LetBeforeExamples (let(:team) defined after examples in context)
  Layout/LineLength (one line over 120 chars)
  RSpec/ExpectInHook (expect in before — deliberate Capybara sync, see note)

spec/system/react_tasks_spec.rb
  RSpec/ExpectInHook (same pattern)
  Layout/LineLength (two lines over 120 chars)
```

> **Note on `RSpec/ExpectInHook`:** The `expect(page).to have_text("Welcome")` calls
> inside `before` blocks are intentional Capybara synchronisation points, not
> test assertions. They wait for the login XHR to complete before the before-chain
> continues. One idiomatic fix is to extract a `wait_for_login!` helper method that
> wraps the Capybara wait; another is to add `# rubocop:disable RSpec/ExpectInHook`
> with a comment explaining the intent.

**Effort:** S (run `bundle exec rubocop -a` for the 17 auto-correctable offenses; 6
require manual attention)

---

### Feature: Navigate to last-viewed project on login (`users.latest_project`)

The `users.latest_project` integer column exists in the schema and is included in
both `user_params` and `update_params`. It is never written to and never read.

**Current behaviour (anti-feature):** `Projects#componentDidMount` auto-clicks
`project0` (the first project by numeric ID) on every page load. This is noted as an
anti-feature in `react_tasks_spec.rb:31`.

**Intended behaviour:** When a user navigates to a project, call
`updateUser({ ...currentUser, latest_project: projectID })`. On login or hard
reload, read `window.currentUser.latest_project` and navigate directly to that
project instead of auto-clicking `project0`.

**Effort:** S

---

### Feature: Subtask nesting (`tasks.task_id`)

`tasks.task_id` column and index exist. The `task_id` field is whitelisted in
`task_params`. No model association, serialiser output, or frontend rendering has
been built.

**To implement:**
1. `Task` model: `has_many :subtasks, class_name: "Task", foreign_key: :task_id`
   and `belongs_to :parent_task, class_name: "Task", optional: true`
2. Include subtasks in the `_task.json.jbuilder` partial (or in the `render json:`
   call from the tasks controller)
3. Build collapsible nesting in `tasks.jsx`

**Effort:** M

---

### PostgreSQL 12 in CI → 16

The CI workflow uses `image: postgres:12`. PostgreSQL 12 reached end of life in
November 2024. Rails 8 recommends PostgreSQL 14+.

Change `rspec.yml`:
```yaml
image: postgres:16
```

**Effort:** XS

---

### `sessions_controller#destroy` unreachable else branch

The `destroy` action has `before_action :require_logged_in!` which redirects any
unauthenticated request with a 401 before the action body runs. The inner `if @user`
/ `else` block is therefore unreachable in the else branch.

```ruby
def destroy
  @user = current_user
  if @user       # always true here — require_logged_in! guarantees it
    logout
    render "api/users/show"
  else            # dead code; nobody can reach this
    render json: ["Nobody signed in"], status: :not_found
  end
end
```

**Fix:** Remove the `if`/`else` and always call `logout` + render.

**Effort:** XS

---

## P2 · Medium Priority

### Delete three dead code files

| File | Reason |
|---|---|
| `frontend/components/photo_upload/photo_upload_container.js` | `greeting.jsx` now imports `PhotoUpload` directly; container is unreferenced anywhere |
| `app/views/api/projects/_project.json.jbuilder` | `ProjectsController` uses `render json:` (bypasses Jbuilder); template is never rendered |
| `app/views/api/projects/show.json.jbuilder` | Same; delegates to the dead partial above |
| `app/views/api/tasks/_task.json.jbuilder` | `TasksController` uses `render json:`; template is never rendered |
| `app/views/api/tasks/show.json.jbuilder` | Same |

(The users Jbuilder templates ARE live: `UsersController` uses `render :show` which
renders `show.json.jbuilder`.)

**Effort:** XS

---

### Replace `superagent` with native `fetch` in `photo_upload.jsx`

`superagent` is the last remaining third-party HTTP library. Every other API call in
the app uses the native `fetch`-based `request()` helper in `api_util.js`. The
Cloudinary upload in `photo_upload.jsx` still uses `superagent` because it makes a
multipart `POST` — but `FormData` + native `fetch` handles this equally well:

```js
const formData = new FormData();
formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
formData.append('file', file);

fetch(CLOUDINARY_UPLOAD_URL, { method: 'POST', body: formData })
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(data => { /* handle data.secure_url */ })
  .catch(err => { /* handle error */ });
```

This removes `superagent` from `package.json` entirely.

**Note:** `superagent` is currently at v6.1.0 in this project; v10.3.0 is the latest
stable. Staying on v6 also means the `react-dropzone` `onImageDrop` / `files[0]`
callback API is tightly coupled to the old dropzone version (see below).

**Effort:** S

---

### Upgrade `react-dropzone` v3 → v15

`react-dropzone@3.13.3` is twelve major versions behind. The v3 callback API
(`className`, `onDrop(files)`) was replaced with a hook and render-prop API in v5+:

```jsx
// v3 (current)
<Dropzone onDrop={this.onImageDrop} accept="image/*" multiple={false}>
  <div>Drop an image</div>
</Dropzone>

// v11+ with hooks (replacement after converting PhotoUpload to a function component)
const { getRootProps, getInputProps } = useDropzone({
  onDrop: acceptedFiles => handleImageUpload(acceptedFiles[0]),
  accept: { 'image/*': [] },
  multiple: false
});
<div {...getRootProps()}>
  <input {...getInputProps()} />
  <div>Drop an image</div>
</div>
```

Natural to do **alongside** the class-component → hooks migration (see below) and
the `superagent` → `fetch` migration, since all three are in `photo_upload.jsx`.

**Effort:** S (in isolation), XS (if done as part of hooks migration)

---

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

### React Router v6 → v7

`react-router@6.30.3` and `react-router-dom@6.30.3`. React Router v7 (7.13.1) is
now stable. The future flags already in `root.jsx` were specifically introduced to
smooth the v7 transition:

```jsx
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
```

With those flags active the breaking changes are minimal. The main surface area is
that v7 ships a new `RouterProvider` + `createBrowserRouter` API as the preferred
entry point (the `<BrowserRouter>` component still works but is considered legacy in
v7).

Natural to do **after** the hooks migration so the new `createBrowserRouter` data
router pattern can be adopted with function components.

**Effort:** S

---

### React 18 → 19

React 19.2.4 is current. The upgrade from 18 is mostly a version bump for a
client-side-only app (no server components involved). Notable change: `ref` is now a
prop instead of forwarded via `React.forwardRef` — irrelevant here since no
component uses `forwardRef`. The new `use()` hook is available for promise
unwrapping.

Natural to do **alongside** the v7 React Router upgrade.

**Effort:** XS

---

### Update `babel-loader` and `webpack-cli`

| Package | Current | Latest |
|---|---|---|
| `babel-loader` | `8.2.3` | `10.1.0` |
| `webpack-cli` | `4.9.1` | `6.0.1` |

Both are dev dependencies. `babel-loader` v9+ dropped support for Babel 7 peer
dependency quirks. `webpack-cli` v6 includes improved error messages and `serve`
command improvements.

**Effort:** XS (test that the build still works after bumping)

---

## P3 · Low Priority

### Remove `spring` gem

`spring` and `spring-watcher-listen` are listed in the `Gemfile`. Spring was the
Rails app preloader from the Rails 4/5 era. It was removed from Rails 7 app
templates and is no longer maintained for Rails 8. It adds `config/spring.rb` and
hooks into `bin/rails` / `bin/rake` (via binstubs that may not even be present).

**Fix:** Remove `gem "spring"` and `gem "spring-watcher-listen"` from `Gemfile`.
Delete `config/spring.rb`.

**Effort:** XS

---

### `npm run test` → invoke RSpec

`package.json` has `"test": "echo \"Error: no test specified\" && exit 1"`. This
exits 1 on `npm test`. The canonical test command is `bundle exec rspec`. The script
should either delegate or at minimum print the correct command.

```json
"test": "bundle exec rspec"
```

**Effort:** XS

---

### `tasks.due` integer → `date` column

`due` is stored as an `integer`. A `date` or `datetime` column would give it
semantic meaning, enable database-level date arithmetic, and surface human-readable
values in the API response without client-side conversion.

**Effort:** S (migration + API + frontend display)

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

### `app/controllers/test_helpers/` location

The `TestHelpers::CloudinaryUploadController` is in `app/controllers/` which means
it is eager-loaded in all environments. The route guard (`if Rails.env.test?`) keeps
it unreachable in production, but the class still loads. Move to `spec/support/` or
guard the file itself with `if Rails.env.test?` so it is never loaded outside tests.

**Effort:** XS

---

## Summary Table

| Priority | Item | Effort | Status |
|---|---|---|---|
| P1 | Clean 23 Rubocop offenses | S | ⬜ todo |
| P1 | Feature: `users.latest_project` — navigate to last-viewed project | S | ⬜ todo |
| P1 | Feature: `tasks.task_id` — subtask nesting | M | ⬜ todo |
| P1 | PostgreSQL 12 → 16 in CI | XS | ⬜ todo |
| P1 | `sessions_controller#destroy` unreachable else branch | XS | ⬜ todo |
| P2 | Delete 5 dead code files (orphaned container + dead jbuilder templates) | XS | ⬜ todo |
| P2 | `superagent` → native `fetch` for Cloudinary upload | S | ⬜ todo |
| P2 | `react-dropzone` v3 → v15 | S | ⬜ todo |
| P2 | Class components → functional components + hooks | L | ⬜ todo |
| P2 | React Router v6 → v7 | S | ⬜ todo |
| P2 | React 18 → 19 | XS | ⬜ todo |
| P2 | `babel-loader` v8 → v10; `webpack-cli` v4 → v6 | XS | ⬜ todo |
| P3 | Remove `spring` gem | XS | ⬜ todo |
| P3 | `npm run test` → `bundle exec rspec` | XS | ⬜ todo |
| P3 | `tasks.due` integer → `date` column | S | ⬜ todo |
| P3 | Extract duplicate `customStyles` to shared constant | XS | ⬜ todo |
| P3 | Remove dead `afterOpenModal()` methods | XS | ⬜ todo |
| P3 | `users.session_token` DB `NOT NULL` constraint | XS | ⬜ todo |
| P3 | Merge duplicate `project_params` / `update_params` | XS | ⬜ todo |
| P3 | Remove `UsersController#show` route (never called) | XS | ⬜ todo |
| P3 | Move `test_helpers/` controller out of `app/controllers/` | XS | ⬜ todo |

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

---

### `users.latest_project` — navigate to last-viewed project on login

Column exists. `user_params` and `update_params` already whitelist it.
See P1 entry for implementation detail.

---

### `tasks.task_id` — subtask nesting

Column, index, and param whitelist exist. `belongs_to :parent_task` and
`has_many :subtasks` associations are not yet declared. See P1 entry.
