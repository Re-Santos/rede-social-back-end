import { Request, Response, NextFunction } from 'express';
export function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  console.log('Token recebido:', req.headers.authorization);

  if (typeof token !== 'string' || token.trim() === '') {
    return res.status(400).json({ error: 'Token inválido ou ausente' });
  }

  next(); 
}
