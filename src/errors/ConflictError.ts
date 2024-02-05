import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
  
 
constructor(
    message: string = "Já existe um recurso com esse identificador",
    statusCode: number = 409
  ) {
    super(message, statusCode);
  }
}

  
