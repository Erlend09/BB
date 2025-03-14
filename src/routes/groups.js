const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE group (POST)
router.post("/", async (req, res) => {
    try {
        const { name, description, owner_id } = req.body;

        // Valider at nødvendige felter er tilstede
        if (!name || !owner_id) {
            return res.status(400).json({ error: "Name and owner_id are required" });
        }

        // Sjekk om owner_id finnes i users-tabellen
        const ownerCheck = await pool.query("SELECT * FROM users WHERE id = $1", [owner_id]);
        if (ownerCheck.rows.length === 0) {
            return res.status(400).json({ error: `Invalid owner_id ${owner_id}: User does not exist` });
        }

        // Sett tom beskrivelse hvis den mangler
        const result = await pool.query(
            "INSERT INTO groups (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *",
            [name, description || "", owner_id]
        );

        res.status(201).json({ message: "Group created successfully", group: result.rows[0] });
    } catch (err) {
        console.error("Error creating group:", err);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

// READ all groups (GET)
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM groups");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching groups:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// READ single group (GET)
router.get("/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM groups WHERE id = $1", [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Group not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching group:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// UPDATE group (PUT)
router.put("/:id", async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name && !description) {
            return res.status(400).json({ error: "At least one field (name or description) must be provided" });
        }

        const result = await pool.query(
            "UPDATE groups SET name = COALESCE($1, name), description = COALESCE($2, description) WHERE id = $3 RETURNING *",
            [name, description, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Group not found" });
        }

        res.json({ message: "Group updated successfully", updated_group: result.rows[0] });
    } catch (err) {
        console.error("Error updating group:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE group (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM groups WHERE id = $1 RETURNING *", [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Group not found" });
        }

        res.json({ message: "Group deleted successfully" });
    } catch (err) {
        console.error("Error deleting group:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
