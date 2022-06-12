const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dataBase/connection');

class Cancion extends Model {}

Cancion.init(
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
        artista: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        archivo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING,
            defaultValue: 'https://cdn.wallpapersafari.com/58/8/TDqJjC.jpg',
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Cancion',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Cancion;
