document.getElementById('draw-card-btn').addEventListener('click', async () => {
    try {
        // Her er et eksempel på et deck_id. Du kan bytte ut denne med et faktisk ID hvis nødvendig
        const deckId = '5a9f1f2f3b7c8e163f74'; // Bytt ut med et gyldig deck_id
        const response = await fetch(`/temp/deck/${deckId}/card`);

        // Hvis responset ikke er OK (det kan for eksempel være 404 eller 500 feil)
        if (!response.ok) {
            throw new Error('Noe gikk galt med å hente kortet.');
        }

        // Hent kortet fra responsen
        const data = await response.json();
        const card = data.card; // Antar at kortdataen er i 'card'-feltet (sjekk API-responsen)

        // Vis kortet grafisk på nettsiden
        displayCard(card);
    } catch (error) {
        console.error('Feil ved hentingen av kortet:', error);
    }
});

function displayCard(card) {
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = `
        <img src="${card.image}" alt="${card.value} of ${card.suit}" style="width: 80%; height: auto;">
        <p>${card.value} of ${card.suit}</p>
    `;
}
