# UniDuck 🦆 — Local Setup

Your CS50-style rubber duck AI tutor. Quack, debug, learn — without spoilers.

## What's inside
```
uniduck-starter/
├── src/app/
│   ├── api/chat/route.ts   ← streaming backend (Groq + AI SDK v4)
│   ├── globals.css         ← Tailwind base
│   ├── layout.tsx          ← dark mode + metadata
│   └── page.tsx            ← chat UI (useChat, markdown, auto-scroll)
├── .env.local.example      ← rename to .env.local and paste your key
├── package.json            ← minimal dependency list
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── tailwind.config.ts
└── README.md               ← this file
```

## Quick start (3 minutes)

### 1. Install Node.js 18+ if you don't have it
Check with: `node --version`

### 2. Extract this folder
- **Windows:** double-click the `.zip`, or use 7-Zip on the `.tar`
- **macOS:** double-click the `.zip` (or `tar -xf uniduck-starter.tar`)
- **Linux:** `tar -xf uniduck-starter.tar`

### 3. Open a terminal inside the `uniduck-starter` folder
```bash
cd uniduck-starter
```

### 4. Install dependencies
```bash
npm install
```

### 5. Add your Groq API key
- Rename `.env.local.example` to `.env.local`
- Open it and paste your real key:
```
GROQ_API_KEY=gsk_your_real_key_here
```
- Get a free key from **https://console.groq.com/keys** (sign up → API Keys → Create)

### 6. Run it!
```bash
npm run dev
```

Open **http://localhost:3000** in your browser. 🦆

## Troubleshooting

**"Forbidden" / 403 error**
→ Your key is invalid, expired, or you're hitting Groq from a blocked region. Make a new key at https://console.groq.com/keys.

**"model X does not exist or you do not have access"**
→ The model name in `src/app/api/chat/route.ts` isn't available on your account. Run this to see what your key CAN access:
```powershell
Invoke-WebRequest -Uri "https://api.groq.com/openai/v1/models" -Headers @{Authorization="Bearer YOUR_KEY"} | Select-Object -ExpandProperty Content
```
Then pick a chat-capable model (e.g. `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.8-27b`) and update line 19 of `route.ts`.

**"Module not found"**
→ You skipped `npm install`. Run it again.

**Port 3000 already in use**
→ Run `npm run dev -- -p 3001` instead, then open http://localhost:3001

## Tech stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4 + lucide-react icons
- Vercel AI SDK v4 (`ai` + `@ai-sdk/groq` + `@ai-sdk/react`)
- react-markdown for message rendering
- Model: `groq('openai/gpt-oss-120b')`

## Note on `ai/react`
This starter imports `useChat` from **`@ai-sdk/react`** (a separate package) instead of
`ai/react`. Both work in principle, but `@ai-sdk/react` resolves more reliably on
Windows + Turbopack setups. Functionally identical — same `useChat` hook, same API.

Quack on! 🦆
