const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Erlaubt auch größere Bilder im Base64-Format

// MongoDB Verbindung (nutzt deine Render Environment Variable MONGODB_URI)
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gewickelt';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Verbunden mit MongoDB');
}).catch(err => {
    console.error('❌ MongoDB Verbindungsfehler:', err);
});

// --- DATENBANK SCHEMAS & MODELLE ---

// 1. Beiträge Schema (mit Likes & Kommentaren)
const postSchema = new mongoose.Schema({
    username: String,
    category: String,
    content: String,
    image: String,
    likes: [String],
    comments: [{
        username: String,
        text: String,
        date: String
    }],
    createdAt: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', postSchema);

// 2. Öffentlicher Chat Schema
const chatSchema = new mongoose.Schema({
    username: String,
    text: String,
    time: String,
    createdAt: { type: Date, default: Date.now }
});
const ChatMessage = mongoose.model('ChatMessage', chatSchema);

// 3. Direktnachrichten (DM) Schema
const messageSchema = new mongoose.Schema({
    from: String,
    to: String,
    text: String,
    time: String,
    createdAt: { type: Date, default: Date.now }
});
const DirectMessage = mongoose.model('DirectMessage', messageSchema);

// 4. Gruppen Schema
const groupSchema = new mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    isPrivate: Boolean,
    members: [String],
    rules: String,
    posts: [{
        username: String,
        text: String,
        date: String
    }]
});
const Group = mongoose.model('Group', groupSchema);


// --- API ROUTEN ---

// Beiträge abrufen
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Laden der Beiträge' });
    }
});

// Neuen Beitrag erstellen
app.post('/api/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Erstellen des Beitrags' });
    }
});

// Beitrag löschen
app.delete('/api/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Löschen' });
    }
});

// Öffentlichen Chat abrufen
app.get('/api/chat', async (req, res) => {
    try {
        const messages = await ChatMessage.find().sort({ createdAt: 1 }).limit(100);
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Laden des Chats' });
    }
});

// Öffentliche Nachricht senden
app.post('/api/chat', async (req, res) => {
    try {
        const msg = new ChatMessage(req.body);
        await msg.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Senden der Nachricht' });
    }
});

// Direktnachrichten abrufen (für einen Nutzer)
app.get('/api/messages/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const messages = await DirectMessage.find({
            $or: [{ from: username }, { to: username }]
        }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Laden der DMs' });
    }
});

// Direktnachricht senden
app.post('/api/messages', async (req, res) => {
    try {
        const dm = new DirectMessage({
            ...req.body,
            time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
        });
        await dm.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Senden der DM' });
    }
});

// Gruppen abrufen
app.get('/api/groups', async (req, res) => {
    try {
        let groups = await Group.find();
        if (groups.length === 0) {
            // Standardgruppen anlegen, falls leer
            const defaultGroups = [
                { id: 1, name: '👑 FLR & Keyholder Austausch', members: ['Admin', 'Keyholder_Lady'], desc: 'Erfahrungsaustausch rund um Feminin Led Relationships.', isPrivate: false, rules: 'Respektvoller Umgang, Vertraulichkeit.', posts: [] },
                { id: 2, name: '🔒 Keuschheit & Disziplin', members: ['Admin'], desc: 'Tipps, Motivation und Berichte aus dem Keuschheits-Alltag.', isPrivate: false, rules: 'Keine ungefragten Ratschläge.', posts: [] },
                { id: 3, name: '👶 ABDL Pflege & Erziehung', members: ['Admin'], desc: 'Gemeinschaft für den ABDL Lifestyle und Windel-Disziplin.', isPrivate: false, rules: 'Sicherer Raum (18+).', posts: [] }
            ];
            await Group.insertMany(defaultGroups);
            groups = await Group.find();
        }
        res.json(groups);
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Laden der Gruppen' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf Port ${PORT}`);
});
