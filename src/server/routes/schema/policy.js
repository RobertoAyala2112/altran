const { Joi } = require('express-validation');

const policyByIdValidation = {
	params: Joi.object({ id: Joi.string().required() })
};

module.exports = { policyByIdValidation };
