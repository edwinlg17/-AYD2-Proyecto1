const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dataBase/connection');

class Cliente extends Model {}

Cliente.init(
    {
        cui: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                len: 13,
            },
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
            },
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        contrasenia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        suscripcion: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        gravatar: {
            type: DataTypes.STRING,
        },
        fechaInicio: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Cliente',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Cliente;
