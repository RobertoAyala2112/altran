const { code } = require('./symbols');
const HTTPError = require('./http');

/**
 * 	Unauthorized Error
 */

class Unauthorized extends HTTPError {
	constructor(message = 'Unauthorized') {
		super(message);
		this.message = message;
		this.name = 'Unauthorized';
		this[code] = 401;
	}
}

module.exports = Unauthorized;
