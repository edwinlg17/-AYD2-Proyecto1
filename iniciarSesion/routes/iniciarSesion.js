const router = require('express').Router();
const validator = require('../middleware/validator');
const iniciarSesion = require('../controller/IniciarSesion.controller');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

router.post('/iniciarSesion', [validator], iniciarSesion);

module.exports = router;
