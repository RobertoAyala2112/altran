const jwt = require('jsonwebtoken');
const Errors = require('../errors/index');

class User {
	constructor() {
		this.jwtSecretKey = process.env.JWT_SECRET_KEY;
		this.sessionDuration = process.env.SESSION_DURATION;
	}

	async login(data) {
		const user = await this.getUser(data);

		if (!user) {
			throw new Errors.Unauthorized();
		}

		const token = await jwt.sign(user, this.jwtSecretKey, {
			expiresIn: `${this.sessionDuration}h`
		});

		return {
			token,
			type: 'Bearer',
			expires_in: this.sessionDuration * 3600
		};
	}

	async getUser() {
		// Should call user model with credentials to get user from DB or service. Now returns a mock user
		const user = { id: 'a0ece5db-cd14-4f21-812f-966633e7be86', role: 'admin' };
		return user;
	}
}

module.exports = new User();
