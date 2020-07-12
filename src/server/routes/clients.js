const router = require('express').Router();

const clientController = require('../../controllers/client');
const asyncHandler = require('../middlewares/async-handler');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/roles');
const user = require('../../controllers/user');
const { clientId } = require('../../controllers/insurance-api');

router.get(
	'/clients',
	auth,
	checkRole(['user', 'admin']),
	asyncHandler(async (req, res) => {
		const clients = await clientController.getByRole(
			req.user,
			req.query.limit || 10,
			req.query.page || 1
		);
		res.json(clients);
	})
);

router.get(
	'/clients/:id',
	auth,
	checkRole(['user', 'admin']),
	asyncHandler(async (req, res) => {
		let clientId = req.params.id;

		if (user.role === 'user') {
			clientId = user.id;
		}

		const client = await clientController.getById(clientId);
		res.json(client);
	})
);

router.get(
	'/clients/:id/policies',
	auth,
	checkRole(['user', 'admin']),
	asyncHandler(async (req, res) => {
		let clientId = req.params.id;

		if (user.role === 'user') {
			clientId = user.id;
		}

		const client = await clientController.getClientPolicies(clientId);
		res.json(client);
	})
);

module.exports = router;
