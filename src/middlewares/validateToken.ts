import { Request, Response, NextFunction } from 'express';

export function validateToken(req: Request, res: Response, next: NextFunction) {
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
