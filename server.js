// Docker/local runtime: serves the static app and mounts the same handlers Vercel uses.
const express = require('express');
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.post('/api/generate', require('./api/generate'));
app.post('/api/classify', require('./api/classify'));
app.use('/assets', express.static('assets'));
app.get('/', (_, res) => res.sendFile(__dirname + '/index.html'));
app.listen(3000, () => console.log('http://localhost:3000'));
