const pool = require("../db");

const Channel = {
    async create(name, groupId, type = "text") {
        try {
            const result = await pool.query(
                "INSERT INTO channels (name, group_id, type) VALUES ($1, $2, $3) RETURNING *",
                [name, groupId, type]
            );
            return result.rows[0];
        } catch (err) {
            console.error("Error creating channel:", err);
            throw err;
        }
    },

    async getAll() {
        const result = await pool.query("SELECT * FROM channels");
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query("SELECT * FROM channels WHERE id = $1", [id]);
        return result.rows[0] || { error: "Channel not found" };
    },

    async update(id, name, type) {
        const result = await pool.query(
            "UPDATE channels SET name = $1, type = $2 WHERE id = $3 RETURNING *",
            [name, type, id]
        );
        return result.rows[0] || { error: "Channel not found" };
    },

    async delete(id) {
        await pool.query("DELETE FROM channels WHERE id = $1", [id]);
        return { message: "Channel deleted" };
    }
};

module.exports = Channel;


