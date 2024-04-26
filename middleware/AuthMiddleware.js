// middleware/AuthMiddleware.js

const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token)  // If the token is not found "Access is Denied"
        return res.status(401).json({ error: 'Access denied' });
    try {  // Verifying the key of the user
        const decoded = jwt.verify(token, 'this-can-be-any-random-key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;