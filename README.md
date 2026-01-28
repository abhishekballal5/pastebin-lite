# Pastebin-Lite Assignment Submission

## Project Overview
A small “Pastebin”-like application where users can create text pastes and share a link to view them.  
The project uses:
- Next.js (16.1.5) for frontend + API routes
- Prisma 5.22.0 + SQLite for database (ephemeral on Vercel)
- Tailwind CSS for styling

## Running Locally
Clone the repository, install dependencies, generate Prisma client, optionally seed database, and start local development server:

```bash
git clone https://github.com/abhishekballal5/pastebin-lite.git
cd pastebin-lite
npm install
npx prisma generate
# Optional: seed database if you want pre-defined pastes
node prisma/seed.js
npm run dev

## Notes for the Evaluator
- The project runs fully locally (all features work with SQLite).
- On Vercel, SQLite is ephemeral, so **creating new pastes may fail** after deployment.
- Existing seeded pastes are fully functional on the deployed URL.
