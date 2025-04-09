const Sequelize = require("sequelize");
const database = require("../config/sequelize");
const { default_type } = require("mime");
const tipos_usuarios = require("./tipos_usuarios");
const turmas = require("./turmas");

const usuarios = database.define(
  "usuarios",
  {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cpf: {
      type: Sequelize.STRING,
      AllowNUll: false,
      unique: true,
    },
    nome: {
      type: Sequelize.STRING,
      AllowNUll: false,
    },
    email: {
      type: Sequelize.STRING,
      AllowNUll: false,
    },
    senha: {
      type: Sequelize.STRING,
      AllowNUll: false,
    },
    id_tipo: {
      type: Sequelize.INTEGER,
      defaultValue: "usuario",
      AllowNUll: false,
      references: {
        model: tipos_usuarios,
        key: "id_tipo",
      },
    },
    telefone: {
      type: Sequelize.STRING,
      AllowNUll: false,
    },
  },
  
  {
    timestamps: false, // Desativa createdAt e updatedAt
  }
);

tipos_usuarios.hasOne(usuarios, {
  foreignKey: "id_tipo",
});

usuarios.belongsTo(tipos_usuarios, {
  foreignKey: "id_tipo",
});


module.exports = usuarios;
