const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dataBase/connection');

class Album extends Model {}

Album.init(
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
        imagen: {
            type: DataTypes.STRING,
            defaultValue:
                'https://i.pinimg.com/originals/66/f0/37/66f037d693a7184f580b1e8ed4d5c8cc.jpg',
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Album',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Album;
