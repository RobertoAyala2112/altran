const request = require('supertest');
const app = require('../../app');

jest.mock('jsonwebtoken');
const policyController = require('../../../controllers/policy');
const insuranceApiController = require('../../../controllers/insurance-api');
const mockPolicies = require('../../../controllers/__mocks__/policies');

describe('/api/policies Test Suite', () => {
	test('Should return user policies', async () => {
		insuranceApiController.getPolicies = jest
			.fn()
			.mockResolvedValue(mockPolicies);

		const spy = jest.spyOn(policyController, 'getByRole');

		const response = await request(app)
			.get('/api/policies')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer validToken');

		expect(response.body).toEqual([
			{
				id: '5a72ae47-d077-4f74-9166-56a6577e31b9',
				amountInsured: '751.67',
				email: 'inesblankenship@quotezart.com',
				inceptionDate: '2015-08-05T04:05:01Z',
				installmentPayment: true,
				clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
			}
		]);

		expect(spy).toHaveBeenCalled();
	});
});
