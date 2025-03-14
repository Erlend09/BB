const express = require("express");
const router = express.Router();
const pool = require("../db"); // Koble til databasen

// CREATE user
router.post("/", async (req, res) => {
    try {
        const { username, email } = req.body;
        const result = await pool.query(
            "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
            [username, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// READ all users
router.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
});

// READ single user
router.get("/:id", async (req, res) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
    res.json(result.rows[0] || { error: "User not found" });
});

// UPDATE user
router.put("/:id", async (req, res) => {
    const { username, email } = req.body;
    const result = await pool.query(
        "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
        [username, email, req.params.id]
    );
    res.json(result.rows[0] || { error: "User not found" });
});

// DELETE user
router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
    res.json({ message: "User deleted" });
});

module.exports = router;


