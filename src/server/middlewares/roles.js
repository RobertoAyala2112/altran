const Errors = require('../../errors/index');

const checkRole = roles => (req, res, next) => {
	if (req.user && roles.includes(req.user.role)) {
		return next();
	}
	throw new Errors.Unauthorized('Invalid Token.');
};

module.exports = checkRole;
