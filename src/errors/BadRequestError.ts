// import { BaseError } from "./BaseError";

// export class BadRequestError extends BaseError {
//     constructor(
//         message: string = "Requisição inválida"
//     ) {
//         super(400, message)
//     }
// }// antes de get all

import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}
