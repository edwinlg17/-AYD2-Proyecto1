const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dataBase/connection');

class Tarjeta extends Model {}

Tarjeta.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cvv: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fechaExpiracion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        saldo: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Tarjeta',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Tarjeta;
