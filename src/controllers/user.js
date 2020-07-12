const jwt = require('jsonwebtoken');
const Errors = require('../errors/index');

class User {
	constructor() {
		this.jwtSecretKey = process.env.JTW_SECRET_KEY || 'key123';
		this.sessionDuration = process.env.SESSION_DURATION || '3';
	}

	async login(data) {
		const user = await this.getUser(data);

		if (!user) {
			throw new Errors.Unauthorized();
		}

		const token = await jwt.sign({ id: user.id }, this.jwtSecretKey, {
			expiresIn: `${this.sessionDuration}h`
		});

		return {
			token: token,
			type: 'Bearer',
			expires_in: this.sessionDuration * 3600
		};
	}

	async getUser(data) {
		//Call user model with credentials to get user from DB or service
		const user = { id: 1 };
		return user;
	}
}

module.exports = new User();
