const path = require('path');
require('dotenv').config({
    path: path.resolve(path.dirname(__dirname), process.env.NODE_ENV + '.env'),
});

const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: (msg) => global.log.debug(msg),
});

(async () => {
    try {
        await sequelize.authenticate();
        global.log.debug(`Conexión exitosa a la base de datos`);

        await sequelize.sync();
    } catch (err) {
        global.log.error({
            error: err,
            msg: 'Error al conectarse a la base de datos.',
        });
    }
})();

module.exports = sequelize;
