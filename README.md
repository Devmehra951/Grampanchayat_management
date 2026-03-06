# Gram Panchayat & Community Management Platform

A complete full-stack implementation for Gram Panchayat administration, community clubs, donations, development tracking, and citizen grievances.

## Runtime Compatibility (Debugged)
- **Node.js:** `v22.19.0`+
- **npm:** `10.9.3`+

## Role-wise Login Behavior (Automatic)
After login, pages and operations are automatically controlled by role:
- **ADMIN**: full control center + user management + CRUD on clubs/festivals/development/donations + complaint resolution
- **PANCHAYAT_OFFICER**: CRUD on clubs/festivals/development/donations + complaint resolution
- **CITIZEN**: register/login, create/view own complaints, create/view own donations, and view public modules

## Quick Start (Fully Working)
### 1) Start backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed        # creates admin@panchayat.local
npm run seed:demo   # creates officer + sample records for pages
npm run dev
```

### 2) Start frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3) Login accounts
- **Admin**: `admin@panchayat.local` / `Admin@12345`
- **Officer**: `officer@panchayat.local` / `Officer@123`
- **Citizen**: create from `/register`

## Core Role-wise Modules
- Dashboard KPIs: **Active Projects, Total Donations, Open Complaints, Upcoming Festivals**
- Clubs: list for all, create/delete for Admin/Officer
- Festivals: list for all, create/delete for Admin/Officer
- Development: list for all logged users, create/delete for Admin/Officer
- Donations:
  - Admin/Officer: all donations + exports
  - Citizen: own donation history + create donation
- Complaints:
  - Citizen: create + own complaints
  - Admin/Officer: view all + mark resolved
- Users: admin creates new Admin/Officer accounts

## Environment Variables
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

## Debug Checklist (frontend cannot hit backend)
1. Backend is running and `GET /health` returns `status: ok`.
2. Frontend `.env` points to `VITE_API_URL=http://localhost:4000/api`.
3. `CLIENT_ORIGIN` includes your frontend host (`localhost` + `127.0.0.1`).
4. Run `npm run seed` then `npm run seed:demo` in backend.
5. Login with seeded accounts and verify role-wise menus.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + JWT + Joi + RBAC
- **Database:** MongoDB + Mongoose
