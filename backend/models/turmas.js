const Sequelize = require("sequelize");
const database = require("../config/sequelize");


const turmas = database.define("turmas", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});



module.exports = turmas;
