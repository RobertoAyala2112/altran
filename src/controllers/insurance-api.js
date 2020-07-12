const got = require('got');

class InsuranceApi {
	constructor() {
		this.loginUrl =
			process.env.LOGIN_URL ||
			'https://dare-nodejs-assessment.herokuapp.com/api/login';
		this.clientId = process.env.INSURANCE_API_CLIENT_ID || '';
		this.clientSecret = process.env.INSURANCE_API_CLIENT_SECRET || '';
		this.token = null;
	}

	async login() {
		const { body } = await got.post(this.loginUrl, {
			json: { client_id: this.clientId, client_secret: this.clientSecret },
			responseType: 'json'
		});
		this.token = body.token;
	}
}

module.exports = new InsuranceApi();
