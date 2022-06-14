const sequelize = require('../dataBase/connection');
const path = require('path');
const AesEncryption = require('aes-encryption');
const DbRepo = require('../dataBase/index'); // ../dataBase/index

require('dotenv').config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env'),
});

const registrarUsuario = async (req, res) => {
    const { cui, nombre, usuario, correo, contrasenia } = req.body;

    const sendInvalidCredentials = (mensaje) =>
        res.status(400).send({ errors: [{ msg: mensaje }] });

    if (!cui || !nombre || !usuario || !correo || !contrasenia) {
        return sendInvalidCredentials('Valores Invalidos...');
    }

    const aes = new AesEncryption();
    aes.setSecretKey(process.env.SECRET_KEY);
    const passEncrypted = aes.encrypt(contrasenia);

    // eslint-disable-next-line no-unused-vars
    const [results1, metadata1] = await sequelize.query(
        `select * from Cliente where cui = ${cui} OR usuario = '${usuario}' OR correo = '${correo}';`
    );

    if (results1.length > 0) {
        return sendInvalidCredentials('Valores Invalidos...');
    }

    const db = new DbRepo();
    if (await db.get('usuarios')) {
        db.update('usuarios');
    }

    // eslint-disable-next-line no-unused-vars
    const [results2, metadata2] = await sequelize.query(
        `insert into Cliente(cui, nombre, usuario, correo, contrasenia, fechaInicio)
        values('${cui}', '${nombre}', '${usuario}', '${correo}','${passEncrypted}', now())`
    );

    return res.status(200).send({ values: { msg: 'usuario creado' } });
};

module.exports = registrarUsuario;
