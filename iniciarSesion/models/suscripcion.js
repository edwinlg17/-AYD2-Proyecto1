const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dataBase/connection');

class Suscripcion extends Model {}

Suscripcion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        costo: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            defaultValue: 9.99,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Suscripcion',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Suscripcion;
