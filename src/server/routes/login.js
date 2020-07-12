const router = require('express').Router();
const { validate } = require('express-validation');

const asyncHandler = require('../middlewares/async-handler');
const { loginValidation } = require('./schema/login');
const userController = require('../../controllers/user');

router.post(
	'/login',
	validate(loginValidation),
	asyncHandler(async (req, res) => {
		const result = await userController.login(req);
		res.cookie('Authorization', result.token, {
			maxAge: 3600000 * userController.sessionDuration,
			httpOnly: true
		});
		res.json(result);
	})
);

module.exports = router;
