# Gram Panchayat & Community Management Platform

A complete full-stack implementation for Gram Panchayat administration, community clubs, donations, development tracking, and citizen grievances.

## Runtime Compatibility (Debugged)
- **Node.js:** `v22.19.0` (verified target)
- **npm:** `10.9.3` (verified target)

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + JWT + Joi + RBAC
- **Database:** MongoDB + Mongoose

## Features Delivered
- Citizen registration + login, staff/admin login, JWT access + refresh token flow
- Role-based authorization for Admin / Panchayat Officer / Citizen
- Festival and community club CRUD modules
- Temple donation module with receipt ID generation and PDF/Excel exports
- Development project management (budget, status, resource tracking)
- Gram Samasya complaint registration and officer workflow support
- Dashboard analytics endpoint (`/api/dashboard/summary`)
- Persistent audit logging for security-sensitive actions
- Frontend login + registration flow, protected routes, dark/light mode, English/Hindi toggle

## Project Structure
```
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

## Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### Default seeded admin
- Email: `admin@panchayat.local`
- Password: `Admin@12345`

## Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Required Environment Variables
### `backend/.env`
```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/gram_panchayat
JWT_ACCESS_SECRET=change_me_access
JWT_REFRESH_SECRET=change_me_refresh
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
CLIENT_ORIGIN=http://localhost:5173
SEED_ADMIN_NAME=System Admin
SEED_ADMIN_EMAIL=admin@panchayat.local
SEED_ADMIN_PHONE=9999999999
SEED_ADMIN_PASSWORD=Admin@12345
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:4000/api
```

## Login/Registration Debug Guide
If you see `401 Invalid credentials` on `/api/auth/login`:
1. Ensure MongoDB is running.
2. Seed admin user:
   ```bash
   cd backend
   npm run seed
   ```
3. Login with:
   - `admin@panchayat.local`
   - `Admin@12345`
4. For citizen access, register from `/register` page, then login with same credentials.

If you see `400 Validation error`:
- check request payload includes `email` + `password`.
- frontend now shows detailed backend validation messages.

## Key API Examples
```bash
# 1) Register citizen
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Asha Devi","email":"asha@example.com","phone":"9876543210","password":"StrongPass123"}'

# 2) Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@panchayat.local","password":"Admin@12345"}'

# 3) Dashboard summary (use token)
curl http://localhost:4000/api/dashboard/summary \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

## Production Notes
- Rotate JWT secrets and enable HTTPS behind reverse proxy.
- Add centralized logging (ELK/CloudWatch) and alerting for audit events.
- For uploads, configure object storage (S3/GCS) and signed URLs.
