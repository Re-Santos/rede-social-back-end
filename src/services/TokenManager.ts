import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export enum USER_ROLES {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}

export interface TokenPayload {
  id: string;
  username: string;
  role: USER_ROLES;
}

export class TokenManager {
  public createToken = (payload: TokenPayload): string => {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  
    return token;
  }

  public getPayload = (token: string): TokenPayload | null => {
    try {
      console.log("Token gerado:", token);
      const payload = jwt.verify(token, process.env.JWT_KEY as string);
      return payload as TokenPayload;
    } catch (error) {
      console.error("Error verifying token:", error);
      console.log("Payload decodificado:", this.getPayload);
      return null;
    }
  }
}
