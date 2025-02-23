const express = require("express");
const router = express.Router();
const Message = require("../models/message");

let messages = [];

// CREATE message
router.post("/", (req, res) => {
    const { id, channelId, senderId, content } = req.body;
    const message = new Message(id, channelId, senderId, content);
    messages.push(message);
    res.status(201).json(message);
});

// READ all messages
router.get("/", (req, res) => {
    res.json(messages);
});

// READ messages from a specific channel
router.get("/channel/:channelId", (req, res) => {
    const channelMessages = messages.filter(m => m.channelId == req.params.channelId);
    res.json(channelMessages);
});

// DELETE message
router.delete("/:id", (req, res) => {
    messages = messages.filter(m => m.id != req.params.id);
    res.json({ message: "Message deleted" });
});

module.exports = router;
