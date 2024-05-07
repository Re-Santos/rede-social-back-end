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
    private jwtKey: string = process.env.JWT_KEY as string;
    private jwtExpiresIn: string = process.env.JWT_EXPIRES_IN as string;

    public createToken(payload: TokenPayload): string {
        return jwt.sign(payload, this.jwtKey, { expiresIn: this.jwtExpiresIn });
    }

    public getPayload(token: string): TokenPayload | null {
        try {
            return jwt.verify(token, this.jwtKey) as TokenPayload;
        } catch (error) {
            console.error("Error verifying token:", error);
            return null;
        }
    }
}
