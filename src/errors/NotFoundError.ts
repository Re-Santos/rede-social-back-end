
// import { BaseError } from "./BaseError";

// export class NotFoundError extends BaseError {
//   constructor(message: string = "Not Found") {
//     super(404, message);
//   }
// }
import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  
 
constructor(resource: string) {
    const message = `Not found: ${resource}`;
    super(message, 404);
  }
}