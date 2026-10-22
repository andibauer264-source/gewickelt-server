const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

let posts = [];
let publicChat = [];
let messages = [];

// Posts Endpunkte
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.post('/api/posts', (req, res) => {
    posts.unshift(req.body);
    res.status(201).json(req.body);
});

// Öffentlicher Chat Endpunkte (GET & POST)
app.get('/api/chat', (req, res) => {
    res.json(publicChat);
});

app.post('/api/chat', (req, res) => {
    const { username, text } = req.body;
    if (text) {
        const newMessage = {
            username: username || 'Anonym',
            text,
            time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
        };
        publicChat.push(newMessage);
        res.status(201).json(newMessage);
    } else {
        res.status(400).json({ error: 'Nachricht ist leer' });
    }
});

// Direktnachrichten Endpunkte
app.get('/api/messages/:username', (req, res) => {
    res.json(messages);
});

app.post('/api/messages', (req, res) => {
    const { from, to, text } = req.body;
    if(text) {
        const newMsg = {
            from,
            to,
            text,
            time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
        };
        messages.push(newMsg);
        res.status(201).json(newMsg);
    } else {
        res.status(400).json({ error: 'Nachricht ist leer' });
    }
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
