const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Verbindung
const MONGO_URI = process.env.MONGO_URI || 'HIER_DEINE_MONGODB_URL_EINTRAGEN';
const JWT_SECRET = process.env.JWT_SECRET || 'geheimes_jwt_geheimnis_hier';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('✅ Erfolgreich mit MongoDB verbunden!'))
    .catch(err => console.error('❌ Fehler bei der MongoDB-Verbindung:', err));

    // Beispiel-Schema für User (inkl. Passwort-Verschlüsselung)
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
        });

        const User = mongoose.model('User', userSchema);

        // Registrierungs-Route mit Passwort-Hashing
        app.post('/api/register', async (req, res) => {
          try {
              const { username, password } = req.body;
                  const hashedPassword = await bcrypt.hash(password, 10);
                      const newUser = new User({ username, password: hashedPassword });
                          await newUser.save();
                              res.status(201).json({ message: 'User erfolgreich registriert!' });
                                } catch (err) {
                                    res.status(500).json({ error: 'Fehler bei der Registrierung' });
                                      }
                                      });

                                      // Test-Route
                                      app.get('/', (req, res) => {
                                        res.send('Gewickelt Server (mit erweiterten Features) läuft!');
                                        });

                                        // Port festlegen
                                        const PORT = process.env.PORT || 3000;
                                        app.listen(PORT, () => {
                                          console.log(`🚀 Server läuft auf Port ${PORT}`);
                                          });
            