Optional server mode (Vercel or Docker). GitHub Pages cannot run these.
Copy everything in this folder to the repo root, then:
- Vercel: add GROQ_API_KEY and GEMINI_API_KEY env vars and deploy.
- Docker: cp .env.example .env, add keys, run `docker compose up --build`.
The static site works without any of this.
