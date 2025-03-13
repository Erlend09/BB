const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let decks = {}; // Lagrer kortstokker i minnet

// Opprett en ny kortstokk
router.post('/', (req, res) => {
  const deckId = uuidv4(); // Genererer en unik ID for kortstokken
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

  const cards = [];
  for (const suit of suits) {
    for (const value of values) {
      cards.push({ suit, value });
    }
  }

  decks[deckId] = { cards }; // Lagre kortstokken i minnet
  res.status(201).json({ deck_id: deckId });
});

// Stokk en kortstokk
router.patch('/shuffle/:deck_id', (req, res) => {
  const { deck_id } = req.params;
  const deck = decks[deck_id];
  if (!deck) {
    return res.status(404).send('Deck not found.');
  }

  // Fisher-Yates Shuffle algoritme
  for (let i = deck.cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck.cards[i], deck.cards[j]] = [deck.cards[j], deck.cards[i]];
  }

  res.status(200).send('Deck shuffled.');
});

// Hent hele kortstokken
router.get('/:deck_id', (req, res) => {
  const { deck_id } = req.params;
  const deck = decks[deck_id];
  if (!deck) {
    return res.status(404).send('Deck not found.');
  }

  res.json(deck.cards);
});

// Trekk et tilfeldig kort
router.get('/:deck_id/card', (req, res) => {
  const { deck_id } = req.params;
  const deck = decks[deck_id];
  if (!deck) {
    return res.status(404).send('Deck not found.');
  }

  if (deck.cards.length === 0) {
    return res.status(400).send('No cards left in the deck.');
  }

  const card = deck.cards.pop(); // Fjern og returner et kort
  res.json(card);
});

module.exports = router;

