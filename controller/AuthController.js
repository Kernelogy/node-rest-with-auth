// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) { // If the User is not found in the database
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) { // If the given password doesnot matches 
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // Generating the JSON Web Token (JWT)
        const token = jwt.sign({ 
            userId: user._id,
            username: user.username,
            email: user.email
         }, 'this-can-be-any-random-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get("/users", (req, res) => {
    User.find()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        res.status(401).json({error: "Cannot find Users"})
    })
})

module.exports = router;