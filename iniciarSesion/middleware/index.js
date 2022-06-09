const commonMiddleware = require('./common');

const addMiddleware = (app) => {
    commonMiddleware(app);
};

module.exports = addMiddleware;
