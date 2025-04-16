const Sequelize = require("sequelize");
const database = require("../config/sequelize");
const tipos_usuarios = require("./tipos_usuarios");

const usuarios = database.define(
  "usuarios",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_tipo: {
      type: Sequelize.INTEGER,
      defaultValue: "usuario",
      allowNull: false,
      references: {
        model: tipos_usuarios,
        key: "id_tipo",
      },
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

tipos_usuarios.hasOne(usuarios, {
  foreignKey: "id_tipo",
});
usuarios.belongsTo(tipos_usuarios, {
  foreignKey: "id_tipo",
});

module.exports = usuarios;
