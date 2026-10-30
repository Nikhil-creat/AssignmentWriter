// Bump V on every deploy so visitors get fresh files.
const V = 'sheetstudio-v5';
const SHELL = ['./', 'index.html', 'studio.html', 'assets/pro.js', 'assets/pro.css', 'assets/watermark.js', 'data/syllabus.json', 'data/questions.json', 'favicon.svg', 'manifest.webmanifest'];
const CDN = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); // API calls (Groq, Gemini) are never cached
  if (u.origin !== location.origin && !CDN.includes(u.hostname)) return;
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(res => { if (res.ok && (res.type === 'basic' || res.type === 'cors')) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
