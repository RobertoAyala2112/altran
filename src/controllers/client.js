const insuranceApiController = require('./insurance-api');
const policyController = require('./policy');

class Clients {
	async getByRole(user, limit, page) {
		const clients = await insuranceApiController.getClients();

		if (user.role === 'user') {
			const reduced = clients.filter(client => client.id === user.id);
			return reduced;
		}

		return clients.slice((page - 1) * limit, page * limit);
	}

	async getById(clientId) {
		const clients = await insuranceApiController.getClients();

		const reduced = clients.filter(client => client.id === clientId);

		return reduced[0];
	}

	async getClientPolicies(clientId) {
		const client = await this.getById(clientId);

		const policies = await policyController.getByClient(clientId);

		client.policies = policies;

		return client;
	}
}

module.exports = new Clients();
