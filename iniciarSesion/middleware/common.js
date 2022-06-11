const express = require('express');
const morgan = require('morgan');
// const helmet = require('helmet');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors());
    // app.use(helmet());
    app.use(morgan('common', {}));
    app.use(express.json());
};
