const Sequelize = require("sequelize");
const database = require("../config/sequelize");
const Usuarios = require("./usuarios");
const Turmas = require("./turmas");

const UsuariosTurmasModel = database.define("usuarios_turmas", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: Sequelize.INTEGER,
    references: {
      model: Usuarios,
      key: "id",
    },
  },
  turmaId: {
    type: Sequelize.INTEGER,
    references: {
      model: Turmas,
      key: "id",
    },
  },
}, {
  timestamps: false,
});

Usuarios.belongsToMany(Turmas, {
  through: UsuariosTurmasModel,
  foreignKey: "usuarioId",
  as: "turmas"
});

Turmas.belongsToMany(Usuarios, {
  through: UsuariosTurmasModel,
  foreignKey: "turmaId",
  as: "alunos"
});

module.exports = UsuariosTurmasModel;
