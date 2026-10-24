const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Statische Dateien und Root-Route für die App
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gewickelt';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mit MongoDB verbunden');
}).catch(err => {
    console.error('Fehler bei MongoDB-Verbindung:', err);
});

// Schemas & Datenbank-Modelle
const postSchema = new mongoose.Schema({
    username: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String },
    image: { type: String },
    likes: { type: [String], default: [] },
    comments: [{
        username: String,
        text: String,
        date: String
    }],
    date: { type: String, default: () => new Date().toISOString() }
});
const Post = mongoose.model('Post', postSchema);

const chatSchema = new mongoose.Schema({
    username: String,
    text: String,
    time: String,
    date: { type: String, default: () => new Date().toISOString() }
});
const ChatMessage = mongoose.model('ChatMessage', chatSchema);

const messageSchema = new mongoose.Schema({
    from: String,
    to: String,
    text: String,
    time: { type: String, default: () => new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) },
    date: { type: String, default: () => new Date().toISOString() }
});
const DirectMessage = mongoose.model('DirectMessage', messageSchema);

// API-Routen für Beiträge & Kommentare
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/posts/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post nicht gefunden' });
        if (req.body.username) {
            const idx = post.likes.indexOf(req.body.username);
            if (idx > -1) post.likes.splice(idx, 1);
            else post.likes.push(req.body.username);
        }
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/posts/:id/comment', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post nicht gefunden' });
        post.comments.push(req.body);
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API-Routen für den Öffentlichen Chat
app.get('/api/chat', async (req, res) => {
    try {
        const messages = await ChatMessage.find().sort({ date: 1 }).limit(100);
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const msg = new ChatMessage(req.body);
        const saved = await msg.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API-Routen für Direktnachrichten (DMs)
app.get('/api/messages/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const messages = await DirectMessage.find({
            $or: [{ from: username }, { to: username }]
        }).sort({ date: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const msgData = {
            ...req.body,
            time: req.body.time || new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
        };
        const msg = new DirectMessage(msgData);
        const saved = await msg.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
