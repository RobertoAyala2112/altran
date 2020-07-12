const { code } = require('./symbols');
const HTTPError = require('./http');

/**
 * 	Unauthorized Error
 */

class Forbidden extends HTTPError {
	constructor(message = 'Forbidden') {
		super(message);
		this.message = message;
		this.name = 'Forbidden';
		this[code] = 403;
	}
}

module.exports = Forbidden;
