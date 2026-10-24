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

// Beispiel-API-Routen
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
