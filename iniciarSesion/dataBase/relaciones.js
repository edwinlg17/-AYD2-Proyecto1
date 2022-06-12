const Tarjeta = require('../models/tarjeta');
const Cliente = require('../models/cliente');
const Suscripcion = require('../models/suscripcion');
const Album = require('../models/album');
const Cancion = require('../models/cancion');
const ListaReproduccion = require('../models/listaReproduccion');

const realtionShip = () => {
    Cliente.hasMany(Tarjeta, {
        foreignKey: {
            name: 'cui',
            allowNull: false,
        },
        onDelete: 'CASCADE',
    });

    Tarjeta.belongsTo(Cliente, {
        foreignKey: {
            name: 'cui',
            allowNull: false,
        },
    });

    Suscripcion.hasMany(Cliente, {
        foreignKey: 'idSuscripcion',
    });

    Cliente.belongsTo(Suscripcion, {
        foreignKey: 'idSuscripcion',
    });

    Album.belongsToMany(Cancion, {
        through: 'Cancion_Album',
        uniqueKey: false,
    });

    Cancion.belongsToMany(Album, {
        through: 'Cancion_Album',
        uniqueKey: false,
    });

    Cancion.belongsToMany(ListaReproduccion, {
        through: 'Lista_Cancion',
        uniqueKey: false,
    });

    Cliente.hasMany(ListaReproduccion, {
        onDelete: 'CASCADE',
        foreignKey: {
            name: 'cui',
            allowNull: false,
        },
    });
    ListaReproduccion.belongsTo(Cliente, {
        foreignKey: {
            name: 'cui',
            allowNull: false,
        },
    });

    ListaReproduccion.belongsToMany(Cancion, {
        through: 'Lista_Cancion',
        uniqueKey: false,
    });
};

module.exports = realtionShip;
