# LifeLink - Blood Donation Platform

## Overview
LifeLink is a fully functional blood donation platform that connects donors with hospitals in need. It features AI-powered donor matching, donor registration, donor listing with search/filter, hospital dashboards, and geolocation-based hospital search.

## Project Structure

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Location**: `frontend/` directory
- **Port**: 5000 (configured for Replit proxy)

### Backend
- **Framework**: Express.js
- **Database**: Prisma ORM + SQLite
- **Location**: `backend/` directory
- **Port**: 3001
- **Status**: ✅ Fully operational

## Setup Completed

1. ✅ Frontend dependencies installed and configured
2. ✅ Backend migrated from MongoDB to Prisma + SQLite
3. ✅ Vite configured to bind to `0.0.0.0:5000` for Replit proxy compatibility
4. ✅ Frontend workflow configured and running on port 5000
5. ✅ Backend workflow configured and running on port 3001
6. ✅ Prisma client generated and database at `prisma/dev.db`
7. ✅ Database seeded with 200 realistic donor records
8. ✅ API URL configured via environment variables
9. ✅ Security vulnerability fixed (removed password field from Donor model)

## Current Status - FULLY OPERATIONAL ✅

### Working Features
- ✅ Frontend fully operational at port 5000
- ✅ Backend API fully operational at port 3001
- ✅ All UI pages: Home, About, Donors, Hospitals, Login, Register, Dashboard
- ✅ Donor registration form with validation
- ✅ Donor list page showing 200 seeded donors as cards
- ✅ Search donors by name, city, or state
- ✅ Filter donors by blood group
- ✅ AI-powered matching system for blood requests
- ✅ Responsive design with Tailwind CSS
- ✅ Secure data handling (no password storage in Donor model)

### Database Schema
The SQLite database (`prisma/dev.db`) includes:
- **Users**: Authentication and user management
- **DonorProfile**: Extended donor profiles linked to users
- **HospitalProfile**: Hospital information and dashboards
- **Donor**: Simplified donor records for direct registration (200 seeded)
- **Donation**: Track blood donation records
- **BloodRequest**: Hospital blood requests
- **Match**: AI-powered donor-request matching

## API Endpoints

### Donors
- `GET /api/donors` - Get all donors (with optional blood group filter)
- `POST /api/donors` - Register new donor
- `GET /api/donors/:id` - Get specific donor details

### AI Matching
- `POST /api/match` - AI-powered matching for blood requests
  - Input: bloodGroup, urgency, location, requiredUnits
  - Output: Ranked list of matched donors

## Recent Changes (October 28, 2025)

1. Successfully migrated backend from Mongoose/MongoDB to Prisma/SQLite
2. Created comprehensive seed script for 200 realistic donors across India
3. Built donor list page with card layout, search, and filter functionality
4. Implemented AI matching algorithm using weighted scoring system
5. Fixed critical security vulnerability by removing password field from Donor model
6. Updated navigation to include "Donors" link
7. Both frontend and backend workflows running successfully

## Environment Variables

- `VITE_API_URL`: Backend API URL (defaults to `http://localhost:3001`)
- `DATABASE_URL`: SQLite database connection (file:./prisma/dev.db)

## Running the Project

Both workflows start automatically:
- **Frontend**: `cd frontend && npm run dev` (port 5000)
- **Backend**: `cd backend && npm start` (port 3001)

Manual commands:
```bash
# Generate Prisma client
npx prisma generate

# Reset database and re-seed
npx prisma migrate reset --force
node prisma/seed-donors.js
```

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

**Backend:**
- Express.js
- Prisma ORM
- SQLite
- CORS

## Security

- ✅ No password storage in Donor model (removed for security)
- ✅ API responses do not expose sensitive fields
- ✅ Proper error handling and validation
- ⚠️ Note: For production use, implement proper authentication with the User model

## Deployment

The project is configured for deployment:
- Frontend deployment config: `vite build` outputs to `frontend/dist`
- Backend uses `server-prisma.js` as entry point
- Consider migrating to PostgreSQL for production (Replit provides built-in PostgreSQL)
