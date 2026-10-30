# Sheetstudio (AssignmentWriter) — master site
Static site, no build step. Built by Nikhil Chary Sriramoju.

- `index.html` landing: hero, features, process, privacy, FAQ, about, feedback form, footer
- `studio.html` the app: agent, editor, live sheet, diagrams, modes, watermark, details strip, library, PDF, send to faculty
- `assets/pro.js` agent: Groq (gsk_) or Gemini (AIza) key, provider and model auto-detected with fallback
- `assets/watermark.js`, `data/syllabus.json` (RAG notes; add your own), `404.html`, `sitemap.xml`, `robots.txt`
- `extras/` optional Vercel/Docker/CNN server mode (see its README)

## GitHub Pages
Settings → Pages → Deploy from branch → main → / (root). Never commit API keys.

## v4 additions
Practice question bank (`data/questions.json`), up to 5 questions per run (one per line, Ctrl+Enter), installable offline-capable PWA (`manifest.webmanifest`, `sw.js`, icons). Bump `V` in `sw.js` on every deploy.

## v5 additions
Marks profiles (2 to 20) with automatic word, diagram and table verification, Mermaid validation and auto-repair, 10 diagram types, answer types, extras toggles, step tracker, Refine tool, dark mode, collapsible cards, Marks guide on the landing page.

## v6 additions
Multiple question fields (each with its own marks), auto-detected marks, answer type and diagram per question, dual-provider mode, topic-relevance check with automatic rewrite, numbered question headings, `assets/lib.js` helpers.
