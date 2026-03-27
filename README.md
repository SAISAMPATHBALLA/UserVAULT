# UserVault

A full-stack user directory and analytics application. The frontend displays a searchable, filterable grid of 208 users pulled from the DummyJSON API, with a detail modal and an analytics dashboard. Authentication (register/login) is backed by a FastAPI + PostgreSQL service.

---

## Tech Stack

### Frontend
| Layer | Library |
|---|---|
| Framework | React 19 + TypeScript + Vite |
| UI | MUI v7, RSuite v6 |
| State / Data | Redux Toolkit, RTK Query |
| Forms | React Hook Form + Zod |
| Charts | Highcharts + highcharts-react-official |
| Routing | React Router DOM v7 |

### Backend
| Layer | Library |
|---|---|
| Framework | FastAPI (Python 3.11) |
| Database | PostgreSQL + SQLAlchemy ORM |
| Validation | Pydantic v2 + email-validator |
| Config | python-dotenv |
| Server | Uvicorn |

### External API
All user data is sourced from [DummyJSON](https://dummyjson.com). No additional API key is required.

---

## Features

- **Auth** — Register and login persisted in PostgreSQL. Session stored in `localStorage`. No JWT; plain password comparison.
- **Protected routes** — Unauthenticated users are redirected to `/login`. Authenticated users are redirected away from `/login` and `/register`.
- **User Directory (`/home`)** — Paginated grid/list of 208 DummyJSON users. Full-text search (debounced 400 ms) and hair color filter. Grid and list layout toggle.
- **User Detail Modal** — Displays all user fields across 8 sections: Contact, Personal, Company, Education, Network & Device, Identity, Crypto, and Address. Lazy-loaded floating sub-panels for Bank card, Cart, Posts, and Todos. Responsive: 3-column on wide screens, stacked on mobile.
- **Analytics Dashboard (`/dashboard`)** — 4 Highcharts charts (Department bar, Gender donut, Age column, Eye Color pie) and RSuite Progress panels (Top Departments, Blood Group). All data from a single `GET /users?limit=0` call.
- **Shared AppNav** — RSuite Navbar, active page highlighting, layout toggle (home only), logout.

---

## Backend API

Base URL (default): `http://localhost:5000`

| Method | Path | Request Body | Response |
|---|---|---|---|
| `POST` | `/auth/register` | `{ name, email, password }` | `{ success, message, data: { id, name, email, created_at } }` |
| `POST` | `/auth/login` | `{ email, password }` | `{ success, message, data: { id, name, email, created_at } }` |

---

## External API (DummyJSON)

Base URL: `https://dummyjson.com`

| Endpoint | Purpose |
|---|---|
| `GET /users?limit=N&skip=N` | Paginated user list |
| `GET /users/search?q=term` | Full-text user search |
| `GET /users/filter?key=hair.color&value=Brown` | Filter by attribute |
| `GET /users/:id` | Single user detail |
| `GET /users/:id/carts` | User's shopping carts |
| `GET /users/:id/posts` | User's posts |
| `GET /users/:id/todos` | User's todos |
| `GET /users?limit=0` | All users (analytics) |

---

## Project Structure

```
User_vault/
├── backend/
│   ├── app.py                  # FastAPI app, CORS, router registration
│   ├── database.py             # SQLAlchemy engine, session, Base
│   ├── requirements.txt
│   ├── controllers/
│   │   └── authController.py   # register_user / login_user logic
│   ├── models/
│   │   └── userModel.py        # User ORM model (UUID PK)
│   ├── routes/
│   │   └── authRoute.py        # /register and /login endpoints
│   └── schema/
│       └── userSchema.py       # Pydantic request schemas
└── frontend/
    └── src/
        ├── apis/
        │   ├── authApi.ts          # RTK Query: register, login
        │   └── getUserDetails.ts   # RTK Query: users, search, filter, carts, posts, todos
        ├── components/
        │   ├── common/             # UserModal, BankCard, UserCartsPanel, UserPostsPanel, UserTodosPanel
        │   ├── dashboard/          # KpiCard, DeptProgressList, GlassLoader
        │   ├── home/               # UserCard, UserGrid, PaginationBar, HomeHeader, SearchBar, HairColorFilter
        │   ├── ui/                 # AppNav, modalComponents
        │   └── ProtectedRoute.tsx
        ├── pages/
        │   ├── home/               # HomePage (user directory)
        │   ├── dashboard/          # DashboardPage (analytics)
        │   ├── login/
        │   ├── RegisterPage/
        │   └── NotFoundPage/
        ├── routes/
        │   └── AppRouter.tsx
        ├── store/
        │   ├── store.ts
        │   └── MainSlice.ts
        ├── types/                  # TypeScript interfaces
        ├── utils/                  # userFormatters, analytics/computeStats
        ├── constants/
        ├── config/
        ├── hooks/
        └── styles/
```

---

## Setup

### Prerequisites

- Node.js 18+
- Python 3.11
- PostgreSQL (running, with a database created)

### Backend

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/UserVault
SECRET_KEY=your-secret-key
```

Run the server:

```bash
uvicorn app:app --reload --port 5000
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=https://dummyjson.com
VITE_API_BACKEND_URL=http://localhost:5000
```

Run the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `SECRET_KEY` | Application secret (reserved for future use) |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | DummyJSON base URL (`https://dummyjson.com`) |
| `VITE_API_BACKEND_URL` | FastAPI backend base URL (`http://localhost:5000`) |

---

## Notes

- Passwords are stored in plain text. This project is not production-ready; add hashing (e.g., `bcrypt`) before any real deployment.
- CORS is configured to allow `http://localhost:5173` only. Update `allow_origins` in `backend/app.py` if your frontend runs on a different port.
- The `/home` route is the post-login landing page. `/dashboard` is a separate analytics view.
