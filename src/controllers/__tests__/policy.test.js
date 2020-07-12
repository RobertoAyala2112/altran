const policiyController = require('../policy');
const insuranceApiController = require('../insurance-api');
const mockPolicies = require('../__mocks__/policies');

describe('Policy Controller Test Suite', () => {
	test('getByRole() Should return user policies', async () => {
		const mockUser = {
			id: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
			role: 'user'
		};

		insuranceApiController.getPolicies = jest
			.fn()
			.mockResolvedValue(mockPolicies);

		const policies = await policiyController.getByRole(mockUser);

		expect(policies).toEqual([
			{
				id: '5a72ae47-d077-4f74-9166-56a6577e31b9',
				amountInsured: '751.67',
				email: 'inesblankenship@quotezart.com',
				inceptionDate: '2015-08-05T04:05:01Z',
				installmentPayment: true,
				clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
			}
		]);
	});
});
