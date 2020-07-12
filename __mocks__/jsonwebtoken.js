const Errors = require('../src/errors/index');

const jsonwebtoken = {
	verify(token) {
		if (token === 'invalidToken') {
			throw new Errors.Unauthorized('Invalid Token.');
		}
		return {
			id: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
			role: 'user'
		};
	},
	sign() {
		return 'mock123';
	}
};

module.exports = jsonwebtoken;
