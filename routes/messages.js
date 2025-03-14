const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE message
router.post("/", async (req, res) => {
    try {
        const { channelId, userId, content } = req.body;  // Bruk userId i stedet for senderId
        const result = await pool.query(
            "INSERT INTO messages (channel_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
            [channelId, userId, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating message:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// READ all messages
router.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM messages");
    res.json(result.rows);
});

// READ messages from a specific channel
router.get("/channel/:channelId", async (req, res) => {
    const result = await pool.query("SELECT * FROM messages WHERE channel_id = $1", [req.params.channelId]);
    res.json(result.rows);
});

// DELETE message
router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM messages WHERE id = $1", [req.params.id]);
    res.json({ message: "Message deleted" });
});

module.exports = router;

