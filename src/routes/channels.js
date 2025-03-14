const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE channel
router.post("/", async (req, res) => {
    try {
        const { name, groupId, type } = req.body;
        const result = await pool.query(
            "INSERT INTO channels (name, group_id, type) VALUES ($1, $2, $3) RETURNING *",
            [name, groupId, type]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// READ all channels
router.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM channels");
    res.json(result.rows);
});

// READ single channel
router.get("/:id", async (req, res) => {
    const result = await pool.query("SELECT * FROM channels WHERE id = $1", [req.params.id]);
    res.json(result.rows[0] || { error: "Channel not found" });
});

// UPDATE channel
router.put("/:id", async (req, res) => {
    const { name, type } = req.body;
    const result = await pool.query(
        "UPDATE channels SET name = $1, type = $2 WHERE id = $3 RETURNING *",
        [name, type, req.params.id]
    );
    res.json(result.rows[0] || { error: "Channel not found" });
});

// DELETE channel
router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM channels WHERE id = $1", [req.params.id]);
    res.json({ message: "Channel deleted" });
});

module.exports = router;
