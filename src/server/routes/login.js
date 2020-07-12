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
		res.json(result);
	})
);

module.exports = router;
