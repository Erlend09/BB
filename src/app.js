const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db");
const abTestingMiddleware = require("./middleware/abTestingMiddleware");

dotenv.config(); // Last inn miljøvariabler fra .env

// Sjekk at miljøvariabelen for databasen er satt
if (!process.env.DATABASE_URL) {
    console.error("🚨 FEIL: DATABASE_URL er ikke satt! Sjekk .env-filen.");
    process.exit(1);
}

console.log("✅ KOBLET TIL DATABASE:", process.env.DATABASE_URL);

const app = express();

// Middleware for å håndtere JSON-data og CORS
app.use(express.json());
app.use(cors());

// **Sjekk databaseforbindelse ved oppstart**
(async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log(`✅ Database connection successful! Server time: ${result.rows[0].now}`);
    } catch (err) {
        console.error("❌ Database connection error:", err);
        process.exit(1); // Stopp serveren hvis databasen ikke kobler til
    }
})();

// **Serverer statiske filer fra riktig mappe**
app.use(express.static(path.join(__dirname, "../public")));

// Bruk A/B-testing middleware
app.use(abTestingMiddleware);

// **Importer API-ruter**
const userRoutes = require("./routes/users");
const groupRoutes = require("./routes/groups");
const channelRoutes = require("./routes/channels");
const messageRoutes = require("./routes/messages");

// **Bruk API-rutene**
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/messages", messageRoutes);

// **Database-test for å sjekke at tilkoblingen fungerer**
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "✅ Database connection successful!", time: result.rows[0].now });
    } catch (err) {
        console.error("❌ Database connection error:", err);
        res.status(500).json({ error: "Database connection failed" });
    }
});

// **Skriv ut alle registrerte ruter i terminalen**
console.log("🚀 Available API routes:");
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`🔹 ${r.route.path}`);
    }
});

// **Håndtering av ukjente API-ruter**
app.use("/api/*", (req, res) => {
    res.status(404).json({ error: "❌ API endpoint not found" });
});

// **Rute for å servere index.html**
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// **Generell feilhåndtering**
app.use((req, res) => {
    res.status(404).json({ error: "❌ Resource not found" });
});

// **Start serveren på riktig port**
const PORT = process.env.PORT || 10000; // ⚠️ Bruk riktig port for Render
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT} or Render's live URL`);
});

