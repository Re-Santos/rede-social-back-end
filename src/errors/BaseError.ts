// export abstract class BaseError extends Error {
//     constructor(
//         public statusCode: number,
//         message: string
//     ) {
//         super(message)
//     }
    
//   } // antes de get all

export abstract class BaseError extends Error {
    constructor(public message: string, public statusCode: number) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  