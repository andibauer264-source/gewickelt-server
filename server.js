const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

let posts = [];
let publicChat = [];
let messages = [];
let activeUsers = {}; // Speichert die Zeitstempel der aktiven Benutzer

// Posts Endpunkte
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.post('/api/posts', (req, res) => {
    const newPost = {
        id: req.body.id || Date.now(),
        username: req.body.username || 'Anonym',
        category: req.body.category || 'Allgemein',
        content: req.body.content || '',
        image: req.body.image || null,
        likes: 0,
        likedBy: [],
        comments: []
    };
    posts.unshift(newPost);
    res.status(201).json(newPost);
});

// Like Endpunkt
app.post('/api/posts/:id/like', (req, res) => {
    const postId = Number(req.params.id);
    const { username } = req.body;
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (!post.likedBy) post.likedBy = [];
        const index = post.likedBy.indexOf(username);
        if (index > -1) {
            post.likedBy.splice(index, 1);
            post.likes = Math.max(0, (post.likes || 1) - 1);
        } else {
            post.likedBy.push(username);
            post.likes = (post.likes || 0) + 1;
        }
        res.json(post);
    } else {
        res.status(404).json({ error: 'Beitrag nicht gefunden' });
    }
});

// Kommentar Endpunkt
app.post('/api/posts/:id/comments', (req, res) => {
    const postId = Number(req.params.id);
    const { username, text } = req.body;
    const post = posts.find(p => p.id === postId);
    if (post && text) {
        if (!post.comments) post.comments = [];
        const newComment = {
            username: username || 'Anonym',
            text,
            time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
        };
        post.comments.push(newComment);
        res.status(201).json(newComment);
    } else {
        res.status(404).json({ error: 'Beitrag nicht gefunden' });
    }
});

// LIVE ONLINE STATUS ENDPUNKTE
app.post('/api/ping', (req, res) => {
    const { username } = req.body;
    if (username) {
        activeUsers[username.toLowerCase()] = Date.now();
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'Benutzername fehlt' });
    }
});

app.get('/api/status', (req, res) => {
    const now = Date.now();
    const onlineMap = {};
    for (const [username, timestamp] of Object.entries(activeUsers)) {
        if (now - timestamp < 45000) { // Aktiv in den letzten 45 Sek. = Online
            onlineMap[username] = true;
        }
    }
    res.json(onlineMap);
});

// Öffentlicher Chat
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
        res.status(400).json({ error: 'Nachricht leer' });
    }
});

// Direktnachrichten
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
        res.status(400).json({ error: 'Nachricht leer' });
    }
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
