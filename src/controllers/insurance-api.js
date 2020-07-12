const got = require('got');
const CacheManager = require('../modules/cache');

const cache = CacheManager.memory('insurance-api');

class InsuranceApi {
	constructor() {
		this.clientId = process.env.INSURANCE_API_CLIENT_ID || 'axa';
		this.clientSecret = process.env.INSURANCE_API_CLIENT_SECRET || 's3cr3t';
	}

	async login() {
		const { body } = await got.post(
			'https://dare-nodejs-assessment.herokuapp.com/api/login',
			{
				json: { client_id: this.clientId, client_secret: this.clientSecret },
				responseType: 'json'
			}
		);

		return body.token;
	}

	async getToken() {
		let token = cache.get('token');
		if (!token) {
			token = await this.login();
			// I sopuse that token expires in 5 minutes
			cache.set('token', token, 5 * 60000);
		}

		return token;
	}

	async getPolicies() {
		const policies = cache.get('policies');

		if (policies) {
			return policies;
		}

		const token = await this.getToken();

		const { body } = await got.get(
			'https://dare-nodejs-assessment.herokuapp.com/api/policies',
			{
				responseType: 'json',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		cache.set('policies', body);

		return body;
	}

	async getClients() {
		const clients = cache.get('clients');

		if (clients) {
			return clients;
		}

		const token = await this.getToken();

		const { body } = await got.get(
			'https://dare-nodejs-assessment.herokuapp.com/api/clients',
			{
				responseType: 'json',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		cache.set('clients', body);

		return body;
	}
}

module.exports = new InsuranceApi();
