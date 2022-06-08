const express = require('express');
const middleware = require('./middleware');

/*------------Middleware------------*/
const createApp = () => {
    const app = express();
    middleware(app);

    return app;
};

const app = createApp();
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = createApp;
