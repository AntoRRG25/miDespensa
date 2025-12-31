# miDespensa

REST API project - client app for personal pantry and shopping management


## Deployment

### Overview

The project is split into two deployable units:

* **Backend API**: Node.js + Express + Prisma, deployed on **Railway**
* **Database**: PostgreSQL, managed by **Railway**
* **Frontend**: React + Vite, deployed on **Vercel**

Each service is deployed independently and connected through environment variables.

---

### Backend (Railway)

#### Runtime & Tooling

* **Node.js**: `20.x` (pinned via `engines` and `.nvmrc`)
* **Package manager**: `pnpm` (pinned via `packageManager`)
* **ORM**: Prisma

#### Environment Variables

The backend relies on the following environment variables:

* `DATABASE_URL`: PostgreSQL connection string (provided by Railway)
* `NODE_ENV`: `production`

Environment variables are managed directly in the Railway dashboard.

---

#### Database Migrations

Database schema changes are managed using **Prisma migrations**.

* Migrations are created locally using:

  ```bash
  pnpm prisma migrate dev
  ```
* In production, migrations are **only applied**, never created:

  ```bash
  pnpm prisma migrate deploy
  ```

The migration step is part of the Railway deploy command, ensuring the database schema is always in sync with the application code.

---

#### Seed Data

Seed scripts exist for local development and demo purposes.

* Seeds are **not executed automatically** in production.
* They are run manually only when initial data is required:

  ```bash
  pnpm prisma db seed
  ```

This avoids non-idempotent data operations during deploys.

---

#### Deploy Flow

On each deploy, Railway executes the following steps:

1. Install dependencies using `pnpm`
2. Apply pending database migrations
3. Generate Prisma client and build the application
4. Start the production server

This guarantees a reproducible and safe deployment process.

---

### Frontend (Vercel)

#### Build & Runtime

* **Framework**: React
* **Bundler**: Vite
* **Platform**: Vercel

#### Environment Variables

The frontend uses environment variables prefixed with `VITE_`, for example:

* `VITE_API_URL`: Base URL of the backend API

These variables are configured in the Vercel dashboard and injected at build time.

---

#### Continuous Deployment

* Each push to the main branch triggers a new deployment.
* The frontend is built and served as static assets.
* Vercel handles preview deployments for pull requests.

---

### Notes

* Backend and frontend are intentionally decoupled to allow independent scaling and deployment.
* Tooling versions (Node.js, pnpm) are explicitly pinned to ensure consistent builds across environments.
* Production deployments avoid side effects (e.g. seed execution).

---