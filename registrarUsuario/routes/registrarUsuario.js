const router = require('express').Router();
const validator = require('../middleware/validator');
const registrarUsuario = require('../controller/registrarUsuario.controller');

router.post('/registrarUsuario', [validator], registrarUsuario);
// router.post('/registrarUsuario', registrarUsuario);

module.exports = router;
