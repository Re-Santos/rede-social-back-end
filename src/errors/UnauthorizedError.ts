import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(
        message: string = "Token inválido",
        statusCode: number = 401
    ) {
        super(message, statusCode);
    }
}
