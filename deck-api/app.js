const express = require('express');
const app = express();
const path = require('path');

// Server statiske filer fra 'public' mappen
app.use(express.static(path.join(__dirname, 'public')));

// Eksempel på en rute for å hente et kort
app.get('/temp/deck/:deck_id/card', (req, res) => {
    const deckId = req.params.deck_id; // Får deck_id fra URL-parametrene
    // Simulere et kort (bytt ut med logikk for å hente kort fra API)
    const card = {
        value: 'Ace',
        suit: 'Spades',
        image: '/images/English_pattern_ace_of_spades.png'  // Bilde som er lagret i 'public/images'
    };

    res.json({ card }); // Sender kortet som JSON-respons
});

// Rute for å servere index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start serveren
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

