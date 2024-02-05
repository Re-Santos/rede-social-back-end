export class BaseError extends Error {
  public statusCode: number; // Adicione esta linha

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}