const Joi = require('joi');

const validation_usuario = {
    'string.base': 'usuario is required',
    'string.empty': 'usuario is empty',
    'string.min': 'Se necesitan al menos {#limit} caracter',
    'string.max': 'Se necesita a lo mucho {#limit} caracteres',
    'any.required': 'Este valor es requerido',
};

const validation_contrasenia = {
    'string.base': 'contrasenia is required',
    'string.empty': 'contrasenia is empty',
    'string.min': 'Se necesitan al menos {#limit} caracter',
    'string.max': 'Se necesita a lo mucho {#limit} caracteres',
    'any.required': 'Este valor es requerido',
};

module.exports = Joi.object().keys({
    usuario: Joi.string()
        .trim()
        .max(20)
        .min(1)
        .required()
        .messages(validation_usuario),
    contrasenia: Joi.string()
        .trim()
        .max(200)
        .min(1)
        .required()
        .messages(validation_contrasenia),
});
