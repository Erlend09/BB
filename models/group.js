const pool = require("../db");

const Group = {
    async create(name, ownerId) {
        try {
            const result = await pool.query(
                "INSERT INTO groups (name, owner_id) VALUES ($1, $2) RETURNING *",
                [name, ownerId]
            );
            return result.rows[0];
        } catch (err) {
            console.error("Error creating group:", err);
            throw err;
        }
    },

    async getAll() {
        const result = await pool.query("SELECT * FROM groups");
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query("SELECT * FROM groups WHERE id = $1", [id]);
        return result.rows[0] || { error: "Group not found" };
    },

    async update(id, name) {
        const result = await pool.query(
            "UPDATE groups SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );
        return result.rows[0] || { error: "Group not found" };
    },

    async delete(id) {
        await pool.query("DELETE FROM groups WHERE id = $1", [id]);
        return { message: "Group deleted" };
    }
};

module.exports = Group;
