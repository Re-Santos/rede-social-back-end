"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
function validateToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization missing' });
    }
    if (!authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Invalid or missing token' });
    }
    next();
}
exports.validateToken = validateToken;
