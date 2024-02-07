"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const BaseError_1 = require("./BaseError");
class NotFoundError extends BaseError_1.BaseError {
    constructor(resource) {
        const message = `Not found: ${resource}`;
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
