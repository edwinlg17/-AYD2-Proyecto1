const router = require('express').Router();
const validator = require('../middleware/validator');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

router.post('/registrarUsuario', [validator], (req, res) => {
    const { valor } = req.body;

    if (!valor) {
        return res.status(400);
    }

    return res.status(200).send(`hola ${valor} mundo`);
});

module.exports = router;