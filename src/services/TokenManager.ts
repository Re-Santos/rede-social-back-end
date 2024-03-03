// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// export enum USER_ROLES {
//   NORMAL = 'NORMAL',
//   ADMIN = 'ADMIN',
// }

// export interface TokenPayload {
//   id: string;
//   username: string;
//   role: USER_ROLES;
// }

// export class TokenManager {
//   public createToken = (payload: TokenPayload): string => {
//     const token = jwt.sign(payload, process.env.JWT_KEY as string, {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     });
  
//     return token;
//   }

//   public getPayload = (token: string): TokenPayload | null => {
//     try {
//       console.log("Token gerado:", token);
//       const payload = jwt.verify(token, process.env.JWT_KEY as string) as TokenPayload;
//       console.log("Payload decodificado:", payload);
//       return payload;
//     } catch (error) {
//       if (error instanceof jwt.JsonWebTokenError) {
//         console.error("Error verifying token:", error.message);
//       } else {
//         console.error("Unexpected error verifying token:", error);
//       }
//       return null;
//     }
//   }
// }
// TokenManager.ts

import jwt, { JsonWebTokenError } from 'jsonwebtoken';
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
      // Log para verificar o token recebido
      console.log("Token recebido:", token);

      // Verificar se o token está no formato correto
      if (!token.startsWith("Bearer ")) {
        console.error("Token inválido. Deve começar com 'Bearer '.");
        return null;
      }

      // Extrair o token sem o prefixo 'Bearer '
      const tokenWithoutBearer = token.slice(7);

      // Verificar o token
      const payload = jwt.verify(tokenWithoutBearer, process.env.JWT_KEY as string) as TokenPayload;
      
      // Log para verificar o payload decodificado
      console.log("Token verificado:", payload);

      return payload;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        console.error("Error verifying token:", error.message);
      } else {
        console.error("Unexpected error verifying token:", error);
      }
      return null;
    }
  }
}
