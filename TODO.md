# TODO: Restructure Project to Separate Frontend and Backend

## Phase 1: Move and Adapt Frontend Files
- [ ] Move components/ directory from root to frontend/src/
- [ ] Move hooks/ directory from root to frontend/src/
- [ ] Move lib/ directory from root to frontend/src/
- [ ] Adapt app/layout.tsx to frontend/src/components/Layout.tsx (remove Next.js specifics, use React)
- [ ] Adapt app/page.tsx to frontend/src/components/Home.tsx (convert to React component)
- [ ] Move app/globals.css to frontend/src/index.css (adapt for Vite)
- [ ] Update frontend/package.json with all necessary dependencies (Radix UI, Supabase, Recharts, react-router-dom, etc.)
- [ ] Update frontend/src/App.tsx to use Layout and Home components, add routing
- [ ] Update frontend/src/main.tsx to include theme provider and router

## Phase 2: Move and Setup Backend Files
- [ ] Move prisma/ directory from root to backend/
- [ ] Move prisma.config.ts from root to backend/
- [ ] Update backend/package.json to include Prisma, @prisma/client, dotenv, tsx, etc.
- [ ] Update backend/server.js to include Prisma client and basic API routes (health, welcome, and placeholders for auth/data)

## Phase 3: Update Imports and Configurations
- [ ] Update all import paths in moved files to match new structure
- [ ] Ensure Tailwind config and PostCSS are set up in frontend/

## Phase 4: Install Dependencies and Setup
- [ ] Run npm install in frontend/
- [ ] Run npm install in backend/
- [ ] Run npx prisma generate in backend/
- [ ] Run npx prisma migrate dev --name init in backend/ (assuming DB is set up)
- [ ] Run npm run db:seed in backend/ if DB is available

## Phase 5: Test and Verify
- [ ] Run npm run dev in frontend/ and check for errors
- [ ] Run npm run dev in backend/ and check for errors
- [ ] Ensure no linting errors in frontend/
- [ ] Ensure no build errors in frontend/
- [ ] Test API endpoints from frontend to backend
