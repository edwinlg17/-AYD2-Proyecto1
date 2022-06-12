const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dataBase/connection');

class ListaReproduccion extends Model {}

ListaReproduccion.init(
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
    },
    {
        sequelize: sequelize,
        modelName: 'Lista_Reproduccion',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = ListaReproduccion;
