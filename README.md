# AskCoder

AskCoder is a full-stack developer Q&A platform inspired by Stack Overflow. It is being upgraded into an AI-powered enterprise knowledge platform where employees can ask technical questions, find similar past discussions, and get AI answers grounded in verified internal knowledge.

## What This Project Does

- Users can register, log in, ask questions, and post answers.
- Questions can have tags, comments, views, and answers.
- The platform stores Q&A data in MySQL.
- The planned AI layer will use semantic search and RAG to reuse verified answers as an internal knowledge base.

## Tech Stack

| Part | Tech |
| --- | --- |
| Frontend | Next.js 14, React 18, Redux, Axios, SCSS, Tailwind |
| Backend | Node.js, Express.js, Sequelize |
| Database | MySQL |
| Auth | JWT using `x-auth-token` |
| Planned AI | LangChain, Gemini API, Embeddings, ChromaDB or FAISS |

## Project Structure

```txt
Client/
  src/app              Next.js routes
  src/modules          Page-level UI modules
  src/components       Reusable UI components
  src/redux            Redux actions and reducers
  src/services/api     Axios API calls

Server/
  src/routes           Express routes
  src/controllers      Request handlers
  src/services         Business logic
  src/services/data    Sequelize data access
  src/models           Sequelize models
  src/middleware       Auth and checks
  src/config           DB and app config
```

## Current Features

- User registration and login
- JWT authentication
- Ask questions
- View all questions
- View question details
- Add answers
- Add comments
- Browse tags
- Browse users
- User profiles

## AI Upgrade Goal

The goal is not to build a generic chatbot. The AI should answer using the organization's own verified Q&A data.

RAG flow:

```txt
User question
  -> semantic search
  -> retrieve similar verified Q&A
  -> Gemini generates grounded answer
  -> show answer with source links
  -> if no good match, post to community
  -> verified answer becomes searchable knowledge
```

## Planned AI Features

- Embeddings for questions and verified answers
- Vector search using ChromaDB or FAISS
- Semantic search for similar questions
- Gemini + LangChain RAG answers
- Verified answer indexing
- AI answer source references
- Fallback to community posting
- Analytics for common topics and unanswered knowledge gaps

## Backend API Overview

Base URL:

```txt
http://localhost:5000/api
```

Main endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/auth` | Load logged-in user |
| POST | `/auth` | Log in |
| POST | `/users` | Register user |
| GET | `/users` | Get users |
| GET | `/posts` | Get questions |
| GET | `/posts/:id` | Get one question |
| POST | `/posts` | Create question |
| DELETE | `/posts/:id` | Delete question |
| GET | `/posts/answers/:id` | Get answers |
| POST | `/posts/answers/:id` | Add answer |
| GET | `/tags` | Get tags |

Planned AI endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/ai/health` | Check AI config |
| POST | `/ai/search` | Semantic search |
| POST | `/ai/answer` | RAG answer |
| POST | `/ai/index/backfill` | Index verified Q&A |
| GET | `/ai/analytics` | Knowledge analytics |

## Local Setup

### 1. Backend

```bash
cd Server
npm install
```

Create `Server/.env`:

```env
HOST=localhost
DATABASE_PORT=3306
USER=root
PASSWORD=your_mysql_password
DATABASE=askcoder
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7
PORT=5000
NODE_ENV=development
```

Start backend:

```bash
npm start
```

Health check:

```txt
http://localhost:5000/health
```

### 2. Frontend

```bash
cd Client
npm install
```

Create `Client/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Database

Create a MySQL database:

```sql
CREATE DATABASE askcoder;
```

Sequelize creates the tables automatically when the backend starts.

Current main tables:

- `users`
- `posts`
- `answers`
- `comments`
- `tags`
- `posttag`

Planned AI tables:

- `answer_votes`
- `ai_knowledge_index`
- `ai_search_logs`

## Important Notes

- MySQL remains the source of truth.
- Vector DB is only a search index.
- Only verified answers should be used for trusted RAG answers.
- AI-generated answers should not become verified knowledge without human review.
- API keys must stay in environment variables.

## Scripts

Backend:

```bash
cd Server
npm start
npm run lint-check
```

Frontend:

```bash
cd Client
npm run dev
npm run build
npm start
```

## Project Direction

AskCoder is moving from a Q&A clone to an enterprise knowledge platform:

- Community answers solve new problems.
- Verified answers become reusable knowledge.
- Semantic search helps users find related discussions.
- RAG generates answers grounded in internal sources.
- Analytics reveal repeated problems and knowledge gaps.
