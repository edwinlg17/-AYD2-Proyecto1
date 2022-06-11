const model = require('../models/validator-model');
const validate = (data) => model.validate(data);
// const cleanString = (str) => str.replace(/"/g, '');

module.exports = (req, res, next) => {
    const data = req.body;
    //global.log.debug(`Validating data: ${JSON.stringify(data)}`);
    const validationResult = validate(data);
    if (validationResult.error) {
        //const message = cleanString(validationResult.error.message);
        //global.log.error({ ...validationResult.error });
        return res.status(400).send({ ...validationResult.error });
    }
    next();
};
