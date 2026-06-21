# Manchester Turing Academy

A web platform where users can browse a catalog of courses, subscribe to and purchase courses, and manage their accounts. Payments are processed securely through Stripe.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| Migrations | Alembic |
| Payments | Stripe |
| Auth | JWT (PyJWT) |
| Deployment | Docker / Docker Compose, Nginx |

---

## Features

- Browse courses by type (e.g. AI, Robotics, AI Applications)
- User registration, sign in, and profile management
- **Forgot Password** — request a one-time password (OTP) by email and reset the password
- **Remember Me** — optionally remember credentials on the sign in screen
- Course subscriptions and purchases via Stripe checkout
- Admin panel to manage users and courses
- Secure, downloadable course PDFs

---

## Project Structure

```
MTA/
├── backend/                     # FastAPI application
│   ├── main.py                  # App entrypoint (uvicorn)
│   ├── alembic.ini
│   ├── migrations/              # Alembic migrations
│   ├── requirements.txt
│   ├── Dockerfile
│   └── src/
│       ├── app.py               # FastAPI app factory
│       ├── routes.py            # Route registration
│       ├── middleware.py        # CORS middleware
│       └── apis/v1/
│           ├── routes/          # API route handlers
│           ├── controller/      # Business logic
│           ├── services/        # DB queries
│           ├── models/          # SQLAlchemy models
│           ├── validators/      # Pydantic request models
│           ├── core/            # Settings + security (JWT, hashing)
│           └── helper/          # Email, logging
├── frontend/                    # React + Vite app
│   └── src/
│       ├── views/               # Pages (SignIn, ForgotPassword, Home, ...)
│       ├── components/          # Reusable UI components
│       ├── services/            # API clients
│       ├── validators/          # Form validators
│       └── constants/           # API routes, etc.
├── database/                    # Postgres env config (Docker)
└── docker-compose.yml
```

---

## API Overview

Base path: `/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signin` | Authenticate and receive an access token |
| POST | `/auth/forgot-password` | Email a password-reset OTP to the user |
| POST | `/auth/reset-password` | Verify the OTP and set a new password |
| POST | `/user/` | Register a new user |
| GET | `/user/` | Get user profile(s) |
| PATCH | `/user/` | Update a user profile |
| DELETE | `/user/` | Delete a user |
| GET | `/course/` | List available courses |
| POST | `/course/` | Create a course (admin) |
| GET | `/course_types/` | List course types |
| POST | `/subscription/` | Subscribe to a course |
| POST | `/subscription/verification` | Verify a user's subscription |

---

## Local Development

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL (local or Docker)

### 1. Database
Create a database and enable the `uuid-ossp` extension:

```bash
createdb my_database
psql -d my_database -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
```

### 2. Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Configure env (see Environment Variables below)
cp template.env .env        # then fill in real values

# Apply migrations and run
alembic upgrade head
python main.py              # serves on http://localhost:8008
```

### 3. Frontend

```bash
cd frontend
npm install

# Point the frontend at the backend API
echo 'VITE_BE_API_URL=http://localhost:8008/api/v1/' > .env

npm run dev                 # serves on http://localhost:5173
```

Open **http://localhost:5173**.

---

## Environment Variables

These are **not** committed (see `.gitignore`). Use the `template.env` files as a starting point.

### `backend/.env`

| Variable | Description |
|---|---|
| `DB_HOST` | Database host |
| `DB_PORT` | Database port |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `SECRET_KEY` | JWT signing secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `EMAIL_SERVER_NAME` | SMTP server host |
| `EMAIL_SERVER_PORT` | SMTP server port |
| `ADMIN_EMAIL` | Sender email for system mails |
| `ADMIN_EMAIL_PASSWORD` | Sender email password |
| `FRONTEND_URL` | Frontend base URL |

### `frontend/.env`

| Variable | Description |
|---|---|
| `VITE_BE_API_URL` | Base URL of the backend API (e.g. `http://localhost:8008/api/v1/`) |

---

## Deployment (Docker Compose)

```bash
# Backend + database
docker compose --env-file ./database/.env up --build -d

# Frontend (built static assets served by Nginx)
cd frontend
npm install
npm run build               # outputs to frontend/dist
```

Configure Nginx to:
- serve `frontend/dist` as the site root (with SPA fallback to `index.html`), and
- terminate TLS (e.g. via Let's Encrypt / Certbot).

The backend container runs migrations automatically on startup (`alembic upgrade head`) before launching the server.

---

## Notes

- Passwords are currently hashed with MD5 to match the existing schema. Migrating to a stronger algorithm (e.g. bcrypt) is recommended.
- The OTP email flow depends on valid SMTP credentials in the backend environment.
