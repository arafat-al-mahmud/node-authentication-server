const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
        
        new (winston.transports.File)({
            filename: 'error.log',
            level: 'error',
            handleExceptions: true,
            humanReadableUnhandledException: true
        }),

        new (winston.transports.File)({
            filename: 'combined.log',
            handleExceptions: true,
            humanReadableUnhandledException: true
        })
    ],
    exitOnError: false
});

//If we're not in production then also log to the `console`
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;