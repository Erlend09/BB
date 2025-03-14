const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE message (POST)
router.post("/", async (req, res) => {
    try {
        const { user_id, channel_id, content } = req.body;  
        
        if (!user_id || !channel_id || !content) {
            return res.status(400).json({ error: "user_id, channel_id, and content are required" });
        }

        const result = await pool.query(
            "INSERT INTO messages (channel_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
            [channel_id, user_id, content]
        );

        res.status(201).json({ message: "Message added successfully", message_data: result.rows[0] });
    } catch (err) {
        console.error("Error creating message:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// READ all messages (GET)
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM messages");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// READ messages from a specific channel (GET)
router.get("/channel/:channelId", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM messages WHERE channel_id = $1", [req.params.channelId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No messages found for this channel" });
        }

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching messages for channel:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// UPDATE message (PUT)
router.put("/:id", async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: "Content is required for update" });
        }

        const result = await pool.query(
            "UPDATE messages SET content = $1 WHERE id = $2 RETURNING *",
            [content, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.json({ message: "Message updated successfully", updated_message: result.rows[0] });
    } catch (err) {
        console.error("Error updating message:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE message (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM messages WHERE id = $1 RETURNING *", [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.json({ message: "Message deleted successfully" });
    } catch (err) {
        console.error("Error deleting message:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

