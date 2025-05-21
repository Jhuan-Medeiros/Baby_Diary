const Sequelize = require("sequelize");
const database = require("../config/sequelize");

const  rotina = database.define("Rotina", {
    id_rotina: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    aluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    alimentacao: {
        type: Sequelize.JSON,
        allowNull: false,
    },
    evacuacao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    observacoes: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
}, {
    tableName: "rotina",
    timestamps: true,
});

module.exports = rotina;