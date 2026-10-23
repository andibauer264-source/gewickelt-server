const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://username:password@cluster.mongodb.net/gewickelt?retryWrites=true&w=majority';

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
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Laden der Beiträge' });
    }
});

app.post('/api/posts', async (req, res) => {
    try {
        const { username, category, content, image, likes, comments } = req.body;
        const newPost = new Post({
            username,
            category,
            content,
            image,
            likes: likes || [],
            comments: comments || []
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Erstellen des Beitrags' });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Beitrag gelöscht' });
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Löschen des Beitrags' });
    }
});

app.post('/api/posts/:id/like', async (req, res) => {
    try {
        const { username } = req.body;
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ error: 'Beitrag nicht gefunden' });
        }

        if (!post.likes) post.likes = [];
        const index = post.likes.indexOf(username);
        if (index > -1) {
            post.likes.splice(index, 1);
        } else {
            post.likes.push(username);
        }

        await post.save();
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Serverfehler beim Liken' });
    }
});

app.post('/api/posts/:id/comment', async (req, res) => {
    try {
        const { username, text, date } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Beitrag nicht gefunden' });
        }

        if (!post.comments) post.comments = [];
        const newComment = { username, text, date: date || new Date().toLocaleString() };
        post.comments.push(newComment);

        await post.save();
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Serverfehler beim Kommentieren' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
