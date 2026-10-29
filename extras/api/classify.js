// Forwards an uploaded diagram image to the CNN service (ml-service/). Set ML_URL to enable.
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  if (!process.env.ML_URL) return res.status(501).json({ error: 'CNN service not configured (set ML_URL)' });
  try {
    const r = await fetch(process.env.ML_URL + '/classify', {
      method: 'POST', headers: { 'Content-Type': req.headers['content-type'] }, body: req, duplex: 'half'
    });
    res.status(r.status).json(await r.json());
  } catch { res.status(502).json({ error: 'CNN service unreachable' }); }
};
module.exports.config = { api: { bodyParser: false } };
