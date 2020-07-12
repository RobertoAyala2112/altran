const insuranceApiController = require('../controllers/insurance-api');

class Policies {
	async getByRole(user, limit) {
		const policies = await insuranceApiController.getPolicies();

		if (user.role === 'user') {
			const reduced = policies.filter(policy => policy.clientId === user.id);
			return reduced;
		}

		return policies;
	}
}

module.exports = new Policies();
