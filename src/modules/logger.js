const logger = require('pino')({
	prettyPrint: process.env.PRETTY_LOGS === '1',
	messageKey: 'message',
	timestamp: () => `,"timestamp":"${new Date().toISOString()}"`
});

module.exports = logger;
