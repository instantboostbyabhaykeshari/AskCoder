# AskCoder

AskCoder is a full-stack developer Q&A platform inspired by Stack Overflow. Users can ask programming questions, post answers, leave comments, explore tags, browse user profiles, and read developer blog posts.

The repository is split into two apps:

- **`Client/`** — Next.js, React, and Redux frontend
- **`Server/`** — Node.js, Express, MySQL, and Sequelize backend REST API

> **Note:** This project runs locally with Node.js and MySQL. **Docker is not required or used.**

---

## Project Structure

```
AskCoder/
├── Client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/            # App Router pages (questions, tags, users, blog, auth, etc.)
│   │   ├── components/     # Reusable UI components
│   │   ├── modules/        # Page-level feature modules
│   │   ├── redux/          # Redux store, actions, reducers
│   │   ├── services/api/   # Axios API clients
│   │   ├── config/         # Frontend config (API base URL)
│   │   └── styles/         # Global CSS, Tailwind, SCSS
│   └── package.json
│
└── Server/                 # Express backend
    ├── src/
    │   ├── routes/         # API route definitions
    │   ├── controllers/    # Request handlers
    │   ├── services/       # Business logic + Sequelize data layer
    │   ├── models/         # Sequelize models
    │   ├── middleware/     # Auth, validation, ownership checks
    │   └── config/         # DB + JWT configuration
    ├── app.js              # Express app setup
    ├── server.js           # HTTP server entry point
    └── package.json
```

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js 14, React 18, Redux, Axios, SCSS, Tailwind CSS, Material UI |
| **Backend** | Node.js, Express.js, Sequelize ORM, JWT, bcrypt |
| **Database** | MySQL |
| **Auth** | JSON Web Tokens (`x-auth-token` header) |

---

## Prerequisites

Install these before running the project:

