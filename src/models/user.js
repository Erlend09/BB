const pool = require("../../db");

const User = {
    async create(username, email) {
        try {
            const result = await pool.query(
                "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
                [username, email]
            );
            return result.rows[0];
        } catch (err) {
            console.error("Error creating user:", err);
            throw err;
        }
    },

    async getAll() {
        const result = await pool.query("SELECT * FROM users");
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return { error: "User not found" };
        }
        return result.rows[0];
    },

    async update(id, username, email) {
        const result = await pool.query(
            "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
            [username, email, id]
        );
        return result.rows[0] || { error: "User not found" };
    },

    async delete(id) {
        await pool.query("DELETE FROM users WHERE id = $1", [id]);
        return { message: "User deleted" };
    }
};

module.exports = User;
