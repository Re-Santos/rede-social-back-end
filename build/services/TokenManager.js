"use strict";
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = exports.USER_ROLES = void 0;
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
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["NORMAL"] = "NORMAL";
    USER_ROLES["ADMIN"] = "ADMIN";
})(USER_ROLES || (exports.USER_ROLES = USER_ROLES = {}));
class TokenManager {
    constructor() {
        this.createToken = (payload) => {
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            return token;
        };
        this.getPayload = (token) => {
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
                const payload = jsonwebtoken_1.default.verify(tokenWithoutBearer, process.env.JWT_KEY);
                // Log para verificar o payload decodificado
                console.log("Token verificado:", payload);
                return payload;
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                    console.error("Error verifying token:", error.message);
                }
                else {
                    console.error("Unexpected error verifying token:", error);
                }
                return null;
            }
        };
    }
}
exports.TokenManager = TokenManager;
