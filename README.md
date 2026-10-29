# Answer Sheet Studio Pro (AssignmentWriter v2)
Built by Nikhil Chary Sriramoju. Adds a server-side agentic pipeline (plan, RAG, write, critique via Groq), a CNN diagram classifier (PyTorch), Docker, and security headers on top of the original single-file app.

## Add to your repo
1. Copy `api/ assets/ data/ ml-service/ server.js package.json Dockerfile docker-compose.yml vercel.json .env.example .gitignore .dockerignore` next to your existing `index.html`.
2. Hook the Pro panel into index.html (keep a backup first):
   `sed -i 's#</body>#<link rel="stylesheet" href="assets/pro.css"><script defer src="assets/pro.js"></script><script defer src="assets/watermark.js"></script></body>#' index.html`
3. Run locally: `cp .env.example .env`, put your Groq and Gemini keys in it, then `docker compose up --build` and open http://localhost:3000.

## Deploy (Vercel, free)
Import the GitHub repo at vercel.com/new, then Settings → Environment Variables → add `GROQ_API_KEY` and `GEMINI_API_KEY`. Deploy. `ML_URL` is optional and only needed if you host `ml-service/` elsewhere (Render/Fly/Hugging Face Spaces).

## Limits
Rate limiting is in-memory per serverless instance (best effort). RAG uses keyword retrieval over `data/syllabus.json`; add your own syllabus chunks. The CNN needs training data and `weights.pt` before it returns labels.
