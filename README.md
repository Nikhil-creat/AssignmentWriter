# 📝 Answer Sheet Studio (AssignmentWriter)

A single-file, browser-based tool that generates **JNTUH-style B.Tech CSE exam answers** — complete with Mermaid diagrams, a printable "answer sheet" layout, and even a realistic **handwritten mode** — powered by the Google Gemini API.

No backend, no build step, no install. Just open `index.html`.

## ✨ Features

- **AI-generated answers** — Add one or more exam questions, pick marks (10/16/20) and answer type (theory/programming), and generate full, exam-style answers in one click using your own Gemini API key.
- **Auto diagrams** — Generates and renders [Mermaid](https://mermaid.js.org/) diagrams (flowcharts, sequence, ER) inline with the answer, with a text fallback if rendering fails.
- **Two preview modes**
  - 🖨 **System** — clean, printable typeset answer sheet
  - ✍️ **Handwritten** — simulated handwriting look (with an optional second "writer" style that alternates between answers) for a natural, filled-out notebook feel
- **Student details panel** — Name, roll number, class, year, group, section, college, and faculty details are shown on the sheet and auto-highlighted wherever they appear in the text.
- **Markdown editor + live preview** — Edit the generated Markdown directly; the preview updates live with word count and estimated page count.
- **Export to PDF / Print** — One-click print-optimized export with page numbers and clean page breaks.
- **Submit to faculty** — Share the finished sheet directly to your instructor's email.
- **Draft autosave** — Work is autosaved to `localStorage` so nothing is lost if the tab closes.
- **Dark preview mode** (screen-only; always prints white).
- **Responsive layout** — Usable on mobile with tabbed Edit/Preview views.

## 🚀 Getting Started

1. Clone or download this repo.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).
3. Get a free [Gemini API key](https://aistudio.google.com/apikey) and paste it into the **Gemini API Key** field in the sidebar (it's stored only in your browser's `localStorage` — never sent anywhere except Google's API).
4. Fill in your student details.
5. Add your exam question(s), choose marks and diagram type, and click **Generate All Answers**.
6. Switch between **System** and **Handwritten** preview modes, then **Export to PDF / Print**.

No server or installation required — it's a static HTML file that can also be hosted on GitHub Pages or any static file host.

## 🛠️ Tech Stack

- Vanilla HTML/CSS/JavaScript (no framework, no build tooling)
- [marked.js](https://marked.js.org/) — Markdown rendering
- [Mermaid.js](https://mermaid.js.org/) — diagram rendering
- Google Fonts (Source Serif 4, Inter, Caveat, Kalam)
- Google Gemini API — answer generation

## 🔒 Privacy

Your Gemini API key and draft content are stored **only in your browser's `localStorage`**. Nothing is sent to any server other than Google's Gemini API when generating answers.

## 📄 License

No license specified — all rights reserved by the author unless stated otherwise.

## 👤 Author

**NIKHIL CHARY SRIRAMOJU**
- GitHub: [@Nikhil-creat](https://github.com/Nikhil-creat)
- LinkedIn: [nikhil-chary-sriramoju](https://in.linkedin.com/in/nikhil-chary-sriramoju-95041b38a)
- Instagram: [@nikhil__sriramoju](https://www.instagram.com/nikhil__sriramoju?stkn=MTFxdDZobmJtb2RoaA==)
