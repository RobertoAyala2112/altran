const { code } = require('./symbols');
const HTTPError = require('./http');

/**
 * 	Bad Request Error
 */

class BadRequestError extends HTTPError {
	constructor(message = 'bad request') {
		super(message);
		this.message = message;
		this.name = 'BadRequestError';
		this[code] = 400;
	}
}

module.exports = BadRequestError;
