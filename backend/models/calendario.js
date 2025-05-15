const Sequelize = require("sequelize");
const database = require('../config/sequelize');


const Calendario = database.define('Calendario', {
    id_calendario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    data: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    evento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horario: {
        type: Sequelize.TIME,
        allowNull: false
    }
}, {
    tableName: 'calendario',
    timestamps: false, // Desativa createdAt e updatedAt
});

module.exports = Calendario;
