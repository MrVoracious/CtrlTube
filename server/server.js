const express =  require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy/generate', async (req, res) => {
  try {
    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await ollamaRes.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).json({ error: 'Proxy failed' });
  }
});

app.listen(8080, () => console.log('Proxy running at http://localhost:8080'));