# API Endpoints

api-endpoints.md
Rails API endpoints.
Only JSON endpoints, except for Root.
Params for each endpoint, and what information will be returned.

HTML ENDPOINT

Root
GET / - Rendering Screen

JSON ENDPOINTS

Users
POST /api/users
GET /api/users/:id
PATCH /api/users/:id

Session
POST /api/session
DELETE /api/session

Tasks

GET /api/tasks
POST /api/tasks
GET /api/tasks/:id
DELETE /api/tasks/:id

BONUS:
Projects
GET /api/projects
POST /api/projects
GET /api/projects/:id
PATCH /api/projects/:id
DELETE /api/projects/:id
GET /api/projects/:id/tasks
