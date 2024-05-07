"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = exports.USER_ROLES = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["NORMAL"] = "NORMAL";
    USER_ROLES["ADMIN"] = "ADMIN";
})(USER_ROLES || (exports.USER_ROLES = USER_ROLES = {}));
class TokenManager {
    constructor() {
        this.jwtKey = process.env.JWT_KEY;
        this.jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    }
    createToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.jwtKey, { expiresIn: this.jwtExpiresIn });
    }
    getPayload(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.jwtKey);
        }
        catch (error) {
            console.error("Error verifying token:", error);
            return null;
        }
    }
}
exports.TokenManager = TokenManager;
