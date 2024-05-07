import { Request, Response, NextFunction } from 'express';

export function validateToken(req: Request, res: Response, next: NextFunction) {
    // Debug: Log de todos os cabeçalhos recebidos
    console.log('Received headers:', req.headers);

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        console.error('Authorization header missing.');
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    if (!authorizationHeader.startsWith('Bearer ')) {
        console.error('Incorrect authorization format. Bearer token expected.');
        return res.status(401).json({ error: 'Authorization must start with Bearer' });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        console.error('Token is missing after Bearer.');
        return res.status(401).json({ error: 'Token is missing after Bearer' });
    }

    next();
}
