const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE message
router.post("/", async (req, res) => {
    try {
        const { channelId, senderId, content } = req.body;
        const result = await pool.query(
            "INSERT INTO messages (channel_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *",
            [channelId, senderId, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
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