| Tool | Recommended Version |
|------|---------------------|
| [Node.js](https://nodejs.org/) | 18.x or later |
| [npm](https://www.npmjs.com/) | Comes with Node.js |
| [MySQL](https://dev.mysql.com/downloads/) | 8.x |

Optional but useful:

- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/) for API testing

---

## Database Setup (MySQL)

1. Start your MySQL server.

2. Create a database for AskCoder:

```sql
CREATE DATABASE askcoder;
```

3. Create a MySQL user with access to that database, or use your local root account for development.

4. The backend uses **Sequelize `sync()`** on startup, so tables are created automatically when the Server starts for the first time.

Main tables:

- `users`
- `posts`
- `tags`
- `posttag`
- `answers`
- `comments`

---

## Backend Setup

Open a terminal in the `Server` folder:

```bash
cd Server
npm install
```

Create a `.env` file in `Server/`:

```env
HOST=localhost
DATABASE_PORT=3306
USER=root
PASSWORD=your_mysql_password
DATABASE=askcoder

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7

PORT=5000
NODE_ENV=development
```

Start the API:

```bash
npm start
```

Expected output:

```text
Server running on port 5000, http://localhost:5000
```

Health check:

```bash
curl http://localhost:5000/health
```

Expected response:

```json
{ "status": "ok" }
```

---

## Frontend Setup

Open a **second** terminal in the `Client` folder:

```bash
cd Client
npm install
```

Create a `.env` file in `Client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend in development mode:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

---

## Environment Variables

### Server (`Server/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `HOST` | Yes | MySQL host | `localhost` |
| `DATABASE_PORT` | Yes | MySQL port | `3306` |
| `USER` | Yes | MySQL username | `root` |
| `PASSWORD` | Yes | MySQL password | `your_mysql_password` |
| `DATABASE` | Yes | Database name | `askcoder` |
| `JWT_SECRET` | Yes | Secret used to sign JWT tokens | `your_super_secret_jwt_key` |
| `JWT_EXPIRES_IN` | Yes | Token expiry in days (number) | `7` |
| `PORT` | No | API server port (defaults to `4000` if omitted) | `5000` |
| `NODE_ENV` | No | Environment mode | `development` |

> **Important:** Set `PORT=5000` in `Server/.env` so it matches the frontend default API URL (`http://localhost:5000`).

### Client (`Client/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Recommended | Backend API base URL | `http://localhost:5000` |
| `REACT_APP_API_URL` | Optional | Legacy fallback API URL | `http://localhost:5000` |
| `NODE_ENV` | No | Environment mode | `development` |

The frontend reads the API URL from `Client/src/config/index.js` and defaults to `http://localhost:5000` if no env variable is set.

---

## Available npm Scripts

### Server (`Server/`)

| Command | Description |
|---------|-------------|
| `npm start` | Start API with nodemon (auto-restart on file changes) |
| `npm run dev` | Same as `npm start` |
| `npm run server` | Start API with plain Node (no nodemon) |
| `npm run lint-check` | Run ESLint on backend code |

### Client (`Client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server on port 3000 |
| `npm run build` | Create production build |
| `npm start` | Run production build (run `npm run build` first) |

---

## API Base URL

Local development:

```text
http://localhost:5000/api
```

All protected routes require a JWT token in the request header:

```text
x-auth-token: <your_token>
```

---

## Main API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/auth` | Yes | Load logged-in user |
| `POST` | `/api/auth` | No | Log in |

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/users` | No | Get all users |
| `GET` | `/api/users/:id` | No | Get user profile |
| `POST` | `/api/users` | No | Register a new user |
| `PUT` | `/api/users/:id` | Yes | Update own username/password |

### Posts (Questions)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/posts` | No | Get all questions |
| `GET` | `/api/posts/:id` | No | Get one question |
| `GET` | `/api/posts/tag/:tagname` | No | Get questions by tag |
| `POST` | `/api/posts` | Yes | Create a question |
| `DELETE` | `/api/posts/:id` | Yes | Delete own question |

### Answers

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/posts/answers/:id` | No | Get answers for a question |
| `POST` | `/api/posts/answers/:id` | Yes | Add an answer |
| `DELETE` | `/api/posts/answers/:id` | Yes | Delete own answer |

### Comments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/posts/comments/:id` | No | Get comments for a question |
| `POST` | `/api/posts/comments/:id` | Yes | Add a comment |
| `DELETE` | `/api/posts/comments/:id` | Yes | Delete own comment |

### Tags

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/tags` | No | Get all tags |
| `GET` | `/api/tags/:tagname` | No | Get one tag |

### Health

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/health` | No | Server health check |

---

## Run the Full Project Locally (Two Terminals)

### Terminal 1 — Backend

```bash
cd Server
npm install
npm start
```

Wait until you see:

```text
Server running on port 5000, http://localhost:5000
```

### Terminal 2 — Frontend

```bash
cd Client
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

### Quick verification checklist

1. Visit `http://localhost:3000`
2. Register a new account at `/register`
3. Log in at `/login`
4. Ask a question at `/add/question`
5. Browse tags at `/tags` and users at `/users`

---

## Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Home — top questions |
| `/questions` | All questions |
| `/questions/[id]` | Question detail |
| `/add/question` | Ask a question |
| `/tags` | All tags |
| `/tags/[tagname]` | Questions by tag |
| `/users` | All users |
| `/users/[id]` | User profile + account settings (own profile) |
| `/blog` | Developer blog listing |
| `/blog/[slug]` | Blog post detail |
| `/login` | Log in |
| `/register` | Sign up |
| `/about` | About page |
| `/contact` | Contact page |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |

---

## Troubleshooting

### `Port 5000 is already in use`

Another process (often an old Server instance) is using the port.

**Windows (PowerShell):**

```powershell
netstat -ano | findstr :5000
Stop-Process -Id <PID> -Force
```

Then restart the Server.

---

### Frontend shows API/network errors

Check that:

1. The Server is running
2. `Client/.env` has the correct API URL
3. Server `PORT` matches the frontend API URL

Example:

```env
# Server/.env
PORT=5000

# Client/.env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### MySQL connection errors

Verify:

- MySQL service is running
- Database `askcoder` exists
- `HOST`, `USER`, `PASSWORD`, and `DATABASE` in `Server/.env` are correct
- MySQL is listening on the port in `DATABASE_PORT`

---

### `Cannot find module './vendor-chunks/...'` or `./682.js` (Next.js)

This usually means a corrupted `.next` build cache.

```bash
cd Client
Remove-Item -Recurse -Force .next   # PowerShell
npm run dev
```

Stop duplicate frontend dev servers if multiple ports (3000, 3001, 3002) are in use.

---

### Login works but data does not load

- Confirm the API is reachable at `http://localhost:5000/health`
- Open browser DevTools → Network tab and check failed requests
- Make sure JWT token is stored after login (browser localStorage)

---

### Question validation errors

The backend requires:

- Title: minimum **15** characters
- Body: minimum **30** characters
- Valid tags when posting a question

---

## Production Build (Optional)

**Backend:**

```bash
cd Server
npm run server
```

**Frontend:**

```bash
cd Client
npm run build
npm start
```

Set production environment variables before deploying.

---

## License

This project is licensed under the **MIT License**.

See `Server/package.json` for license details.

---

## Author

Built as a Stack Overflow–style Q&A platform for learning, sharing knowledge, and solving coding problems.
