import { Request, Response, NextFunction } from 'express';

export function validateToken(req: Request, res: Response, next: NextFunction) {
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
