"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const BaseError_1 = require("./BaseError");
class UnauthorizedError extends BaseError_1.BaseError {
    constructor(message = "Token inválido", statusCode = 401) {
        super(message, statusCode);
    }
}
exports.UnauthorizedError = UnauthorizedError;
