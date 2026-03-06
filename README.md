# Gram Panchayat & Community Management Platform

A complete full-stack implementation for Gram Panchayat administration, community clubs, donations, development tracking, and citizen grievances.

## Runtime Compatibility (Debugged)
- **Node.js:** `v22.19.0`+
- **npm:** `10.9.3`+

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

## Critical Backend ↔ Frontend Connection Fixes
- CORS now supports both `http://localhost:5173` and `http://127.0.0.1:5173` (comma-separated origins).
- Health endpoint returns active allowed origins for quick debugging:
  - `GET http://localhost:4000/health`

## API-backed Pages (No fake static DB data)
These screens now read from backend APIs and show **real DB status**:
- Festivals (`/api/festivals`)
- Development (`/api/developments`)
- Donations (`/api/donations`) (Admin/Officer)
- Complaints (`/api/complaints`) (Admin/Officer)

If MongoDB has zero documents, UI shows "No ... found in database" instead of fake cards.

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

## Debug Checklist (if frontend cannot hit backend)
1. Backend is running on port 4000 and `/health` responds.
2. Frontend `.env` uses `VITE_API_URL=http://localhost:4000/api`.
3. Backend `.env` has `CLIENT_ORIGIN` including your frontend host (`localhost` or `127.0.0.1`).
4. Login with seeded account (`npm run seed`).
5. Seed data for page cards (`npm run seed:demo`).

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + JWT + Joi + RBAC
- **Database:** MongoDB + Mongoose
