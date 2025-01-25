const express = require('express');
const app = express();
const path = require('path');

// Server statiske filer fra 'public' mappen
app.use(express.static(path.join(__dirname, 'public')));

// Eksempel på en rute for å hente et kort
app.get('/temp/deck/:deck_id/card', (req, res) => {
    const deckId = req.params.deck_id;
    
    // Eksempel på hvordan du kan simulere et "deck not found"-scenario
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

    // Hvis kortstokken finnes, send kortet som respons
    res.json({ card });
});

// Rute for å servere index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404-feilhåndtering for udefinerte ruter
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

// Start serveren
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


