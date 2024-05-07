"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
function validateToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }
    if (!authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token must start with Bearer' });
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token is missing after Bearer' });
    }
    next();
}
exports.validateToken = validateToken;
