(() => {
  const side = document.getElementById('sidebar'), md = document.getElementById('markdown-input');
  if (!side || !md) return;
  const DAILY = 20, KEY = 'asw-usage', day = new Date().toDateString();
  const used = () => { try { const u = JSON.parse(localStorage.getItem(KEY) || '{}'); return u.d === day ? u.n : 0; } catch { return 0; } };
  const bump = () => { try { localStorage.setItem(KEY, JSON.stringify({ d: day, n: used() + 1 })); } catch {} };
  const card = (html, cls = '') => { const c = document.createElement('div'); c.className = 'card pro-card ' + cls; c.innerHTML = html; return c; };

  const agent = card(`<h2>🤖 Pro Agent · Plan → RAG → Write → Critique</h2>
    <p style="font-size:.7rem;color:#94a3b8;margin-top:-4px">Runs on the server. No API key needed in your browser.</p>
    <textarea id="pro-q" class="q-text" maxlength="600" placeholder="Exam question (max 600 characters)"></textarea>
    <div class="row"><select id="pro-m"><option>10</option><option>16</option><option selected>20</option></select>
    <select id="pro-t"><option value="auto">Auto type</option><option value="theory">Theory</option><option value="program">Programming</option></select></div>
    <div class="row"><select id="pro-p"><option value="auto">Auto: Groq, then Gemini</option><option value="groq">Groq only</option><option value="gemini">Gemini only</option></select></div>
    <div class="toggle-row"><input type="checkbox" id="pro-v"><label for="pro-v">Add 5 viva questions</label></div>
    <button class="btn btn-generate" id="pro-go" type="button">Run agent</button>
    <div class="status" id="pro-s"></div>
    <label class="btn btn-ghost" style="text-align:center">🧠 CNN: detect diagram type<input id="pro-img" type="file" accept="image/*" hidden></label>
    <div class="status" id="pro-c"></div>`);

  const about = card(`<h2>👤 About the builder</h2>
    <div class="pro-h">Nikhil Chary Sriramoju</div>
    <p style="font-size:.72rem;color:#cbd5e1">B.Tech CSE, Vaagdevi College of Engineering (2023–2027)</p>
    <div class="chips"><span class="chip">ML Engineer Intern · Yuva Intern (NSDC)</span><span class="chip">Data Analytics Intern · Thiranex</span></div>
    <div class="chips"><span class="chip">NASSCOM / Skill India: AI-Data Engineering &amp; Cloud</span><span class="chip">IBM SkillsBuild: AI Fundamentals</span><span class="chip">Reliance Foundation: AI/ML Engineer</span></div>
    <div class="chips"><span class="chip">Agentic AI</span><span class="chip">RAG</span><span class="chip">CNN</span><span class="chip">Docker</span><span class="chip">Groq</span></div>`);

  const sec = card(`<h2>🛡 Security &amp; limits</h2><ul>
    <li>API key stays on the server (env var)</li><li>Questions capped at 600 characters</li>
    <li>5 requests/min per IP, ${DAILY}/day per browser</li><li>Question treated as data, not instructions</li>
    <li>CSP + HSTS + no framing headers</li><li>Images max 2 MB, not stored</li></ul>`);

  const brand = side.querySelector('.brand');
  brand.after(agent); agent.after(about); about.after(sec);

  const $ = id => document.getElementById(id), status = $('pro-s');
  $('pro-go').addEventListener('click', async () => {
    const question = $('pro-q').value.trim();
    if (question.length < 5) { status.textContent = 'Enter a question first.'; status.className = 'status error'; return; }
    if (used() >= DAILY) { status.textContent = `Daily limit of ${DAILY} reached. Try tomorrow.`; status.className = 'status error'; return; }
    const btn = $('pro-go'); btn.disabled = true; status.className = 'status';
    status.textContent = 'Agent working: plan, retrieve, write, critique (about 20 to 40 s)…';
    try {
      const r = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, marks: +$('pro-m').value, type: $('pro-t').value, provider: $('pro-p').value, viva: $('pro-v').checked }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Request failed');
      md.value += (md.value.trim() ? '\n\n<div class="page-break"></div>\n\n' : '') + d.markdown;
      md.dispatchEvent(new Event('input', { bubbles: true }));
      bump();
      status.className = 'status ok';
      status.textContent = 'Done via ' + d.provider + '. Grounded on: ' + (d.sources.join(', ') || 'model knowledge only') + ` · ${used()}/${DAILY} today`;
    } catch (e) { status.className = 'status error'; status.textContent = e.message; }
    btn.disabled = false;
  });

  $('pro-img').addEventListener('change', async e => {
    const f = e.target.files[0], out = $('pro-c'); if (!f) return;
    if (f.size > 2e6) { out.textContent = 'Image must be under 2 MB.'; return; }
    const fd = new FormData(); fd.append('file', f); out.textContent = 'Classifying…';
    try {
      const r = await fetch('/api/classify', { method: 'POST', body: fd }), d = await r.json();
      out.textContent = d.label ? `Looks like: ${d.label} (${Math.round(d.confidence * 100)}%)` : (d.note || d.error);
    } catch { out.textContent = 'CNN service unavailable.'; }
  });
})();
