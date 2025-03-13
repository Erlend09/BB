// utils/db.js
const { Pool } = require('pg');

// Henter connection string fra miljøvariabel DATABASE_URL
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  // SSL: for at tilkobling til Render skal fungere riktig
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
