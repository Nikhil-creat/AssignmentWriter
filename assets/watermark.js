(() => {
  const wrap = document.getElementById('preview-wrap'), side = document.getElementById('sidebar');
  if (!wrap || !side) return;
  const KEY = 'asw-watermark';
  let s = { mode: 'off', text: 'NIKHIL CHARY SRIRAMOJU', opacity: 12, img: '' };
  try { s = { ...s, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch {}

  const layer = document.createElement('div'); layer.className = 'wm-layer'; wrap.appendChild(layer);
  const card = document.createElement('div'); card.className = 'card pro-card';
  card.innerHTML = `<h2>💧 Watermark (your choice)</h2>
    <select id="wm-mode"><option value="off">Off</option><option value="diag">Diagonal text</option>
    <option value="center">Centre text</option><option value="footer">Footer text</option></select>
    <input id="wm-text" type="text" maxlength="40" placeholder="Watermark text">
    <label class="field-label">Opacity <span id="wm-op-v"></span>%</label>
    <input id="wm-op" type="range" min="4" max="40" step="2" style="width:100%;accent-color:#14b8a6">
    <label class="btn btn-ghost" style="text-align:center">🖼 Use a logo image instead<input id="wm-img" type="file" accept="image/png,image/jpeg,image/svg+xml" hidden></label>
    <button class="btn btn-ghost" id="wm-clear-img" type="button">Remove logo</button>
    <div class="status">Shows on screen and on every printed or PDF page.</div>`;
  const anchor = document.querySelectorAll('.pro-card'); (anchor[anchor.length - 1] || side.querySelector('.brand')).after(card);

  const $ = id => document.getElementById(id);
  function paint() {
    layer.className = 'wm-layer' + (s.mode === 'off' ? '' : ' on ' + s.mode);
    layer.style.setProperty('--wm-op', s.opacity / 100);
    layer.textContent = '';
    if (s.img) { const i = document.createElement('img'); i.src = s.img; i.alt = ''; layer.appendChild(i); }
    else { const t = document.createElement('span'); t.textContent = s.text; layer.appendChild(t); }
    $('wm-op-v').textContent = s.opacity;
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  }
  $('wm-mode').value = s.mode; $('wm-text').value = s.text; $('wm-op').value = s.opacity;
  $('wm-mode').onchange = e => { s.mode = e.target.value; paint(); };
  $('wm-text').oninput = e => { s.text = e.target.value; s.img = ''; paint(); };
  $('wm-op').oninput = e => { s.opacity = +e.target.value; paint(); };
  $('wm-clear-img').onclick = () => { s.img = ''; paint(); };
  $('wm-img').onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    if (f.size > 300000) { alert('Logo must be under 300 KB.'); return; }
    const rd = new FileReader();
    rd.onload = () => { s.img = rd.result; if (s.mode === 'off') { s.mode = 'center'; $('wm-mode').value = 'center'; } paint(); };
    rd.readAsDataURL(f);
  };
  paint();
})();
