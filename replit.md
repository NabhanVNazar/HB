# LifeLink - Blood Donation Platform

## Overview
LifeLink is a blood donation platform that connects donors with hospitals in need. It features AI-powered donor matching, donor registration, hospital dashboards, and geolocation-based hospital search.

## Project Structure

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Location**: `frontend/` directory
- **Port**: 5000 (configured for Replit proxy)

### Backend
- **Original Setup**: Express + MongoDB (port 3001)
- **Alternative Database**: Prisma + SQLite (in `prisma/` directory)
- **Status**: Backend requires MongoDB which is not available in Replit environment
- **Note**: The backend is currently not running. Frontend works standalone but donor registration and hospital features require backend integration.

## Setup Completed

1. ✅ Frontend dependencies installed
2. ✅ Vite configured to bind to `0.0.0.0:5000` for Replit proxy compatibility
3. ✅ Frontend workflow configured and running
4. ✅ Prisma client generated (SQLite database available at `prisma/dev.db`)
5. ✅ API URL updated to use environment variables (defaults to `localhost:3001`)

## Current Status

### Working
- Frontend is fully operational and accessible at port 5000
- All UI pages are available: Home, About, Hospitals, Login, Register, Dashboard
- Responsive design with Tailwind CSS

### Needs Attention
- **Backend**: Currently using MongoDB which requires migration to SQLite/PostgreSQL for Replit
- **Database**: Prisma schema is configured for SQLite but backend server uses Mongoose
- **API Integration**: Frontend makes API calls to backend but backend is not running

## Next Steps (if backend functionality is needed)

1. Migrate backend from Mongoose/MongoDB to Prisma/SQLite
2. Update backend API routes to use Prisma Client
3. Set up backend workflow on port 3001
4. Test donor registration and hospital features

## Environment Variables

- `VITE_API_URL`: Backend API URL (defaults to `http://localhost:3001`)

## Running the Project

The frontend automatically starts via the configured workflow. To manually run:
- Frontend: `cd frontend && npm run dev`
- Backend (when migrated): `cd backend && npm start`

## Technologies

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Leaflet (for maps)
- React Toastify
- Lucide React (icons)
- Framer Motion
- Recharts

**Backend (Original):**
- Express.js
- Mongoose
- MongoDB
- CORS

**Database:**
- Prisma ORM
- SQLite (development)
- Schema includes: Users, Donors, Hospitals, Donations, Blood Requests, Matches
