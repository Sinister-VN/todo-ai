# 📝 Todo AI

An AI-powered Todo application built with **React**, **NestJS**, **Prisma**, and **PostgreSQL**.

The application supports standard CRUD operations for todos and integrates **Google Gemini** to generate task suggestions from natural language prompts. Users can review AI-generated suggestions before importing selected items into their todo list.

---

## Demo

> Add screenshots or deployment links here.

Frontend:

```
https://todo-ai-lilac.vercel.app
```

Backend:

```
https://todo-ai-bwbu.onrender.com/api/v1
```

Repository:

```
https://github.com/Sinister-VN/todo-ai
```

---

## Features

### Todo Management

- Create a new todo
- Update completion status
- Delete todos
- Persistent storage using PostgreSQL

### AI Assistant

- Generate todo suggestions from natural language prompts
- Review suggestions before importing
- Selectively import generated todos
- Backend validates and normalizes AI responses

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- Google Gemini API

---

## Project Structure

```
todo-ai
│
├── frontend
│   ├── components
│   ├── services
│   ├── types
│   └── App.tsx
│
└── backend
    ├── prisma
    ├── src
    │   ├── prisma
    │   └── todo
    └── package.json
```

---
## Architecture
```
┌─────────────┐
│ React + Vite│
└──────┬──────┘
       │ HTTP
       ▼
┌─────────────┐
│   NestJS    │
├─────────────┤
│ Controllers │
│ Services    │
│ Prisma      │
└─────┬───┬───┘
      │   │
      │   └──────────────┐
      ▼                  ▼
PostgreSQL         Google Gemini
```
---

## Getting Started

### Clone repository

```bash
git clone https://github.com/your-username/todo-ai.git

cd todo-ai
```

---

## Backend

```bash
cd backend

npm install
```

Create `.env`

```env
DATABASE_URL=

GOOGLE_GENAI_API_KEY=

GOOGLE_GENAI_MODEL=gemini-2.5-flash
```

Run migrations

```bash
npx prisma migrate deploy
```

or

```bash
npx prisma migrate dev
```

Start server

```bash
npm run start:dev
```

Backend runs at

```
http://localhost:3000
```

---

## Frontend

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Run

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

## AI Workflow

```
User Prompt

        │

        ▼

Frontend

        │

POST /todos/generate

        │

        ▼

NestJS Backend

        │

Google Gemini API

        │

Normalize Response

        │

        ▼

Frontend Preview

        │

Import Selected

        │

POST /todos
```

---

## Trade-offs

### Reusing Existing Create API Instead of Bulk Create

The AI import feature currently creates todos using multiple requests (`Promise.all`) instead of introducing a dedicated bulk-create endpoint.

**Pros**

- Simpler backend implementation
- Reuses existing validation and business logic
- Sufficient for the small number of AI-generated suggestions (up to 8)

**Cons**

- Multiple HTTP requests
- Less efficient for large-scale imports

A bulk-create endpoint would be preferable for production systems handling larger batches.

---

### AI Integration Through Backend

The frontend communicates only with the backend instead of calling the Gemini API directly.

**Pros**

- API key remains secure
- Centralized prompt engineering
- Consistent response validation
- Easy to switch AI providers in the future

**Cons**

- Additional backend processing
- Slightly higher response latency

---

### Review Before Import

AI-generated suggestions are presented as a preview before being saved.

**Pros**

- Prevents unwanted or incorrect AI output from entering the database
- Gives users full control over imported tasks

**Cons**

- Requires one extra user interaction

This approach was chosen because AI-generated content should be reviewed before persistence.

---

### Backend Response Normalization

The backend validates and normalizes AI responses before returning them.

Current normalization includes:

- Removing empty titles
- Trimming whitespace
- Removing duplicates
- Clamping priority values
- Limiting the number of suggestions

**Pros**

- Stable API contract
- Simpler frontend
- Defensive against unexpected AI output

**Cons**

- Slightly more backend logic

---

### Component-Based Frontend Structure

The UI is divided into small reusable components (`TodoList`, `TodoItem`, `TodoInput`, `AiPanel`, etc.) instead of using a single large component.

**Pros**

- Easier to maintain
- Clear separation of responsibilities
- Better scalability

**Cons**

- More files for a relatively small application
---

## Future Improvements

- Bulk import endpoint
- Inline todo editing
- Authentication
- Due dates
- Categories
- Drag-and-drop ordering
- Unit and integration tests

---

## Author

Nguyen Nam