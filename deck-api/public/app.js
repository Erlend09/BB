document.getElementById('draw-card-btn').addEventListener('click', async () => {
    try {
        const deckId = '5a9f1f2f3b7c8e163f74'; // Eksempel-ID, kan være hvilken som helst
        const response = await fetch(`/temp/deck/${deckId}/card`);

        if (!response.ok) {
            throw new Error('Kortstokken ble ikke funnet!');
        }

        const data = await response.json();
        const card = data.card;

        displayCard(card);
    } catch (error) {
        alert(`Feil: ${error.message}`);  // Vis feilmeldingen i et popup-vindu
        console.error(error);
    }
});

function displayCard(card) {
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = `
        <img src="${card.image}" alt="${card.value} of ${card.suit}" style="width: 80%; height: auto;">
        <p>${card.value} of ${card.suit}</p>
    `;
}
