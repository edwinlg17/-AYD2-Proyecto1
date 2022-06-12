const winston = require('winston');
const path = require('path');

require('dotenv').config({
    path: path.resolve(path.dirname(__dirname), process.env.NODE_ENV + '.env'),
}); //En esta parte obtengo el archivo .env que corresponde.

const { timestamp, combine } = winston.format;

const { LOG_PATH, LOG_LEVEL, SERVICE_NAME, NODE_ENV } = process.env;

const logTransport = new winston.transports.File({
    level: LOG_LEVEL,
    filename: `${LOG_PATH}/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: NODE_ENV === 'dev' ? 1024 * 1024 : 1024,
    maxFiles: 3,
});

const errorTransport = new winston.transports.File({
    level: 'error',
    filename: `${LOG_PATH}/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 1024,
    maxFiles: 3,
});

const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: combine(
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        winston.format.json()
    ),
    defaultMeta: { service: SERVICE_NAME },
    transports: [logTransport, errorTransport],
});

if (process.env.NODE_ENV !== 'prod') {
    logger.add(
        new winston.transports.Console({
            format: combine(
                winston.format.colorize(),
                winston.format.simple(),
                timestamp({ format: 'DD-MM-YYYY HH:mm:ss' })
            ),
        })
    );
}

global.log = logger;

// const winston = require('winston');
// const { timestamp, combine } = winston.format;

// const { LOG_PATH, LOG_LEVEL, SERVICE_NAME } = {
//     LOG_PATH: 'logs',
//     LOG_LEVEL: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
//     SERVICE_NAME: 'auth/inicioSesion',
// };

// const logTransport = new winston.transports.File({
//     level: LOG_LEVEL,
//     filename: `${LOG_PATH}/info.logs`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 1024 * 10,
//     maxFiles: 3,
// });

// const errorTransport = new winston.transports.File({
//     level: LOG_LEVEL,
//     filename: `${LOG_PATH}/error.logs`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 1024 * 10,
//     maxFiles: 3,
// });

// const logger = winston.createLogger({
//     level: LOG_LEVEL,
//     format: combine(timestamp(), winston.format.json()),
//     defaultMeta: { service: SERVICE_NAME },
//     transports: [logTransport, errorTransport],
// });

// if (process.env.NODE_ENV !== 'prod') {
//     logger.add(
//         new winston.transports.Console({
//             format: combine(
//                 winston.format.colorize(),
//                 winston.format.simple(),
//                 timestamp()
//             ),
//         })
//     );
// }

// global.log = logger;
