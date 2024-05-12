// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

function verifyAuth(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = verifyAuth;