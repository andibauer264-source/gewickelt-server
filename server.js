const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

let posts = [];

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.post('/api/posts', (req, res) => {
    posts.unshift(req.body);
    res.status(201).json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
