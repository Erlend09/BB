const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db");
const abTestingMiddleware = require("./middleware/abTestingMiddleware");

dotenv.config(); // Last inn miljøvariabler fra .env

// Sjekk at miljøvariabelen for databasen er satt
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL er ikke satt! Sjekk .env-filen.");
    process.exit(1);
}

console.log("Connected to database:", process.env.DATABASE_URL);

const app = express();

// Middleware for å håndtere JSON-data og CORS
app.use(express.json());
app.use(cors());

// **Sjekk databaseforbindelse ved oppstart**
(async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log(`Database connection successful! Server time: ${result.rows[0].now}`);
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1); // Stopp serveren hvis databasen ikke kobler til
    }
})();

// Serverer statiske filer fra riktig mappe (Render-problemfikser)
app.use(express.static(path.join(__dirname, "../public")));

// Bruk A/B-testing middleware
app.use(abTestingMiddleware);

// **Importer API-ruter**
const userRoutes = require("./routes/users");
let groupRoutes, channelRoutes, messageRoutes;

try {
    groupRoutes = require("./routes/groups");
    console.log("Groups route loaded");
} catch (err) {
    console.error("Feil: `routes/groups.js` mangler eller har feil!");
}

try {
    channelRoutes = require("./routes/channels");
    console.log("Channels route loaded");
} catch (err) {
    console.error("Feil: `routes/channels.js` mangler eller har feil!");
}

try {
    messageRoutes = require("./routes/messages");
    console.log("Messages route loaded");
} catch (err) {
    console.error("Feil: `routes/messages.js` mangler eller har feil!");
}

// **Bruk API-rutene**
app.use("/api/users", userRoutes);
if (groupRoutes) {
    app.use("/api/groups", groupRoutes);
} else {
    console.error("Advarsel: `/api/groups` er ikke aktivert!");
}
if (channelRoutes) {
    app.use("/api/channels", channelRoutes);
} else {
    console.error("Advarsel: `/api/channels` er ikke aktivert!");
}
if (messageRoutes) {
    app.use("/api/messages", messageRoutes);
} else {
    console.error("Advarsel: `/api/messages` er ikke aktivert!");
}

// **Håndter ukjente API-ruter**
app.use("/api/*", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
});

// **Rute for å servere index.html korrekt**
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// **Håndtering av statiske filer som ikke finnes**
app.use((req, res, next) => {
    if (req.path.startsWith("/public/")) {
        return res.status(404).send("Static file not found");
    }
    next();
});

// **Generell 404-feilhåndtering**
app.use((req, res) => {
    res.status(404).json({ error: "Resource not found" });
});

// **Database-test for å sjekke at tilkoblingen fungerer**
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Database connection successful!", time: result.rows[0].now });
    } catch (err) {
        console.error("Database connection error:", err);
        res.status(500).json({ error: "Database connection failed" });
    }
});

// **Skriv ut alle registrerte ruter i terminalen**
console.log("Available API routes:");
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`${r.route.path}`);
    }
});

// **Start serveren**
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
