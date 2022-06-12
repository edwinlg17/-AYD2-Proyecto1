const router = require('express').Router();
const validator = require('../middleware/validator');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

router.post('/iniciarSesion', [validator], (req, res) => {
    const { usuario, contrasenia } = req.body;

    if (!usuario && !contrasenia) {
        return res.status(400);
    }

    return res.status(200).send(`hola ${usuario} mundo`);
});

module.exports = router;
