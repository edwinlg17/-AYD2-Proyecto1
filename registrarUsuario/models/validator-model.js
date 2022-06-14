const Joi = require('joi');

const validation_cui = {
    'string.base': 'cui is required',
    'string.empty': 'cui is empty',
    'string.min': 'Se necesitan al menos {#limit} caracter',
    'string.max': 'Se necesita a lo mucho {#limit} caracteres',
    'any.required': 'Este valor es requerido',
};

const validation_nombre = {
    'string.base': 'nombre is required',
    'string.empty': 'nombre is empty',
    'string.min': 'Se necesitan al menos {#limit} caracter',
    'string.max': 'Se necesita a lo mucho {#limit} caracteres',
    'any.required': 'Este valor es requerido',
};

const validation_usuario = {
    'string.base': 'cui is required',
    'string.empty': 'cui is empty',
    'string.min': 'Se necesitan al menos {#limit} caracter',
    'string.max': 'Se necesita a lo mucho {#limit} caracteres',
    'any.required': 'Este valor es requerido',
};

const validation_correo = {
    'string.base': 'cui is required',
    'string.empty': 'cui is empty',
    'string.min': 'Se necesitan al menos {#limit} caracter',
    'string.max': 'Se necesita a lo mucho {#limit} caracteres',
    'any.required': 'Este valor es requerido',
};

const validation_contrasenia = {
    'string.base': 'cui is required',
    'string.empty': 'cui is empty',
    'string.min': 'Se necesitan al menos {#limit} caracter',
    'string.max': 'Se necesita a lo mucho {#limit} caracteres',
    'any.required': 'Este valor es requerido',
};

module.exports = Joi.object().keys({
    cui: Joi.string()
        .trim()
        .max(13)
        .min(13)
        .required()
        .messages(validation_cui),
    nombre: Joi.string()
        .trim()
        .max(255)
        .min(1)
        .required()
        .messages(validation_nombre),
    usuario: Joi.string()
        .trim()
        .max(255)
        .min(1)
        .required()
        .messages(validation_usuario),
    correo: Joi.string()
        .trim()
        .email()
        .max(255)
        .min(1)
        .required()
        .messages(validation_correo),
    contrasenia: Joi.string()
        .trim()
        .max(255)
        .min(1)
        .required()
        .messages(validation_contrasenia),
});
