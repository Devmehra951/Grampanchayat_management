# Gram Panchayat & Community Management Platform

Production-ready full-stack project for Gram Panchayat operations with role-based dashboards and CRUD modules.

## ✅ Ready-to-use Features
- JWT auth (access + refresh)
- Role-based behavior after login:
  - **ADMIN**: full control + user/staff management
  - **PANCHAYAT_OFFICER**: operational management (clubs, festivals, development, collections, complaints)
  - **CITIZEN**: complaint + donation operations and personal tracking
- CRUD-enabled modules:
  - Clubs
  - Festivals
  - Development Projects
  - Donations
  - Complaints
  - Users (Admin only)
- Dashboard cards using live backend data:
  - Active Projects
  - Total Donations
  - Open Complaints
  - Upcoming Festivals

---

## Runtime Compatibility
- Node.js: **v22.19.0+**
- npm: **10.9.3+**
- MongoDB: **6.x+** or **7.x+**

---

## Quick Start (Local)

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed:roles
npm run seed:demo
npm run dev
```

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3) Login Accounts (pre-seeded)
- Admin: `admin@panchayat.local` / `Admin@12345`
- Officer: `officer@panchayat.local` / `Officer@123`
- Citizen: `citizen@panchayat.local` / `Citizen@123`

---

## Workspace-level Commands (optional)
From repository root:
```bash
npm run dev:backend
npm run dev:frontend
npm run seed:roles
npm run seed:demo
npm run build:frontend
```

---

## Environment Configuration

### `backend/.env`
```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/gram_panchayat
JWT_ACCESS_SECRET=change_me_access
JWT_REFRESH_SECRET=change_me_refresh
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
CLIENT_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
SEED_ADMIN_NAME=System Admin
SEED_ADMIN_EMAIL=admin@panchayat.local
SEED_ADMIN_PHONE=9999999999
SEED_ADMIN_PASSWORD=Admin@12345
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:4000/api
```

---

## Role-wise Functional Behavior

### Admin
- Access all pages
- Create Admin/Officer users
- Full CRUD for clubs/festivals/development
- View and manage all donations/complaints

### Panchayat Officer
- Access operational pages
- CRUD for clubs/festivals/development
- Manage collections and resolve complaints

### Citizen
- Register/login
- File and track own complaints
- Create and view own donations
- View public page data

---

## API Health Check
```bash
curl http://localhost:4000/health
```

---

## Project Structure
```text
backend/
  src/
    config/
    controllers/
    middlewares/
    models/
    routes/
    scripts/
    services/
    utils/
    validators/
frontend/
  src/
    components/
    context/
    layouts/
    pages/
    routes/
    styles/
    utils/
```
