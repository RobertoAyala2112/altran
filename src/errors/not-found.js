const { code } = require('./symbols');
const HTTPError = require('./http');

/**
 * 	ResourceNotFound Error
 */

class ResourceNotFound extends HTTPError {
	constructor(message = 'Not found') {
		super(message);
		this.message = message;
		this.name = 'ResourceNotFound';
		this[code] = 404;
	}
}

module.exports = ResourceNotFound;
