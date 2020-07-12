const { ValidationError } = require('express-validation');
const logger = require('../../modules/logger');
const { code } = require('../../errors/symbols');
const { BadRequest, ResourceNotFound } = require('../../errors');

const notFoundHandler = (req, res, next) => next(new ResourceNotFound());

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	// eslint-disable-line no-unused-vars

	logger.error({ err }, `Express Error ${req.originalUrl}`);

	if (err instanceof SyntaxError) {
		// This error is thrown by body-parser middleware
		// When an invalid JSON is posted
		err = new BadRequest('Invalid JSON');
	}

	if (err instanceof ValidationError) {
		return res.status(err.statusCode).json({
			message: err.message,
			data: err.details
		});
	}

	res.status(err[code] || 500).json({
		error: true,
		message: err.message
	});
};

module.exports = [notFoundHandler, errorHandler];
