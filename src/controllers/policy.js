const insuranceApiController = require('../controllers/insurance-api');

class Policies {
	async getByRole(user, limit, page) {
		const policies = await insuranceApiController.getPolicies();

		if (user.role === 'user') {
			const reduced = policies.filter(policy => policy.clientId === user.id);
			return reduced;
		}

		return policies.slice((page - 1) * limit, page * limit);
	}

	async getById(user, policyId) {
		const policies = await insuranceApiController.getPolicies();

		if (user.role === 'user') {
			const reduced = policies.filter(policy => policy.id === policyId);
			return reduced;
		}

		return policies;
	}

	async getByClient(clientId) {
		const policies = await insuranceApiController.getPolicies();

		const reduced = policies.filter(policy => policy.clientId === clientId);

		return reduced;
	}
}

module.exports = new Policies();
