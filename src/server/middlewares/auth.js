const jwt = require('jsonwebtoken');
const Errors = require('../../errors/index');

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'key123';

const validateToken = (req, res, next) => {
	try {
		let token;

		if (req.header('Authorization')) {
			token = req.header('Authorization').split('Bearer ')[1];
		} else if (req.cookies && req.cookies['Authorization']) {
			token = req.cookies['Authorization'];
		}

		if (!token) {
			throw new Errors.Unauthorized('Empty credentials.');
		}

		const decodedToken = jwt.verify(token, jwtSecretKey);

		req.user = decodedToken;

		next();
	} catch (err) {
		if (err.name === 'JsonWebTokenError') {
			throw new Errors.Unauthorized('Invalid Token.');
		}
		throw err;
	}
};

module.exports = validateToken;
