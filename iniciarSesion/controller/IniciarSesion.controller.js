const sequelize = require('../dataBase/connection');
const jwt = require('jsonwebtoken');
const path = require('path');
const AesEncryption = require('aes-encryption');

require('dotenv').config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env'),
});

const iniciarSesion = async (req, res) => {
    const { usuario, contrasenia } = req.body;

    const sendInvalidCredentials = (mensaje) =>
        res.status(400).send({ errors: [{ msg: mensaje }] });
    if (!usuario && !contrasenia) {
        return sendInvalidCredentials('Credenciales invalidas');
    }

    // eslint-disable-next-line no-unused-vars
    const [results, metadata] = await sequelize.query(
        `select * from Cliente where usuario = '${usuario}'`
    );

    if (!results.length) {
        return sendInvalidCredentials('Usuario invalido');
    }

    const aes = new AesEncryption();
    aes.setSecretKey(process.env.SECRET_KEY);
    const pass = results[0].contrasenia;
    const passDecrypted = aes.decrypt(pass);

    if (contrasenia != passDecrypted) {
        return sendInvalidCredentials('Contrasenia invalida');
    }

    const payload = {
        cui: results[0].cui,
        nombre: results[0].nombre,
        usuario: results[0].usuario,
        correo: results[0].correo,
        suscripcion: results[0].suscripcion,
        gravatar: results[0].gravatar,
        fechaInicio: results[0].fechaInicio,
        idSuscripcion: results[0].idSuscripcion,
    };

    const JWT_KEY = process.env.JWT_KEY;

    jwt.sign(payload, JWT_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) return sendInvalidCredentials('Error token');
        return res.status(200).send({ values: { token } });
    });
};

module.exports = iniciarSesion;
