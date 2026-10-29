# Sheetstudio (AssignmentWriter master)
Built by Nikhil Chary Sriramoju.

- `index.html` animated landing page (scroll-driven hero)
- `studio.html` the studio: Markdown editor, live sheet preview (sanitised), Mermaid diagrams, system and handwritten modes, watermark, details strip, autosave, PDF export, send to faculty
- `assets/pro.js` Pro Agent: paste a Groq (gsk_) or Gemini (AIza) key; provider and best free model are auto-detected, with fallback
- `assets/watermark.js` text or logo watermark that prints on every page
- `data/syllabus.json` RAG notes; add your own units
- `extras/` optional Vercel/Docker/CNN server mode; copy its contents to the repo root to use it

## GitHub Pages
Settings → Pages → Deploy from branch → main → / (root). Keys are pasted in the browser and never committed.
