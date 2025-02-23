const express = require("express");
const router = express.Router();
const Group = require("../models/group");

let groups = [];

// CREATE group
router.post("/", (req, res) => {
    const { id, name, ownerId } = req.body;
    const group = new Group(id, name, ownerId);
    groups.push(group);
    res.status(201).json(group);
});

// READ all groups
router.get("/", (req, res) => {
    res.json(groups);
});

// READ single group
router.get("/:id", (req, res) => {
    const group = groups.find(g => g.id == req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
});

// UPDATE group
router.put("/:id", (req, res) => {
    const group = groups.find(g => g.id == req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const { name } = req.body;
    group.name = name || group.name;
    res.json(group);
});

// DELETE group
router.delete("/:id", (req, res) => {
    groups = groups.filter(g => g.id != req.params.id);
    res.json({ message: "Group deleted" });
});

module.exports = router;
