# Scaler Persona Chat

Chat with three real Scaler personalities — Anshuman Singh, Abhimanyu Saxena,
and Kshitij Mishra — powered by Groq (llama-3.3-70b-versatile).

**Live Demo**: [your-deployed-url]

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env.local` and add your Groq API key
3. `npm install`
4. `npm run dev`

## Deployment (Vercel)

1. Push to GitHub
2. Import repo on vercel.com
3. Add `GROQ_API_KEY` as an environment variable in Vercel dashboard
4. Deploy

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Groq API (llama-3.3-70b-versatile)
