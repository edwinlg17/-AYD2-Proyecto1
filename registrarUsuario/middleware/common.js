const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors());
    app.use(morgan('common', {}));
    app.use(express.json());
};
