const customErrors = require('./statusCodes');

module.exports = class HttpError extends Error {
  constructor (status, message) {
    super(message || status ? customErrors[status] : customErrors[500]);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = status || 500;
  }
};