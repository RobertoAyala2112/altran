const got = require('got');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const CacheManager = require('../modules/cache');

const cache = CacheManager.memory('insurance-api');

class InsuranceApi {
	constructor() {
		this.clientId = process.env.INSURANCE_API_CLIENT_ID;
		this.clientSecret = process.env.INSURANCE_API_CLIENT_SECRET;
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

			const { exp } = jwt.decode(token);

			const cacheExpires = moment().diff(exp, 'milliseconds');

			cache.set('token', token, cacheExpires);
		}

		return token;
	}

	async getPolicies() {
		const fromCache = cache.get('policies');

		let lastVersion;
		if (fromCache) {
			lastVersion = fromCache.lastVersion;
		}

		const token = await this.getToken();

		const response = await got.get(
			'https://dare-nodejs-assessment.herokuapp.com/api/policies',
			{
				responseType: 'json',
				headers: {
					Authorization: `Bearer ${token}`,
					'If-None-Match': lastVersion
				}
			}
		);

		if (response.statusCode === 200) {
			const responseExpires = moment(response.headers.expires).unix();
			const cacheExpires = moment().diff(responseExpires, 'milliseconds');

			cache.set(
				'policies',
				{ lastVersion: response.headers.etag, body: response.body },
				cacheExpires
			);

			return response.body;
		}

		return fromCache.body;
	}

	async getClients() {
		const fromCache = cache.get('clients');

		let lastVersion;
		if (fromCache) {
			lastVersion = fromCache.lastVersion;
		}

		const token = await this.getToken();

		const response = await got.get(
			'https://dare-nodejs-assessment.herokuapp.com/api/clients',
			{
				responseType: 'json',
				headers: {
					Authorization: `Bearer ${token}`,
					'If-None-Match': lastVersion
				}
			}
		);

		if (response.statusCode === 200) {
			const responseExpires = moment(response.headers.expires).unix();
			const cacheExpires = moment().diff(responseExpires, 'milliseconds');

			cache.set(
				'clients',
				{ lastVersion: response.headers.etag, body: response.body },
				cacheExpires
			);

			return response.body;
		}

		return fromCache.body;
	}
}

module.exports = new InsuranceApi();
