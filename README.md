# Gram Panchayat & Community Management Platform

Production-ready full-stack foundation for Gram Panchayat operations, citizen services, and community programs.

## Architecture Overview
- **Frontend:** React + Tailwind (Vite) with role-based dashboards
- **Backend:** Node.js + Express, JWT auth, RBAC, Mongoose
- **Database:** MongoDB

### Modules Included
- Authentication & RBAC (Citizen / Panchayat Officer / Admin)
- Festival & community clubs
- Temple donation management with PDF/Excel exports
- Gram Panchayat development projects
- Gram Samasya grievance portal
- Reports & analytics scaffolding

## Folder Structure
```
backend/
  src/
    config/         # env & DB config
    controllers/    # request handlers
    middlewares/    # auth, RBAC, validation, rate limit
    models/         # mongoose schemas
    routes/         # REST endpoints
    services/       # tokens, reports, audit logs
    utils/          # constants, logger
    validators/     # Joi schemas
frontend/
  src/
    components/
    layouts/
    pages/
    styles/
    utils/
```

## Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Sample API Requests
```bash
# Register citizen
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Asha Devi","email":"asha@example.com","phone":"9876543210","password":"StrongPass123"}'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"asha@example.com","password":"StrongPass123"}'

# Create donation (Admin/Officer token)
curl -X POST http://localhost:4000/api/donations \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"donorName":"Ravi Sharma","donorPhone":"9999999999","amount":2500,"method":"CASH","templeName":"Shiv Mandir"}'
```

## Deployment Notes
- Use environment variables for JWT secrets and Mongo URI.
- Enable HTTPS and configure CORS origins for production.
- Add observability (APM/log aggregation) for audit trails.
