const pool = require("../db");

const Message = {
    async create(channelId, senderId, content) {
        try {
            const result = await pool.query(
                "INSERT INTO messages (channel_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
                [channelId, userId, content]
            );
            return result.rows[0];
        } catch (err) {
            console.error("Error creating message:", err);
            throw err;
        }
    },

    async getAll() {
        const result = await pool.query("SELECT * FROM messages");
        return result.rows;
    },

    async getByChannel(channelId) {
        const result = await pool.query("SELECT * FROM messages WHERE channel_id = $1", [channelId]);
        return result.rows.length ? result.rows : { error: "No messages found for this channel" };
    },

    async delete(id) {
        await pool.query("DELETE FROM messages WHERE id = $1", [id]);
        return { message: "Message deleted" };
    }
};

module.exports = Message;

