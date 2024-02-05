import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  
 
constructor(resource: string) {
    const message = `Not found: ${resource}`;
    super(message, 404);
  }
}