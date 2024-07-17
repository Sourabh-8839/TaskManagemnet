class ApiError extends Error {
  constructor(
    statusCode,
    message = 'Something went Wrong',
    errors = [],
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

// export default class Util {
//   /**
//    * Creates Util class object.
//    */
//   constructor() {
//     /**
//      * Status code
//      * @type {number}
//      */
//     this.statusCode = null;

//     /**
//      * Status code Type (eg: Success, Not found etc.)
//      * @type {String}
//      */
//     this.type = null;

//     /**
//      * Data
//      * @type {*}
//      */
//     this.data = null;

//     /**
//      * Message
//      * @type {string}
//      */
//     this.message = null;
//   }

//   /**
//    * Setting success
//    * @param {number} statusCode
