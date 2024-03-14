"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const BaseError_1 = require("./BaseError");
class InternalServerError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 500);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
exports.InternalServerError = InternalServerError;
