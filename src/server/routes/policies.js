const router = require('express').Router();

const policyController = require('../../controllers/policy');
const asyncHandler = require('../middlewares/async-handler');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/roles');

router.get(
	'/policies',
	auth,
	checkRole(['user', 'admin']),
	asyncHandler(async (req, res) => {
		const policies = await policyController.getByRole(
			req.user,
			req.param.limit || 10
		);
		res.json(policies);
	})
);

module.exports = router;
