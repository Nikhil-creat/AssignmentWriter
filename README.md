# Sheetstudio (AssignmentWriter) — master site
Static site, no build step. Built by Nikhil Chary Sriramoju.

- `index.html` landing: hero, features, process, privacy, FAQ, about, feedback form, footer
- `studio.html` the app: agent, editor, live sheet, diagrams, modes, watermark, details strip, library, PDF, send to faculty
- `assets/pro.js` agent: Groq (gsk_) or Gemini (AIza) key, provider and model auto-detected with fallback
- `assets/watermark.js`, `data/syllabus.json` (RAG notes; add your own), `404.html`, `sitemap.xml`, `robots.txt`


## GitHub Pages
Settings → Pages → Deploy from branch → main → / (root). Never commit API keys.

## v4 additions
Practice question bank (`data/questions.json`), up to 5 questions per run (one per line, Ctrl+Enter), installable offline-capable PWA (`manifest.webmanifest`, `sw.js`, icons). Bump `V` in `sw.js` on every deploy.

## v5 additions
Marks profiles (2 to 20) with automatic word, diagram and table verification, Mermaid validation and auto-repair, 10 diagram types, answer types, extras toggles, step tracker, Refine tool, dark mode, collapsible cards, Marks guide on the landing page.

## v6 additions
Multiple question fields (each with its own marks), auto-detected marks, answer type and diagram per question, dual-provider mode, topic-relevance check with automatic rewrite, numbered question headings, `assets/lib.js` helpers.

## v7
Answers now come from one tightly specified write step, an independent correctness check (second model if you add both keys), then verification of topic, length, diagrams and tables. Truncated outputs are continued automatically. Added subject, assignment and date fields, an optional cover page, and page numbers with your name and roll number in the printed footer. Removed the question bank, CNN button, builder/security cards and the optional server files (shipped separately in AssignmentWriter-Extras.zip).

## v8
Lean answers: only the sections the question needs. Programs get Program + Output by default; algorithm, flowchart, explanation, complexity, table, example, pros/cons and conclusion are opt-in. Each run starts a fresh sheet (the old one is saved to My library). Code is no longer touched by key-term highlighting, diagrams are auto-fixed or dropped cleanly, and printed code wraps instead of being cut off.
