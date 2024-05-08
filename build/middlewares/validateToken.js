"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
function validateToken(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split('Bearer ')[1];
    console.log('Token recebido:', req.headers.authorization);
    if (typeof token !== 'string' || token.trim() === '') {
        return res.status(400).json({ error: 'Token inválido ou ausente' });
    }
    next();
}
exports.validateToken = validateToken;
