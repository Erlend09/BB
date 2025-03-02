const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const abTestingMiddleware = require('./middleware/abTestingMiddleware');

// Middleware for å håndtere JSON-data og CORS
app.use(express.json());
app.use(cors());

// Server alt i public som statiske filer
app.use(express.static(path.join(__dirname, 'public')));


// Bruk A/B-testing, middleware
app.use(abTestingMiddleware);

// Import API-ruter
const userRoutes = require("./routes/users");
const groupRoutes = require("./routes/groups");
const channelRoutes = require("./routes/channels");
const messageRoutes = require("./routes/messages");

// Bruk API-rutene
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/messages", messageRoutes);

// Eksempel på en rute for å hente et kort
app.get('/temp/deck/:deck_id/card', (req, res) => {
    const deckId = req.params.deck_id;

    // Eksempel på hvordan man kan simulere et "deck not found"-scenario
    const decks = {
        '5a9f1f2f3b7c8e163f74': {
            value: 'Ace',
            suit: 'Spades',
            image: '/images/English_pattern_ace_of_spades.png'
        }
    };

    const card = decks[deckId];

    if (!card) {
        // Returnerer 404 hvis kortstokken ikke finnes
        return res.status(404).json({ error: 'Deck not found' });
    }

    // Hvis kortstokken finnes, send kortet som en respons
    res.json({ card });
});

// Rute for A/B-testet API-respons
app.get('/api/response', (req, res) => {
    if (req.abVariant === "A") {
        res.json({ message: "Dette er responsen for variant A" });
    } else {
        res.json({ message: "Dette er responsen for variant B" });
    }
});

// Rute for å "servere" index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404-feilhåndtering for udefinerte ruter
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

// Start serveren
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

