const express = require("express");
const router = express.Router();
const User = require("../models/user");

let users = []; // Midlertidig lagring

// CREATE user
router.post("/", (req, res) => {
    const { id, username, email } = req.body;
    const user = new User(id, username, email);
    users.push(user);
    res.status(201).json(user);
});

// READ all users
router.get("/", (req, res) => {
    res.json(users);
});

// READ single user
router.get("/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// UPDATE user
router.put("/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, email } = req.body;
    user.username = username || user.username;
    user.email = email || user.email;
    res.json(user);
});

// DELETE user
router.delete("/:id", (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({ message: "User deleted" });
});

module.exports = router;
