const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE group
router.post("/", async (req, res) => {
    try {
        const { name, ownerId } = req.body;
        const result = await pool.query(
            "INSERT INTO groups (name, owner_id) VALUES ($1, $2) RETURNING *",
            [name, ownerId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// READ all groups
router.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM groups");
    res.json(result.rows);
});

// READ single group
router.get("/:id", async (req, res) => {
    const result = await pool.query("SELECT * FROM groups WHERE id = $1", [req.params.id]);
    res.json(result.rows[0] || { error: "Group not found" });
});

// UPDATE group
router.put("/:id", async (req, res) => {
    const { name } = req.body;
    const result = await pool.query(
        "UPDATE groups SET name = $1 WHERE id = $2 RETURNING *",
        [name, req.params.id]
    );
    res.json(result.rows[0] || { error: "Group not found" });
});

// DELETE group
router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM groups WHERE id = $1", [req.params.id]);
    res.json({ message: "Group deleted" });
});

module.exports = router;
