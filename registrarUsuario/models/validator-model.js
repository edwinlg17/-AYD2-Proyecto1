const Joi = require('joi');

const validation_valor = {
    'string.base': 'valor is required',
    'string.empty': 'valor is empty',
    'string.min': 'Se necesitan al menos {#limit} caracter',
    'string.max': 'Se necesita a lo mucho {#limit} caracteres',
    'any.required': 'Este valor es requerido',
};

module.exports = Joi.object().keys({
    valor: Joi.string()
        .trim()
        .max(20)
        .min(1)
        .required()
        .messages(validation_valor),
});
