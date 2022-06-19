const router = require('express').Router();
const validator = require('../middleware/validator');
const iniciarSesion = require('../controller/IniciarSesion.controller');

router.post('/iniciarSesion', [validator], iniciarSesion);

module.exports = router;
