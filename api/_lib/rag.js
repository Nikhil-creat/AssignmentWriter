const fs = require('fs'), path = require('path');
const docs = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'syllabus.json'), 'utf8'));
const tok = s => s.toLowerCase().match(/[a-z0-9]{3,}/g) || [];
// Keyword-overlap retrieval (swap for embeddings + pgvector/Qdrant later)
exports.retrieve = (q, k = 3) => {
  const qt = new Set(tok(q));
  return docs.map(d => ({ d, s: tok(d.title + ' ' + d.text).filter(t => qt.has(t)).length }))
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, k).map(x => x.d);
};
