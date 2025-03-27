const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')

const tipos_usuarios = database.define('tipos_usuarios', {
    id_tipo: {
        type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,

    },
    nivel: {
        type: Sequelize.STRING,
        AllowNUll: false
    },
}, {
    timestamps: false, // Desativa createdAt e updatedAt
  });

module.exports = tipos_usuarios