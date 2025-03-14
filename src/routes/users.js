const express = require("express");
const router = express.Router();
const pool = require("../db"); // Koble til databasen

// CREATE user
router.post("/", async (req, res) => {
    try {
        const { username, email } = req.body;

        // Sjekk om brukernavnet allerede eksisterer
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const result = await pool.query(
            "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
            [username, email]
        );
        res.status(201).json({ message: "User added successfully", user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// READ all users
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// READ single user
router.get("/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// UPDATE user
router.put("/:id", async (req, res) => {
    try {
        const { username, email } = req.body;

        // Sjekk om brukeren eksisterer
        const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
        if (userExists.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const result = await pool.query(
            "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
            [username, email, req.params.id]
        );
        res.json({ message: "User updated successfully", user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE user
router.delete("/:id", async (req, res) => {
    try {
        // Sjekk om brukeren eksisterer før sletting
        const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
        if (userExists.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;




