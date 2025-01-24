const express = require('express');
const app = express();
const routes = require('./routes/deckRoutes'); // Importer rutene fra routes-mappen

app.use(express.json()); // For å lese JSON i forespørsler

// Bruk rutene fra routes-mappen
app.use('/temp/deck', routes);

// Start serveren
const PORT = 3000; // Du kan endre porten hvis nødvendig
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
