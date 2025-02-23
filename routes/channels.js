const express = require("express");
const router = express.Router();
const Channel = require("../models/channel");

let channels = [];

// CREATE channel
router.post("/", (req, res) => {
    const { id, name, groupId, type } = req.body;
    const channel = new Channel(id, name, groupId, type);
    channels.push(channel);
    res.status(201).json(channel);
});

// READ all channels
router.get("/", (req, res) => {
    res.json(channels);
});

// READ single channel
router.get("/:id", (req, res) => {
    const channel = channels.find(c => c.id == req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.json(channel);
});

// UPDATE channel
router.put("/:id", (req, res) => {
    const channel = channels.find(c => c.id == req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    const { name, type } = req.body;
    channel.name = name || channel.name;
    channel.type = type || channel.type;
    res.json(channel);
});

// DELETE channel
router.delete("/:id", (req, res) => {
    channels = channels.filter(c => c.id != req.params.id);
    res.json({ message: "Channel deleted" });
});

module.exports = router;
