const express = require('express');
const middleware = require('./middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const relaciones = require('./dataBase/relaciones');
const path = require('path');

require('./logger/logger');
require('dotenv').config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env'),
});

const iniciarSesionController = require('./routes/iniciarSesion');

/*------------Middleware------------*/
const createApp = () => {
    const app = express();
    middleware(app);
    app.use('/auth', iniciarSesionController);
    app.use('/auth/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    return app;
};

const app = createApp();
const PORT = process.env.PORT || 3000;
relaciones();
app.listen(PORT, () => {
    global.log.info(`API ejecutandose en el puerto ${PORT}`);
});

module.exports = createApp;
