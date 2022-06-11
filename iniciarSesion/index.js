const express = require('express');
const middleware = require('./middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const iniciarSesionController = require('./controller/IniciarSesion');

/*------------Middleware------------*/
const createApp = () => {
    const app = express();
    middleware(app);
    app.use('/auth', iniciarSesionController);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    return app;
};

const app = createApp();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = createApp;
